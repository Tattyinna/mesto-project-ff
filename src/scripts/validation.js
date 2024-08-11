// Показ сообщения об ошибке для неверного ввода
function showInputError( formElement, inputElement, errorMessage, validationConfig ) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

// Скрытие сообщения об ошибке для верного ввода
function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
  inputElement.setCustomValidity("");
}

// Проверка валидности введенных данных
function isValid(formElement, inputElement, validationConfig) {
  // Установка сообщения об ошибке при несовпадении с паттерном
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  // Показать или скрыть сообщение об ошибке в зависимости от валидности
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

// Установка обработчиков событий для формы
function setFormsEventListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfig);

  // Добавление обработчика ввода для каждого элемента ввода
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
}

// Включение валидации для всех форм на странице
export function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setFormsEventListeners(formElement, validationConfig);
  });
}

// Очистка ошибок валидации и деактивация кнопки отправки формы
export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  // Скрытие ошибки для всех элементов ввода
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });

  // Деактивирование кнопку отправки
  disableSubmitButton(buttonElement, validationConfig);
}

// Проверка наличия неверных данных среди всех элементов ввода формы
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Переключение состояния кнопки отправки в зависимости от валидности данных
function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, validationConfig);
  } else {
    enableSubmitButton(buttonElement, validationConfig);
  }
}

// Деактивация кнопки отправки
const disableSubmitButton = (button, config) => {
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
};

// Активация кнопки отправки
const enableSubmitButton = (button, config) => {
  button.disabled = false;
  button.classList.remove(config.inactiveButtonClass);
};
