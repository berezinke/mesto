import {openPopUp} from './utils.js';

export default class Card {
    constructor(elementArrCard, cardSelector) {
      this._cardData = elementArrCard;
      this._cardSelector = cardSelector;
    };
    _getTemplate() {
      const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
      return cardElement;
    };
    _toggleLike(buttonLiked) {
      buttonLiked.addEventListener('click', function() {
        buttonLiked.classList.toggle('element__button-liked_activ');
      });
    };
    _trashElement(buttonTrash, elementInside) {
      buttonTrash.addEventListener('click', function() {
        elementInside.remove();
      });
    };
    _showBigPicture(buttonImage, popupPicture, picInfo) {
      const picPicition = popupPicture.querySelector('.popup__bigpicture');
      
      buttonImage.addEventListener('click', function() {
      picPicition.src = buttonImage.src;
      picPicition.alt = 'Большая картинка';
      popupPicture.querySelector('.popup__text').textContent = picInfo.textContent;
      openPopUp(popupPicture);
      });
    };
    _setEventListeners() {
      const elementInside = this._element;
      const buttonLiked = elementInside.querySelector('.element__button-liked');
      const buttonTrash = elementInside.querySelector('.element__basura');
      const buttonImage = elementInside.querySelector('.element__image');
      const picInfo = elementInside.querySelector('.element__info');
      const popupPicture = document.querySelector('#popShowPicture');
       
      this._toggleLike(buttonLiked);
      this._trashElement(buttonTrash, elementInside);
      this._showBigPicture(buttonImage, popupPicture, picInfo);       
    };

    generateCard() {
       this._element = this._getTemplate();
       this._element.querySelector('.element__image').src = this._cardData.link;
       this._element.querySelector('.element__info-text').textContent = this._cardData.name;
 
       this._setEventListeners();
     
       return this._element;
    }
}