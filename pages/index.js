import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import {
    initialCards,
    config,
    cardListSelector,
    cardTemplateSelector,
    popupProfileSelector,
    popupCardSelector,
    cardImagePopupID,
    profileNameSelector,
    profileDescriptionSelector
} from "../utils/constants.js";

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardOpenButton = document.querySelector('.profile__add-button');

const userInfo = new UserInfo({profileNameSelector:profileNameSelector, profileDescriptionSelector:profileDescriptionSelector});

const defaultCardList = new Section({items:initialCards, renderer:(item) => {
        const cardElement = generateCard(item);
        defaultCardList.addItem(cardElement);
    }
}, cardListSelector);

defaultCardList.renderItems();

function generateCard(item) {
    const card = new Card({data:item, cardTemplateSelector:cardTemplateSelector, handleCardClick:(imageData) => {
        const popup = new PopupWithImage({imageSrc:imageData.imageSrc, title:imageData.title}, cardImagePopupID);
        popup.setEventListeners();
        popup.open();
        }
    });
    return card.generateCard();
}

const profilePopup = new PopupWithForm({handleFormSubmit:(formData) => {
        userInfo.setUserInfo({name:formData.name, description:formData.description});
        profilePopup.close();
    }, popupSelector:popupProfileSelector});

profilePopup.setEventListeners();

const cardPopup = new PopupWithForm({handleFormSubmit:(formData) => {
        const item = {
            name: formData.title,
            link: formData.url
        };
        const cardElement = generateCard(item);
        defaultCardList.addItem(cardElement);
        cardPopup.close();
    }, popupSelector:popupCardSelector});

cardPopup.setEventListeners();

function configurateValidation() {

    const formValidation = new FormValidator(config, popupProfileSelector);
    formValidation.enableValidation();

    const cardFormValidation = new FormValidator(config, popupCardSelector);
    cardFormValidation.enableValidation();
}

profileEditButton.addEventListener('click', ()=> {
    profilePopup.open();
});

addCardOpenButton.addEventListener('click',()=> {
    cardPopup.open();
});

configurateValidation();