function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

export function openModal(elem) {
  elem.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEsc);
}

export function closeModal(elem) {
  elem.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEsc);
}

export function closeByOverlayClick(evt) {
  evt.stopPropagation();
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}
