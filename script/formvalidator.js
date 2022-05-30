export default class FormValidator {
  constructor(validationObject, formElement) {
    this._validationData=validationObject
    this._elementValidation = formElement;
  }

  _toggleButtonState(inputList, buttonElement, classButtonSubmitInactiv) {
    if (this._hasInvalidInput(inputList)) {
      this._disabledButton(buttonElement, classButtonSubmitInactiv);
    }  else {
      buttonElement.classList.remove(classButtonSubmitInactiv);
      buttonElement.removeAttribute('disabled');
    };
  };

  _setEventListeners(formElement, classInput, classButtonSubmit, classButtonSubmitInactiv, classInputError, inputErrorVisible) {
    const inputList = Array.from(formElement.querySelectorAll(classInput));
    const buttonElement = formElement.querySelector(classButtonSubmit);
    const nameThis = this;

    this._toggleButtonState(inputList, buttonElement, classButtonSubmitInactiv);

    inputList.forEach((inputElement) => {
      this._hideInputError(formElement, inputElement, classInputError, inputErrorVisible);
      inputElement.addEventListener('input', function () {
        nameThis._checkInputValidity(formElement, inputElement, classInputError, inputErrorVisible);
        nameThis._toggleButtonState(inputList, buttonElement, classButtonSubmitInactiv);
      });
    });
  };

  _disabledButton(buttonElement, classButtonSubmitInactiv) {
    buttonElement.classList.add(classButtonSubmitInactiv);
    buttonElement.setAttribute('disabled', true);
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _showInputError = (formElement, inputElement, errorMessage, classInputError, inputErrorVisible) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(classInputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(inputErrorVisible);
  };
  
  _hideInputError = (formElement, inputElement, classInputError, inputErrorVisible) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(classInputError);
    errorElement.classList.remove(inputErrorVisible);
    errorElement.textContent = 'Ок';
  };
  
  _checkInputValidity = (formElement, inputElement, classInputError, inputErrorVisible) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, classInputError, inputErrorVisible);
    } else {
      this._hideInputError(formElement, inputElement, classInputError, inputErrorVisible);
    };
  };

  enableValidation() {
    const classInput = this._validationData.inputSelector;
    const classButtonSubmit = this._validationData.submitButtonSelector;
    const classButtonSubmitInactiv = this._validationData.inactiveButtonClass;
    const classInputError = this._validationData.inputErrorClass;
    const inputErrorVisible = this._validationData.errorClass;

    this._setEventListeners(this._elementValidation, classInput, classButtonSubmit, classButtonSubmitInactiv, classInputError, inputErrorVisible);
  };
};