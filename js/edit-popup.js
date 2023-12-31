import { resetEffectImage, setupEffectImage, removeEffectImage } from './effect-image.js';
import { resetScaleImage, setupScaleImage, removeScaleImage } from './scale-image.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './upload-status-message.js';
import { MAX_COUNT_HASHTAG, HASTAG_REGEX, SubmitButtonText } from './constants.js';


const documentBody = document.querySelector('body');
const form = documentBody.querySelector('.img-upload__form');
const editForm = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');
const imageLoadingField = form.querySelector('.img-upload__input ');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const submitButton = documentBody.querySelector('.img-upload__submit');
const myImage = documentBody.querySelector('.my-image-js');
const effectsPreview = documentBody.querySelectorAll('.effects__preview');

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
  setupScaleImage();
  setupEffectImage();
};

const hideForm = () => {
  editForm.classList.add('hidden');
  documentBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  removeScaleImage();
  removeEffectImage();
  form.reset();
  pristine.reset();
  resetScaleImage();
  resetEffectImage();
};

const extarctHastag = (value) => value.trim().split(' ').filter((element) => element.length > 0);

const isValidHastag = (value) => extarctHastag(value).every((element) => HASTAG_REGEX.test(element));

const isAmountHastag = (value) => extarctHastag(value).length <= MAX_COUNT_HASHTAG;

const isUniqueHastag = (value) => {
  const oneCaseHastags = extarctHastag(value).map((element) => element.toLowerCase());
  return new Set(oneCaseHastags).size === oneCaseHastags.length;
};

pristine.addValidator(hashtagField, isAmountHastag, `Нельзя вводить более ${MAX_COUNT_HASHTAG} хештегов :-(`);
pristine.addValidator(hashtagField, isValidHastag, 'Хештег невалиден :-(');
pristine.addValidator(hashtagField, isUniqueHastag, 'Хештеги не должны повторяться :-(');

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape' && document.activeElement !== hashtagField
  && document.activeElement !== commentField) {
    evt.preventDefault();
    hideForm();
  }
}

const onImageLoadingFieldChange = (evt) => {
  evt.preventDefault();
  const selectedFile = imageLoadingField.files[0];
  if(selectedFile.type.startsWith('image/') || /\.(jpg|jpeg|png|gif)$/i.test(selectedFile.name)){
    showForm();
    myImage.src = URL.createObjectURL(selectedFile);
    effectsPreview.forEach((picture) => {
      picture.style.backgroundImage = `url('${myImage.src}')`;
    });
  }
};

function onCloseButtonClick (evt) {
  evt.preventDefault();
  hideForm();
}

const openEditPopup = () => {
  imageLoadingField.addEventListener('change', onImageLoadingFieldChange);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(showSuccessMessage)
        .catch(()=>{
          showErrorMessage();
        }
        )
        .finally(unblockSubmitButton);
    }
  });
};

export { openEditPopup, setFormSubmit, hideForm, onDocumentKeydown };

