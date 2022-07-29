import Popup from './popup.js';
export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;

      this._form = this._popUp.querySelector('.profile-change');
      this._textButton = this._popUp.querySelector('.profile-change__submit');
      this._mesto = this;
      this._arrayFieldInput = this._popUp.querySelectorAll('.profile-change__input');
      this._formValues = {};
    };

    _getInputValues() {
      const objFormValues = {};
      this._arrayFieldInput.forEach(input => objFormValues[input.name] = input.value);
      
      return objFormValues;
    };

    setInputValues(arrData) {
      this._arrayFieldInput.forEach((input) => {
        input.value = arrData[input.name]
      })
    };
    
    close() {
      super.close();
      this._form.reset();
    };

    setEventListeners() {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
  
        this._old = this._textButton.textContent;
        this._textButton.textContent = 'Сохранение...';
        this._formValues = this._getInputValues(); 
        this._mesto._handleFormSubmit(this._formValues)
        .then(() => {
          this.close();          
        }) 
        .catch((err) => {
          console.log('Ошибка. Запрос на запись информации не выполнен: ', err);
        })
        .finally(() => {this._textButton.textContent = this._old
        })
      });
    };
  }