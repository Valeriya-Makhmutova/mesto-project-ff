import { request } from "./utils/utils.js";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-15",
  headers: {
    authorization: "de807bbf-6d89-4eb9-931a-1328bba52aaa",
    "Content-Type": "application/json",
  },
};

export const getInitialCards = () => {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
};

export const getUserInformation = () => {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  });
};

export const sendNewUserData = (name, description) => {
  return request(`${config.baseUrl}/users/me `, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description,
    }),
  });
};

export const sendNewCard = (name, link) => {
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
};

// должен срабатывать, если в попапе удаления карточки (который надо сначала сделать) нажать "да"
export const deleteThisCard = (cardId) => {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

//добавление лайка
export const addLike = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
};

//снятие лайка
export const removeLike = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const changeAvatar = (avatarUrl) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  });
};
