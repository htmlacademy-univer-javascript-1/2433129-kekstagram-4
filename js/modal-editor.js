import { MAX_COUNT_HASHTAG, HASTAG_REGEX, ZOOM_STEP, MAXIMUM_SCALE, MINIMUM_SCALE, effectChrome, effectSepia, effectMarvin, effectPhobos, effectHeat } from './constants.js';

const documentBody = document.querySelector('body');
const form = documentBody.querySelector('.img-upload__form');
const editForm = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');
const imageLoadingField = form.querySelector('.img-upload__input');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const sizeField = documentBody.querySelector('.scale__control--value');
const decreaseSizeButton = documentBody.querySelector('.scale__control--smaller');
const increaseSizeButton = documentBody.querySelector('.scale__control--bigger');
const image = documentBody.querySelector('.my-image-js');
const slider = documentBody.querySelector('.effect-level__slider');
const effectValue = documentBody.querySelector('.effect-level__value');
const effectLevel = documentBody.querySelector('.img-upload__effect-level');
const effectNoneButton = documentBody.querySelector('#effect-none');
const effectChromeButton = documentBody.querySelector('#effect-chrome');
const effectSepiaButton = documentBody.querySelector('#effect-sepia');
const effectMarvinButton = documentBody.querySelector('#effect-marvin');
const effectPhobosButton = documentBody.querySelector('#effect-phobos');
const effectHeatButton = documentBody.querySelector('#effect-heat');

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
  increaseSizeButton.addEventListener('click', onIncreaseSizeButtonClick);
  decreaseSizeButton.addEventListener('click', onDecreaseSizeButtonCLick);
  effectNoneButton.addEventListener('change', onEffectNoneButtonChange);
  effectChromeButton.addEventListener('change', onEffectChromeButtonChange);
  effectSepiaButton.addEventListener('change', onEffectSepiaButtonChange);
  effectMarvinButton.addEventListener('change', onEffectMarvinButtonChange);
  effectPhobosButton.addEventListener('change', onEffectPhobosButtonChange);
  effectHeatButton.addEventListener('change', onEffectHeatButtonChange);
  startValidate();
};

const hideForm = () => {
  editForm.classList.add('hidden');
  documentBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  increaseSizeButton.removeEventListener('click', onIncreaseSizeButtonClick);
  decreaseSizeButton.removeEventListener('click', onDecreaseSizeButtonCLick);
  effectNoneButton.removeEventListener('change', onEffectNoneButtonChange);
  effectChromeButton.removeEventListener('change', onEffectChromeButtonChange);
  effectSepiaButton.removeEventListener('change', onEffectSepiaButtonChange);
  effectMarvinButton.removeEventListener('change', onEffectMarvinButtonChange);
  effectPhobosButton.removeEventListener('change', onEffectPhobosButtonChange);
  effectHeatButton.removeEventListener('change', onEffectHeatButtonChange);
  imageLoadingField.value = '';
  hashtagField.value = '';
  commentField.value = '';
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

const zoomImage = (value) => {
  image.style.transform=`scale(${value/100})`;
  sizeField.value = `${value}%`;
};

function onDecreaseSizeButtonCLick (evt) {
  evt.preventDefault();
  if(parseInt(sizeField.value, 10) > MINIMUM_SCALE){
    const currentSize = parseInt(sizeField.value, 10);
    const newSize = currentSize - ZOOM_STEP;
    zoomImage(newSize);
  }
}

function onIncreaseSizeButtonClick (evt)  {
  evt.preventDefault();
  if(parseInt(sizeField.value, 10) < MAXIMUM_SCALE){
    const currentSize = parseInt(sizeField.value, 10);
    const newSize = currentSize + ZOOM_STEP;
    zoomImage(newSize);
  }
}

function resetScale () {
  zoomImage(MAXIMUM_SCALE);
}

function resetEffect () {
  image.style.filter = 'none';
  effectLevel.classList.add('hidden');
}

function showSlider () {
  effectLevel.classList.remove('hidden');
}

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  step: 1,
  start: 100,
  connect: 'lower',
});

const updateSlider = (minValue, maxValue, step, style, unit) => {
  slider.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: maxValue,
    },
    step: step,
    start: maxValue,
  });
  slider.noUiSlider.on('update', () => {
    effectValue.value = slider.noUiSlider.get();
    image.style.filter = `${style}(${effectValue.value}${unit})`;
  });
};

function onEffectNoneButtonChange (evt) {
  evt.preventDefault();
  resetEffect();
}

function onEffectChromeButtonChange (evt) {
  evt.preventDefault();
  showSlider();
  updateSlider(effectChrome.MIN, effectChrome.MAX,
    effectChrome.STEP, effectChrome.STYLE, effectChrome.UNIT);
}

function onEffectSepiaButtonChange (evt) {
  evt.preventDefault();
  showSlider();
  updateSlider(effectSepia.MIN, effectSepia.MAX,
    effectSepia.STEP, effectSepia.STYLE, effectSepia.UNIT);
}

function onEffectMarvinButtonChange (evt) {
  evt.preventDefault();
  showSlider();
  updateSlider(effectMarvin.MIN, effectMarvin.MAX,
    effectMarvin.STEP, effectMarvin.STYLE, effectMarvin.UNIT);
}

function onEffectPhobosButtonChange (evt) {
  evt.preventDefault();
  showSlider();
  updateSlider(effectPhobos.MIN, effectPhobos.MAX,
    effectPhobos.STEP, effectPhobos.STYLE, effectPhobos.UNIT);
}

function onEffectHeatButtonChange (evt) {
  evt.preventDefault();
  showSlider();
  updateSlider(effectHeat.MIN, effectHeat.MAX,
    effectHeat.STEP, effectHeat.STYLE, effectHeat.UNIT);
}

export { openEditModal };
