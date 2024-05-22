export function createCard(
  cardData,
  onDeleteButtonClick,
  handleOpenImagePopup
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    onDeleteButtonClick(cardElement);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", handleLikeIsActive);

  cardImage.addEventListener("click", () => handleOpenImagePopup(cardData.name, cardData.link));

  return cardElement;
}

export function deleteCard(card) {
  card.remove();
}

function handleLikeIsActive(evt) {
  evt.stopPropagation();
  // classList.toggle() помогает "включить" или "выключить" класс
  evt.target.classList.toggle("card__like-button_is-active");
}
