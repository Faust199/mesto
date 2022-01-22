export default class Card {
    constructor({data, cardTemplateSelector, handleCardClick, handleDeleteCardClick}) {
        this._link = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
    }

    _getTemplate() {
        const cardElement = document.getElementById(this._cardTemplateSelector).content.querySelector('.elements__element').cloneNode(true);
        this._image = cardElement.querySelector(".elements__element-image");
        this._deleteButton = cardElement.querySelector(".elements__element-delete");
        this._likeButton = cardElement.querySelector(".elements__element-like");
        this._likeCountParagraph = cardElement.querySelector(".elements__element-like_number");
        return cardElement;
    }

    _setEventListeners() {
        this._image.addEventListener('click', ()=> {
            const popupImageData = {imageSrc:this._link, title:this._name};
            this._handleCardClick(popupImageData);
        });

        this._deleteButton.addEventListener('click', ()=> {
            this._handleDeleteCardClick(this._element);
        });

        this._likeButton.addEventListener('click', ()=> {
            this._likeButton.classList.toggle('elements__element-like_active');
        });
    }

    generateCard() {

        this._element = this._getTemplate();

        this._image.src = this._link;
        this._image.alt = this._name;
        this._likeCountParagraph.textContent = this._likes.length;
        const title = this._element.querySelector(".elements__element-title");
        title.textContent = this._name;

        this._setEventListeners();

        return this._element;
    }
}