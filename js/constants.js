const COUNT_PHOTOS = 25;
const COUNT_OF_COMMENTS_SHOWN = 5;
const MAX_COUNT_HASHTAG = 5;
const HASTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const ZOOM_STEP = 25;
const MAXIMUM_SCALE = 100;
const MINIMUM_SCALE = 25;
const effectChrome = {
  STYLE: 'grayscale',
  MIN: 0,
  MAX: 1,
  STEP: 0.1,
  UNIT: ''
};
const effectSepia = {
  STYLE: 'sepia',
  MIN: 0,
  MAX: 1,
  STEP: 0.1,
  UNIT: ''
};
const effectMarvin = {
  STYLE: 'invert',
  MIN: 0,
  MAX: 100,
  STEP: 1,
  UNIT: '%'
};
const effectPhobos = {
  STYLE: 'blur',
  MIN: 0,
  MAX: 3,
  STEP: 0.1,
  UNIT: 'px'
};
const effectHeat = {
  STYLE: 'brightness',
  MIN: 1,
  MAX: 3,
  STEP: 0.1,
  UNIT: ''
};

export { COUNT_PHOTOS, COUNT_OF_COMMENTS_SHOWN, MAX_COUNT_HASHTAG, HASTAG_REGEX, ZOOM_STEP, MAXIMUM_SCALE, MINIMUM_SCALE, effectChrome, effectSepia, effectMarvin, effectPhobos, effectHeat };
