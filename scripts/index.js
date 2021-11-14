const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.getElementById('popup-profile');
const cardPopup = document.getElementById('popup-card');
const cardForm = cardPopup.querySelector('.popup__form');
const profileCloseButton = document.querySelector('.popup__close-button');
const profileForm = profilePopup.querySelector('.popup__form');
const profileFormInputName = document.getElementById("input_name");
const profileFormInputDescription = document.getElementById("input_description");
const addCardOpenButton = document.querySelector('.profile__add-button');
const nameTitle = document.querySelector('.profile__name');
const descriptionParagraph = document.querySelector('.profile__description');

const cardList = document.querySelector('.elements__element-list');

function setInitialCards() {
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

    initialCards.forEach((item)=> {
        setCardToHtml(item);
    });
}

setInitialCards();

function setCardToHtml(item) {
    const card = document.getElementById('element-card-li').content.cloneNode(true);

    const cardImagePopup = document.getElementById('popup-image');

    const cardImage = card.querySelector(".elements__element-image");
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardImage.addEventListener('click', ()=> {
        openPopup(cardImagePopup);
        const popupContentImage = cardImagePopup.querySelector('.popup__image');
        popupContentImage.src = cardImage.closest('.elements__element-image').src;
        popupContentImage.alt = cardImage.closest('.elements__element-image').alt;
        const  popupTitle = document.querySelector('.popup__caption');
        popupTitle.innerHTML = item.name;
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

    const imageCloseButton = document.getElementById('close-button-image');
    imageCloseButton.addEventListener('click', ()=>{
        closePopup(cardImagePopup);
    });

    cardList.appendChild(card);
}

function openPopup(popup) {
    popup.classList.add('popup_is-open');
}

function closePopup(popup) {
    popup.classList.remove('popup_is-open');
}

profileEditButton.addEventListener('click', ()=> {
    profileFormInputName.value = nameTitle.textContent;
    profileFormInputDescription.value = descriptionParagraph.textContent;
    openPopup(profilePopup);
});

profileCloseButton.addEventListener('click', ()=>{
    closePopup(profilePopup);
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

    const nameInput = document.getElementById('input_title');
    const linkInput = document.getElementById('input_link');

    const item = {
                    name: nameInput.value,
                    link: linkInput.value
    }

    setCardToHtml(item);

    nameInput.value = "";
    linkInput.value = "";

    closePopup(cardPopup);
});