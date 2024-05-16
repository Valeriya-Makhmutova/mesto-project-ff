import { initialCards } from "./cards.js";
import "./index.css";
import {
  createCard,
  deleteCard,
  handleLikeIsActive,
} from "./components/cards.js";
import {
  openModal,
  closeModal,
  handleFormSubmit,
  handleAddingCard,
} from "./components/modal.js";

export const cardsList = document.querySelector(".places__list");

initialCards.forEach((item) => {
  cardsList.append(createCard(item, deleteCard));
});
//initialCards - исходный массив с карточками
//.places__list - класс, куда должны попадать карточки

//     popupEdit                                                   модальное окно "редактировать профиль"

export const popupEdit = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const closeButtonInEdit = popupEdit.querySelector(".popup__close");

export const formEditElement = popupEdit.querySelector(".popup__form");

export const nameInputEditForm = formEditElement.querySelector(
  ".popup__input_type_name"
);
export const jobInputEditForm = formEditElement.querySelector(
  ".popup__input_type_description"
);

export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);

profileEditButton.addEventListener("click", function (evt) {
  //на кнопку редактировать добавили слушатель событий

  openModal(popupEdit);

  nameInputEditForm.value = profileTitle.textContent;
  jobInputEditForm.value = profileDescription.textContent;
});

closeButtonInEdit.addEventListener("click", function (evt) {
  closeModal(popupEdit);
  nameInputEditForm.value = "";
  jobInputEditForm.value = "";
});

popupEdit.addEventListener("click", function (evt) {
  evt.stopPropagation();
  if (evt.target === evt.currentTarget) {
    closeModal(popupEdit);
    nameInputEditForm.value = "";
    jobInputEditForm.value = "";
  }
});

formEditElement.addEventListener("submit", handleFormSubmit);

//  popupNewCard                                                   модальное окно "новое место"

export const popupNewCard = document.querySelector(".popup_type_new-card");
const profileAddButton = document.querySelector(".profile__add-button");
const closeButtonInNewCard = popupNewCard.querySelector(".popup__close");

const formAddCardElement = popupNewCard.querySelector(".popup__form");

export const nameInputNewCard = formAddCardElement.querySelector(
  ".popup__input_type_card-name"
);
export const linkInputNewCard = formAddCardElement.querySelector(
  ".popup__input_type_url"
);

profileAddButton.addEventListener("click", function (evt) {
  openModal(popupNewCard);
});

closeButtonInNewCard.addEventListener("click", function (evt) {
  // popupNewCard.classList.remove('popup_is-opened');
  closeModal(popupNewCard);
  nameInputNewCard.value = "";
  linkInputNewCard.value = "";
});

popupNewCard.addEventListener("click", function (evt) {
  evt.stopPropagation();
  if (evt.target === evt.currentTarget) {
    // popupNewCard.classList.remove('popup_is-opened');
    closeModal(popupNewCard);
    nameInputNewCard.value = "";
    linkInputNewCard.value = "";
  }
});

formAddCardElement.addEventListener("submit", handleAddingCard);

//   popupImage                                                      модальное окно "картинка карточки"

export const popupImage = document.querySelector(".popup_type_image");
const cardElements = document.querySelectorAll(".card");
const imageInPopup = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");
const closeButtonInImage = popupImage.querySelector(".popup__close");

cardElements.forEach((card) => {
  card.addEventListener("click", function (evt) {
    const imageElement = evt.target;
    if (imageElement.classList.contains("card__image")) {
      openModal(popupImage);

      const srcOfImage = imageElement.getAttribute("src");
      const altOfImage = imageElement.getAttribute("alt");

      imageInPopup.setAttribute("src", `${srcOfImage}`);
      popupCaption.textContent = altOfImage;
    }
  });

  closeButtonInImage.addEventListener("click", function (evt) {
    closeModal(popupImage);
  });
});

popupImage.addEventListener("click", function (evt) {
  evt.stopPropagation();
  if (evt.target === evt.currentTarget) {
    closeModal(popupImage);
  }
});

// лайк карточки                                                    лайк карточки

document.addEventListener("click", handleLikeIsActive);
