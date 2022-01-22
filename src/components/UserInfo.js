export default class UserInfo {
    constructor({name, about, avatar}) {
        this._name = name;
        this._about = about;
        this._avatar = avatar;
        this._nameLabel = document.querySelector(".profile__name");
        this._aboutLabel = document.querySelector(".profile__description");
        this._avatarImage = document.querySelector(".profile__avatar");
    }

    generateUser() {
        this._nameLabel.textContent = this._name;
        this._aboutLabel.textContent = this._about;
        this._avatarImage.src = this._avatar;
        this._avatarImage.alt = this._name;
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