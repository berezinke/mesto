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
      buttonLiked.classList.toggle('element__button-liked_activ');
    };
    _trashElement(elementInside) {
      elementInside.remove();
    };
    _showBigPicture(popupPicture, elementInside) {
      const picPosition = popupPicture.querySelector('.popup__bigpicture');
      
      picPosition.src = elementInside.querySelector('.element__image').src;
      picPosition.alt = 'Большая картинка';
      popupPicture.querySelector('.popup__text').textContent = elementInside.querySelector('.element__info').textContent;
      openPopUp(popupPicture);
    };
    _setEventListeners() {
      const objInside = this;
      const elementInside = this._element;
      const buttonLiked = elementInside.querySelector('.element__button-liked');
      const buttonTrash = elementInside.querySelector('.element__basura');
      const buttonImage = elementInside.querySelector('.element__image');
      const popupPicture = document.querySelector('#popShowPicture');
      
      buttonLiked.addEventListener('click', function() {
        objInside._toggleLike(buttonLiked);
      });
      buttonTrash.addEventListener('click', function() {
        objInside._trashElement(elementInside)
      });
      buttonImage.addEventListener('click', function() {
        objInside._showBigPicture(popupPicture, elementInside);
      });
    };

    generateCard() {
       this._element = this._getTemplate();
       this._element.querySelector('.element__image').src = this._cardData.link;
       this._element.querySelector('.element__info-text').textContent = this._cardData.name;
 
       this._setEventListeners();
     
       return this._element;
    }
}