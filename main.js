(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n),e.addEventListener("click",r)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n),e.removeEventListener("click",r)}function n(e){if("Escape"===e.key){var n=document.querySelector(".popup_is-opened");n&&t(n)}}function r(e){e.target.classList.contains("popup")&&t(e.target)}document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated")}))}));var o={baseUrl:"https://nomoreparties.co/v1/wff-cohort-19",headers:{authorization:"878cfee3-5ec1-4b30-9e7b-65970d5d34eb","Content-Type":"application/json"}},c=function(e){return e.ok?e.json():e.json().then((function(t){return Promise.reject("Ошибка ".concat(e.status,": ").concat(t.message||"Неизвестная ошибка"))}))};function a(){return fetch("".concat(o.baseUrl,"/users/me"),{method:"GET",headers:o.headers}).then(c)}function u(){return fetch("".concat(o.baseUrl,"/cards"),{method:"GET",headers:o.headers}).then(c)}function i(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:o.headers}).then(c)}function l(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:o.headers}).then(c)}a().then((function(e){console.log("Данные пользователя:",e)})).catch((function(e){console.error("Ошибка:",e)})),u().then((function(e){console.log("Карточки:",e)})).catch((function(e){console.error("Ошибка:",e)}));var s=document.querySelector("#card-template").content;function d(e,t){(function(e){return fetch("".concat(o.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:o.headers}).then(c)})(e).then((function(){t.remove()})).catch((function(e){console.error("Ошибка при удалении карточки:",e)}))}function p(e,t,n){(e.target.classList.contains("card__like-button_is-active")?l:i)(t).then((function(t){f(n,t.likes.length),e.target.classList.toggle("card__like-button_is-active")})).catch((function(e){return console.log(e)}))}function f(e,t){e.textContent=t}function _(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent="",t.setCustomValidity("")}function m(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){_(e,n,t)})),v(r,t)}function y(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?h(t,n):v(t,n)}var v=function(e,t){e.disabled=!0,e.classList.add(t.inactiveButtonClass)},h=function(e,t){e.disabled=!1,e.classList.remove(t.inactiveButtonClass)};function S(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var b,q,g=document.querySelector(".profile__edit-button"),E=document.querySelector(".popup_type_edit"),L=E.querySelector(".popup__form"),C=L.querySelector(".popup__input_type_name"),k=L.querySelector(".popup__input_type_description"),A=document.querySelector(".profile"),x=A.querySelector(".profile__title"),U=A.querySelector(".profile__description"),T=document.querySelector(".popup_type_new-card"),w=T.querySelector(".popup__form"),j=document.querySelector(".profile__add-button"),O=document.querySelectorAll(".popup__close"),B=w.querySelector(".popup__input_type_card-name"),D=w.querySelector(".popup__input_type_url"),P=document.querySelector(".popup_type_image"),I=document.querySelector(".popup__content_content_image"),M=I.querySelector(".popup__image"),N=I.querySelector(".popup__caption"),J=document.querySelector(".places__list"),V=document.forms["new-place"],G=document.forms["edit-profile"],H=document.forms["edit-avatar"],z=document.querySelector(".profile__image"),$=document.querySelector('.popup__form[name="edit-avatar"]'),F=$.querySelector(".popup__input_type_url"),K=($.querySelector(".popup__button"),document.querySelector(".popup_type_edit-avatar")),Q={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function R(e,t){var n=e.getAttribute("data-default-text"),r=e.getAttribute("data-loading");t?(e.textContent=r,e.disabled=!0):(e.textContent=n,e.disabled=!1)}function W(t,n){M?(M.src=t,M.alt=n,N.textContent=n,e(P)):console.error("Элемент не найден")}function X(e,t,n,r,o){var c=function(e,t,n,r,o){var c=s.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__image");a.src=e.link,a.alt="Фотография ".concat(e.name),a.addEventListener("click",(function(){return n(e.link,e.name)})),c.querySelector(".card__title").textContent=e.name;var u=c.querySelector(".card__like-button"),i=c.querySelector(".card__likes-count");f(i,e.likes.length),u.addEventListener("click",(function(t){r(t,e._id,i)})),e.likes.some((function(e){return e._id===t}))&&u.classList.add("card__like-button_is-active");var l=c.querySelector(".card__delete-button");return e.owner._id!==t?l.style.display="none":l.addEventListener("click",(function(){return o(e._id,c)})),c}(e,t,n,r,o);J.prepend(c)}q=Q,Array.from(document.querySelectorAll(q.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);y(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?_(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),y(n,r,t)}))}))}(e,q)})),L.addEventListener("submit",(function(e){(function(e){e.preventDefault();var n,r,a=G.querySelector(".popup__button");R(a,!0),(n=C.value,r=k.value,fetch("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify({name:n,about:r})}).then(c)).then((function(e){x.textContent=e.name,U.textContent=e.about,t(E)})).catch((function(e){return console.log("Ошибка при обновлении данных пользователя: ".concat(e))})).finally((function(){R(a,!1)}))})(e),m(L,Q)})),w.addEventListener("submit",(function(e){(function(e){e.preventDefault();var n,r,a=V.querySelector(".popup__button");R(a,!0),(n=B.value,r=D.value,fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify({name:n,link:r})}).then(c)).then((function(e){X(e,b,W,p,d),t(T),w.reset()})).catch((function(e){return console.log("Ошибка при добавлении карточки: ".concat(e))})).finally((function(){R(a,!1)}))})(e),m(w,Q)})),O.forEach((function(e){e.addEventListener("click",(function(){t(e.closest(".popup"))}))})),j.addEventListener("click",(function(){m(w,Q),e(T)})),g.addEventListener("click",(function(){C.value=x.textContent,k.value=U.textContent,m(L,Q),e(E)})),K.addEventListener("click",r),z.addEventListener("click",(function(){$.reset(),m($,Q),e(K)})),$.addEventListener("submit",(function(e){e.preventDefault();var n,r=H.querySelector(".popup__button");R(r,!0),(n=F.value,fetch("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify({avatar:n})}).then(c)).then((function(e){t(K),z.style.backgroundImage="url('".concat(e.avatar,"')")})).catch((function(e){return console.log("Ошибка при редактировании аватара: ".concat(e))})).finally((function(){R(r,!1)}))})),Promise.all([a(),u()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return S(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?S(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];!function(e){x.textContent=e.name,U.textContent=e.about,z.style.backgroundImage="url(".concat(e.avatar,")"),b=e._id}(o),function(e){e.forEach((function(e){X(e,b,W,p,d)}))}(c)})).catch((function(e){console.error("Ошибка при загрузке данных:",e)}))})();