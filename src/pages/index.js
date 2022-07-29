import Card from '../components/Card.js';
import Section from '../components/Section.js'
import PopupWithForm from '../components/popupwithform.js';
import PopupWithImage from '../components/popupwithimage.js';
import PopupIsDelete from '../components/PopupIsDelete.js';
import UserInfo from '../components/userinfo.js';
import FormValidator from '../components/formvalidator.js';
import Api from '../components/Api.js';
import '../pages/index.css';
import {buttonEdit, objAuthor, objCard, objAvatar} from'../utils/constants.js';
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
const dataListAuthor = new UserInfo('#nameScientist', '#profeccionScientist', '.profile__avatar');
const promiseAuthor = apiForServerInfo.getAuthorInfo();

const popAuthor = new PopupWithForm(
   {popupSelector:'#popEdit', handleFormSubmit: 
      (objValues) => {return apiForServerInfo.setAuthorInfo(
                        {newName: objValues.nameK, 
                         newAbout: objValues.profeccionK
                       })
                       .then((res) => {
                        dataListAuthor.setUserInfo(objValues);                        
                     })
                     }
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

const promiseAllCard = apiForServerInfo.getInitCard();

Promise.all([promiseAuthor, promiseAllCard])
   .then(([resAuthor, resAllCard]) => {
      dataListAuthor.setUserInfo({nameK: resAuthor.name, profeccionK: resAuthor.about, avatarK: resAuthor.avatar});
      ownerIdServ = resAuthor._id;

      const initialCards = resAllCard;
      cardList.renderItems(initialCards);

      popAuthor.setEventListeners();
      buttonEdit.addEventListener('click', function() {
         formProfileValidator.clearFormValidation();

         popAuthor.setInputValues(dataListAuthor.getUserInfo());
         popAuthor.open();
      });
   })
   .catch((err) => {
      console.log('Ошибка. Запрос к серверу не выполнен: ', err)
   })

// добавление новой карточки
const popNewCard = new PopupWithForm(
   {popupSelector:'#popAddPicture', 
      handleFormSubmit: (objValues) => {
         const item = {name: objValues.namePl, link: objValues.picturePl};
         
         return apiForServerInfo.addCardToServer(item)
            .then((res) => {
               const cardElement = createCard(res, cardSelector, handleCardClick);
               cardList.addItemPrepend(cardElement)
            })
      }
   });

popNewCard.setEventListeners();
buttonAddPicture.addEventListener('click', () => {
   formCardValidator.clearFormValidation();
   popNewCard.open();
});

// Редактирование аватара
const popEditAvatar = new PopupWithForm(
   {popupSelector:'#popEditAvatar', 
      handleFormSubmit: (objValues) => {
         const item = {avatar: objValues.picturePl};
         
         return apiForServerInfo.setAuthorAvatar(item)
            .then((res) => {
               dataListAuthor.setAvatar(objValues.picturePl)
            })
      }
   });   

popEditAvatar.setEventListeners();
buttonEditAvatar.addEventListener('click', () => {
   formAvatarValidator.clearFormValidation();
   popEditAvatar.open();
});

// Открытие большой картинки
const bigPicture = new PopupWithImage('#popShowPicture');

function handleCardClick(cardData) {
   bigPicture.open(cardData, cardData.link, cardData.name);
};

const popIsDeleted = new PopupIsDelete(
   {popupSelector:'#popIsDelete', handleFormSubmit: (objInside, elementInside) => {

      return objInside.trashElement(elementInside)}});

popIsDeleted.setEventListeners();

function handleTrashClick(objInside, elementInside) {
   popIsDeleted.open(objInside, elementInside);
};