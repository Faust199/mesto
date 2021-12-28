import Popup from "./Popup.js";
import { popupImageSelector, popupCaptionSelector } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
    constructor({imageSrc, title}, popupSelector) {
        super(popupSelector);
        this._imageSrc = imageSrc;
        this._title = title;
    }

    open() {
        super.open();
        const popupContentImage = this._popup.querySelector(popupImageSelector);
        popupContentImage.src = this._imageSrc;
        popupContentImage.alt = this._title;
        const  popupTitle = this._popup.querySelector(popupCaptionSelector);
        popupTitle.textContent = this._title;
    }
}