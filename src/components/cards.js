export function createCard(
  cardData,
  onDeleteButtonClick,
  openModal,
  closeModal,
  popupElements
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

  cardImage.addEventListener("click", function (evt) {
    openModal(popupElements.popupImage);

    popupElements.imageInPopup.src = cardData.link;
    popupElements.imageInPopup.alt = cardData.name;
    popupElements.popupCaption.textContent = cardData.name;

    popupElements.closeButtonInImage.addEventListener("click", function (evt) {
      closeModal(popupElements.popupImage);
    });
  });

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
