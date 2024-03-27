export function handleEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

export function openModal(modalElement) {
  modalElement.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscape);
}

export function closeModal(modalElement) {
  modalElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscape);
}
