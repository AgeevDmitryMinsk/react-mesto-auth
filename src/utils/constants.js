export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_visible'
};




//  selectors
export const profileSelectors = {
    profileName: '.profile__name',
    profileProfession: '.profile__subtitle',
    profileAvatar: '.profile__avatar'
}
export const template = 'template';
// cards section
export const elementsContainer = document.querySelector('.pictures');
export const elementsContainerSelectors = '.pictures';
// profile
// export const profileName = document.querySelector('.profile__name');
// export const profileJob = document.querySelector('.profile__subtitle');
export const openBtn = document.querySelector('.profile__button-edit');
export const openBtnSelector = '.profile__button-edit';
export const openBtnCreat = document.querySelector('.profile__button-add');
export const openPopupAvatar = document.querySelector('.profile__hover-edit');
// export const imgAvatarSelector = document.querySelector('.profile__avatar');

// popup
// export const overlay = document.querySelectorAll('.popup');
export const jobInput = document.querySelector('.popup__input-text_type_job');
export const popUpProfile = document.querySelector('.popup_profile');
export const popUpProfileSelector = '.popup_profile';
export const popUpCloseBtn = document.querySelector('.popup__close');
export const popUpForm = document.querySelector('.popup__form');
export const popUpFormSelect = popUpProfile.querySelector('.popup__form');
export const nameInput = document.querySelector('.popup__input-text_type_name');

// popup creat
export const popUpCreat = document.querySelector('.popup-creat');
export const popUpCreatSelector = '.popup-creat';
export const containerPopCreat = popUpCreat.querySelector('.popup-creat__container');
export const popUpCloseBtnCreat = document.querySelector('.popup-creat__close');
export const inputName = document.querySelector('.popup-creat__input-name');
export const inputLink = document.querySelector('.popup-creat__input-link');
export const formElAddCard = popUpCreat.querySelector('.popup-creat__form');

// popup img
export const btnImgPopClose = document.querySelector('.popup-img__close');
export const btnImgPopCloseSelector = '.popup-img__close';

export const btnImgPop = document.querySelector('.popup-img');
export const btnImgPopSelector = '.popup-img';
export const popImage = document.querySelector('.popup-img__image');
export const popImageSelector = '.popup-img__image';
export const popImageSub = document.querySelector('.popup-img__subtitle');
export const popImageSubSelector = '.popup-img__subtitle';

// popup remove 
export const popupRemoveSelector = '.popup-remove';
export const popupRemove = document.querySelector('.popup-remove');
export const popupRemoveCloseBtn = document.querySelector('.popup-remove__close');
export const popupRemoveForm = document.querySelector('.popup-remove__form');
export const popupRemoveSubmit = document.querySelector('.popup-remove__button');

//popup avatar
export const popupAvatar = document.querySelector('.popup-avatar');
export const popupAvatarform = popupAvatar.querySelector('.popup-avatar__form');
export const popupAvatarSelector = '.popup-avatar';
export const popupAvatarContainer = document.querySelector('.popup-avatar__container');
export const popupAvatarInput = document.querySelector('.popup-avatar__input-link');
export const popupAvatarBtnSubmit = document.querySelector('.popup-avatar__button');
export const profileAvatar = document.querySelector('.profile__avatar');