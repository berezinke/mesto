export default class UserInfo {
    constructor(nameCh, infoCh) {
      this._name = nameCh;
      this._profeccion = infoCh;
    };
    
    getUserInfo() {
      const nameCusto = document.querySelector(this._name).textContent.trim();
      const profeccionCusto = document.querySelector(this._profeccion).textContent.trim();
      return [ nameCusto, profeccionCusto ];
    };
  
    setUserInfo(newName, newProfeccion) {
      document.querySelector(this._name).textContent = newName.trim();
      document.querySelector(this._profeccion).textContent = newProfeccion.trim();
    };
  
    getCardInfo() {
      const nameCusto = document.querySelector(this._name).value.trim();
      const profeccionCusto = document.querySelector(this._profeccion).value.trim();
      return [ nameCusto, profeccionCusto ];
    };
};