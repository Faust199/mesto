import Card from "../components/Card.js";
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

import {
    apiOptions,
    config,
    cardListSelector,
    cardTemplateSelector,
    popupProfileSelector,
    popupCardSelector,
    cardImagePopupID,
    popupCardDeleteSelector,
} from "../utils/constants.js";

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardOpenButton = document.querySelector('.profile__add-button');

const api = new Api(apiOptions);
let userInfo;
let defaultCardList;

function getInitialCards() {
    api.getInitialCards()
        .then(res => {
            defaultCardList = new Section({items:res, renderer:(item) => {
                    const cardElement = generateCard(item);
                    defaultCardList.addItem(cardElement);
                }
            }, cardListSelector);

            defaultCardList.renderItems();
        })
        .catch(err => {
            console.log(`initial cards error ${err}`);
        });
}

api.getUser()
    .then(res => {
        userInfo = new UserInfo(res);
        userInfo.generateUser();
        getInitialCards();
    })
    .catch(err => {
        console.log(`get user error ${err}`);
    });



const cardImagePopup = new PopupWithImage(cardImagePopupID);
cardImagePopup.setEventListeners();

function generateCard(item) {
    const card = new Card({data:item, cardTemplateSelector:cardTemplateSelector, userId:userInfo.getUserId(),
        handleCardClick:(imageData) => {
            cardImagePopup.setImageInfo(imageData);
            cardImagePopup.open();
        },
        handleDeleteCardClick:(cardElement) => {
        const cardDeletePopup = new PopupWithForm({handleFormSubmit:() => {
            const cardRemoveOptions = {
                method: 'DELETE',
                headers: {
                    authorization: '40597a19-fb7a-4964-88bb-61fbfd8dee61',
                    'Content-Type': 'application/json'
                }
            }
            api.removeCard(cardRemoveOptions, card.getCardId())
                .then(res => {
                    cardElement.remove();
                    cardDeletePopup.close();
                })
                .catch(err => {
                    cardDeletePopup.close();
                    console.log(`get card delete error ${err}`);
                });
            },popupSelector:popupCardDeleteSelector});
        cardDeletePopup.setEventListeners();
        cardDeletePopup.open();
    },
        handleLikeOrDislikeCard:() => {
        let likeOrDislikeOptions;
        if (!card.cardIsLiked()) {
            likeOrDislikeOptions = {
                method: 'PUT',
                headers: {
                    authorization: '40597a19-fb7a-4964-88bb-61fbfd8dee61',
                    'Content-Type': 'application/json'
                }
            }
        } else {
            likeOrDislikeOptions = {
                method: 'DELETE',
                headers: {
                    authorization: '40597a19-fb7a-4964-88bb-61fbfd8dee61',
                    'Content-Type': 'application/json'
                }
            }
        }
        api.likeOrDislikeCard(likeOrDislikeOptions, card.getCardId())
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
    const userUpdateOptions = {
        method: 'PATCH',
        headers: {
            authorization: '40597a19-fb7a-4964-88bb-61fbfd8dee61',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.name,
            about: formData.description
        })
    };
    api.updateUser(userUpdateOptions)
        .then(res => {
            userInfo.setUserInfo(res);
            profilePopup.close();
        })
        .catch(err => {
            console.log(`update user error ${err}`);
        });
    }, popupSelector:popupProfileSelector});

profilePopup.setEventListeners();

const cardPopup = new PopupWithForm({handleFormSubmit:(formData) => {
        const cardAddOptions = {
            method: 'POST',
            headers: {
                authorization: '40597a19-fb7a-4964-88bb-61fbfd8dee61',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.title,
                link: formData.url
            })
        };

        api.addCard(cardAddOptions)
            .then(res => {
                const cardElement = generateCard(res);
                defaultCardList.addItem(cardElement);
                cardPopup.close();
            })
            .catch(err => {
                console.log(`add card error ${err}`);
            });
    }, popupSelector:popupCardSelector});

cardPopup.setEventListeners();

function configurateValidation() {

    const formValidation = new FormValidator(config, popupProfileSelector);
    formValidation.enableValidation();

    const cardFormValidation = new FormValidator(config, popupCardSelector);
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