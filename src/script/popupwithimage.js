import Popup from './popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector, elementInside) {
      super(popupSelector);
      this.picPosition = this._popUp.querySelector('.popup__bigpicture');
      this.source = elementInside;
    };
    
    open() {
      this.picPosition.src = this.source.querySelector('.element__image').src;
      this.picPosition.alt = 'Большая картинка';
      this._popUp.querySelector('.popup__text').textContent = this.source.querySelector('.element__info').textContent;
      this._popUp.classList.add('popup_opened');
    };
  };