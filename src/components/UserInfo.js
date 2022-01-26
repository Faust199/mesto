export default class UserInfo {
    constructor(profileNameSelector, profileAboutSelector, profileAvatarSelector, profileAvatarContainerSelector) {
        this._name = "name";
        this._about = "about";
        this._id = "_id";
        this._nameLabel = document.querySelector(profileNameSelector);
        this._aboutLabel = document.querySelector(profileAboutSelector);
        this._avatarImage = document.querySelector(profileAvatarSelector);
        this._avatarContainer = document.querySelector(profileAvatarContainerSelector);
    }

    generateUser() {
        this._nameLabel.textContent = this._name;
        this._aboutLabel.textContent = this._about;
    }

    getAvatarContainer() {
        return this._avatarContainer;
    }

    getUserId() {
        return this._id;
    }

    getUserInfo() {
        const userProfile = {name:this._nameLabel.textContent,
                             description:this._aboutLabel.textContent};
        return userProfile;
    }

    setUserInfo(user) {
        this._name = user.name;
        this._avatarImage.src = user.avatar;
        this._avatarImage.alt = this._name;
        this._about = user.about;
        this._id = user._id;
        this._nameLabel.textContent = this._name;
        this._aboutLabel.textContent = this._about;
    }
}