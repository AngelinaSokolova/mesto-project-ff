// @todo: Темплейт карточки и Функция создания карточки
const cardTemplate = document.querySelector('#card-template').content;

export function createCard(item, deleteCardPopup, likeCard, openImage, likes, idUser, idCard, globalUserId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const buttonIsMy = cardElement.querySelector('.card__delete-button');
  if (idUser !== globalUserId) {
    buttonIsMy.classList.add('card__delete-button-disabled');
    buttonIsMy.disabled = true;
  } 

  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card_like-count').textContent = likes;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = item.link; 
  cardImage.alt = item.name;

  buttonIsMy.addEventListener('click', () => deleteCardPopup(idCard, cardElement));


  const isLike = cardElement.querySelector('.card__like-button');
  isLike.addEventListener('click', () => likeCard(idCard, cardElement, isLike));

  cardImage.addEventListener('click', () => openImage(item.name, item.link));

  return cardElement;
}