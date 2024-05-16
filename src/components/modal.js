import {
  popupEdit,
  popupNewCard,
  popupImage,
  nameInputEditForm,
  jobInputEditForm,
  profileTitle,
  profileDescription,
  nameInputNewCard,
  linkInputNewCard,
  cardsList,
} from "../index.js";

import { deleteCard } from "./cards";

const cardTemplate = document.querySelector("#card-template").content;

function pressEscEdit(event) {
  if (event.key === "Escape") {
    popupEdit.classList.remove("popup_is-opened");
  }
  event.target.removeEventListener("keydown", pressEscEdit);
}

function pressEscNewCard(event) {
  if (event.key === "Escape") {
    popupNewCard.classList.remove("popup_is-opened");
  }
  event.target.removeEventListener("keydown", pressEscNewCard);
}

function pressEscImage(event) {
  if (event.key === "Escape") {
    popupImage.classList.remove("popup_is-opened");
  }
  event.target.removeEventListener("keydown", pressEscImage);
}

export function openModal(elem) {
  elem.classList.add("popup_is-opened");

  if (elem.classList.contains("popup_type_edit")) {
    document.addEventListener("keydown", pressEscEdit);
  }
  if (elem.classList.contains("popup_type_new-card")) {
    document.addEventListener("keydown", pressEscNewCard);
  } else {
    document.addEventListener("keydown", pressEscImage);
  }
}

export function closeModal(elem) {
  elem.classList.remove("popup_is-opened");
}

// функция  обработчик отправки формы
export function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameData = nameInputEditForm.value;
  const jobData = jobInputEditForm.value;

  profileTitle.textContent = nameData;
  profileDescription.textContent = jobData;

  popupEdit.classList.remove("popup_is-opened");
}

// функция обработчик добавления карточки
export function handleAddingCard(evt) {
  evt.preventDefault();

  const nameData = nameInputNewCard.value;
  const linkData = linkInputNewCard.value;

  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").setAttribute("src", `${linkData}`);
  cardElement.querySelector(".card__image").setAttribute("alt", `${nameData}`);

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.insertAdjacentText("afterbegin", `${nameData}`);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  cardsList.prepend(cardElement);

  popupNewCard.classList.remove("popup_is-opened");

  nameInputNewCard.value = "";
  linkInputNewCard.value = "";
}
