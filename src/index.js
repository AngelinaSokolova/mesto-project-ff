import "./styles/index.css";
import { createCard } from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import { getUser, getCards, postUser, postCard, deleteCardApi, putLike, deleteLike, patchUser } from "./scripts/api.js";

const cardsContainer = document.querySelector('.places__list');
let globalUserId = null;

// отрисовка карточек через api

Promise.all([getUser(), getCards()])
  .then(([userData, cardData]) => {
    // отрисовка данных пользователя через api
    profilTitle.textContent = userData.name; 
    profilDescr.textContent = userData.about; 
    profilImage.style.backgroundImage = `url(${userData.avatar})`;

    globalUserId = userData._id;
    // отрисовка карточек через api
    cardData.forEach((item) => {
      const card = createCard(item, deleteCardPopup, likeCards, openImageCard, item.likes.length, item.owner._id, item._id, globalUserId);
      item.likes.forEach((like) => {
        if (like._id === globalUserId) {
        const isLike = card.querySelector('.card__like-button');
        isLike.classList.add('card__like-button_is-active');
      }
      });
      cardsContainer.append(card);
     
    });
  })
  .catch((err) => {
    console.log(err);
  });

// вызов валидации с передачей параметров
const configValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};

enableValidation(configValidation);


// открытие и закрытие мадального окна

const OpenModalEditProfile = document.querySelector('.profile__edit-button');
const OpenModalAddCard = document.querySelector('.profile__add-button');

const modalEditProfile = document.querySelector('.popup_type_edit');
const modalAddCard = document.querySelector('.popup_type_new-card');

const buttonCloseList = document.querySelectorAll('.popup__close');

buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closeModal(popup)); 
  popup.addEventListener('mousedown', (evt) => {
    if  (evt.target.classList.contains('popup')) {
      closeModal(popup);
    }
  });
})

const formAddCard = document.forms['new-place'];
const cardName = formAddCard.elements.placeName;
const cardLink = formAddCard.elements.link;

OpenModalAddCard.addEventListener('click', () => {
  cardName.value = '';
  cardLink.value = '';
  clearValidation(modalAddCard, configValidation);
  openModal(modalAddCard);
});

// вывод текста в поля инпута

const profilTitle = document.querySelector('.profile__title');
const profilDescr = document.querySelector('.profile__description');
const profilImage = document.querySelector('.profile__image');


const formProfile = document.forms['edit-profile'];

const nameInput = formProfile.elements.name;
const descrInput  = formProfile.elements.description;

OpenModalEditProfile.addEventListener('click', () => {
  nameInput.value = profilTitle.textContent;
  descrInput.value = profilDescr.textContent;
  clearValidation(modalEditProfile, configValidation);
  openModal(modalEditProfile);
});

const buttonLoad = document.querySelector('.button');

function handleFormSubmit(evt) {
  evt.preventDefault();
  buttonLoad.textContent = 'Сохранение...';
  postUser(nameInput.value, descrInput.value)
  .then((result) => {
      profilTitle.textContent = result.name;
      profilDescr.textContent = result.about;

      closeModal(modalEditProfile);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    buttonLoad.textContent = 'Сохранить';
  });
}

formProfile.addEventListener('submit', handleFormSubmit);

// отрисовка карточки
const formCard = document.forms['new-place'];


function handleFormSubmitCard(evt) {
  evt.preventDefault();
  buttonLoad.textContent = 'Сохранение...';
  postCard(formCard.elements.placeName.value, formCard.elements.link.value)
  .then((result) => {
    const placeInput = result.name;
    const linkInput  = result.link;

    const card = createCard({ name: placeInput, link: linkInput }, deleteCardPopup, likeCards, openImageCard, result.likes.length, result.owner._id, result._id, globalUserId);
    cardsContainer.prepend(card);
    formCard.reset();

    closeModal(modalAddCard);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    buttonLoad.textContent = 'Сохранить';
  });
}

formCard.addEventListener('submit', handleFormSubmitCard);

// открытие и закрытие img карточки

const cardImage = document.querySelector('.popup_type_image');

const popupImage = cardImage.querySelector('.popup__image');
const popupDescr = cardImage.querySelector('.popup__caption');

function openImageCard(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupDescr.textContent = name;
  openModal(cardImage);
}

const openDeleteModal = document.querySelector('.popup_card_delete');
const deletecCadrFromBase = document.querySelector('.popup__button-delete');

function deleteCardPopup(cardId, card) {
  openModal(openDeleteModal);
  deletecCadrFromBase.addEventListener('click', () => {
    deleteCardApi(cardId)
      .then((result) => {
        console.log(result);
        card.remove();
        closeModal(openDeleteModal);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

//лайк
function likeCards(cardId, card, isLike) {
  if (isLike.classList.contains('card__like-button_is-active')) {
    isLike.classList.remove('card__like-button_is-active');
    deleteLike(cardId)
    .then((result) => {
        card.querySelector('.card_like-count').textContent = result.likes.length;
      })
      .catch((err) => {
        isLike.classList.add('card__like-button_is-active');
        console.log(err);
      });
  } else {
    isLike.classList.add('card__like-button_is-active');
    putLike(cardId)
    .then((result) => {
        card.querySelector('.card_like-count').textContent = result.likes.length;
      })
      .catch((err) => {
        isLike.classList.remove('card__like-button_is-active');
        console.log(err);
      });
  }
}

//замена аватарки
const userAvatar = document.querySelector('.profile__image');
const modalAvatar = document.querySelector('.popup_card_update-avatar');

const formAvatar = document.forms['update-avatar'];
const avatarInput = formAvatar.elements.avatar;

userAvatar.addEventListener('click', () => {
  openModal(modalAvatar);
  avatarInput.value = '';
  clearValidation(modalAvatar, configValidation);
});

function handleFormSubmitAvatar(evt) {
  evt.preventDefault();
  buttonLoad.textContent = 'Сохранение...';
  patchUser(avatarInput.value)
  .then((result) => {
    userAvatar.style.backgroundImage = `url(${result.avatar})`;
    closeModal(modalAvatar)
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    buttonLoad.textContent = 'Сохранить';
  });
}

formAvatar.addEventListener('submit', handleFormSubmitAvatar)