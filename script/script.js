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
const cardTemplate = document.querySelector('#elementTemplate').content.querySelector('.element');

const popupProfile = document.querySelector('#popEdit');
const popupCard = document.querySelector('#popAddPicture');
const popupPicture = document.querySelector('#popShowPicture');

const listPopUp = document.querySelectorAll('.popup');

// Открытие, редактирование и закрытие попАп
function openPopUp(popUp) {
   popUp.classList.add('popup_opened');
   addEventListener('keydown', listenKeydown);
};
function disableButtonPopUp(popUp) {
   const buttonElement = popUp.querySelector(validationObject.submitButtonSelector);
   disabledButton(buttonElement);
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
}

// Создание первоначальных картинок
function addCardElement(card, cardsPosition) {
   cardsPosition.prepend(card);
};
function createCard(elementArrCard) {
   const cardFrame = cardTemplate.cloneNode(true);
    
   cardFrame.querySelector('.element__image').src = elementArrCard.link;
   cardFrame.querySelector('.element__info-text').textContent = elementArrCard.name;
   const buttonLiked = cardFrame.querySelector('.element__button-liked');
   const buttonTrash = cardFrame.querySelector('.element__basura');
   const buttonImage = cardFrame.querySelector('.element__image');
   const picInfo = cardFrame.querySelector('.element__info');
         
   buttonLiked.addEventListener('click', function() {
         buttonLiked.classList.toggle('element__button-liked_activ');
   });
   buttonTrash.addEventListener('click', function() {
      cardFrame.remove();
   });
   buttonImage.addEventListener('click', function() {
      popupPicture.querySelector('.popup__bigpicture').src = buttonImage.src;
      popupPicture.querySelector('.popup__bigpicture').alt = 'Большая картинка';
      popupPicture.querySelector('.popup__text').textContent = picInfo.textContent;

      openPopUp(popupPicture);
   });
   return cardFrame;
};

listPopUp.forEach((popUp) => {
   popUp.addEventListener('click', function(evt) {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__nosave-image')) {
         closePopUp(popUp);
      };
   });
});

for (let i = initialCards.length - 1; i >= 0; i--) {
   addCardElement(createCard(initialCards[i]), cardsPosition);
};

// Редактирование Кусто
buttonEdit.addEventListener('click', function() {
   resetPopUp(popupProfile);
   // nameCh.value = nameInKusto.textContent.trim();
   // infoCh.value = infoInKusto.textContent.trim();
   disableButtonPopUp(popupProfile);
   openPopUp(popupProfile);
});
formEditProfile.addEventListener('submit', function() {
   event.preventDefault();
   nameInKusto.textContent = nameCh.value;
   infoInKusto.textContent = infoCh.value;
   closePopUp(popupProfile);
});

// Вставка новой карточки
function addNewCard() {
   event.preventDefault();
   addCardElement(createCard({name: nameInCard.value, link: infoInCard.value}),cardsPosition);
   formAddCard.reset();
   closePopUp(popupCard);
};
buttonAddPicture.addEventListener('click', function() {
   resetPopUp(popupCard);
   disableButtonPopUp(popupCard);
   openPopUp(popupCard);
});
formAddCard.addEventListener('submit', function() {   
   addNewCard();   
});