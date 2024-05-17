import { openModal, closeModal } from "./modal";

export function createCard(cardData, onDeleteButtonClick) {
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

  cardElement.addEventListener("click", function (evt) {
    const popupImage = document.querySelector(".popup_type_image");

    if (evt.target.classList.contains("card__image")) {
      const imageElement = evt.target;

      const imageInPopup = popupImage.querySelector(".popup__image");
      const popupCaption = popupImage.querySelector(".popup__caption");

      openModal(popupImage);

      const srcOfImage = imageElement.getAttribute("src");
      const altOfImage = imageElement.getAttribute("alt");

      imageInPopup.src = srcOfImage;
      popupCaption.textContent = altOfImage;
    }

    const closeButtonInImage = popupImage.querySelector(".popup__close");
    closeButtonInImage.addEventListener("click", function (evt) {
      closeModal(popupImage);
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
