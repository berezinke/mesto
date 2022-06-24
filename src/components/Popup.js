export default class Popup {
  constructor(popupSelector) {
    this._popUp = document.querySelector(popupSelector);
  };

  _handleEscClose() {(evt) => {
    if (evt.key === 'Escape') {
      this.close();
    };
  }};

  _setListenKeydown() { // закрытие pop по esc
    document.addEventListener('keydown', this._handleEscClose());
  };

  open() {
    this._setListenKeydown();
    this._popUp.classList.add('popup_opened');
  };

  close() {
    this._popUp.classList.remove('popup_opened');
    document.removeEventListener('keydown',this._handleEscClose());
  };

  setEventListeners() {
    this._popUp.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__nosave-image')) {
        this.close();
      };
    });
  };
};