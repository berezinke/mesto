import { validationObject } from './script__data.js';
import Popup from './popup.js';
export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;    
    };
    
    _getInputValues() {
      this._inputList = this._popUp.querySelectorAll('.profile-change__input');
      this._formValues = {};
      this._inputList.forEach(input => this._formValues[input.name] = input.value);
      
      return this._formValues;
    };
  
    open() {
      const buttonElement = this._popUp.querySelector(validationObject.submitButtonSelector);
      
      this._popUp.classList.add('popup_opened');
      buttonElement.classList.add(validationObject.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);    
    };
  
    setEventListeners() {
      const mesto = this;
      this._popUp.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__nosave-image')) {
          this.close();
        };
      });
      this._popUp.addEventListener('keydown', (evt) => {
        super._handleEscClose(evt);
      });
    
      this._popUp.addEventListener('submit', (evt) => {
        evt.preventDefault();
        mesto._handleFormSubmit();
        mesto.close();
      });
    };
    
    close() {
      this._popUp.classList.remove('popup_opened');
      this._popUp.querySelector('.profile-change').reset();
    };
};