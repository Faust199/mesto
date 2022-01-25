export default class UserInfo {
    constructor() {
        this._name = "name";
        this._about = "about";
        this._id = "_id";
        this._nameLabel = document.querySelector(".profile__name");
        this._aboutLabel = document.querySelector(".profile__description");
        this._avatarImage = document.querySelector(".profile__avatar");
        this._avatarEditImage = document.querySelector(".profile__avatar-edit");
        this._avatarContainer = document.querySelector(".profile__avatar-container");
    }

    generateUser() {
        this._nameLabel.textContent = this._name;
        this._aboutLabel.textContent = this._about;
    }

    getAvatarContainer() {
        return this._avatarContainer;
    }

    getAvatarEditImage() {
        return this._avatarEditImage;
    }

    getUserId() {
        return this._id;
    }

    updateUser(user) {
        this._name = user.name;
        this._avatarImage.src = user.avatar;
        this._avatarImage.alt = this._name;
        this._about = user.about;
        this._id = user._id;
    }

    getUserInfo() {
        const userProfile = {name:this._nameLabel.textContent,
                             description:this._aboutLabel.textContent};
        return userProfile;
    }

    setUserInfo({name, about}) {
        this._nameLabel.textContent = name;
        this._aboutLabel.textContent = about;
    }
}