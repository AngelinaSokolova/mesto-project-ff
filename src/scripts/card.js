export function createCard( cardData, removeCallback, toggleLikeCallback, openImageCallback) {
  const cardElement = document.querySelector("#card-template").content.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", removeCallback);
  likeButton.addEventListener("click", toggleLikeCallback);
  cardImage.addEventListener("click", openImageCallback);

  return cardElement;
}

export function removeElement(event) {
  event.currentTarget.closest(".card").remove();
}

export function toggleLike(event) {
  event.currentTarget.classList.toggle("card__like-button_is-active");
}