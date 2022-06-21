export default class Popup {
  constructor(popupSelector) {
    this._popUp = document.querySelector(popupSelector);
  };

  open() {
    this._popUp.classList.add('popup_opened');
  };
  
  close() {
    this._popUp.classList.remove('popup_opened');
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
   };
  };

  setEventListeners() {
    this._popUp.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__nosave-image')) {
        this.close();
      };
    });
    this._popUp.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  };
};