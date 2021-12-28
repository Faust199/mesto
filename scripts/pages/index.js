import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../FormValidator.js";
import {initialCards, config, cardListSelector} from "../utils/constants.js";

const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.getElementById('popup-profile');
const cardPopup = document.getElementById('popup-card');
const cardForm = cardPopup.querySelector('.popup__form');
const profileCloseButton = document.getElementById('close-button-profile');
const cardCloseButton = document.getElementById('close-button-card');
const profileForm = profilePopup.querySelector('.popup__form');
const profileFormInputName = document.getElementById("profile-name");
const profileFormInputDescription = document.getElementById("profile-description");
const addCardOpenButton = document.querySelector('.profile__add-button');
const nameTitle = document.querySelector('.profile__name');
const descriptionParagraph = document.querySelector('.profile__description');
const imageCloseButton = document.getElementById('close-button-image');
const cardImagePopup = document.getElementById('popup-image');
const nameInput = document.getElementById('card-title');
const linkInput = document.getElementById('card-image-link');

const defaultCardList = new Section({items:initialCards, renderer:(item) => {
        const cardElement = generateCard(item);
        defaultCardList.addItem(cardElement);
    }
}, cardListSelector);

defaultCardList.renderItems();

function generateCard(item) {
    const card = new Card(item, 'element-card-li', cardImagePopup, openPopup);
    return card.generateCard();
}

function configurateValidation() {

    const profileFormValidation = new FormValidator(config, profileForm);
    profileFormValidation.enableValidation();

    const cardFormValidation = new FormValidator(config, cardForm);
    cardFormValidation.enableValidation();
}


function closePopupByEsc(event) {
    if (event.key === "Escape") {
        const popup = document.querySelector('.popup_is-open');
        closePopup(popup);
    }
}

function openPopup(popup) {
    popup.classList.add('popup_is-open');
    document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_is-open');
    document.removeEventListener('keydown', closePopupByEsc)
}

function popupOverlayClickHandler(event) {
    if (event.target.classList.contains('popup')) {
        closePopup(event.target)
    }
}

profileEditButton.addEventListener('click', ()=> {
    profileFormInputName.value = nameTitle.textContent;
    profileFormInputDescription.value = descriptionParagraph.textContent;
    openPopup(profilePopup);
});

profileCloseButton.addEventListener('click', ()=>{
    closePopup(profilePopup);
});

cardCloseButton.addEventListener('click', ()=>{
    closePopup(cardPopup);
});

addCardOpenButton.addEventListener('click',()=> {
    openPopup(cardPopup);
});

profileForm.addEventListener('submit', (event)=> {
    event.preventDefault();

    nameTitle.textContent = profileFormInputName.value;
    descriptionParagraph.textContent = profileFormInputDescription.value;

    closePopup(profilePopup);
});

cardForm.addEventListener('submit',(event)=> {
    event.preventDefault();

    const item = {
                    name: nameInput.value,
                    link: linkInput.value
    };

    const cardElement = generateCard(item);
    defaultCardList.addItem(cardElement);

    cardForm.reset();

    closePopup(cardPopup);
});

imageCloseButton.addEventListener('click', ()=>{
    closePopup(cardImagePopup);
});

profilePopup.addEventListener('click', popupOverlayClickHandler);

cardPopup.addEventListener('click', popupOverlayClickHandler);

cardImagePopup.addEventListener('click', popupOverlayClickHandler);

configurateValidation();