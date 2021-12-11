export default class Card {

    constructor(data, cardElementId, cardImagePopup) {
        this._link = data.link;
        this._name = data.name;
        this._cardElementId = cardElementId;
        this._cardImagePopup = cardImagePopup;
    }

    _getTemplate() {
        const cardElement = document.getElementById(this._cardElementId).content.cloneNode(true);
        return cardElement;
    }

    _setEventListeners(image, likeButton, deleteButton) {
        image.addEventListener('click', ()=> {
            this._openCardPopup(this._cardImagePopup);
            const popupContentImage = this._cardImagePopup.querySelector('.popup__image');
            popupContentImage.src = this._link;
            popupContentImage.alt = this._name;
            const  popupTitle = this._cardImagePopup.querySelector('.popup__caption');
            popupTitle.textContent = this._name;
        });

        deleteButton.addEventListener('click', ()=> {
            const deletedCard = deleteButton.closest('.elements__element');
            deletedCard.remove();
        });

        likeButton.addEventListener('click', ()=> {
            likeButton.classList.toggle('elements__element-like_active');
        });
    }

    _openCardPopup(popup) {
        popup.classList.add('popup_is-open');
    }

    generateCard() {
        this._element = this._getTemplate();

        const image = this._element.querySelector(".elements__element-image");
        image.src = this._link;
        image.alt = this._name;

        const title = this._element.querySelector(".elements__element-title");
        title.textContent = this._name;

        const deleteButton = this._element.querySelector(".elements__element-delete");

        const likeButton = this._element.querySelector(".elements__element-like");

        this._setEventListeners(image, likeButton, deleteButton);

        return this._element;
    }
}