import { putCardLike, deleteCardLike } from "../scripts/api.js";
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(
  card,
  userId,
  openImage,
  likeButtonClickHandler,
  deleteButtonClickHandler
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = `Фотография ${card.name}`;
  cardImage.addEventListener("click", () => openImage(card.link, card.name));

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = card.name;

  const likeButton = cardElement.querySelector(".card__like-button");
  const likesCount = cardElement.querySelector(".card__likes-count");
  renderLikesCount(likesCount, card.likes.length);
  likeButton.addEventListener("click", (evt) => {
    likeButtonClickHandler(evt, card._id, likesCount);
  });

  if (card.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (card.owner._id !== userId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.addEventListener("click", () =>
      deleteButtonClickHandler(card._id, cardElement));
  }

  return cardElement;
}

export function handleLikeButtonClick(evt, cardId, likesCountElement) {
  const likeMethod = isCardLiked(evt.target) ? deleteCardLike : putCardLike;
  likeMethod(cardId)
    .then((res) => {
      renderLikesCount(likesCountElement, res.likes.length);
      evt.target.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => console.log(err));
}

function isCardLiked(buttonElement) {
  return buttonElement.classList.contains("card__like-button_is-active");
}

function renderLikesCount(likesCountElement, likesCount) {
  likesCountElement.textContent = likesCount;
}
