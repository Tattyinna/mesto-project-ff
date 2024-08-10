const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-19", // когорта
  headers: {
    authorization: "878cfee3-5ec1-4b30-9e7b-65970d5d34eb", // токен
    "Content-Type": "application/json",
  },
};

//Проверка запроса
const checkRequest = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((error) => {
      return Promise.reject(`Ошибка ${res.status}: ${error.message|| 'Неизвестная ошибка'}`);
    });
  }
};

//Загрузка данных о пользователе
export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(checkRequest);
}
getUserInfo()
  .then((data) => {
    console.log("Данные пользователя:", data);
  })
  .catch((err) => {
    console.error("Ошибка:", err);
  });

// Загрузка карточек с сервера
export function getCardsFromServer() {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(checkRequest);
}
getCardsFromServer()
  .then((data) => {
    console.log("Карточки:", data);
  })
  .catch((err) => {
    console.error("Ошибка:", err);
  });

// Обновление данных пользователя
export function updateUserInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  }).then(checkRequest);
  }

// Добавление новой карточки
export function addCardToServer(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  }).then(checkRequest);
}

//Редактирование аватара на сервере
export function updateUserAvatar(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarLink }),
  }).then(checkRequest);
}

// Удаление карточки
export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkRequest);
}

// Постановка лайка
export function putCardLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkRequest);
}

// Удаление лайка
export function deleteCardLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkRequest);
}
