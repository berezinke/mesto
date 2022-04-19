let button_changeData = document.querySelector('#button_edit');
let button_NochangeData = document.querySelector('#button_NoSave');
let popup_styles = document.querySelector('.popup');

let object_name = document.querySelector('#nameScientist');
let object_profeccion = document.querySelector('#profeccionScientist');
let nameInput = object_name.textContent.trim();
let jobInput = object_profeccion.textContent.trim();

let object_name_change = document.querySelector('#change-name');
let object_profeccion_change = document.querySelector('#change-profeccion');
let button_submit = document.querySelector('#ButtonSubmit');

button_changeData.onclick = function() {
    popup_styles.classList.add('popup_opened');
    object_name_change.value = nameInput;
    object_profeccion_change.value = jobInput;
};
button_NochangeData.onclick = function() {
    popup_styles.classList.remove('popup_opened');
};
button_submit.onclick = function() {
    event.preventDefault();
    object_name.textContent = object_name_change.value;
    object_profeccion.textContent = object_profeccion_change.value;
    nameInput = object_name.textContent;
    jobInput = object_profeccion.textContent;
    popup_styles.classList.remove('popup_opened');
}

let button_likedFirst = document.querySelector('#button_like_first');
let isLiked_first = false;
button_likedFirst.onclick = function() {
    isLiked_first = !isLiked_first;
    button_likedFirst.classList.toggle('element__button-liked_black');
};

let button_likedSecond = document.querySelector('#button_like_second');
let isLiked_Second = false;
button_likedSecond.onclick = function() {
    isLiked_Second = !isLiked_Second;
    button_likedSecond.classList.toggle('element__button-liked_black');
};

let button_likedThird = document.querySelector('#button_like_third');
let isLiked_Third = false;
button_likedThird.onclick = function() {
    isLiked_Third = !isLiked_Third;
    button_likedThird.classList.toggle('element__button-liked_black');
};

let button_likedForth = document.querySelector('#button_like_forth');
let isLiked_Forth = false;
button_likedForth.onclick = function() {
    isLiked_Forth = !isLiked_Forth;
    button_likedForth.classList.toggle('element__button-liked_black');
};

let button_likedFifth = document.querySelector('#button_like_fifth');
let isLiked_Fifth = false;
button_likedFifth.onclick = function() {
    isLiked_Fifth = !isLiked_Fifth;
    button_likedFifth.classList.toggle('element__button-liked_black');
};

let button_likedSixth = document.querySelector('#button_like_sixth');
let isLiked_Sixth = false;
button_likedSixth.onclick = function() {
    isLiked_Sixth = !isLiked_Sixth;
    button_likedSixth.classList.toggle('element__button-liked_black');
};