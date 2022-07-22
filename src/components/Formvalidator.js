export default class FormValidator {
  constructor(validationObject, formElement) {
    this._validationData=validationObject
    this._elementValidation = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(this._validationData.inputSelector));

    // Только для удобства
    this._submitButton = formElement.querySelector(this._validationData.submitButtonSelector);
    this._classButtonSubmitInactiv = this._validationData.inactiveButtonClass;
    this._classInputError = this._validationData.inputErrorClass;
    this._inputErrorVisible = this._validationData.errorClass;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._disabledButton();
    }  else {
      this._submitButton.classList.remove(this._classButtonSubmitInactiv);
      this._submitButton.removeAttribute('disabled');
    };
  };
  _showInputError = (inputElement) => {
    const errorElement = this._elementValidation.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._classInputError);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._inputErrorVisible);
  };
  
  _hideInputError = (inputElement) => {
    const errorElement = this._elementValidation.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._classInputError);
    errorElement.classList.remove(this._inputErrorVisible);
    errorElement.textContent = 'Ок';
  };

  _setEventListeners() {
    const nameThis = this;

    this._toggleButtonState();
    
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      inputElement.addEventListener('input', function () {
        nameThis._checkInputValidity(inputElement);
        nameThis._toggleButtonState();
      });
    });
  };

  _disabledButton() {
    this._submitButton.classList.add(this._classButtonSubmitInactiv);
    this._submitButton.setAttribute('disabled', true);
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    };
  };
  
  clearFormValidation() {
    this._inputList.forEach((fieldInput) => {
      this._hideInputError(fieldInput);
    });
    this._toggleButtonState();
  };
  
  enableValidation() {
    this._setEventListeners();
  };
};