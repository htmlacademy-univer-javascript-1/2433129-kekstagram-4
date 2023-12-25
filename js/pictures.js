import { showBigPicture } from './scale-view.js';
import { displayMniatures } from './display-miniatures.js';

const container = document.querySelector('.pictures');
const displayPictures = (picutres) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if(!thumbnail) {
      return;
    }
    const [picture] = picutres.filter((item) => item.id === Number(thumbnail.dataset.thumbnailId));
    showBigPicture(picture);
  });

  displayMniatures(picutres);
};

export { displayPictures };
