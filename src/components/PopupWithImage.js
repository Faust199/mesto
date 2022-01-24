import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector, popupCloseButtonSelector, popupClassSelector, popupOpenClassSelector, popupImageSelector, popupCaptionSelector) {
        super(popupSelector, popupCloseButtonSelector, popupClassSelector, popupOpenClassSelector);
        this._popupContentImage = this._popup.querySelector(popupImageSelector);
        this._popupTitle = this._popup.querySelector(popupCaptionSelector);
    }

    setImageInfo({imageSrc, title}) {
        this._popupContentImage.src = imageSrc;
        this._popupContentImage.alt = title;
        this._popupTitle.textContent = title;
    }
}

