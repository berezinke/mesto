import Popup from './popup.js';
export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._arrayFieldInput = this._popUp.querySelectorAll('.profile-change__input');
      
      this._form = this._popUp.querySelector('.profile-change');
      this._mesto = this;
    };
    
    _getInputValues() {
      this._formValues = {};
      this._arrayFieldInput.forEach(input => this._formValues[input.name] = input.value);
      
      return this._formValues;
    };
  
    close() {
      super.close();
      this._form.reset();
    };
  
    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._mesto._handleFormSubmit(this._getInputValues());
        this.close();
      });
    };
};