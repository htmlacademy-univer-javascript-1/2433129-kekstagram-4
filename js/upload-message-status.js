import { onDocumentKeydown as onDocumentKeydownEditModal} from './edit-popup.js';

const body = document.querySelector('body');
const successMessage = body.querySelector('#success').content.querySelector('.success');
const errorMessage = body.querySelector('#error').content.querySelector('.error');

const hideMessage = () => {
  const messageElement = body.querySelector('.success') || body.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onDocumentKeydownEditModal);
  body.removeEventListener('click', onBodyElementClick);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }

}

function onBodyElementClick(evt) {
  evt.preventDefault();
  if (evt.target.closest('.success__inner') ||
  evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
}

const showMessage = (messageElement, closeButtonClass) => {
  body.append(messageElement);
  document.addEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('keydown', onDocumentKeydownEditModal);
  body.addEventListener('click', onBodyElementClick);
  messageElement.querySelector(closeButtonClass).addEventListener('click', hideMessage);
};

const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessage, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
