export function createCard(cardData, onDeleteButtonClick) {
  const cardTemplate = document.querySelector("#card-template").content;
  const name = cardData.name;
  const link = cardData.link;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").setAttribute("src", `${link}`);
  cardElement.querySelector(".card__image").setAttribute("alt", `${name}`);

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.insertAdjacentText("afterbegin", `${name}`);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    onDeleteButtonClick(cardElement);
  });
  return cardElement;
}

export function deleteCard(card) {
  card.remove();
}

export function handleLikeIsActive(evt) {
  evt.stopPropagation();

  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.contains("card__like-button_is-active")
      ? evt.target.classList.remove("card__like-button_is-active")
      : evt.target.classList.add("card__like-button_is-active");
  }
}
