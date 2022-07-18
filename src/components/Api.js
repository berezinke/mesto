export default class Api {
  constructor(pathToAuthor, pathToCard, miToken, objAuthor, objCard, objAvatar) {
    this._pathToAuthor = pathToAuthor;
    this._pathToCard = pathToCard;
    this._authorization = miToken;
    this._pathToAvatar = pathToAuthor + '/avatar';
    
    this._oldValueText = '';
    this._objAuthor = objAuthor;
    this._objCard = objCard;
    this._objAvatar = objAvatar;    
  };

  // Запись и обратно
  _waitInfo(pop) {
    this._textButton = pop.querySelector('.profile-change__submit');
    this._oldValueText = this._textButton.textContent;
    this._textButton.textContent = 'Сохранение...';
  }
  _waitFinish() {
    this._textButton.textContent = this._oldValueText;
  }
  _isDone(res) {
    if (res.ok) {
      return res.json();
    }
    // console.log(res)
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получение информации о карточках
  getInitCard() {
    return fetch(this._pathToCard, {
      headers: {
        authorization: this._authorization
      }
    }).then((res) => {
      return this._isDone(res)
    })
  };
  
  // Получение иформации об авторе
  getAuthorInfo() {
    return fetch(this._pathToAuthor, {
      headers: {
        authorization: this._authorization
      }
    }).then((res) => {
      return this._isDone(res)
   })
  };

  // Отправка информации об авторе на сервер
  setAuthorInfo({newName, newAbout}) {
    this._waitInfo(this._objAuthor);
    return fetch(this._pathToAuthor, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: newName, about: newAbout})
    }).then((res) => {
      return this._isDone(res)
   }).catch((err) => {
      console.log('Ошибка. Запрос на запись информации об авторе не выполнен: ', err);
    }).finally(() => {
      this._waitFinish()
    })
  };

  // Добавление карточки на сервер
  addCardToServer({name, link}) {
    this._waitInfo(this._objCard);
    return fetch(this._pathToCard, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, link})
    }).then((res) => {
      this._waitFinish();
      return this._isDone(res)
   })
  };

  // Удаление карточки с сервера
  deleteCardFromServer(idCard) {
    const pathToOneCard = this._pathToCard + '/' + idCard
    return fetch(pathToOneCard, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      return this._isDone(res)
    })
  };
  // Постановка лайка на карточку
  putLikeToCard(idCard) {
    const pathToOneCard = this._pathToCard + '/' + idCard + '/likes'
    
    return fetch(pathToOneCard, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      return this._isDone(res)
    })
  };
  // Снятие лайка с карточки
  putoffLikeFromCard(idCard) {
    const pathToOneCard = this._pathToCard + '/' + idCard + '/likes'
    
    return fetch(pathToOneCard, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      return this._isDone(res)
    })
  };
  // Отправка информации об аватаре на сервер
  setAuthorAvatar({avatar}) {
    this._waitInfo(this._objAvatar);
    // console.log(this._pathToAvatar);
   
    return fetch(this._pathToAvatar, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({avatar})
    }).then((res) => {
      this._waitFinish();
      return this._isDone(res)
   })
  };
};