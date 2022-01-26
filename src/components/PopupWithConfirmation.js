import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor({popupSelector, popupCloseButtonSelector, popupClassSelector, popupOpenClassSelector, formSelector, handleFormSubmit}) {
        super(popupSelector, popupCloseButtonSelector, popupClassSelector, popupOpenClassSelector);
        this._form = this._popup.querySelector(formSelector);
        this._handleFormSubmit = handleFormSubmit
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._card);
            this._form.reset();
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

    open(card) {
        this._card = card
        super.open();
    }

}