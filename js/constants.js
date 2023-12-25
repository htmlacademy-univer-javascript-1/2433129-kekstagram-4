export const COUNT_PHOTOS = 25;
export const COUNT_OF_COMMENTS = 5;
export const MAX_COUNT_HASHTAG = 5;
export const HASTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
export const ZOOM_STEP = 25;
export const MAXIMUM_SCALE = 100;
export const MINIMUM_SCALE = 25;
export const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';
export const Route = {
  GET_DATA:'/data',
  SEND_DATA:'/'
};
export const Error = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте перезагрузить страницу!',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз!'
};
export const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};
export const ALERT_SHOW_TIME = 5000;
