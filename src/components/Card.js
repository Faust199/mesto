export default class Card {
    constructor({data, cardTemplateSelector, userId, handleCardClick, handleDeleteCardClick, handleLikeOrDislikeCard}) {
        this._link = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._owner = data.owner;
        this._id = data._id;
        this._userId = userId;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._cardIsLiked = false;
        this._handleLikeOrDislikeCard = handleLikeOrDislikeCard;
    }

    _getTemplate() {
        const cardElement = document.getElementById(this._cardTemplateSelector).content.querySelector('.elements__element').cloneNode(true);
        this._image = cardElement.querySelector(".elements__element-image");
        this._deleteButton = cardElement.querySelector(".elements__element-delete");
        this._likeButton = cardElement.querySelector(".elements__element-like");

        if (this._owner._id != this._userId) {
            this._deleteButton.remove();
        }

        this._setIsLiked(this._likes);

        this._likeCountParagraph = cardElement.querySelector(".elements__element-like_number");
        return cardElement;
    }

    _setIsLiked(likes) {
        if (likes.length > 0) {
            for (let i = 0; i <= likes.length; i++) {
                let likeOwner = likes[i];
                if (likeOwner) {
                    if (likeOwner._id == this._userId) {
                        this._cardIsLiked = true;
                    }
                }
            }
        }
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
            this._handleLikeOrDislikeCard();
        });
    }

    generateCard() {

        this._element = this._getTemplate();

        this._image.src = this._link;
        this._image.alt = this._name;
        this._likeCountParagraph.textContent = this._likes.length;
        const title = this._element.querySelector(".elements__element-title");
        title.textContent = this._name;

        if (this._cardIsLiked) {
            this._likeButton.classList.toggle('elements__element-like_active');
        }

        this._setEventListeners();

        return this._element;
    }

    getCardId() {
        return this._id;
    }

    cardIsLiked() {
        return this._cardIsLiked;
    }

    updateCardLikes(data) {
        this._setIsLiked(data.likes);
        if (this._cardIsLiked) {
            this._likeButton.classList.toggle('elements__element-like_active');
        }
        this._likeCountParagraph.textContent = data.likes.length;
    }
}