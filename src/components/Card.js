export default class Card {
    constructor(elementArrCard, cardSelector, handleCardClick, owner, apiForServerInfo, handleTrashClick) {
      this._cardData = elementArrCard;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._owner = owner;
      this._idCard = elementArrCard.idCard;
      this._api = apiForServerInfo;
      this._handleTrashClick = handleTrashClick;
    };
    _getTemplate() {
      const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
      return cardElement;
    };

    _toggleLike(buttonLiked, idCardInside) {
      const isLiked = buttonLiked.classList.contains('element__button-liked_activ');
      
      if (isLiked) {
        this._api.putoffLikeFromCard(idCardInside)
        .then((res) => {
          this._buttonLiked.likeNumber.textContent = res.likes.length;
          buttonLiked.classList.toggle('element__button-liked_activ');
          return
        })
        .catch((err) => {
          console.log('Ошибка. Запрос на снятие лайка не выполнен: ', err);
        })  
      } else {
        this._api.putLikeToCard(idCardInside)
        .then((res) => {
          buttonLiked.classList.toggle('element__button-liked_activ');
          this._buttonLiked.likeNumber.textContent = res.likes.length;
          return
        })
        .catch((err) => {
          console.log('Ошибка. Запрос на постановку лайка не выполнен: ', err);
        })  
      }
    };

    trashElement(elementInside) {
      return this._api.deleteCardFromServer(elementInside.idCard)
      .then((res) => {
      this._element.remove();
      })
    };

    _setEventListeners() {
      // const objInside = this;
      const elementInside = this._element;
      const idCardInside = elementInside.idCard;

      this._buttonLiked.addEventListener('click', () => {
        this._toggleLike(this._buttonLiked, idCardInside);
      });
      if (!this._cardData.owner || this._cardData.owner._id == this._owner) {
        this._buttonTrash.addEventListener('click', () => {
          this._handleTrashClick(this, elementInside);
        });
        this._buttonTrash.classList.add('element__basura_activ');
      }
      
      this._buttonImage.addEventListener('click', () => {
        this._handleCardClick(elementInside);
      });
      /*this._buttonLiked.addEventListener('click', function() {
        objInside._toggleLike(objInside._buttonLiked, idCardInside);
      });
      if (!this._cardData.owner || this._cardData.owner._id == this._owner) {
        this._buttonTrash.addEventListener('click', () => {
          this._handleTrashClick(objInside, elementInside);
        });
        this._buttonTrash.classList.add('element__basura_activ');
      }
      
      this._buttonImage.addEventListener('click', () => {
        this._handleCardClick(elementInside);
      });*/
    };



    generateCard() {
      this._element = this._getTemplate();
      this._buttonImage = this._element.querySelector('.element__image');
      this._buttonTrash = this._element.querySelector('.element__basura');
      this._buttonImage.src = this._cardData.link;
      this._buttonImage.alt = this._cardData.name;
      this._element.querySelector('.element__info-text').textContent = this._cardData.name;      

      this._element.idCard = this._cardData._id;
      this._element.likes = this._cardData.likes;
      this._buttonLiked = this._element.querySelector('.element__button-liked');
      this._buttonLiked.likeNumber = this._element.querySelector('.element__likes-info');

      this._buttonLiked.likeNumber.textContent = this._element.likes.length;
      if (this._element.likes.find((element) => {
        return element._id == this._owner})) {
        this._buttonLiked.classList.add('element__button-liked_activ');
      }
      
      this._setEventListeners();
     
       return this._element;
    };
}