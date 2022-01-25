(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var t=function(){function t(e){var n=e.data,o=e.cardTemplateSelector,r=e.userId,i=e.handleCardClick,a=e.handleDeleteCardClick,s=e.handleToggleLike;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._link=n.link,this._name=n.name,this._likes=n.likes,this._owner=n.owner,this._id=n._id,this._userId=r,this._cardTemplateSelector=o,this._handleCardClick=i,this._handleDeleteCardClick=a,this._isLiked=!1,this._handleToggleLike=s}var n,o;return n=t,(o=[{key:"_getTemplate",value:function(){var e=document.getElementById(this._cardTemplateSelector).content.querySelector(".elements__element").cloneNode(!0);return this._image=e.querySelector(".elements__element-image"),this._deleteButton=e.querySelector(".elements__element-delete"),this._likeButton=e.querySelector(".elements__element-like"),this._owner._id!=this._userId&&this._deleteButton.remove(),this._likeCountParagraph=e.querySelector(".elements__element-like_number"),e}},{key:"_setIsLiked",value:function(){0==this._likes.length&&(this._isLiked=!1);for(var e=0;e<=this._likes.length;e++){var t=this._likes[e];t&&(t._id==this._userId?this._isLiked=!0:this._isLiked=!1)}}},{key:"_toggleLikeButton",value:function(){this._likeButton.classList.toggle("elements__element-like_active",this._isLiked)}},{key:"_setEventListeners",value:function(){var e=this;this._image.addEventListener("click",(function(){var t={imageSrc:e._link,title:e._name};e._handleCardClick(t)})),this._deleteButton.addEventListener("click",(function(){e._handleDeleteCardClick()})),this._likeButton.addEventListener("click",(function(){e._handleToggleLike()}))}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._image.src=this._link,this._image.alt=this._name,this._likeCountParagraph.textContent=this._likes.length,this._element.querySelector(".elements__element-title").textContent=this._name,this._setIsLiked(),this._toggleLikeButton(),this._setEventListeners(),this._element}},{key:"getCardId",value:function(){return this._id}},{key:"cardIsLiked",value:function(){return this._isLiked}},{key:"updateCardLikes",value:function(e){this._likes=e.likes,this._setIsLiked(),this._toggleLikeButton(),this._likeCountParagraph.textContent=this._likes.length}},{key:"removeCard",value:function(){this._element.remove()}}])&&e(n.prototype,o),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var o=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t,this._token=n}var t,o;return t=e,(o=[{key:"_parseResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getInitialCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{headers:{authorization:this._token}}).then(this._parseResponse)}},{key:"addCard",value:function(e,t){return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({name:e,link:t})}).then(this._parseResponse)}},{key:"removeCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:{authorization:this._token,"Content-Type":"application/json"}}).then(this._parseResponse)}},{key:"toggleLike",value:function(e,t){var n;return n=e?{method:"DELETE",headers:{authorization:this._token,"Content-Type":"application/json"}}:{method:"PUT",headers:{authorization:this._token,"Content-Type":"application/json"}},fetch("".concat(this._baseUrl,"/cards/").concat(t,"/likes"),n).then(this._parseResponse)}},{key:"getUser",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{headers:{authorization:this._token}}).then(this._parseResponse)}},{key:"updateUser",value:function(e,t){return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({name:e,about:t})}).then(this._parseResponse)}},{key:"setUserAvatar",value:function(e){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({avatar:e})}).then(this._parseResponse)}}])&&n(t.prototype,o),Object.defineProperty(t,"prototype",{writable:!1}),e}();function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var i=function(){function e(t,n){var o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"prependItem",value:function(e){this._container.prepend(e)}},{key:"appendItem",value:function(e){this._container.append(e)}},{key:"clear",value:function(){this._container.innerHTML=""}},{key:"renderItems",value:function(e){var t=this;this.clear(),e.forEach((function(e){t._renderer(e)}))}}])&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function a(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var s=function(){function e(t,n,o,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.getElementById(t),this._closeButton=this._popup.querySelector(n),this._popupClassSelector=o,this._popupOpenClassSelector=r,this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){document.addEventListener("keydown",this._handleEscClose),this._popup.classList.add(this._popupOpenClassSelector)}},{key:"close",value:function(){this._popup.classList.remove(this._popupOpenClassSelector),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var e=this;this._closeButton.addEventListener("click",(function(){e.close()})),this._popup.addEventListener("click",(function(t){t.target.classList.contains(e._popupClassSelector)&&e.close()}))}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}}])&&a(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function c(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function l(){return l="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=p(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(arguments.length<3?e:n):r.value}},l.apply(this,arguments)}function p(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=d(e)););return e}function f(e,t){return f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},f(e,t)}function h(e,t){if(t&&("object"===u(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function d(e){return d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},d(e)}var _=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&f(e,t)}(a,e);var t,n,o,r,i=(o=a,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=d(o);if(r){var n=d(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return h(this,e)});function a(e){var t,n=e.handleFormSubmit,o=e.popupSelector,r=e.popupCloseButtonSelector,s=e.popupClassSelector,u=e.popupOpenClassSelector,c=e.formSelector,l=e.formInputSelector;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,o,r,s,u))._handleFormSubmit=n,t._form=t._popup.querySelector(c),t._inputList=t._form.querySelectorAll(l),t._submitButton=t._form.querySelector(".popup__submit-button"),t}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){return e._formValues[t.name]=t.value})),this._formValues}},{key:"renderLoading",value:function(e){this._submitButton.textContent=e}},{key:"setEventListeners",value:function(){var e=this;l(d(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._handleFormSubmit(e._getInputValues()),e._form.reset()}))}},{key:"setInfo",value:function(e){this._inputList.forEach((function(t){return t.value=e[t.name]}))}},{key:"close",value:function(){l(d(a.prototype),"close",this).call(this),this._form.reset()}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(s);function y(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v=function(){function e(t,n,o){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),m(this,"_showInputError",(function(e){var t=r._form.querySelector(".".concat(e.id,"-error"));e.classList.add(r._config.inputErrorClass),t.textContent=e.validationMessage})),m(this,"_hideInputError",(function(e){var t=r._form.querySelector(".".concat(e.id,"-error"));e.classList.remove(r._config.inputErrorClass),t.textContent=""})),m(this,"_checkInputValidity",(function(e){e.validity.valid?r._hideInputError(e):r._showInputError(e)})),this._config=t,this._form=document.getElementById(n).querySelector(o),this._submitButton=this._form.querySelector(t.submitButtonSelector)}var t,n;return t=e,(n=[{key:"_setInputsEventListeners",value:function(){var e=this;Array.from(this._form.querySelectorAll(this._config.inputSelector)).forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))}))}},{key:"_toggleButtonState",value:function(){this._form.checkValidity()?(this._submitButton.classList.remove(this._config.inactiveButtonClass),this._submitButton.disabled=!1):(this._submitButton.classList.add(this._config.inactiveButtonClass),this._submitButton.disabled=!0)}},{key:"enableValidation",value:function(){var e=this;this._form.addEventListener("submit",(function(t){t.preventDefault(),e._toggleButtonState()})),this._setInputsEventListeners()}}])&&y(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function g(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function k(e,t){return k=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},k(e,t)}function C(e,t){if(t&&("object"===b(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function S(e){return S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},S(e)}var L=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&k(e,t)}(a,e);var t,n,o,r,i=(o=a,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=S(o);if(r){var n=S(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return C(this,e)});function a(e,t,n,o,r,s){var u;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(u=i.call(this,e,t,n,o))._popupContentImage=u._popup.querySelector(r),u._popupTitle=u._popup.querySelector(s),u}return t=a,(n=[{key:"setImageInfo",value:function(e){var t=e.imageSrc,n=e.title;this._popupContentImage.src=t,this._popupContentImage.alt=n,this._popupTitle.textContent=n}}])&&g(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(s);function w(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var E,I=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name="name",this._about="about",this._id="_id",this._nameLabel=document.querySelector(".profile__name"),this._aboutLabel=document.querySelector(".profile__description"),this._avatarImage=document.querySelector(".profile__avatar"),this._avatarEditImage=document.querySelector(".profile__avatar-edit"),this._avatarContainer=document.querySelector(".profile__avatar-container")}var t,n;return t=e,(n=[{key:"generateUser",value:function(){this._nameLabel.textContent=this._name,this._aboutLabel.textContent=this._about}},{key:"getAvatarContainer",value:function(){return this._avatarContainer}},{key:"getAvatarEditImage",value:function(){return this._avatarEditImage}},{key:"getUserId",value:function(){return this._id}},{key:"updateUser",value:function(e){this._name=e.name,this._avatarImage.src=e.avatar,this._avatarImage.alt=this._name,this._about=e.about,this._id=e._id}},{key:"getUserInfo",value:function(){return{name:this._nameLabel.textContent,description:this._aboutLabel.textContent}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.about;this._nameLabel.textContent=t,this._aboutLabel.textContent=n}}])&&w(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),O=".popup__close-button",j="popup",B="popup_is-open",P=".popup__form",T=".popup__input",U="popup-profile",q="popup-card",R={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit-button",inactiveButtonClass:"popup__submit-button_inactive",closeButtonSelector:".popup__close-button",inputErrorClass:"popup__input_type_error",spanErrorClass:"popup__error"},x=document.querySelector(".profile__edit-button"),D=document.querySelector(".profile__add-button"),V=new o("https://mesto.nomoreparties.co/v1/cohort-34","40597a19-fb7a-4964-88bb-61fbfd8dee61"),A=new I,z=new i({renderer:function(e){var t=J(e);z.appendItem(t)}},".elements__element-list"),F=new _({handleFormSubmit:function(e){F.renderLoading("Сохранение..."),V.setUserAvatar(e.url).then((function(e){A.updateUser(e),F.close()})).catch((function(e){console.log("get avatar error ".concat(e))})).finally((function(){F.renderLoading("Сохранить")}))},popupSelector:"popup-avatar",popupCloseButtonSelector:O,popupClassSelector:j,popupOpenClassSelector:B,formSelector:P,formInputSelector:T});F.setEventListeners(),V.getUser().then((function(e){A.updateUser(e),A.getAvatarContainer().addEventListener("click",(function(){F.open()})),A.generateUser(),V.getInitialCards().then((function(e){z.renderItems(e)})).catch((function(e){console.log("initial cards error ".concat(e))}))})).catch((function(e){console.log("get user error ".concat(e))}));var N=new L("popup-image",O,j,B,".popup__image",".popup__caption");N.setEventListeners();var H=new _({handleFormSubmit:function(){V.removeCard(E.getCardId()).then((function(e){E.removeCard(),H.close()})).catch((function(e){console.log("get card delete error ".concat(e))}))},popupSelector:"popup-card_delete",popupCloseButtonSelector:O,popupClassSelector:j,popupOpenClassSelector:B,formSelector:P,formInputSelector:T});function J(e){var n=new t({data:e,cardTemplateSelector:"element-card-li",userId:A.getUserId(),handleCardClick:function(e){N.setImageInfo(e),N.open()},handleDeleteCardClick:function(e){E=n,H.open()},handleToggleLike:function(){V.toggleLike(n.cardIsLiked(),n.getCardId()).then((function(e){n.updateCardLikes(e)})).catch((function(e){console.log("get card like or dislike error ".concat(e))}))}});return n.generateCard()}H.setEventListeners();var M=new _({handleFormSubmit:function(e){M.renderLoading("Сохранение..."),V.updateUser(e.name,e.description).then((function(e){A.setUserInfo(e),M.close()})).catch((function(e){console.log("update user error ".concat(e))})).finally((function(){M.renderLoading("Сохранить")}))},popupSelector:U,popupCloseButtonSelector:O,popupClassSelector:j,popupOpenClassSelector:B,formSelector:P,formInputSelector:T});M.setEventListeners();var G=new _({handleFormSubmit:function(e){G.renderLoading("Создание..."),V.addCard(e.title,e.url).then((function(e){var t=J(e);z.prependItem(t),G.close()})).catch((function(e){console.log("add card error ".concat(e))})).finally((function(){G.renderLoading("Создать")}))},popupSelector:q,popupCloseButtonSelector:O,popupClassSelector:j,popupOpenClassSelector:B,formSelector:P,formInputSelector:T});G.setEventListeners(),x.addEventListener("click",(function(){M.setInfo(A.getUserInfo()),M.open()})),D.addEventListener("click",(function(){G.open()})),new v(R,U,P).enableValidation(),new v(R,q,P).enableValidation()})();