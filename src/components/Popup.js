export default class Popup {
  constructor(popupSelector) {
    this._popUp = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleDownClose = this._handleDownClose.bind(this);    
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

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popUp.addEventListener('click', this._handleDownClose);
    this._popUp.classList.add('popup_opened');
    
  };

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popUp.removeEventListener('click', this._handleDownClose);
    this._popUp.classList.remove('popup_opened');
  };
}