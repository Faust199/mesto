import Popup from "./Popup.js";
import { popupImageSelector, popupCaptionSelector } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupContentImage = this._popup.querySelector(popupImageSelector);
        this._popupTitle = this._popup.querySelector(popupCaptionSelector);
    }

    setImageInfo({imageSrc, title}) {
        this._popupContentImage.src = imageSrc;
        this._popupContentImage.alt = title;
        this._popupTitle.textContent = title;
    }
}

