import './pages/index.css'; // импорт главного файла стилей
import { openPopup, closePopup, handleEscKey, handleOverlayClick } from './scripts/modal.js';
import { createCard, deleteButtonClickHandler, handleLikeButtonClick } from './scripts/card.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getUserInfo, getCardsFromServer, updateUserInfo, addCardToServer, updateUserAvatar, deleteCard } from './scripts/api.js';

const editProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const editProfileformElement = editProfilePopup.querySelector('.popup__form');
const nameInput = editProfileformElement.querySelector('.popup__input_type_name');
const jobInput = editProfileformElement.querySelector('.popup__input_type_description');
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
const cardAddForm = document.forms["new-place"];
const profileEditForm = document.forms["edit-profile"];
const profileAvatarEditForm = document.forms["edit-avatar"];

// Редактирование аватара
const profileImage = document.querySelector('.profile__image');
const formEditAvatar = document.querySelector('.popup__form[name="edit-avatar"]');
const avatarInput = formEditAvatar.querySelector('.popup__input_type_url');
const buttonSubmitAvatar = formEditAvatar.querySelector('.popup__button');
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

let userId;

// Вызов валидации
enableValidation(validationSettings);

// Функция для изменения текста кнопки во время загрузки на "Сохранение..."
function setButtonLoading(button, isLoading) {
  const defaultText = button.getAttribute('data-default-text');
  const loadingText = button.getAttribute('data-loading');
  if (isLoading) {
    button.textContent = loadingText;
    button.disabled = true;
  } else {
    button.textContent = defaultText;
    button.disabled = false;
  }
}

// Функция отправки формы редактирования профиля
function editProfileFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное действие формы
  const submitButtonElement = profileEditForm.querySelector(".popup__button");
  setButtonLoading(submitButtonElement, true); // Устанавливаем текст кнопки на "Сохранение..."
  const name = nameInput.value; 
  const description = jobInput.value;
  // Обновляем данные пользователя на сервере
  updateUserInfo(name, description)
    .then((userInfo) => {
      // Обновляем значения на странице только после успешного обновления на сервере
      profileTitle.textContent = userInfo.name;   
      profileDescription.textContent = userInfo.about;  
      closePopup(editProfilePopup);
    })
    .catch(err => console.log(`Ошибка при обновлении данных пользователя: ${err}`))
    .finally(() => {
      setButtonLoading(submitButtonElement, false); // Изменяем текст кнопки обратно на "Сохранить" и разблокируем её
  }); 
}

// Функция отправки формы добавления новой карточки
function addNewCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButtonElement = cardAddForm.querySelector(".popup__button");
  setButtonLoading(submitButtonElement, true);
  const placeName = newCardNameInput.value;
  const placeLink = newCardLinkInput.value;
  addCardToServer(placeName, placeLink)
    .then((newCard) => {
      // Добавление карточки на страницу после успешного ответа сервера
      addCard(newCard, userId, openImage, handleLikeButtonClick, deleteButtonClickHandler );
      closePopup(newCardPopup);
      newCardForm.reset();
    })
    .catch(err => console.log(`Ошибка при добавлении карточки: ${err}`))
    .finally(() => {
      setButtonLoading(submitButtonElement, false); 
  }); 
}

// Функция отправки формы редактирования аватара
function handleFormEditAvatarSubmit(evt) {
  evt.preventDefault();
  const submitButtonElement = profileAvatarEditForm.querySelector(".popup__button");
  setButtonLoading(submitButtonElement, true); 
  updateUserAvatar(avatarInput.value)
    .then(result => {
      closePopup(editAvatarPopup);
      profileImage.style.backgroundImage = `url('${result.avatar}')`;
    })
    .catch(err => console.log(`Ошибка при редактировании аватара: ${err}`))
    .finally(() => {
      setButtonLoading(submitButtonElement, false); 
  }); 
}

// Функция вывода картинки в режим просмотра
function openImage(imageLink, imageAlt) {
  if (imageSrc) {
    imageSrc.src = imageLink;
    imageSrc.alt = imageAlt;
    imageCaption.textContent = imageAlt;
    openPopup(imagePopup);
  } else {
    console.error('Элемент не найден');
  }
}
// Функция добавления новой карточки
function addCard(card, userId, openImage, handleLikeButtonClick, deleteButtonClickHandler ) {
  const cardElement = createCard(card, userId, openImage, handleLikeButtonClick, deleteButtonClickHandler );
  cardContainer.prepend(cardElement);
}

// Функция установки данных пользователя
function setUserData(userData) {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
  userId = userData._id; // Присваиваем userId после получения данных пользователя
}

// Функция установки карточек
function setUserCards(cards) {
  cards.forEach(card => {
    addCard(card, userId, openImage, handleLikeButtonClick, deleteButtonClickHandler) ;
  });
}

// Обработчик отправки формы редактирования профиля
editProfileformElement.addEventListener('submit', (evt) => {
  editProfileFormSubmit(evt);
  clearValidation(editProfileformElement, validationSettings);
});

// Обработчик отправки формы добавления новой карточки
newCardForm.addEventListener('submit', (evt) => {
  addNewCardFormSubmit(evt);
  clearValidation(newCardForm, validationSettings);
});

// Обработчик закрытия попапов
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
     const popup = button.closest('.popup');
     closePopup(popup);
   });
 });

// Отслеживает нажатие кнопки "Создание новой карточки"
addButton.addEventListener('click', () => {
  clearValidation(newCardForm, validationSettings);
  openPopup(newCardPopup);
});

// Отслеживает нажатие кнопки "Редактировать профиль"
editProfileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editProfileformElement, validationSettings);
  openPopup(editProfilePopup);
});

// Обработка изменения аватара
function addEditAvatarPopup() {
  profileImage.addEventListener('click', () => {
    formEditAvatar.reset();
    clearValidation(formEditAvatar, validationSettings);
    openPopup(editAvatarPopup);
  });
  formEditAvatar.addEventListener('submit', handleFormEditAvatarSubmit);
}

// Обработчик события изменения аватара
editAvatarPopup.addEventListener('click', handleOverlayClick);
addEditAvatarPopup();

// Функция инициализации пользователя и карточек
const initializeUserAndCards = () => {
  Promise.all([getUserInfo(), getCardsFromServer()])
    .then(([userData, cards]) => {
      setUserData(userData);
      setUserCards(cards);
    })
    .catch(err => {
      console.error('Ошибка при загрузке данных:', err);
    });
};

// Вызов функции инициализации
initializeUserAndCards();
