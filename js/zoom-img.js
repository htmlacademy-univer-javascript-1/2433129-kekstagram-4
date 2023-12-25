import { ZOOM_STEP, MAXIMUM_SCALE, MINIMUM_SCALE } from './constants.js';

const documentBody = document.querySelector('body');
const sizeField = documentBody.querySelector('.scale__control--value');
const imageElement = documentBody.querySelector('.my-image-js');
const minusSizeButton = documentBody.querySelector('.scale__control--smaller');
const plusSizeButton = documentBody.querySelector('.scale__control--bigger');

const zoomImage  = (value) => {
  imageElement.style.transform=`scale(${value/100})`;
  sizeField.value = `${value}%`;
};

const onDecreaseSizeButtonCLick = (evt) => {
  evt.preventDefault();
  if(parseInt(sizeField.value, 10) > MINIMUM_SCALE){
    const currentSize = parseInt(sizeField.value, 10);
    const newSize = currentSize - ZOOM_STEP;
    zoomImage (newSize);
  }
};

const onIncreaseSizeButtonClick = (evt) => {
  evt.preventDefault();
  if(parseInt(sizeField.value, 10) < MAXIMUM_SCALE){
    const currentSize = parseInt(sizeField.value, 10);
    const newSize = currentSize + ZOOM_STEP;
    zoomImage (newSize);
  }
};

const resetScale = () => {
  zoomImage (MAXIMUM_SCALE);
};

const setupZoom = () => {
  plusSizeButton.addEventListener('click', onIncreaseSizeButtonClick );
  minusSizeButton.addEventListener('click', onDecreaseSizeButtonCLick );
};

const removeZoom = () => {
  plusSizeButton.removeEventListener('click', onIncreaseSizeButtonClick );
  minusSizeButton.removeEventListener('click', onDecreaseSizeButtonCLick );
};

export { setupZoom, removeZoom, resetScale };
