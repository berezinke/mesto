import Card from '../components/Card.js';
import Section from '../components/Section.js'
import PopupWithForm from '../components/popupwithform.js';
import PopupWithImage from '../components/popupwithimage.js';
import PopupIsDelete from '../components/PopupIsDelete.js';
import UserInfo from '../components/userinfo.js';
import FormValidator from '../components/formvalidator.js';
import Api from '../components/Api.js';
import '../pages/index.css';
import {buttonEdit, nameCh, infoCh, objAuthor, objCard, objAvatar} from'../utils/constants.js';
import {validationObject} from'../utils/constants.js';
import {buttonAddPicture, cardsPosition, cardSelector} from'../utils/constants.js';
import {miToken, pathToServer} from'../utils/constants.js';
import {headers} from'../utils/constants.js';

let ownerIdServ = '';

const apiForServerInfo = new Api(pathToServer, headers);

// Редактирование аватара
const buttonEditAvatar = document.querySelector('.profile__edit-avatar');
const avatarInfoPictire = document.querySelector('.profile__avatar');
const avatarInPop = document.querySelector('#avatarEditPop');

// установка валидаторов на формы
const formProfileValidator = new FormValidator(validationObject, objAuthor);
formProfileValidator.enableValidation();
const formCardValidator = new FormValidator(validationObject, objCard);
formCardValidator.enableValidation();
const formAvatarValidator = new FormValidator(validationObject, objAvatar);
formAvatarValidator.enableValidation();


// Редактирование Кусто
const dataListAuthor = new UserInfo('#nameScientist', '#profeccionScientist', '.profile__avatar', ownerIdServ);
const popAuthor = new PopupWithForm(
   {popupSelector:'#popEdit', handleFormSubmit: 
      (objValues) => {dataListAuthor.setUserInfo(objValues);
                      apiForServerInfo.setAuthorInfo(
                        {newName: objValues.nameK, 
                         newAbout: objValues.profeccionK
                       }).catch((err) => {
                        console.log('Ошибка. Запрос на запись информации об авторе не выполнен: ', err);
                      })
                     }
});

apiForServerInfo.getAuthorInfo()
   .then((res) => {
      dataListAuthor.setUserInfo({nameK: res.name, profeccionK: res.about, avatarK: res.avatar})
      ownerIdServ = res._id;
   })
   .catch((err) => {
      console.log('Ошибка. Запрос на получение информации об авторе не выполнен: ', err)
   .finally((res) => {
      return res
   })
})

popAuthor.setEventListenersForForm();
buttonEdit.addEventListener('click', function() {
   formProfileValidator.clearFormValidation();
   nameCh.value = dataListAuthor.getUserInfo().name;
   infoCh.value = dataListAuthor.getUserInfo().profeccion;
   popAuthor.open();
});

// первоначальная отрисовка карточек
function createCard(item, cardSelector, handleCardClick) {
   const card = new Card(item, cardSelector, handleCardClick, ownerIdServ, apiForServerInfo, handleTrashClick);
   return card.generateCard();
}
const cardList = new Section({renderer: (item) => {
   const cardElement = createCard(item, cardSelector, handleCardClick);
   cardList.addItemAppend(cardElement);
}}, cardsPosition);

apiForServerInfo.getInitCard()
   .then((res) => {
      const initialCards = res;
      cardList.renderItems(initialCards);
   })
   .catch((err) => {
      console.log('Ошибка. Запрос на инфу по карточкам не выполнен: ', err);
})

// добавление новой карточки
const popNewCard = new PopupWithForm(
   {popupSelector:'#popAddPicture', 
      handleFormSubmit: (objValues) => {
         const item = {name: objValues.namePl, link: objValues.picturePl};
         
         apiForServerInfo.addCardToServer(item)
            .then((res) => {
               const cardElement = createCard(res, cardSelector, handleCardClick);
               cardList.addItemPrepend(cardElement)
            })
            .catch((err) => {
               console.log('Ошибка. Запрос на добавление карточки не выполнен: ', err);
         })
      }
   });

popNewCard.setEventListenersForForm();
buttonAddPicture.addEventListener('click', () => {
   formCardValidator.clearFormValidation();
   popNewCard.open();
});

// Редактирование аватара
const popEditAvatar = new PopupWithForm(
   {popupSelector:'#popEditAvatar', 
      handleFormSubmit: (objValues) => {
         const item = {avatar: objValues.picturePl};
         
         // console.log(item)
         apiForServerInfo.setAuthorAvatar(item)
            .then((res) => {
               avatarInfoPictire.src = res.avatar
            })
            .catch((err) => {
               console.log('Ошибка. Запрос на изменение аватара не выполнен: ', err);
         })
      }
   });   

popEditAvatar.setEventListenersForForm();
buttonEditAvatar.addEventListener('click', () => {
   formAvatarValidator.clearFormValidation();
   avatarInPop.value = avatarInfoPictire.src;
   popEditAvatar.open();
});

// Открытие большой картинки
const bigPicture = new PopupWithImage('#popShowPicture');
bigPicture.setEventListeners();

function handleCardClick(elementInside) {
   bigPicture.open(elementInside);
};

const popIsDeleted = new PopupIsDelete(
   {popupSelector:'#popIsDelete', handleFormSubmit: (objInside, elementInside) => {

      objInside._trashElement(elementInside)}});

popIsDeleted.setEventListenersForDelete();

function handleTrashClick(objInside, elementInside) {
   popIsDeleted.open(objInside, elementInside);
};


