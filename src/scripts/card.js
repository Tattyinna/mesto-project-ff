const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(name, link, openImage, handleDelete, handleLike) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', handleLike);
  
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;
  
    deleteButton.addEventListener('click', handleDelete);
    cardImage.addEventListener('click', () => openImage(link, name));
  
    return cardElement;
  }
  
// Функция удаления карточки
export function handleDelete(event) {
    event.target.closest(".card").remove();
  }
  
  // Функция обработки лайка
export function handleLike(event) {
    event.target.classList.toggle('card__like-button_is-active');
  }
  