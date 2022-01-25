import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({handleFormSubmit, popupSelector, popupCloseButtonSelector, popupClassSelector, popupOpenClassSelector, formSelector, formInputSelector}) {
        super(popupSelector, popupCloseButtonSelector, popupClassSelector, popupOpenClassSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector(formSelector);
        this._inputList = this._form.querySelectorAll(formInputSelector);
        this._submitButton = this._form.querySelector('.popup__submit-button');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues;
    }

    renderLoading(loadingText) {
        this._submitButton.textContent = loadingText;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());

            this._form.reset();
        });
    }

    setInfo(formData) {
        this._inputList.forEach(input => input.value = formData[input.name]);
    }

    close() {
        super.close();
        this._form.reset();
    }

}