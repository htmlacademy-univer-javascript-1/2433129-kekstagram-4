import { MAX_COUNT_HASHTAG, HASTAG_REGEX } from './constants.js';

const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const editForm = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');
const imageLoadingField = form.querySelector('.img-upload__input ');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-error-text',
});

const showForm = () => {
  editForm.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
  startValidate();
};

const hideForm = () => {
  editForm.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  imageLoadingField.value = '';
  hashtagField.value = '';
  commentField.value = '';
  pristine.reset();
};

const extarctHastag = (value) => value.trim().split(' ').filter((element) => element.length > 0);

const isHastagValid = (value) => extarctHastag(value).every((element) => HASTAG_REGEX.test(element));

const checkHastagLength = (value) => extarctHastag(value).length <= MAX_COUNT_HASHTAG;

const isHastagUnique = (value) => {
  const oneCaseHastags = extarctHastag(value).map((element) => element.toLowerCase());
  return new Set(oneCaseHastags).size === oneCaseHastags.length;
};

function startValidate () {
  pristine.addValidator(hashtagField, checkHastagLength, `Нельзя вводить более ${MAX_COUNT_HASHTAG} хештегов :-(`);
  pristine.addValidator(hashtagField, isHastagValid, 'Хештег невалиден :-(');
  pristine.addValidator(hashtagField, isHastagUnique, 'Хештеги не должны повторяться :-(');
}

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape' && document.activeElement !== hashtagField
  && document.activeElement !== commentField) {
    evt.preventDefault();
    hideForm();
  }
}

const onImageLoadingFieldChange = (evt) => {
  evt.preventDefault();
  const selectedFiel = imageLoadingField.files[0];
  if(selectedFiel.type.startsWith('image/') || /\.(jpg|jpeg|png|gif)$/i.test(selectedFiel.name)){
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

export { openEditModal };
