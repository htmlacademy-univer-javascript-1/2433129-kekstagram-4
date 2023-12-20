const Effect = {
  CHROME: {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  SEPIA: {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  MARVIN: {
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  PHOBOS: {
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  HEAT: {
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

const body = document.querySelector('body');
const img = body.querySelector('.my-image-js');
const effectLevel = body.querySelector('.img-upload__effect-level');
const slider = body.querySelector('.effect-level__slider');
const effectValue = body.querySelector('.effect-level__value');
const effectNoneButton = body.querySelector('#effect-none');
const effectChromeButton = body.querySelector('#effect-chrome');
const effectSepiaButton = body.querySelector('#effect-sepia');
const effectMarvinButton = body.querySelector('#effect-marvin');
const effectPhobosButton = body.querySelector('#effect-phobos');
const effectHeatButton = body.querySelector('#effect-heat');

const resetEffectImage = () => {
  img.style.filter = 'none';
  effectLevel.classList.add('hidden');
};

const showSlider = () => {
  effectLevel.classList.remove('hidden');
};

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
    img.style.filter = `${style}(${effectValue.value}${unit})`;
  });
};

const onEffectNoneButtonChange = (evt) => {
  evt.preventDefault();
  resetEffectImage();
};

const onEffectChromeButtonChange = (evt) => {
  evt.preventDefault();
  showSlider();
  updateSlider(Effect.CHROME.min, Effect.CHROME.max,
    Effect.CHROME.step, Effect.CHROME.style, Effect.CHROME.unit);
};

const onEffectSepiaButtonChange = (evt) => {
  evt.preventDefault();
  showSlider();
  updateSlider(Effect.SEPIA.min, Effect.SEPIA.max,
    Effect.SEPIA.step, Effect.SEPIA.style, Effect.SEPIA.unit);
};

const onEffectMarvinButtonChange = (evt) => {
  evt.preventDefault();
  showSlider();
  updateSlider(Effect.MARVIN.min, Effect.MARVIN.max,
    Effect.MARVIN.step, Effect.MARVIN.style, Effect.MARVIN.unit);
};

const onEffectPhobosButtonChange = (evt) => {
  evt.preventDefault();
  showSlider();
  updateSlider(Effect.PHOBOS.min, Effect.PHOBOS.max,
    Effect.PHOBOS.step, Effect.PHOBOS.style, Effect.PHOBOS.unit);
};

const onEffectHeatButtonChange = (evt) => {
  evt.preventDefault();
  showSlider();
  updateSlider(Effect.HEAT.min, Effect.HEAT.max,
    Effect.HEAT.step, Effect.HEAT.style, Effect.HEAT.unit);
};

const setupEffectImage = () => {
  effectNoneButton.addEventListener('change', onEffectNoneButtonChange);
  effectChromeButton.addEventListener('change', onEffectChromeButtonChange);
  effectSepiaButton.addEventListener('change', onEffectSepiaButtonChange);
  effectMarvinButton.addEventListener('change', onEffectMarvinButtonChange);
  effectPhobosButton.addEventListener('change', onEffectPhobosButtonChange);
  effectHeatButton.addEventListener('change', onEffectHeatButtonChange);
};

const removeEffectImage = () => {
  effectNoneButton.removeEventListener('change', onEffectNoneButtonChange);
  effectChromeButton.removeEventListener('change', onEffectChromeButtonChange);
  effectSepiaButton.removeEventListener('change', onEffectSepiaButtonChange);
  effectMarvinButton.removeEventListener('change', onEffectMarvinButtonChange);
  effectPhobosButton.removeEventListener('change', onEffectPhobosButtonChange);
  effectHeatButton.removeEventListener('change', onEffectHeatButtonChange);
};

export { resetEffectImage, setupEffectImage, removeEffectImage };
