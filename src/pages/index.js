import Card from '../components/Card.js';
import Section from '../components/Section.js'
import PopupWithForm from '../components/popupwithform.js';
import PopupWithImage from '../components/popupwithimage.js';
import UserInfo from '../components/userinfo.js';
import FormValidator from '../components/formvalidator.js';
import Api from '../components/Api.js';

import '../pages/index.css';

const buttonEdit = document.querySelector('#button_edit'); // Кусто
const nameCh = document.querySelector('#change-name');
const infoCh = document.querySelector('#change-profeccion');

const validationObject = {
   formSelector: '.profile-change',
   inputSelector: '.profile-change__input',
   submitButtonSelector: '.profile-change__submit',
   inactiveButtonClass: 'profile-change__submit_disabled',
   inputErrorClass: 'profile-change__input_type_error',
   errorClass: 'profile-change__error_visible'
 };

const objAuthor = document.querySelector('#profileEdit'); // форма Кусто
const objCard = document.querySelector('#cardAdd'); // форма Карта
const objAvatar = document.querySelector('#avatarEdit'); // форма Аватар

const buttonAddPicture = document.querySelector('.profile__add-button'); // Новая карточка
const cardsPosition = document.querySelector('.elements'); // Создание карточек
const cardSelector = '#elementTemplate';

// Данные о группе, токене ...
const miCogort = 'cohort-46';
const miToken = '17354b5a-cdf3-4826-b8f6-745070d32c9c';
const pathToServer = 'https://mesto.nomoreparties.co/v1/';
const pathToCard = `${pathToServer}${miCogort}/cards`;
const pathToAuthor = `${pathToServer}${miCogort}/users/me`;
let ownerIdServ = '';
const apiForServerInfo = new Api(pathToAuthor, pathToCard, miToken, objAuthor, objCard, objAvatar);

// Редактирование аватара
const buttonEditAvatar = document.querySelector('.profile__edit-avatar');
const avatarInfoPictire = document.querySelector('.profile__avatar');
const avatarInPop = document.querySelector('#avatarEditPop');

// установка валидаторов на формы
const formProfileValidator = new FormValidator(validationObject, objAuthor);
formProfileValidator.enableValidation();
const formCardValidator = new FormValidator(validationObject, objCard);
formCardValidator.enableValidation();


// Редактирование Кусто
const dataListAuthor = new UserInfo('#nameScientist', '#profeccionScientist');
const popAuthor = new PopupWithForm(
   {popupSelector:'#popEdit', handleFormSubmit: 
      (objValues) => {dataListAuthor.setUserInfo(objValues);
                      apiForServerInfo.setAuthorInfo(
                        {newName: objValues.nameK, 
                         newAbout: objValues.profeccionK
                       })
                     }
});

apiForServerInfo.getAuthorInfo()
   .then((res) => {
      dataListAuthor.setUserInfo({nameK: res.name, profeccionK: res.about})
      ownerIdServ = res._id
      avatarInfoPictire.src = res.avatar;
      // console.log(ownerIdServ)
   })
   .catch((err) => {
      console.log('Ошибка. Запрос на получение информации об авторе не выполнен: ', err);
})

popAuthor.setEventListeners();
buttonEdit.addEventListener('click', function() {
   formProfileValidator.clearFormValidation();
   nameCh.value = dataListAuthor.getUserInfo().name;
   infoCh.value = dataListAuthor.getUserInfo().profeccion;
   popAuthor.open();
});

// первоначальная отрисовка карточек
function createCard(item, cardSelector, handleCardClick) {
   const card = new Card(item, cardSelector, handleCardClick, ownerIdServ, apiForServerInfo);
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

popEditAvatar.setEventListeners();
buttonEditAvatar.addEventListener('click', () => {
   formCardValidator.clearFormValidation();
   avatarInPop.value = avatarInfoPictire.src;
   popEditAvatar.open();
});

// Открытие большой картинки
const bigPicture = new PopupWithImage('#popShowPicture');
bigPicture.setEventListeners();

function handleCardClick(elementInside) {
   bigPicture.open(elementInside);
};