export default class UserInfo {
    constructor(nameCh, infoCh, avatarCh) {
      this._name = document.querySelector(nameCh);
      this._profeccion = document.querySelector(infoCh);
      this._avatar = document.querySelector(avatarCh);
      // this._api = apiForServerInfo;
    };
    
    getUserInfo() {
      const nameCusto = this._name.textContent.trim();
      const profeccionCusto = this._profeccion.textContent.trim();
      
      return { nameK: nameCusto, profeccionK: profeccionCusto};
    };
  
    setUserInfo(objValues) {
      
      this._name.textContent = objValues.nameK;
      this._profeccion.textContent = objValues.profeccionK;
      if (objValues.avatarK) {
        this._avatar.src = objValues.avatarK;
      }      
    };
};