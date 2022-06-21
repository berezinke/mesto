export function openPopUp(popUp) {
    popUp.classList.add('popup_opened');
    addEventListener('keydown', listenKeydown);
 };
export function closePopUp(popUp) {
    removeEventListener('keydown', listenKeydown);
    popUp.classList.remove('popup_opened');
 };
function listenKeydown(evt) {
    if (evt.key === 'Escape') {
       const popOpen = document.querySelector('.popup_opened');
       closePopUp(popOpen);
    };   
};