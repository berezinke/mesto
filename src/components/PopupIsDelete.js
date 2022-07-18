import Popup from './popup.js';
export default class PopupIsDelete extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._button = this._popUp.querySelector('#ButtonDelete');
      this._mesto = this;
    };
    
    setEventListeners() {
      super.setEventListeners();
      this._button.addEventListener('click', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit();
        this.close();
      });
    };
};