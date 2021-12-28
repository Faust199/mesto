import PopupWithImage from "./PopupWithImage.js";
import { cardImagePopupID } from "../utils/constants.js"

export default class Card {
    constructor(data, cardTemplateSelector) {
        this._link = data.link;
        this._name = data.name;
        this._cardTemplateSelector = cardTemplateSelector;
    }

    _getTemplate() {
        const cardElement = document.getElementById(this._cardTemplateSelector).content.querySelector('.elements__element').cloneNode(true);
        this._image = cardElement.querySelector(".elements__element-image");
        this._deleteButton = cardElement.querySelector(".elements__element-delete");
        this._likeButton = cardElement.querySelector(".elements__element-like");
        return cardElement;
    }

    _setEventListeners() {
        this._image.addEventListener('click', ()=> {
            const popup = new PopupWithImage({imageSrc:this._link, title:this._name}, cardImagePopupID);
            popup.setEventListeners();
            popup.open();
        });

        this._deleteButton.addEventListener('click', ()=> {
            this._element.remove();
        });

        this._likeButton.addEventListener('click', ()=> {
            this._likeButton.classList.toggle('elements__element-like_active');
        });
    }

    generateCard() {

        this._element = this._getTemplate();

        this._image.src = this._link;
        this._image.alt = this._name;

        const title = this._element.querySelector(".elements__element-title");
        title.textContent = this._name;

        this._setEventListeners();

        return this._element;
    }
}