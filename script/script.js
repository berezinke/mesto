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

const buttonClosePopup = document.querySelectorAll('.popup');
let popIn = {};

// Открытие, редактирование и закрытие попАп
function openPopUp(popUp) {
   const buttonElement = popUp.querySelector(validationObject.submitButtonSelector);
   if (buttonElement) {
      disabledButton(buttonElement);
   };
   if (popUp.id === "popAddPicture") {
      popUp.querySelector('.profile-change').reset();
   }

   popUp.classList.add('popup_opened');
   popIn = popUp;
   addEventListener('keydown', listenKeydown);
};
function closePopUp(popUp) {
   removeEventListener('keydown', listenKeydown);
   popUp.classList.remove('popup_opened');
};
function listenKeydown(evt) {
   if (evt.key === 'Escape') {
      closePopUp(popIn);
   };
   if (evt.key === 'Enter' && !popIn.querySelector(validationObject.submitButtonSelector).classList.contains(validationObject.inactiveButtonClass) && popIn.id === "popAddPicture") {
      addNewCard();
   }
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
      const listItem = buttonTrash.closest('.element');
         listItem.remove();         
      });
   buttonImage.addEventListener('click', function() {
      popupPicture.querySelector('.popup__bigpicture').src = buttonImage.src;
      popupPicture.querySelector('.popup__bigpicture').alt = 'Большая картинка';
      popupPicture.querySelector('.popup__text').textContent = picInfo.textContent;

      openPopUp(popupPicture);
   });
   return cardFrame;
};

for (let i = 0; i < buttonClosePopup.length; i++) {
   buttonClosePopup[i].addEventListener('click', function(evt) {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__nosave-image')) {
         if (buttonClosePopup[i].querySelector('.profile-change')) {
            buttonClosePopup[i].querySelector('.profile-change').reset();
         };
         closePopUp(buttonClosePopup[i]);
      };
   });
};

for (let i = initialCards.length - 1; i >= 0; i--) {
   addCardElement(createCard(initialCards[i]), cardsPosition);
};

// Редактирование Кусто
buttonEdit.addEventListener('click', function() {
   nameCh.value = nameInKusto.textContent.trim();
   infoCh.value = infoInKusto.textContent.trim(); 
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
   openPopUp(popupCard);
});
formAddCard.addEventListener('submit', function() {
   addNewCard();   
});