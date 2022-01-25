import Card from "../components/Card.js";
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

import {
    formSelector,
    formInputSelector,
    config,
    cardListSelector,
    cardTemplateSelector,
    popupProfileSelector,
    popupCardSelector,
    cardImagePopupID,
    popupCardDeleteSelector,
    popupAvatarSelector,
    baseUrl,
    token,
    popupCloseButtonSelector,
    popupClassSelector,
    popupOpenClassSelector,
    popupImageSelector,
    popupCaptionSelector
} from "../utils/constants.js";

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardOpenButton = document.querySelector('.profile__add-button');

const api = new Api(baseUrl, token);
let deletedCard;
let userInfo = new UserInfo();

let defaultCardList = new Section({renderer:(item) => {
        const cardElement = generateCard(item);
        defaultCardList.appendItem(cardElement);
    }
}, cardListSelector);

const avatarPopup = new PopupWithForm({handleFormSubmit:(formData) => {
        api.setUserAvatar(formData.url)
            .then(res => {
                userInfo.updateUser(res)
                avatarPopup.close();
            })
            .catch(err => {
                console.log(`get avatar error ${err}`);
            });
    },popupSelector:popupAvatarSelector, popupCloseButtonSelector, popupClassSelector, popupOpenClassSelector, formSelector, formInputSelector});
avatarPopup.setEventListeners();

function getInitialCards() {
    api.getInitialCards()
        .then(res => {
            defaultCardList.renderItems(res);
        })
        .catch(err => {
            console.log(`initial cards error ${err}`);
        });
}

api.getUser()
    .then(res => {
        userInfo.updateUser(res)
        userInfo.getAvatarImage().addEventListener('click', ()=> {
            avatarPopup.open();
        });
        userInfo.generateUser();
        getInitialCards();
    })
    .catch(err => {
        console.log(`get user error ${err}`);
    });

const cardImagePopup = new PopupWithImage(cardImagePopupID, popupCloseButtonSelector, popupClassSelector, popupOpenClassSelector, popupImageSelector, popupCaptionSelector);
cardImagePopup.setEventListeners();

const cardDeletePopup = new PopupWithForm({handleFormSubmit:() => {
        api.removeCard(deletedCard.getCardId())
            .then(res => {
                deletedCard.removeCard();
                cardDeletePopup.close();
            })
            .catch(err => {
                console.log(`get card delete error ${err}`);
            });
    },popupSelector:popupCardDeleteSelector, popupCloseButtonSelector, popupClassSelector, popupOpenClassSelector, formSelector, formInputSelector});
cardDeletePopup.setEventListeners();


function generateCard(item) {
    const card = new Card({data:item, cardTemplateSelector:cardTemplateSelector, userId:userInfo.getUserId(),
        handleCardClick:(imageData) => {
            cardImagePopup.setImageInfo(imageData);
            cardImagePopup.open();
        },
        handleDeleteCardClick:(cardElement) => {
        deletedCard = card;
        cardDeletePopup.open();
    },
        handleToggleLike:() => {
        api.toggleLike(card.cardIsLiked(), card.getCardId())
            .then(res => {
                card.updateCardLikes(res);
            })
            .catch(err => {
                console.log(`get card like or dislike error ${err}`);
            });
    }
    });
    return card.generateCard();
}

const profilePopup = new PopupWithForm({handleFormSubmit:(formData) => {
    api.updateUser(formData.name, formData.description)
        .then(res => {
            userInfo.setUserInfo(res);
            profilePopup.close();
        })
        .catch(err => {
            console.log(`update user error ${err}`);
        });
    }, popupSelector:popupProfileSelector, popupCloseButtonSelector, popupClassSelector, popupOpenClassSelector, formSelector, formInputSelector});

profilePopup.setEventListeners();

const cardPopup = new PopupWithForm({handleFormSubmit:(formData) => {
        api.addCard(formData.title, formData.url)
            .then(res => {
                const cardElement = generateCard(res);
                defaultCardList.prependItem(cardElement);
                cardPopup.close();
            })
            .catch(err => {
                console.log(`add card error ${err}`);
            });
    }, popupSelector:popupCardSelector, popupCloseButtonSelector, popupClassSelector, popupOpenClassSelector, formSelector, formInputSelector});

cardPopup.setEventListeners();

function configurateValidation() {

    const formValidation = new FormValidator(config, popupProfileSelector, formSelector);
    formValidation.enableValidation();

    const cardFormValidation = new FormValidator(config, popupCardSelector, formSelector);
    cardFormValidation.enableValidation();
}

profileEditButton.addEventListener('click', ()=> {
    profilePopup.setInfo(userInfo.getUserInfo());
    profilePopup.open();
});

addCardOpenButton.addEventListener('click',()=> {
    cardPopup.open();
});

configurateValidation();