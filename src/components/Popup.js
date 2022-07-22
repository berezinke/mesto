export default class Popup {
  constructor(popupSelector) {
    this._popUp = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleDownClose = this._handleDownClose.bind(this);

    this._form = this._popUp.querySelector('.profile-change');
    this._textButton = this._popUp.querySelector('.profile-change__submit');
    this._mesto = this;
    this._arrayFieldInput = this._popUp.querySelectorAll('.profile-change__input');
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  };

  _handleDownClose(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__nosave-image')) {
      this.close();
    };
  };
  
  _getInputValues() {
    this._formValues = {};
    this._arrayFieldInput.forEach(input => this._formValues[input.name] = input.value);
    
    return this._formValues;
  };

  open() {
    this._popUp.classList.add('popup_opened');
    
  };

  close() {
    this._popUp.classList.remove('popup_opened');
  };

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popUp.addEventListener('click', this._handleDownClose);
  };

  setEventListenersForForm() {
    this.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._old = this._textButton.textContent;
      this._textButton.textContent = 'Сохранение...';
             
      if (!this._mesto._handleFormSubmit(this._getInputValues())) {
        this.close();
        this._textButton.textContent = this._old;
      } else {
        alert('Error')
      };
    });
  };
}