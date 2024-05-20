import { initialCards } from "./cards.js";
import "./index.css";
import { createCard, deleteCard } from "./components/cards.js";
import {
  // импорт из modal.js
  openModal,
  closeModal,
  closeByOverlayClick,
} from "./components/modal.js";

const cardsList = document.querySelector(".places__list");
// элементы попапа
const popupImage = document.querySelector(".popup_type_image");
const imageInPopup = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");
const closeButtonInImage = popupImage.querySelector(".popup__close");

const popupElements = {
  popupImage,
  imageInPopup,
  popupCaption,
  closeButtonInImage,
};

initialCards.forEach((item) => {
  cardsList.append(
    // передача функции openModal в качестве аргумента
    createCard(item, deleteCard, handleOpenImagePopup)
  );
});
//initialCards - исходный массив с карточками
//.places__list - класс, куда должны попадать карточки

//     popupEdit                                                   модальное окно "редактировать профиль"

const popupEdit = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const closeButtonInEdit = popupEdit.querySelector(".popup__close");

const formEditElement = popupEdit.querySelector(".popup__form");

const nameInputEditForm = formEditElement.querySelector(
  ".popup__input_type_name"
);
const jobInputEditForm = formEditElement.querySelector(
  ".popup__input_type_description"
);

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

profileEditButton.addEventListener("click", function (evt) {
  //на кнопку редактировать добавили слушатель событий
  nameInputEditForm.value = profileTitle.textContent;
  jobInputEditForm.value = profileDescription.textContent;
  openModal(popupEdit);
});

closeButtonInEdit.addEventListener("click", function (evt) {
  closeModal(popupEdit);
});

popupEdit.addEventListener("click", closeByOverlayClick);

formEditElement.addEventListener("submit", handleFormSubmit);

//  popupNewCard                                                   модальное окно "новое место"

const popupNewCard = document.querySelector(".popup_type_new-card");
const profileAddButton = document.querySelector(".profile__add-button");
const closeButtonInNewCard = popupNewCard.querySelector(".popup__close");

const formAddCardElement = popupNewCard.querySelector(".popup__form");

const nameInputNewCard = formAddCardElement.querySelector(
  ".popup__input_type_card-name"
);
const linkInputNewCard = formAddCardElement.querySelector(
  ".popup__input_type_url"
);

profileAddButton.addEventListener("click", function (evt) {
  nameInputNewCard.value = "";
  linkInputNewCard.value = "";
  openModal(popupNewCard);
});

closeButtonInNewCard.addEventListener("click", function (evt) {
  closeModal(popupNewCard);
});

popupNewCard.addEventListener("click", closeByOverlayClick);

formAddCardElement.addEventListener("submit", handleAddingCard);

//   popupImage                                                      модальное окно "картинка карточки"

popupImage.addEventListener("click", closeByOverlayClick);

// функция  обработчик отправки формы
function handleFormSubmit(evt) {
  evt.preventDefault();

  const name = evt.target.querySelector(".popup__input_type_name").value;
  const job = evt.target.querySelector(".popup__input_type_description").value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  closeModal(popupEdit);
}
// функция обработчик добавления карточки
function handleAddingCard(evt) {
  evt.preventDefault();

  const name = evt.target.querySelector(".popup__input_type_card-name").value;
  const link = evt.target.querySelector(".popup__input_type_url").value;

  const cardData = { name, link };

  const cardElement = createCard(cardData, deleteCard, handleOpenImagePopup);

  cardsList.prepend(cardElement);

  closeModal(popupNewCard);
}

function handleOpenImagePopup(evt) {
  evt.preventDefault();

  const name = evt.target.alt;
  const link = evt.target.src;

  imageInPopup.src = link;
  imageInPopup.alt = name;
  popupCaption.textContent = name;

  openModal(popupImage);

  popupElements.closeButtonInImage.addEventListener("click", function (evt) {
    closeModal(popupImage);
  });
}
