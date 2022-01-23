export default class Card {
    constructor({data, cardTemplateSelector, userId, handleCardClick, handleDeleteCardClick, handleToggleLike}) {
        this._link = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._owner = data.owner;
        this._id = data._id;
        this._userId = userId;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._isLiked = false;
        this._handleToggleLike = handleToggleLike;
    }

    _getTemplate() {
        const cardElement = document.getElementById(this._cardTemplateSelector).content.querySelector('.elements__element').cloneNode(true);
        this._image = cardElement.querySelector(".elements__element-image");
        this._deleteButton = cardElement.querySelector(".elements__element-delete");
        this._likeButton = cardElement.querySelector(".elements__element-like");

        if (this._owner._id != this._userId) {
            this._deleteButton.remove();
        }

        this._likeCountParagraph = cardElement.querySelector(".elements__element-like_number");
        return cardElement;
    }

    _setIsLiked() {
        if (this._likes.length == 0) {
            this._isLiked = false;
        }
        for (let i = 0; i <= this._likes.length; i++) {
            const likeOwner = this._likes[i];
            if (likeOwner) {
                if (likeOwner._id == this._userId) {
                    this._isLiked = true;
                } else {
                    this._isLiked = false;
                }
            }
        }
    }

    _toggleLikeButton () {
        this._likeButton.classList.toggle('elements__element-like_active',this._isLiked);
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
            this._handleToggleLike();
        });
    }

    generateCard() {

        this._element = this._getTemplate();

        this._image.src = this._link;
        this._image.alt = this._name;
        this._likeCountParagraph.textContent = this._likes.length;
        const title = this._element.querySelector(".elements__element-title");
        title.textContent = this._name;
        this._setIsLiked();
        this._toggleLikeButton();
        this._setEventListeners();

        return this._element;
    }

    getCardId() {
        return this._id;
    }

    cardIsLiked() {
        return this._isLiked;
    }

    updateCardLikes(data) {
        this._likes = data.likes;
        this._setIsLiked();
        this._toggleLikeButton();
        this._likeCountParagraph.textContent = this._likes.length;
    }
}