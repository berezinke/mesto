const buttonEdit = document.querySelector('#button_edit'); // Кусто
const nameInKusto = document.querySelector('#nameScientist');
const infoInKusto = document.querySelector('#profeccionScientist');

const buttonAddPicture = document.querySelector('.profile__add-button'); // Новая карточка
const nameInCard = document.querySelector('#namePicNew');
const infoInCard = document.querySelector('#placePicNew');
const formAddCard = document.querySelector('#cardAdd');

const cardsPosition = document.querySelector('.elements'); // Создание карточек
const cardTemplate = document.querySelector('#elementTemplate').content;

let arrPictures = [];

const initialCards = [
   {
     name: 'Архыз',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
   },
   {
     name: 'Челябинская область',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
   },
   {
     name: 'Иваново',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
   },
   {
     name: 'Камчатка',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
   },
   {
     name: 'Холмогорский район',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
   },
   {
     name: 'Байкал',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
   }
 ];

// Открытие, редактирование и закрытие попАп
function popUpOpened(idPop) {
   const popupStyles = document.querySelector(idPop);
   popupStyles.classList.add('popup_opened');
};
function popUpClosed(idPop) {
   const popupStyles = document.querySelector(idPop);
   popupStyles.classList.remove('popup_opened');
};

// Создание первоначальных картинок
function addCardElement(elementArrCard) {
   const cardFrame = cardTemplate.cloneNode(true);
   cardFrame.querySelector('.element__image').src = elementArrCard.link;
   cardFrame.querySelector('.element__info-text').textContent = elementArrCard.name;
   cardsPosition.prepend(cardFrame);

   arrPictures = document.querySelector('.element');
   
   const buttonLiked = arrPictures.querySelector('.element__button-liked');
   const buttonTrash = arrPictures.querySelector('.element__basura');
   const buttonImage = arrPictures.querySelector('.element__image');
         
   buttonLiked.addEventListener('click', function() {
         buttonLiked.classList.toggle('element__button-liked_activ');
   });

   buttonTrash.addEventListener('click', function() {
      const listItem = buttonTrash.closest('.element');
         listItem.remove();         
      });
   buttonImage.addEventListener('click', function() {
      const popName = document.querySelector('#popShowPicture');
      const buttonNoSave = popName.querySelector('.popup__nosave-button');

      popName.querySelector('.popup__bigpicture').src = elementArrCard.link;
      popName.querySelector('.popup__text').textContent = elementArrCard.name;

      popUpOpened('#popShowPicture');
      buttonNoSave.addEventListener('click', function() {
         popUpClosed('#popShowPicture');
      });
   });
   
};

for (let i = initialCards.length - 1; i >= 0; i--) {
   addCardElement(initialCards[i]);
};

// Редактирование Кусто
buttonEdit.addEventListener('click', function() {
   const popName = document.querySelector('#popEdit');

   const nameCh = document.querySelector('#change-name');
   const infoCh = document.querySelector('#change-profeccion');

   const buttonNoSave = popName.querySelector('.popup__nosave-button');
   const formChange = popName.querySelector('.profile-change');

   popUpOpened('#popEdit');

   buttonNoSave.addEventListener('click', function() {
      popUpClosed('#popEdit');
   });
   nameCh.value = nameInKusto.textContent.trim();
   infoCh.value = infoInKusto.textContent.trim();
    
   formChange.addEventListener('submit', function() {
      event.preventDefault();
      nameInKusto.textContent = nameCh.value;
      infoInKusto.textContent = infoCh.value;
      popUpClosed('#popEdit');
   });
});

// Вставка новой карточки
buttonAddPicture.addEventListener('click', function() {
   const popName = document.querySelector('#popAddPicture');
   const buttonNoSave = popName.querySelector('.popup__nosave-button');
      
   popUpOpened('#popAddPicture');
   buttonNoSave.addEventListener('click', function() {
      popUpClosed('#popAddPicture');      
   });
});
formAddCard.addEventListener('submit', function() {
   event.preventDefault();
   addCardElement({name: nameInCard.value, link: infoInCard.value});
   popUpClosed('#popAddPicture');
});