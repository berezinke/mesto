import Popup from './popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this.picPosition = this._popUp.querySelector('.popup__bigpicture');
      this.placeText = this._popUp.querySelector('.popup__text');
    };
    
    open(elementInside, elementImage, elementInfo) {
      super.open();
      this.source = elementInside;
      this.picPosition.src = elementImage;
      this.placeText.textContent = elementInfo;
      this.picPosition.alt = elementInfo;
    };
  };