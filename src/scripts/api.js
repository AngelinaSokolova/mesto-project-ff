const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-11',
    headers: {
      authorization: '4afc581c-a6f2-4c12-9747-aa794c01eeb9',
      'Content-Type': 'application/json'
    }
  }
  
  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  } 
  
  async function getUser() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then((res) => checkResponse(res))
  }
  
  async function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then((res) => checkResponse(res))
  }
  
  async function postUser(title, descr) {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
       body: JSON.stringify({
        name: title,
        about: descr
      })
    })
    .then((res) => checkResponse(res))
  }
  
  async function postCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
       body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res) => checkResponse(res))
  }
  
  async function deleteCardApi(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then((res) => checkResponse(res))
  }
  
  async function putLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
    })
    .then((res) => checkResponse(res))
  }
  
  async function deleteLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then((res) => checkResponse(res))
  }
  
  async function patchUser(url) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: url
      })
    })
    .then((res) => checkResponse(res))
  }
  
  export {getUser, getCards, postUser, postCard, deleteCardApi, putLike, deleteLike, patchUser};