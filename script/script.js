const buttonEdit = document.querySelector('#button_edit'); // Кусто
const nameInKusto = document.querySelector('#nameScientist');
const infoInKusto = document.querySelector('#profeccionScientist');

const buttonAddPicture = document.querySelector('.profile__add-button'); // Новая карточка
let nameInCard = document.querySelector('#namePicNew');
let infoInCard = document.querySelector('#placePicNew');
const formAddCard = document.querySelector('#cardAdd');

const cardsPosition = document.querySelector('.elements'); // Создание карточек
const cardTemplate = document.querySelector('#elementTemplate').content.querySelector('.element');

const openPopInfo = document.querySelector('#popEdit');
const openPopCard = document.querySelector('#popAddPicture');
const openPopPic = document.querySelector('#popShowPicture');

const buttonClosePopupPicture = document.querySelectorAll('.popup__nosave-button');

// Открытие, редактирование и закрытие попАп
function openPopUp(idPop) {
   idPop.classList.add('popup_opened');
};
function closePopUp(buttonNoSave) {
   buttonNoSave.parentElement.parentElement.classList.remove('popup_opened');
};

// Создание первоначальных картинок
function createCard(elementArrCard) {
   const cardFrame = cardTemplate.cloneNode(true);
      
   cardFrame.querySelector('.element__image').src = elementArrCard.link;
   cardFrame.querySelector('.element__info-text').textContent = elementArrCard.name;
   cardsPosition.prepend(cardFrame);
   return cardFrame;
};

function addCardElement(cardFrame) {
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
      openPopPic.querySelector('.popup__bigpicture').src = buttonImage.src;
      openPopPic.querySelector('.popup__bigpicture').alt = 'Большая картинка';
      openPopPic.querySelector('.popup__text').textContent = picInfo.textContent;

      openPopUp(openPopPic);
   });
};

for (let i = 0; i < buttonClosePopupPicture.length; i++) {
   buttonClosePopupPicture[i].addEventListener('click', function() {
      closePopUp(buttonClosePopupPicture[i]);
   });
};

for (let i = initialCards.length - 1; i >= 0; i--) {
   addCardElement(createCard(initialCards[i]));
};

// Редактирование Кусто
buttonEdit.addEventListener('click', function() {
   const nameCh = document.querySelector('#change-name');
   const infoCh = document.querySelector('#change-profeccion');
   const formChange = openPopInfo.querySelector('.profile-change');

   openPopUp(openPopInfo);

   nameCh.value = nameInKusto.textContent.trim();
   infoCh.value = infoInKusto.textContent.trim();
    
   formChange.addEventListener('submit', function() {
      event.preventDefault();
      nameInKusto.textContent = nameCh.value;
      infoInKusto.textContent = infoCh.value;
      openPopInfo.classList.remove('popup_opened');
   });
});

// Вставка новой карточки
buttonAddPicture.addEventListener('click', function() {
   openPopUp(openPopCard);
});
formAddCard.addEventListener('submit', function() {
   event.preventDefault();

   if (nameInCard.value == '' || infoInCard.value == '') {
      nameInCard.value = 'Байкал как пример';
      infoInCard.value = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg';
      openPopCard.classList.remove('popup_opened');
   }
   addCardElement(createCard({name: nameInCard.value, link: infoInCard.value}));
   nameInCard.value = 'Название';
   infoInCard.value = 'Адрес картинки';
   openPopCard.classList.remove('popup_opened');
});