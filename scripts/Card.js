export default class Card {

    constructor(data, cardElementLi, cardImagePopup, openPopup) {
        this._link = data.link;
        this._name = data.name;
        this._cardElementLi = cardElementLi;
        this._cardImagePopup = cardImagePopup;
        this._element = this._getTemplate();
        this._image = this._element.querySelector(".elements__element-image");
        this._deleteButton = this._element.querySelector(".elements__element-delete");
        this._likeButton = this._element.querySelector(".elements__element-like");
        this._openPopup = openPopup;
    }

    _getTemplate() {
        const cardElement = this._cardElementLi.cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._image.addEventListener('click', ()=> {
            this._openPopup(this._cardImagePopup);
            const popupContentImage = this._cardImagePopup.querySelector('.popup__image');
            popupContentImage.src = this._link;
            popupContentImage.alt = this._name;
            const  popupTitle = this._cardImagePopup.querySelector('.popup__caption');
            popupTitle.textContent = this._name;
        });

        this._deleteButton.addEventListener('click', ()=> {
            this._element.remove();
        });

        this._likeButton.addEventListener('click', ()=> {
            this._likeButton.classList.toggle('elements__element-like_active');
        });
    }

    generateCard() {
        this._image.src = this._link;
        this._image.alt = this._name;

        const title = this._element.querySelector(".elements__element-title");
        title.textContent = this._name;

        this._setEventListeners();

        return this._element;
    }
}