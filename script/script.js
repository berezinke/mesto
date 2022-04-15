let button_changeData = document.querySelector('#button_edit');
let button_likedFirst = document.querySelector('#button_like_first');
let button_NochangeData = document.querySelector('#button_NoSave');
let popup_styles = document.querySelector('.popup');

let object_name = document.querySelector('#nameScientist');
let object_profeccion = document.querySelector('#profeccionScientist');
let nameInput = object_name.textContent;
let jobInput = object_profeccion.textContent;

let object_name_change = document.querySelector('#change-name');
let object_profeccion_change = document.querySelector('#change-profeccion');
let button_sibmit = document.querySelector('#ButtonSubmit');

button_changeData.onclick = function() {
    popup_styles.classList.add('popup_opened');
    object_name_change.value = nameInput;
    object_profeccion_change.value = jobInput;
};
button_NochangeData.onclick = function() {
    popup_styles.classList.remove('popup_opened');
};
button_sibmit.onclick = function() {
    evt.preventDefault();
    object_name.textContent = object_name_change.value;
    object_profeccion.textContent = object_profeccion_change.value;
    nameInput = object_name.textContent;
    jobInput = object_profeccion.textContent;
}

button_likedFirst.onclick = function() {
    // console.log ('First clicked');
};


// function formSubmitHandler () {
   // evt.preventDefault();
   // object_name.textContent = object_name_change.value;
   // object_profeccion.textContent = object_profeccion_change.value;
   // console.log('5');
   // console.log(object_name.textContent);
   // console.log(object_profeccion.textContent);
// }
// ElementChanged.addEventListener('submit', formSubmitHandler);