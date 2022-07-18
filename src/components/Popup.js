export default class Popup {
  constructor(popupSelector) {
    this._popUp = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  };

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popUp.classList.add('popup_opened');
  };

  close() {
    this._popUp.classList.remove('popup_opened');
    document.removeEventListener('keydown',this._handleEscClose);
  };

  setEventListeners() {
    
    this._popUp.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__nosave-image')) {
        this.close();
      };
    });
  };
};