export default class FormValidator {

    constructor(config, form) {
        this._config = config;
        this._form = form;
        this._submitButton = this._form.querySelector(config.submitButtonSelector);
    }

    _showInputError = (input) => {
        const spanError = this._form.querySelector(`.${input.id}-error`);
        input.classList.add(this._config.inputErrorClass);
        spanError.textContent = input.validationMessage;
    }

    _hideInputError = (input) => {
        const spanError = this._form.querySelector(`.${input.id}-error`);
        input.classList.remove(this._config.inputErrorClass);
        spanError.textContent = '';
    }

    _checkInputValidity = (input) => {
        if (!input.validity.valid) {
            this._showInputError(input);
        } else {
            this._hideInputError(input);
        }

        this._toggleButtonState();
    }

    _setInputsEventListeners() {
        const inputArray = Array.from(this._form.querySelectorAll(this._config.inputSelector));

        inputArray.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._toggleButtonState();
            });
        });
    }

    _toggleButtonState() {
        if (!this._form.checkValidity()) {
            this._submitButton.classList.add(this._config.inactiveButtonClass);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._config.inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    }

    enableValidation() {
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._toggleButtonState();
        });
        this._setInputsEventListeners();
    }
}