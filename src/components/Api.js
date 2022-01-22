export default class Api {
    constructor(options) {
        this._options = options;
        this._baseUrl = "https://mesto.nomoreparties.co/v1/cohort-34";
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, this._options)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            }).then(cards => {
                return cards;
            }).catch((err) => {
                console.log(err);
            });
    }

    addCard(cardAddOptions) {
        return fetch(`${this._baseUrl}/cards`, cardAddOptions)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            }).then(card => {
                return card;
            }).catch((err) => {
                console.log(err);
            });
    }

    getUser() {
        return fetch(`${this._baseUrl}/users/me`, this._options)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            }).then(user => {
                return user;
            }).catch((err) => {
                console.log(err);
            });
    }

    updateUser(userUpdateOptions) {
        return fetch(`${this._baseUrl}/users/me`, userUpdateOptions)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            }).then(user => {
                return user;
            }).catch((err) => {
                console.log(err);
            });
    }

}
