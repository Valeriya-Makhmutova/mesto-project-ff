export function createCard(configCreateCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");
  const cardUserId = configCreateCard.cardData.cardUserId;
  const cardId = configCreateCard.cardData.cardId;
  const likeButton = cardElement.querySelector(".card__like-button");

  const deleteIcon = cardElement.querySelector(".card__delete-button");
  // const handleOpendeltePopup = configCreateCard.openPopupDeleteCard;
  const onDeleteCard = configCreateCard.onDeleteCard;
  // const closeModal = configCreateCard.closeModal;
  const addLike = configCreateCard.addLike;
  const removeLike = configCreateCard.removeLike;
  const isMyLikeHere = configCreateCard.isMyLikeHere;
  const handleDeleteCardSubmit = configCreateCard.handleDeleteCardSubmit;
  const formDeleteCard = configCreateCard.formDeleteCard;

  // deleteIcon.addEventListener("click", handleOpendeltePopup);
  deleteIcon.addEventListener("click", () => {
    onDeleteCard(cardId, cardElement);
  });

  cardImage.src = configCreateCard.cardData.link;
  cardImage.alt = configCreateCard.cardData.name;

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = configCreateCard.cardData.name;

  if (isMyLikeHere) {
    if (
      isMyLikeHere(configCreateCard.cardData.likesData, configCreateCard.userId)
    ) {
      likeButton.classList.add("card__like-button_is-active");
    }
  }

  likeButton.addEventListener("click", (evt) => {
    evt.stopPropagation();

    if (!evt.target.classList.contains("card__like-button_is-active")) {
      addLike(cardId)
        .then((cardData) => {
          cardLikeCounter.textContent = cardData.likes.length;
          evt.target.classList.add("card__like-button_is-active");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      removeLike(cardId)
        .then((cardData) => {
          evt.target.classList.remove("card__like-button_is-active");
          if (cardData.likes.length) {
            cardLikeCounter.textContent = cardData.likes.length;
          } else {
            cardLikeCounter.textContent = "";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  cardImage.addEventListener("click", () => {
    configCreateCard.handleOpenImagePopup(
      configCreateCard.cardData.name,
      configCreateCard.cardData.link
    );
  });

  if (configCreateCard.cardData.likeCount) {
    cardLikeCounter.textContent = configCreateCard.cardData.likeCount;
  }

  // const deleteThisCard = configCreateCard.requestForDelete;

  if (cardUserId !== configCreateCard.userId) {
    deleteIcon.style.display = "none";
  } else {
    formDeleteCard.addEventListener("submit", handleDeleteCardSubmit);
  }
  return cardElement;
}
