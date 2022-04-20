let popupStyles = document.querySelector('.popup');
let objectNameChange = document.querySelector('#change-name');
let objectProfeccionChange = document.querySelector('#change-profeccion');

// Редактирование в попАп
function popUpOpened() {
    popupStyles.classList.add('popup_opened');
};
function popUpClosed() {
    popupStyles.classList.remove('popup_opened');
};
document.querySelector('#button_edit').addEventListener('click', function() {
    popUpOpened();
    objectNameChange.value = document.querySelector('#nameScientist').textContent.trim();
    objectProfeccionChange.value = document.querySelector('#profeccionScientist').textContent.trim();
});
document.querySelector('#button_NoSave').addEventListener('click', popUpClosed);
document.querySelector('#ButtonSubmit').addEventListener('click', function() {
    event.preventDefault();
    document.querySelector('#nameScientist').textContent = objectNameChange.value;
    document.querySelector('#profeccionScientist').textContent = objectProfeccionChange.value;
    popUpClosed();
});
// Конец редактирования в попАп

// Выделение понравившихся
let arrPictures = document.querySelectorAll('.element__button-liked');
function isLiked () {
    for (let i = 0; i < arrPictures.length; i++) {
        arrPictures[i].addEventListener('click', function() {
            arrPictures[i].classList.toggle('element__button-liked_activ')});
    };
}
isLiked();
// Конец выделения понравившихся