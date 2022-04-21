let popupStyles = document.querySelector('.popup');
let objectNameChange = document.querySelector('#change-name');
let objectProfeccionChange = document.querySelector('#change-profeccion');
let buttonEdit = document.querySelector('#button_edit');
let nameScInitial = document.querySelector('#nameScientist');
let profInitial = document.querySelector('#profeccionScientist');
let buttonNoSave = document.querySelector('#button_NoSave');
let formChange = document.querySelector('.profile-change');

// Редактирование в попАп
function popUpOpened() {
    popupStyles.classList.add('popup_opened');
};
function popUpClosed() {
    popupStyles.classList.remove('popup_opened');
};
buttonEdit.addEventListener('click', function() {
    popUpOpened();
    objectNameChange.value = nameScInitial.textContent.trim();
    objectProfeccionChange.value = profInitial.textContent.trim();
});
buttonNoSave.addEventListener('click', popUpClosed);

formChange.addEventListener('submit', function() {
    event.preventDefault();
    nameScInitial.textContent = objectNameChange.value;
    profInitial.textContent = objectProfeccionChange.value;
    popUpClosed();
});
// Конец редактирования в попАп

// Выделение понравившихся. 
// Я не могу это убрать, поскольку оно включает сердечки
let arrPictures = document.querySelectorAll('.element__button-liked');
function isLiked () {
    for (let i = 0; i < arrPictures.length; i++) {
        arrPictures[i].addEventListener('click', function() {
            arrPictures[i].classList.toggle('element__button-liked_activ')});
    };
}
isLiked();
// Конец выделения понравившихся