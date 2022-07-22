export const buttonEdit = document.querySelector('#button_edit'); // Кусто
export const nameCh = document.querySelector('#change-name');
export const infoCh = document.querySelector('#change-profeccion');
export const objAuthor = document.querySelector('#profileEdit'); // форма Кусто
export const objCard = document.querySelector('#cardAdd'); // форма Карта
export const objAvatar = document.querySelector('#avatarEdit'); // форма Аватар

export const validationObject = {
  formSelector: '.profile-change',
  inputSelector: '.profile-change__input',
  submitButtonSelector: '.profile-change__submit',
  inactiveButtonClass: 'profile-change__submit_disabled',
  inputErrorClass: 'profile-change__input_type_error',
  errorClass: 'profile-change__error_visible'
};

export const buttonAddPicture = document.querySelector('.profile__add-button'); // Новая карточка
export const cardsPosition = document.querySelector('.elements'); // Создание карточек
export const cardSelector = '#elementTemplate';

// Данные о группе, токене ...
const miCogort = 'cohort-46';
export const miToken = '17354b5a-cdf3-4826-b8f6-745070d32c9c';
export const pathToServer = `https://mesto.nomoreparties.co/v1/${miCogort}`;

export const headers = {
  authorization: miToken,
  'Content-Type': 'application/json'
};