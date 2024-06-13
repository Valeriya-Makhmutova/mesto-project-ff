function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function isMyLikeHere(likes, userId) {
  //[{}, {}]
  if (likes.length === 0) {
    return false;
  } else {
    return likes.some((like) => {
      return like._id === userId;
    });
  }
}
