import Popup from './popup.js';
export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit, formValidatorObj}) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._arrayFieldInput = this._popUp.querySelectorAll('.profile-change__input');
      this._formValidator = formValidatorObj;
      this._form = this._popUp.querySelector('.profile-change');
      this._mesto = this;
    };
    
    _getInputValues() {
      this._formValues = [];
      this._arrayFieldInput.forEach(input => this._formValues.push(input.value));

      return this._formValues;
    };

    returnFieldValue(i) {
      return this._arrayFieldInput[i].value;
    };
  
    open() {
      this._setListenKeydown();
      this._popUp.classList.add('popup_opened');
    };

    close() {
      this._popUp.classList.remove('popup_opened');
      this._arrayFieldInput.forEach((fieldInput) => {
        this._formValidator._hideInputError(fieldInput);
      });
      this._form.reset();
    };
  
    setEventListeners() {
      super.setEventListeners();
      this._popUp.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._mesto._handleFormSubmit(this._getInputValues());
        this._mesto.close();
      });
    };
};