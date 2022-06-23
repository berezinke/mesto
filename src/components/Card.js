export default class Card {
    constructor(elementArrCard, cardSelector, handleCardClick) {
      this._cardData = elementArrCard;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
    };
    _getTemplate() {
      const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
      return cardElement;
    };

    _toggleLike(buttonLiked) {
      buttonLiked.classList.toggle('element__button-liked_activ');
    };
    _trashElement() {
      this._element.remove();
    };

    _setEventListeners() {
      const objInside = this;
      const elementInside = this._element;
      
      this._buttonLiked.addEventListener('click', function() {
        objInside._toggleLike(objInside._buttonLiked);
      });
      this._buttonTrash.addEventListener('click', function() {
        objInside._trashElement(elementInside)
      });
      this._buttonImage.addEventListener('click', () => {
        this._handleCardClick(elementInside);
      });
    };

    generateCard() {
      this._element = this._getTemplate();
      this._element.querySelector('.element__image').src = this._cardData.link;
      this._element.querySelector('.element__image').alt = this._cardData.name;
      this._element.querySelector('.element__info-text').textContent = this._cardData.name;

      this._buttonLiked = this._element.querySelector('.element__button-liked');
      this._buttonTrash = this._element.querySelector('.element__basura');
      this._buttonImage = this._element.querySelector('.element__image');
 
       this._setEventListeners();
     
       return this._element;
    };
}