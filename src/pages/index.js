import Card from "../components/Card.js";
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
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
    popupCaptionSelector,
    profileNameSelector,
    profileAboutSelector,
    profileAvatarSelector,
    profileAvatarContainerSelector
} from "../utils/constants.js";

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardOpenButton = document.querySelector('.profile__add-button');

const api = new Api(baseUrl, token);

const userInfo = new UserInfo(profileNameSelector, profileAboutSelector, profileAvatarSelector, profileAvatarContainerSelector);
userInfo.getAvatarContainer().addEventListener('click', ()=> {
    avatarPopup.open();
});

const defaultCardList = new Section({renderer:(item) => {
        const cardElement = generateCard(item);
        defaultCardList.appendItem(cardElement);
    }
}, cardListSelector);

const avatarPopup = new PopupWithForm({handleFormSubmit:(formData) => {
        avatarPopup.renderLoading("Сохранение...");
        api.setUserAvatar(formData.url)
            .then(res => {
                userInfo.setUserInfo(res)
                avatarPopup.close();
            })
            .catch(err => {
                console.log(`get avatar error ${err}`);
            }).finally(() => {
                avatarPopup.renderLoading("Сохранить");
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
        userInfo.setUserInfo(res)
        userInfo.generateUser();
        getInitialCards();
    })
    .catch(err => {
        console.log(`get user error ${err}`);
    });

const cardImagePopup = new PopupWithImage(cardImagePopupID, popupCloseButtonSelector, popupClassSelector, popupOpenClassSelector, popupImageSelector, popupCaptionSelector);
cardImagePopup.setEventListeners();

const cardDeletePopup = new PopupWithConfirmation({handleFormSubmit:(card) => {
        api.removeCard(card._id)
            .then(res => {
                card.removeCard();
                cardDeletePopup.close();
            })
            .catch(err => {
                console.log(`get card delete error ${err}`);
            });
    },popupSelector:popupCardDeleteSelector, popupCloseButtonSelector, popupClassSelector, popupOpenClassSelector, formSelector});
cardDeletePopup.setEventListeners();


function generateCard(item) {
    const card = new Card({data:item, cardTemplateSelector:cardTemplateSelector, userId:userInfo.getUserId(),
        handleCardClick:(imageData) => {
            cardImagePopup.setImageInfo(imageData);
            cardImagePopup.open();
        },
        handleDeleteCardClick:(cardElement) => {
        cardDeletePopup.open(card);
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
    profilePopup.renderLoading("Сохранение...");
    api.updateUser(formData.name, formData.description)
        .then(res => {
            userInfo.setUserInfo(res);
            profilePopup.close();
        })
        .catch(err => {
            console.log(`update user error ${err}`);
        })
        .finally(() =>{
            profilePopup.renderLoading("Сохранить");
        });
    }, popupSelector:popupProfileSelector, popupCloseButtonSelector, popupClassSelector, popupOpenClassSelector, formSelector, formInputSelector});

profilePopup.setEventListeners();

const cardPopup = new PopupWithForm({handleFormSubmit:(formData) => {
        cardPopup.renderLoading("Создание...");
        api.addCard(formData.title, formData.url)
            .then(res => {
                const cardElement = generateCard(res);
                defaultCardList.prependItem(cardElement);
                cardPopup.close();
            })
            .catch(err => {
                console.log(`add card error ${err}`);
            })
            .finally(()=>{
                cardPopup.renderLoading("Создать");
            });
        }, popupSelector:popupCardSelector, popupCloseButtonSelector, popupClassSelector, popupOpenClassSelector, formSelector, formInputSelector});

cardPopup.setEventListeners();

function configurateValidation() {

    const formValidation = new FormValidator(config, popupProfileSelector, formSelector);
    formValidation.enableValidation();

    const cardFormValidation = new FormValidator(config, popupCardSelector, formSelector);
    cardFormValidation.enableValidation();

    const avatarFormValidation = new FormValidator(config, popupAvatarSelector, formSelector);
    avatarFormValidation.enableValidation();
}

profileEditButton.addEventListener('click', ()=> {
    profilePopup.setInfo(userInfo.getUserInfo());
    profilePopup.open();
});

addCardOpenButton.addEventListener('click',()=> {
    cardPopup.open();
});

configurateValidation();