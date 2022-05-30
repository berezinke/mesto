const buttonEdit = document.querySelector('#button_edit'); // Кусто
const nameInKusto = document.querySelector('#nameScientist');
const infoInKusto = document.querySelector('#profeccionScientist');
const nameCh = document.querySelector('#change-name');
const infoCh = document.querySelector('#change-profeccion');
const formEditProfile = document.querySelector('#profileEdit');

const buttonAddPicture = document.querySelector('.profile__add-button'); // Новая карточка
const nameInCard = document.querySelector('#namePicNew');
const infoInCard = document.querySelector('#placePicNew');
const formAddCard = document.querySelector('#cardAdd');

const cardsPosition = document.querySelector('.elements'); // Создание карточек
const popupProfile = document.querySelector('#popEdit');
const popupCard = document.querySelector('#popAddPicture');

const listPopUp = document.querySelectorAll('.popup');

import {initialCards, validationObject, formList} from './script__data.js';
import Card from './card.js';
import FormValidator from './formvalidator.js';

export default function openPopUp(popUp) {
   popUp.classList.add('popup_opened');
   addEventListener('keydown', listenKeydown);
};
function disableButtonPopUp(popUp, classInactivButton) {
   const buttonElement = popUp.querySelector(validationObject.submitButtonSelector);
   buttonElement.classList.add(classInactivButton);
   buttonElement.setAttribute('disabled', true);
};
function resetPopUp(popUp) {
   popUp.querySelector('.profile-change').reset();
};
function closePopUp(popUp) {
   removeEventListener('keydown', listenKeydown);
   popUp.classList.remove('popup_opened');
};
function listenKeydown(evt) {
   if (evt.key === 'Escape') {
      let popOpen = document.querySelector('.popup_opened');
      closePopUp(popOpen);
   };   
};
function addFirstCardElement(card, cardsPosition) {
   cardsPosition.prepend(card);
};
function addLastCardElement(card, cardsPosition) {
   cardsPosition.append(card);
};
function createCard(elementArrCard, cardSelector) {
   const card = new Card(elementArrCard, cardSelector);
   const cardElement = card.generateCard();
   return cardElement;
};
function initiatePop(popElement) {
   resetPopUp(popElement);
   disableButtonPopUp(popElement, validationObject.inactiveButtonClass);
   openPopUp(popElement);
};
function addNewCard() {
   event.preventDefault();
   addFirstCardElement(createCard({name: nameInCard.value, link: infoInCard.value}, '#elementTemplate'),cardsPosition);
   formAddCard.reset();
   closePopUp(popupCard);
};

listPopUp.forEach((popUp) => {
   popUp.addEventListener('click', function(evt) {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__nosave-image')) {
         closePopUp(popUp);
      };
   });
});

formList.forEach((formElement) => {
   const formValid = new FormValidator(validationObject, formElement);
   formValid.enableValidation();
 });

initialCards.forEach((elementArrCard) => {
   addLastCardElement(createCard(elementArrCard, '#elementTemplate'), cardsPosition);
});


// Редактирование Кусто
buttonEdit.addEventListener('click', function() {
   initiatePop(popupProfile);
});
formEditProfile.addEventListener('submit', function() {
   event.preventDefault();
   nameInKusto.textContent = nameCh.value;
   infoInKusto.textContent = infoCh.value;
   closePopUp(popupProfile);
});

// Вставка новой карточки
buttonAddPicture.addEventListener('click', function() {
   initiatePop(popupCard);
});
formAddCard.addEventListener('submit', function() {   
   addNewCard();   
});