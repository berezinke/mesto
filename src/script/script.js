import {initialCards, validationObject, formList} from './script__data.js';
import Card from './card.js';
import Section from './section.js';
import PopupWithForm from './popupwithform.js';
import PopupWithImage from './popupwithimage.js';
import UserInfo from './userinfo.js';
import FormValidator from './formvalidator.js';

import '../pages/index.css';

const buttonEdit = document.querySelector('#button_edit'); // Кусто
const nameCh = document.querySelector('#change-name');
const infoCh = document.querySelector('#change-profeccion');

const buttonAddPicture = document.querySelector('.profile__add-button'); // Новая карточка
const cardsPosition = document.querySelector('.elements'); // Создание карточек
const cardSelector = '#elementTemplate';

// установка валидаторов на формы
const formProfileValidator = new FormValidator(validationObject, formList[0]);
formProfileValidator.enableValidation();
const formCardValidator = new FormValidator(validationObject, formList[1]);
formCardValidator.enableValidation();

// первоначальная отрисовка карточек
const CardList = new Section({ items: initialCards, renderer: (item) => {
   const card = new Card(item, cardSelector, handleCardClick);
   const cardElement = card.generateCard();
   CardList.addItemAppend(cardElement);
}}, cardsPosition);
CardList.renderItems();

// Редактирование Кусто
function popCurrentInfo(arrayField, arrayValue) {
   for (let i = 0; i < arrayField.length; i++) {
      arrayField[i].value = arrayValue[i];
   };
};
const dataList = new UserInfo('#nameScientist', '#profeccionScientist');
const popCusto = new PopupWithForm({popupSelector:'#popEdit', handleFormSubmit: () => {
   dataList.setUserInfo(nameCh.value, infoCh.value)}
});
popCusto.setEventListeners();
buttonEdit.addEventListener('click', function() {
   popCurrentInfo([nameCh, infoCh], dataList.getUserInfo());
   popCusto.open();
});

// добавление новой карточки
const popNewCard = new PopupWithForm({popupSelector:'#popAddPicture', handleFormSubmit: () => {
   const dataList = new UserInfo('#namePicNew', '#placePicNew');
   const newPlaceData = dataList.getCardInfo();
   const item = {name: newPlaceData[0], link: newPlaceData[1]};
   const cardNew = new Card(item, cardSelector, handleCardClick);
   const cardElement = cardNew.generateCard();

   cardsPosition.prepend(cardElement);
}});
popNewCard.setEventListeners();
buttonAddPicture.addEventListener('click', () => {
   popNewCard.open();
});
function handleCardClick(popupPicture, elementInside) {
   const bigPicture = new PopupWithImage(popupPicture, elementInside);
   bigPicture.open();
   bigPicture.setEventListeners();
 };