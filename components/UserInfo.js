export default class UserInfo {
    constructor({profileNameSelector, profileDescriptionSelector}) {
        this._profileNameSelector = profileNameSelector;
        this._profileDescriptionSelector = profileDescriptionSelector;
    }

    _getProfileNameElement() {
        const profileNameElement = document.querySelector(this._profileNameSelector);
        return profileNameElement;
    }

    _getProfileDescriptionElement() {
        const profileDescriptionElement = document.querySelector(this._profileDescriptionSelector);
        return profileDescriptionElement;
    }

    getUserInfo() {
        const userProfile = {name:this._getProfileNameElement().textContent,
                             description:this._getProfileDescriptionElement().textContent};
        return userProfile;
    }

    setUserInfo({name, description}) {
        console.log(`${this._getProfileNameElement().textContent} and F ${this._getProfileDescriptionElement().textContent}`);
        console.log(`${name} and ${description}`);
        this._getProfileNameElement().textContent = name;
        this._getProfileDescriptionElement().textContent = description;
    }
}