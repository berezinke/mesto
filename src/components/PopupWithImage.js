import Popup from './popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this.picPosition = this._popUp.querySelector('.popup__bigpicture');
      this.placeText = this._popUp.querySelector('.popup__text');
    };
    
    open(elementInside) {
      this._setListenKeydown();
      this.source = elementInside;
      this._popUp.classList.add('popup_opened');
      this.picPosition.src = this.source.querySelector('.element__image').src;

      const textContent = this.source.querySelector('.element__info').textContent;
      this.placeText.textContent = textContent;
      this.picPosition.alt = textContent;
      this._popUp.classList.add('popup_opened');
    };
  };