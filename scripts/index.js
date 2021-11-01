const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup');
const profileCloseButton = document.querySelector('.popup__close-button');
const profileForm = document.querySelector('.popup__form');
const profileFormInputName = document.getElementById("input_name");
const profileFormInputDescription = document.getElementById("input_description");

const nameTitle = document.querySelector('.profile__name');
const descriptionParagraph = document.querySelector('.profile__description');

function openPopup() {
    profileFormInputName.value = nameTitle.textContent;
    profileFormInputDescription.value = descriptionParagraph.textContent;
    profilePopup.classList.add('popup_is-open');
}

function closePopup() {
    profilePopup.classList.remove('popup_is-open');
}

function submitProfileForm(event) {
    event.preventDefault();
    nameTitle.textContent = profileFormInputName.value;
    descriptionParagraph.textContent = profileFormInputDescription.value;
    closePopup();
}

profileEditButton.addEventListener('click', openPopup);
profileCloseButton.addEventListener('click', closePopup);
profileForm.addEventListener('submit', submitProfileForm);