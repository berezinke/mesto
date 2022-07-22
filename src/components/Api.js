export default class Api {
  // constructor(pathToAuthor, pathToCard, miToken, objAuthor, objCard, objAvatar) {
  constructor(pathToServer, headers) {
    this._pathToCard = `${pathToServer}/cards`;
    this._pathToAuthor = `${pathToServer}/users/me`;
    this._pathToAvatar = this._pathToAuthor + '/avatar';

    this._headers = headers;
  };

  // Запись и обратно
  _isDone(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получение информации о карточках
  getInitCard() {
    return fetch(this._pathToCard, {
      headers: this._headers
    }).then((res) => {
      return this._isDone(res)
    })
  };
  
  // Получение иформации об авторе
  getAuthorInfo() {
    return fetch(this._pathToAuthor, {
      headers: this._headers
    }).then((res) => {
      return this._isDone(res)
   })
  };

  // Отправка информации об авторе на сервер
  setAuthorInfo({newName, newAbout}) {
    
    return fetch(this._pathToAuthor, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name: newName, about: newAbout})
    }).then((res) => {
      return this._isDone(res)
   })
  };

  // Добавление карточки на сервер
  addCardToServer({name, link}) {
    
    return fetch(this._pathToCard, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, link})
    }).then((res) => {
      return this._isDone(res)
   })
  };

  // Удаление карточки с сервера
  deleteCardFromServer(idCard) {
    const pathToOneCard = this._pathToCard + '/' + idCard
    return fetch(pathToOneCard, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => {
      return this._isDone(res)
    })
  };
  // Постановка лайка на карточку
  putLikeToCard(idCard) {
    const pathToOneCard = this._pathToCard + '/' + idCard + '/likes'
    
    return fetch(pathToOneCard, {
      method: 'PUT',
      headers: this._headers
    }).then((res) => {
      return this._isDone(res)
    })
  };
  // Снятие лайка с карточки
  putoffLikeFromCard(idCard) {
    const pathToOneCard = this._pathToCard + '/' + idCard + '/likes'
    
    return fetch(pathToOneCard, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => {
      return this._isDone(res)
    })
  };
  // Отправка информации об аватаре на сервер
  setAuthorAvatar({avatar}) {
    
    // console.log(this._pathToAvatar);
   
    return fetch(this._pathToAvatar, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar})
    }).then((res) => {
      return this._isDone(res)
   })
  };
};