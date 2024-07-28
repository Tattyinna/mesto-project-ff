// Функция открытия попапа
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKey); // Добавляем обработчик нажатия клавиши Esc
  popup.addEventListener('click', handleOverlayClick); // Добавляем обработчик клика по оверлею
}
  
// Функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  popup.classList.add('popup_is-animated');
  document.removeEventListener('keydown', handleEscKey); // Удаляем обработчик нажатия клавиши Esc
  popup.removeEventListener('click', handleOverlayClick); // Удаляем обработчик клика по оверлею
}
  
// Функция для закрытия попапа при нажатии клавиши Esc
export function handleEscKey(event) {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-opened');
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}
  
// Функция для закрытия попапа по нажатию на оверлей
export function handleOverlayClick(event) {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target);
  }
}
  