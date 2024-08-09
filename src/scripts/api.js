const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-19', // когорта
    headers: {
      authorization: '878cfee3-5ec1-4b30-9e7b-65970d5d34eb', // токен
      'Content-Type': 'application/json'
    }
  };
  
//Проверка запроса
const checkRequest = (res) => {
  if (res.ok) {
    return res.json()
  } 
  else {
    return Promise.reject(`Ошибка: ${res.status}`)
  };
};    

//Загрузка данных о пользователе
export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(checkRequest)
  .catch(err => {
    console.error('Ошибка:', err);
});
};

// Загрузка карточек с сервера
export function getCardsFromServer() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(checkRequest)
  .catch(err => {
    console.error('Ошибка:', err);
  });
};

// Обновление данных пользователя
export function updateUserInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: '878cfee3-5ec1-4b30-9e7b-65970d5d34eb', // токен
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about,
    })
  })
  .then(checkRequest)
  .catch(err => {
    console.error('Ошибка при обновлении данных пользователя:', err);
  });
};

// Добавление новой карточки
export function addCardToServer(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: '878cfee3-5ec1-4b30-9e7b-65970d5d34eb',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(checkRequest)
  .catch(err => {
    console.error('Ошибка при добавлении карточки:', err);
  });
};

//Редактирование аватара на сервере
export function updateUserAvatar(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then(checkRequest)
  .catch(err => {
    console.error('Ошибка при обновлении аватара:', err);
  });
};

// Удаление карточки
export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) =>
    checkRequest(res, "Ошибка при удалении карточки пользователя")
  );
}

// Постановка лайка
export function putCardLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
  .then((res) => checkRequest(res, "Ошибка при лайке карточки"));
}

// Удаление лайка
export function deleteCardLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then((res) =>checkRequest(res, "Ошибка при дизлайке карточки")
  );
}