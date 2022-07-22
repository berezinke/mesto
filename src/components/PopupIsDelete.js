import Popup from './popup.js';
export default class PopupIsDelete extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
    };

    open(objInside, elementInside) {
      super.open();
      this._objInside = objInside;
      this._elementInside = elementInside;
    }

    setEventListenersForDelete() {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
  
        this._old = this._textButton.textContent;
        this._textButton.textContent = 'Сохранение...';
               
        if (!this._mesto._handleFormSubmit(this._objInside, this._elementInside)) {
          this.close();
          this._textButton.textContent = this._old;
        } else {
          alert('Error')
        };
      });
    };
};