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
const cardList = document.querySelector('.elements__element-list');
const cardImagePopup = document.getElementById('popup-image');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function setInitialCards(initialCards) {
    initialCards.forEach((item)=> {
        cardList.prepend(renderCard(item));
    });
}

setInitialCards(initialCards);

function renderCard(item) {
    const card = document.getElementById('element-card-li').content.cloneNode(true);

    const cardImage = card.querySelector(".elements__element-image");
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardImage.addEventListener('click', ()=> {
        openPopup(cardImagePopup);
        const popupContentImage = cardImagePopup.querySelector('.popup__image');
        popupContentImage.src = item.link;
        popupContentImage.alt = item.name;
        const  popupTitle = cardImagePopup.querySelector('.popup__caption');
        popupTitle.textContent = item.name;
    });

    const cardTitle = card.querySelector(".elements__element-title");
    cardTitle.textContent = item.name;

    const cardDeleteButton = card.querySelector(".elements__element-delete");
    cardDeleteButton.addEventListener('click', ()=> {
        const deletedCard = cardDeleteButton.closest('.elements__element');
        deletedCard.remove();
    });

    const cardLikeButton = card.querySelector(".elements__element-like");
    cardLikeButton.addEventListener('click', ()=> {
        cardLikeButton.classList.toggle('elements__element-like_active');
    });

    return card;
}

function closePopupByEsc(event) {
    const popup = document.querySelector('.popup_is-open');
    if (event.key === "Escape") {
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

    const nameInput = document.getElementById('card-title');
    const linkInput = document.getElementById('card-image-link');

    const item = {
                    name: nameInput.value,
                    link: linkInput.value
    };

    cardList.prepend(renderCard(item));

    nameInput.value = "";
    linkInput.value = "";

    closePopup(cardPopup);
});

imageCloseButton.addEventListener('click', ()=>{
    closePopup(cardImagePopup);
});

profilePopup.addEventListener('click', popupOverlayClickHandler);

cardPopup.addEventListener('click', popupOverlayClickHandler);

cardImagePopup.addEventListener('click', popupOverlayClickHandler);