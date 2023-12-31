import { renderGallery } from './gallery.js';
import { openEditPopup, setFormSubmit, hideForm } from './edit-popup.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { initFilters } from './filter-image.js';
import { debounce } from './utils.js';

getData()
  .then((thumbnails) => {
    const debounceRenderGallery = debounce(renderGallery);
    renderGallery(thumbnails);
    initFilters(thumbnails, debounceRenderGallery);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );


setFormSubmit(hideForm);

openEditPopup();
