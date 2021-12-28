import Popup from "./Popup.js";
import { formSelector, formInputSelector} from "../utils/constants.js"

export default class PopupWithForm extends Popup {
    constructor({handleFormSubmit, popupSelector}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector(formSelector)
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll(formInputSelector);

        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());

            this._form.reset();
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

}