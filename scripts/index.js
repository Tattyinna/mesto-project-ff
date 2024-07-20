// @todo: Темплейт карточки
 
// @todo: DOM узлы
const cardTemplate = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData, handleDelete) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;

  cardElement.querySelector(".card__delete-button").addEventListener("click", handleDelete);

  return cardElement;
}

// @todo: Функция удаления карточки
function handleDelete(event) {
  event.target.closest(".card").remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, handleDelete);
  cardContainer.append(cardElement);
});
