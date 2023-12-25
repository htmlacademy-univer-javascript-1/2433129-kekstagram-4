import { displayPictures } from './pictures.js';
import { openEditModal, setFormSubmit, hideForm } from './modal-editor.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

getData()
  .then((thumbnails) => {
    displayPictures(thumbnails);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setFormSubmit(hideForm);

openEditModal();
