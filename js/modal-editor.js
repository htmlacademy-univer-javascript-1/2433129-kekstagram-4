import { MAX_COUNT_HASHTAG, HASTAG_REGEX, SubmitButtonText } from './constants.js';
import { resetEffect, setupEffect, removeEffect } from './image-effect.js';
import { resetScale, setupZoom, removeZoom } from './zoom-img.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './upload-message-status.js';

const documentBody = document.querySelector('body');
const form = documentBody.querySelector('.img-upload__form');
const editForm = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');
const imageLoadingField = form.querySelector('.img-upload__input ');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const submitButton = documentBody.querySelector('.img-upload__submit');

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-error-text',
});

const showForm = () => {
  editForm.classList.remove('hidden');
  documentBody.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
  setupZoom();
  setupEffect();
};

const hideForm = () => {
  editForm.classList.add('hidden');
  documentBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  removeZoom();
  removeEffect();
  form.reset();
  pristine.reset();
  resetScale();
  resetEffect();
};

const extarctHastag = (value) => value.trim().split(' ').filter((element) => element.length > 0);

const isHastagValid = (value) => extarctHastag(value).every((element) => HASTAG_REGEX.test(element));

const checkHastagLength = (value) => extarctHastag(value).length <= MAX_COUNT_HASHTAG;

const isHastagUnique = (value) => {
  const oneCaseHastags = extarctHastag(value).map((element) => element.toLowerCase());
  return new Set(oneCaseHastags).size === oneCaseHastags.length;
};


pristine.addValidator(hashtagField, checkHastagLength, `Нельзя вводить более ${MAX_COUNT_HASHTAG} хештегов :-(`);
pristine.addValidator(hashtagField, isHastagValid, 'Хештег невалиден :-(');
pristine.addValidator(hashtagField, isHastagUnique, 'Хештеги не должны повторяться :-(');


function onDocumentKeydown (evt) {
  if (evt.key === 'Escape' && document.activeElement !== hashtagField
  && document.activeElement !== commentField) {
    evt.preventDefault();
    hideForm();
  }
}

const onImageLoadingFieldChange = (evt) => {
  evt.preventDefault();
  const selectedField = imageLoadingField.files[0];
  if(selectedField.type.startsWith('image/') || /\.(jpg|jpeg|png|gif)$/i.test(selectedField.name)){
    showForm();
  }
};

function onCloseButtonClick (evt) {
  evt.preventDefault();
  hideForm();
}

const openEditModal = () => {
  imageLoadingField.addEventListener('change', onImageLoadingFieldChange);
};

const lockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unlockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      lockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(showSuccessMessage)
        .catch(()=>{
          showErrorMessage();
        }
        )
        .finally(unlockSubmitButton);
    }
  });
};

export { openEditModal, setFormSubmit, hideForm, onDocumentKeydown };
