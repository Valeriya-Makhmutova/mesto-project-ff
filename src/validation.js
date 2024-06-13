const editFormElement = document.querySelector('[name="edit-profile"]');
const newCardFormElement = document.querySelector('[name="new-place"]');

// настройки доля валидации
export const validationParameters = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

// Функция, которая добавляет класс с ошибкой
function showInputError(
  formElement,
  inputElement,
  errorMessage,
  dataOfElements
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(dataOfElements.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(dataOfElements.errorClass);
}

// Функция, которая удаляет класс с ошибкой
function hideInputError(formElement, inputElement, dataOfElements) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(dataOfElements.inputErrorClass);
  errorElement.classList.remove(dataOfElements.errorClass);
  errorElement.textContent = "";
}

// Функция, которая проверяет валидность поля
function isValid(formElement, inputElement, dataOfElements) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      dataOfElements
    );
  } else {
    hideInputError(formElement, inputElement, dataOfElements);
  }
}

//устанавливаем слушатели на все инпуты
function setEventListeners(formElement, dataOfElements) {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(
    formElement.querySelectorAll(dataOfElements.inputSelector)
  );
  // const submitButton = formElement.querySelector(dataOfElements.submitButtonSelector);
  const saveButton = formElement.querySelector(
    dataOfElements.submitButtonSelector
  );

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, dataOfElements);
      toggleButtonState(inputList, saveButton, validationParameters);
    });
  });
}

// добавляем слушателя к формам
export function enableValidation(dataOfElements) {
  const formList = Array.from(
    document.querySelectorAll(dataOfElements.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, dataOfElements);
  });
}

// очистка ошибок
export function clearValidation(profileForm, dataOfElements) {
  const inputElements = Array.from(
    profileForm.querySelectorAll(dataOfElements.inputSelector)
  );
  const submitButton = profileForm.querySelector(
    dataOfElements.submitButtonSelector
  );

  inputElements.forEach((element) => {
    hideInputError(profileForm, element, dataOfElements);
  });

  if (hasInvalidInput(inputElements)) {
    submitButton.classList.add(dataOfElements.inactiveButtonClass);
    submitButton.disable = true;
  } else {
    submitButton.classList.remove(dataOfElements.inactiveButtonClass);
    submitButton.disable = false;
  }
}

// функция, которая ничего не делает с кнопкой, но даёт сигнал о возможности разблокировать её
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, validationParameters) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationParameters.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationParameters.inactiveButtonClass);
  }
}

// if (elem.classList.contains("popup_type_new-card")) {
//   const formElement = elem.querySelector(".popup__form");
//   const saveButtonNewCard = formElement.querySelector(".popup__button");
//   saveButtonNewCard.classList.add("popup__button-error");
// }
