const showInputError = (config, form, input) => {
    const spanError = form.querySelector(`.${input.id}_error`);
    input.classList.add(config.inputErrorClass);
    spanError.textContent = input.validationMessage;
}

const hideInputError = (config, form, input) => {
    const spanError = form.querySelector(`.${input.id}_error`);
    input.classList.remove(config.inputErrorClass);
    spanError.textContent = '';
}

const checkInputValidity = (config, form, input, submitButton) => {
    if (!input.validity.valid) {
        showInputError(config, form, input);
    } else {
        hideInputError(config, form, input);
    }

    toggleButtonState(config, form, submitButton);
}

function setInputsEventListeners(config, form, submitButton) {
    const inputArray = Array.from(form.querySelectorAll(config.inputSelector));

    inputArray.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(config, form, input, submitButton);
            toggleButtonState(config, form, submitButton);
        });
    });
}

function toggleButtonState(config, form, submitButton) {
    if (!form.checkValidity()) {
        submitButton.classList.add(config.inactiveButtonClass);
        submitButton.disabled = true;
    } else {
        submitButton.classList.remove(config.inactiveButtonClass);
        submitButton.disabled = false;
    }
}

function enableValidation(config) {
    const formArray = Array.from(document.querySelectorAll(config.formSelector));

    formArray.forEach((form) => {
        const submitButton = form.querySelector(config.submitButtonSelector);
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (form.id !== "form_profile") {
                form.reset();
            }
            toggleButtonState(config, form, submitButton);
        });
        setInputsEventListeners(config, form, submitButton);
    });
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    closeButtonSelector: '.popup__close-button',
    inputErrorClass: 'popup__input_type_error',
    spanErrorClass: 'popup__error',
});