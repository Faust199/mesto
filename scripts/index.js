const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup');
const profileCloseButton = document.querySelector('.popup__close-button');
const profileForm = document.querySelector('.popup__form');
const profileFormInputName = document.getElementById("input_name");
const profileFormInputDescription = document.getElementById("input_description");

const nameTitle = document.querySelector('.profile__name');
const descriptionParagraph = document.querySelector('.profile__description');


function openOrCloseProfilePopup() {
    profilePopup.classList.toggle('popup_is-open');
    profileFormInputName.value = nameTitle.textContent;
    profileFormInputDescription.value = descriptionParagraph.textContent;
}

function submitProfileForm(event) {
    event.preventDefault();
    nameTitle.textContent = profileFormInputName.value;
    descriptionParagraph.textContent = profileFormInputDescription.value;
    openOrCloseProfilePopup();
}

profileEditButton.addEventListener('click', openOrCloseProfilePopup);
profileCloseButton.addEventListener('click', openOrCloseProfilePopup);
profileForm.addEventListener('submit', submitProfileForm);