import Popup from './popup.js';
export default class PopupIsDelete extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;

      this._form = this._popUp.querySelector('.profile-change');
      this._textButton = this._popUp.querySelector('.profile-change__submit');
      this._mesto = this;
    };

    open(objInside, elementInside) {
      super.open();
      this._objInside = objInside;
      this._elementInside = elementInside;
    }

    setEventListeners() {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
  
        this._old = this._textButton.textContent;
        this._textButton.textContent = 'Удаление...';
               
        this._mesto._handleFormSubmit(this._objInside, this._elementInside)
        .then(() => {this.close()}) 
        .catch((err) => {
          console.log('Ошибка. Запрос на удаление не выполнен: ', err);
        })
        .finally(() => {this._textButton.textContent = this._old
        });
      });
    };
};