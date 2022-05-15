function enableValidation(validationObject) {
  const formList = Array.from(document.querySelectorAll(validationObject.formSelector));
  const classInput = validationObject.inputSelector;
  const classButtonSubmit = validationObject.submitButtonSelector;
  const classButtonSubmitInactiv = validationObject.inactiveButtonClass;
  const classInputError = validationObject.inputErrorClass;
  const inputErrorVisible = validationObject.errorClass;

  formList.forEach((formElement) => {
    setEventListeners(formElement, classInput, classButtonSubmit, classButtonSubmitInactiv, classInputError, inputErrorVisible);
  });
};

function setEventListeners(formElement, classInput, classButtonSubmit, classButtonSubmitInactiv, classInputError, inputErrorVisible) {
  const inputList = Array.from(formElement.querySelectorAll(classInput));
  const buttonElement = formElement.querySelector(classButtonSubmit);
  toggleButtonState(inputList, buttonElement, classButtonSubmitInactiv);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, classInputError, inputErrorVisible);
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, classInputError, inputErrorVisible);
      toggleButtonState(inputList, buttonElement, classButtonSubmitInactiv);
    });
  });
};

function disabledButton(buttonElement, classButtonSubmitInactiv) {
  buttonElement.classList.add(classButtonSubmitInactiv);
  buttonElement.setAttribute('disabled', true);
}

function toggleButtonState(inputList, buttonElement, classButtonSubmitInactiv) {
  if (hasInvalidInput(inputList)) {
    disabledButton(buttonElement, classButtonSubmitInactiv);
  }  else {
    buttonElement.classList.remove(classButtonSubmitInactiv);
    buttonElement.removeAttribute('disabled');
  };
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const showInputError = (formElement, inputElement, errorMessage, classInputError, inputErrorVisible) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(classInputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(inputErrorVisible);
};

const hideInputError = (formElement, inputElement, classInputError, inputErrorVisible) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(classInputError);
  errorElement.classList.remove(inputErrorVisible);
  errorElement.textContent = 'Ок';
};

const checkInputValidity = (formElement, inputElement, classInputError, inputErrorVisible) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, classInputError, inputErrorVisible);
  } else {
    hideInputError(formElement, inputElement, classInputError, inputErrorVisible);
  }
};

enableValidation(validationObject);