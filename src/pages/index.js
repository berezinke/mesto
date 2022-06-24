import {initialCards} from '../utils/script__data.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js'
import PopupWithForm from '../components/popupwithform.js';
import PopupWithImage from '../components/popupwithimage.js';
import UserInfo from '../components/userinfo.js';
import FormValidator from '../components/formvalidator.js';

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
const objCard = document.querySelector('#cardAdd'); // форма Кусто

const buttonAddPicture = document.querySelector('.profile__add-button'); // Новая карточка
const cardsPosition = document.querySelector('.elements'); // Создание карточек
const cardSelector = '#elementTemplate';

// установка валидаторов на формы
const formProfileValidator = new FormValidator(validationObject, objAuthor);
formProfileValidator.enableValidation();
const formCardValidator = new FormValidator(validationObject, objCard);
formCardValidator.enableValidation();

// первоначальная отрисовка карточек
function createCard(item, cardSelector, handleCardClick) {
   const card = new Card(item, cardSelector, handleCardClick);
   return card.generateCard();
}
const cardList = new Section({renderer: (item) => {
   const cardElement = createCard(item, cardSelector, handleCardClick);
   cardList.addItemAppend(cardElement);
}}, cardsPosition);
cardList.renderItems(initialCards);

// Редактирование Кусто
const dataListAuthor = new UserInfo('#nameScientist', '#profeccionScientist');
const popAuthor = new PopupWithForm({popupSelector:'#popEdit', 
      handleFormSubmit: (objValues) => {dataListAuthor.setUserInfo(objValues)}});

popAuthor.setEventListeners();
buttonEdit.addEventListener('click', function() {
   
   formProfileValidator.clearFormValidation();
   nameCh.value = dataListAuthor.getUserInfo().name;
   infoCh.value = dataListAuthor.getUserInfo().profeccion;
   popAuthor.open();
});

// добавление новой карточки
const popNewCard = new PopupWithForm({popupSelector:'#popAddPicture', handleFormSubmit: (objValues) => {
   const item = {name: objValues.namePl, link: objValues.picturePl};
   const cardElement = createCard(item, cardSelector, handleCardClick);

   cardList.addItemPrepend(cardElement)}});

popNewCard.setEventListeners();
buttonAddPicture.addEventListener('click', () => {
   formCardValidator.clearFormValidation();
   popNewCard.open();
});

// Открытие большой картинки
const bigPicture = new PopupWithImage('#popShowPicture');
bigPicture.setEventListeners();

function handleCardClick(elementInside) {
   bigPicture.open(elementInside);
};