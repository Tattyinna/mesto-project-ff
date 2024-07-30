import './pages/index.css'; // импорт главного файла стилей
import { initialCards } from './scripts/cards.js'; // импорт массива карточек
import { openPopup, closePopup, handleEscKey, handleOverlayClick} from './scripts/modal.js'; // импорт работы модальных окон
import {createCard, handleDelete, handleLike } from './scripts/card.js';

const editProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const formElement = editProfilePopup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newCardPopup.querySelector('.popup__form');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const newCardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const newCardLinkInput = newCardForm.querySelector('.popup__input_type_url');
const imagePopup = document.querySelector('.popup_type_image');
const openImagePopup = document.querySelector('.popup__content_content_image');
const imageSrc = openImagePopup.querySelector('.popup__image');
const imageCaption = openImagePopup.querySelector('.popup__caption');
const cardContainer = document.querySelector(".places__list");

// Функция формы данных пользователя
function editProfileFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное действие формы
  const name = nameInput.value;   // Получаем значения из полей формы
  const description = jobInput.value;  // Получаем значения из полей формы
  profileTitle.textContent = name;   // Обновляем значения на странице
  profileDescription.textContent = description;  // Обновляем значения на странице
  closePopup(editProfilePopup);
}

// Функция формы ввода данных новой карточки
function addNewCardFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное действие формы
  const placeName = newCardNameInput.value;   // Получаем значения из полей формы
  const placeLink = newCardLinkInput.value;  // Получаем значения из полей формы
  addCard(placeName, placeLink, openImage, handleDelete, handleLike);
  closePopup(newCardPopup);
  newCardForm.reset();
}

// Добавление заранее созданных карточек
initialCards.forEach(card => addCard(card.name, card.link, openImage, handleDelete, handleLike));

// Обработчик отправки формы данных пользователя
formElement.addEventListener('submit', editProfileFormSubmit);

// Обработчик отправки формы ввода данных новой карточки
newCardForm.addEventListener('submit', addNewCardFormSubmit);

// Обработчик закрытия попапов
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
     const popup = button.closest('.popup');
     closePopup(popup);
   });
 });

  // Отслеживает нажатие кнопки "Создание новой карточки"
addButton.addEventListener('click', () => {
    openPopup(newCardPopup);
  });
  
  // Отслеживает нажатие кнопки "Редактировать профиль"
  editProfileButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(editProfilePopup);
  });

// Функция вывода картинки в режим просмотра
function openImage(imageLink, imageAlt) {
  imageSrc.src = imageLink;
  imageSrc.alt = imageAlt;
  imageCaption.textContent = imageAlt;
  openPopup(imagePopup);
}

// Функция добавления новой карточки
function addCard(name, link, openImage, handleDelete, handleLike) {
  const cardElement = createCard(name, link, openImage, handleDelete, handleLike);
  cardContainer.prepend(cardElement);
}


