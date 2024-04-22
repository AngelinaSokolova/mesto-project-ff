//отображает ошибку для input элемента.
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

//скрывает ошибку для input элемента.
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//проверяет, есть ли среди input элементов формы хотя бы один с невалидными данными.
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//изменяет состояние кнопки отправки формы в зависимости от валидности введенных данных.
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

//проверяет валидность input элемента и отображает или скрывает ошибки в зависимости от результата проверки.
const isValid = (formElement, inputElement, settings) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings.inputErrorClass, settings.errorClass);
  } else {
    hideInputError(formElement, inputElement, settings.inputErrorClass, settings.errorClass);
  }
};

//устанавливает обработчики событий на все input элементы формы.
const setEventListeners = (formElement, settings, inputSelector, submitButtonSelector, inactiveButtonClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

//инициализирует валидацию всех форм на странице, устанавливая необходимые обработчики событий.
export function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings, settings.inputSelector, settings.submitButtonSelector, settings.inactiveButtonClass);
  });
};

//сбрасывает валидацию формы, удаляя все ошибки и активируя кнопку отправки.
export function clearValidation(targetElement, settings) {
    const inputList = Array.from(targetElement.querySelectorAll(settings.inputSelector));
    const buttonElement = targetElement.querySelector(settings.submitButtonSelector);
    inputList.forEach((inputElement) => {
      hideInputError(targetElement, inputElement, settings.inputErrorClass, settings.errorClass);
    });
    toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
};