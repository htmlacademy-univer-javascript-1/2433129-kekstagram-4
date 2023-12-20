import { displayMniatures } from './display-miniatures.js';
import { openEditPopup, setFormSubmit, hideForm } from './modal-editor.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';

getData()
  .then((thumbnails) => {
    displayMniatures(thumbnails);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setFormSubmit(hideForm);

openEditPopup();
