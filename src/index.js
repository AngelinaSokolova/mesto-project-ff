import "./styles/index.css";
import { initialCards } from "./scripts/initialCards.js";
import { createCard, removeElement, toggleLike } from "./scripts/card.js";
import { openModal, closeModal, handleEscape } from "./scripts/modal.js";

const gallery = document.querySelector(".places__list");
const imagePopup = document.querySelector(".popup_type_image");
const editPopup = document.querySelector(".popup_type_edit");
const newPlacePopup = document.querySelector(".popup_type_new-card");
const popups = document.querySelectorAll(".popup");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = editPopup.querySelector(".popup__input_type_name");
const descriptionInput = editPopup.querySelector(".popup__input_type_description");
const placeNameInput = newPlacePopup.querySelector(".popup__input_type_card-name");
const linkInput = newPlacePopup.querySelector(".popup__input_type_url");

const imagePopupImage = imagePopup.querySelector(".popup__image");
const imageCaption = imagePopup.querySelector(".popup__caption");

function openImagePopup(event) {
  const card = event.currentTarget.closest(".card");
  const imageSrc = card.querySelector(".card__image").src;
  const cardTitle = card.querySelector(".card__title").textContent;

  imagePopupImage.src = imageSrc;
  imagePopupImage.alt = cardTitle;
  imageCaption.textContent = cardTitle;

  openModal(imagePopup);
}

function openEditPopup() {
  openModal(editPopup);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function openNewPlacePopup() {
  openModal(newPlacePopup);
}

function saveEditChanges(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editPopup);
}

function saveNewPlace(event) {
  event.preventDefault();
  const cardData = { 
    name: placeNameInput.value, 
    link: linkInput.value,
  };
  renderCard(cardData);
  event.target.closest("form").reset();
  closeModal(newPlacePopup);
}

function renderCard(cardData, method = "prepend") {
  const card = createCard(cardData, removeElement, toggleLike, openImagePopup);
  gallery[method](card);
}

function initialize() {
  initialCards.forEach((cardData) => {
    renderCard(cardData);
  });

  const editButton = document.querySelector(".profile__edit-button");
  editButton.addEventListener("click", openEditPopup);

  const newPlaceButton = document.querySelector(".profile__add-button");
  newPlaceButton.addEventListener("click", openNewPlacePopup);

  popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        closeModal(popup);
      }
      if (evt.target.classList.contains("popup__close")) {
        closeModal(popup);
      }
    });
  });

  const profileForm = document.forms["edit-profile"];
  profileForm.addEventListener("submit", saveEditChanges);

  const cardForm = document.forms["new-place"];
  cardForm.addEventListener("submit", saveNewPlace);
}

document.addEventListener("DOMContentLoaded", initialize);