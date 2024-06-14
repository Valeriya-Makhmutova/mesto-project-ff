// import { initialCards } from "./cards.js";
import "./index.css";
import {
  validationParameters,
  enableValidation,
  clearValidation,
} from "./validation.js";
import { createCard } from "./components/cards.js";
// import { createCard } from "./components/cards.js";
import {
  openModal,
  closeModal,
  closeByOverlayClick,
} from "./components/modal.js";
import {
  getUserInformation,
  getInitialCards,
  sendNewUserData,
  sendNewCard,
  deleteThisCard,
  addLike,
  removeLike,
  changeAvatar,
} from "./api.js";
import { isMyLikeHere } from "./utils/utils.js";

const profileForm = document.querySelector('.popup__form[name="edit-profile"]');
const addCardForm = document.querySelector('.popup__form[name="new-place"]');
const cardsList = document.querySelector(".places__list");

// элементы попапа
const popupImage = document.querySelector(".popup_type_image");
const imageInPopup = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");
const closeButtonInImage = popupImage.querySelector(".popup__close");
const popupDeleteCard = document.querySelector(".popup_type_delete-card");
const popupChangeAvatar = document.querySelector(".popup_type_change-avatar");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formDeleteCard = popupDeleteCard.querySelector(".popup__form");

const button = document.querySelector(".button");

const originalTextSubmitButton = button.textContent;
const textContentLoading = "Сохранение...";

//     popupEdit                                                   модальное окно "редактировать профиль"

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
  clearValidation(profileForm, validationParameters);
});

closeButtonInEdit.addEventListener("click", function (evt) {
  closeModal(popupEdit);
});

popupEdit.addEventListener("click", closeByOverlayClick);

formEditElement.addEventListener("submit", handleFormSubmit);

//  popupNewCard                                                   модальное окно "новое место"

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
  clearValidation(addCardForm, validationParameters);
  openModal(popupNewCard);
  // clearValidation(addCardForm, validationParameters);
});

closeButtonInNewCard.addEventListener("click", function (evt) {
  closeModal(popupNewCard);
});

popupNewCard.addEventListener("click", closeByOverlayClick);

formAddCardElement.addEventListener("submit", handleAddingCard);

closeButtonInImage.addEventListener("click", function () {
  closeModal(popupImage);
});

//   popupImage                                                      модальное окно "картинка карточки"

popupImage.addEventListener("click", closeByOverlayClick);

// popupDeleteCard
popupDeleteCard.addEventListener("click", closeByOverlayClick);

//                                                                       модальное окно "изменить аватар"
const buttonChangeAvatar = document.querySelector(".profile__image");
const urlInputPopupChangeAvatar = document.querySelector(
  ".popup__input-change-avatar-url"
);
const formElementChangeAvatar = popupChangeAvatar.querySelector(".popup__form");
const profileImage = document.querySelector(".profile__image");
const closeButtonChangeAvatar =
  popupChangeAvatar.querySelector(".popup__close");

buttonChangeAvatar.addEventListener("click", () => {
  urlInputPopupChangeAvatar.value = profileImage.style.backgroundImage.slice(
    5,
    -2
  );
  openModal(popupChangeAvatar);
});

popupChangeAvatar.addEventListener("click", closeByOverlayClick);

formElementChangeAvatar.addEventListener(
  "submit",
  handleSubmitFormChangeAvatar
);

closeButtonChangeAvatar.addEventListener("click", () => {
  closeModal(popupChangeAvatar);
  urlInputPopupChangeAvatar.value = profileImage.style.backgroundImage.slice(
    5,
    -2
  );
});

// функция-обработчик отправки формы изменения аватара
function handleSubmitFormChangeAvatar(evt) {
  evt.preventDefault();

  const url = evt.target.querySelector(".popup__input-change-avatar-url").value;
  const buttonSubmit = evt.target.querySelector(".popup__button");

  buttonSubmit.textContent = textContentLoading;

  changeAvatar(url)
    .then((data) => {
      profileImage.style.backgroundImage = `url('${url}')`;

      closeModal(popupChangeAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmit.textContent = originalTextSubmitButton;
    });
}

//подключаем валидацию
enableValidation(validationParameters);

// функция  обработчик отправки формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();

  const form = evt.target;
  const submitButton = form.querySelector(".popup__button");

  submitButton.textContent = textContentLoading;

  const name = evt.target.querySelector(".popup__input_type_name").value;
  const job = evt.target.querySelector(".popup__input_type_description").value;

  sendNewUserData(name, job)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = originalTextSubmitButton;
    });
  // clearValidation(profileForm, validationParameters);
}

//функция-обработчик удаления карточки

const confirmationDeleteButton = document.querySelector(".yes-button");
const closeButtonDeletePopup = popupDeleteCard.querySelector(".popup__close");

closeButtonDeletePopup.addEventListener("click", () => {
  closeModal(popupDeleteCard);
});

// функция обработчик добавления карточки
function handleAddingCard(evt) {
  evt.preventDefault();

  const name = evt.target.querySelector(".popup__input_type_card-name").value;
  const link = evt.target.querySelector(".popup__input_type_url").value;
  const submitButton = evt.target.querySelector(".popup__button");

  submitButton.textContent = textContentLoading;

  sendNewCard(name, link)
    .then((res) => {
      console.log(res);
      const cardId = res._id;
      const cardData = {
        name,
        link,
        cardId,
      };
      const configCreateCard = {
        cardData: cardData,
        handleOpenImagePopup: handleOpenImagePopup,
        openPopupDeleteCard: openPopupDeleteCard,
        openModal: openModal,
        closeModal: closeModal,
        closeByOverlayClick: closeByOverlayClick,
        confirmationDeleteButton: confirmationDeleteButton,
        requestForDelete: deleteThisCard,
        popupDeleteCard: popupDeleteCard,
        addLike: addLike,
        removeLike: removeLike,
        formDeleteCard: formDeleteCard,
        onDeleteCard: onDeleteCard,
        // isMyLikeHere: isMyLikeHere
      };
      const cardElement = createCard(configCreateCard);
      return cardElement;
    })
    .then((cardElement) => {
      console.log("cardElement", cardElement);
      cardsList.prepend(cardElement);
      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = originalTextSubmitButton;
    });
}

// функция обработчик открытия картинки
function handleOpenImagePopup(name, link) {
  imageInPopup.src = link;
  imageInPopup.alt = name;
  popupCaption.textContent = name;

  openModal(popupImage);
}

// открытие попапа уточнения удалдения карточки
function openPopupDeleteCard(evt) {
  openModal(popupDeleteCard);
}

export function deleteCard(card) {
  card.remove();
}

let cardForDelete = {};
function onDeleteCard(cardId, cardElement) {
  cardForDelete = {
    id: cardId,
    cardElement,
  };
  openModal(popupDeleteCard);
}

function handleDeleteCardSubmit(evt) {
  evt.preventDefault();

  if (!cardForDelete.cardElement) return;

  deleteThisCard(cardForDelete.id)
    .then(() => {
      deleteCard(cardForDelete.cardElement);
      closeModal(popupDeleteCard);
      cardForDelete = {};
    })
    .catch((err) => {});
}

// гет запросы, котоыре нужно будет переместить по назначению

Promise.all([getUserInformation(), getInitialCards()])
  .then(([userData, initialCards]) => {
    // debugger
    // console.log(userData)
    // console.log(initialCards)
    const userId = userData._id;

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    initialCards.forEach((card) => {
      // console.log('card', card)
      // console.log('card.owner._id', card.owner._id)
      // console.log('card.likes', card.likes.length)
      const cardData = {
        name: card.name,
        link: card.link,
        likeCount: card.likes.length,
        cardUserId: card.owner._id,
        cardId: card._id,
        likesData: card.likes,
      };

      // настройки для создания карточки
      const configCreateCard = {
        cardData: cardData,
        openPopupDeleteCard: openPopupDeleteCard,
        handleOpenImagePopup: handleOpenImagePopup,
        userId: userId,
        openModal: openModal,
        closeModal: closeModal,
        closeByOverlayClick: closeByOverlayClick,
        confirmationDeleteButton: confirmationDeleteButton,
        requestForDelete: deleteThisCard,
        popupDeleteCard: popupDeleteCard,
        addLike: addLike,
        removeLike: removeLike,
        getInitialCards: getInitialCards,
        changeAvatar: changeAvatar,
        isMyLikeHere: isMyLikeHere,
        onDeleteCard: onDeleteCard,
        handleDeleteCardSubmit: handleDeleteCardSubmit,
        formDeleteCard: formDeleteCard,
      };

      cardsList.append(createCard(configCreateCard));
    });
  })
  .catch((err) => {
    console.log(err);
  });
