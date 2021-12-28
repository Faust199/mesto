import { popupCloseButtonSelector, popupClassSelector, popupOpenClassSelector } from "../utils/constants.js";

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.getElementById(popupSelector);
        this._closeButton = this._popup.querySelector(popupCloseButtonSelector);
    }

    open() {
        this._popup.classList.add(popupOpenClassSelector);
    }

    close() {
        this._popup.classList.remove(popupOpenClassSelector);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => {
            this.close();
        });

        this._popup.addEventListener('click', (event) => {
            if (event.target.classList.contains(popupClassSelector)) {
                this.close(event.target);
            }
        });

        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
        }
    }
}