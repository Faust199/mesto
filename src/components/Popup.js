export default class Popup {
    constructor(popupSelector, popupCloseButtonSelector, popupClassSelector, popupOpenClassSelector) {
        this._popup = document.getElementById(popupSelector);
        this._closeButton = this._popup.querySelector(popupCloseButtonSelector);
        this._popupClassSelector = popupClassSelector;
        this._popupOpenClassSelector = popupOpenClassSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.classList.add(this._popupOpenClassSelector);
    }

    close() {
        this._popup.classList.remove(this._popupOpenClassSelector);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => {
            this.close();
        });

        this._popup.addEventListener('click', (event) => {
            if (event.target.classList.contains(this._popupClassSelector )) {
                this.close();
            }
        });
    }

    _handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
        }
    }
}