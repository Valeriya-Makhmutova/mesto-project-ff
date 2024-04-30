import { initialCards } from "./cards.js";
import './index.css';
// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const cardsList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(cardData, onDeleteButtonClick) {
  // console.log(cardData);
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

// @todo: Функция удаления карточки

function deleteCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
  cardsList.append(createCard(item, deleteCard));
});
//initialCards - исходный массив с карточками
//.places__list - класс, куда должны попадать карточки
