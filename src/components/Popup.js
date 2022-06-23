export default class Popup {
  constructor(popupSelector) {
    this._popUp = document.querySelector(popupSelector);
  };

  _setListenKeydown() { // закрытие pop по esc
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      };      
    }, { once: true });
  };

  close() {
    this._popUp.classList.remove('popup_opened');
  };

  setEventListeners() {
    this._popUp.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__nosave-image')) {
        this.close();
      };
    });
  };
};