export default class UserInfo {
    constructor(nameCh, infoCh) {
      this._name = document.querySelector(nameCh);
      this._profeccion = document.querySelector(infoCh);
    };
    
    getUserInfo() {
      const nameCusto = this._name.textContent.trim();
      const profeccionCusto = this._profeccion.textContent.trim();
      return { name: nameCusto, profession: profeccionCusto };
    };
  
    setUserInfo(newName, newProfeccion) {
      this._name.textContent = newName.trim();
      this._profeccion.textContent = newProfeccion.trim();
    };
};