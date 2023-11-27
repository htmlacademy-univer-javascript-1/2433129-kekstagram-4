const bigPicture = document.querySelector('.big-picture');
const socialComments = document.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
const body = document.querySelector('body');
const cancelButton = document.querySelector('.big-picture__cancel');
const socialCommentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const createComment = (obj) => {
  const comment = socialComment.cloneNode(true);
  comment.querySelector('.social__picture').src = obj.avatar;
  comment.querySelector('.social__picture').alt = obj.name;
  comment.querySelector('.social__text').textContent = obj.message;

  return comment;
};

const displayComments = (comments) => {
  socialComments.innerHTML='';
  const container = document.createDocumentFragment();

  comments.forEach((el) => {
    const comment = createComment(el);
    container.appendChild(comment);
  });
  socialComments.appendChild(container);
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', cancelByEscape);
  cancelButton.removeEventListener('click', cancelByClick);
};

function cancelByEscape (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

function cancelByClick () {
  hideBigPicture();
}

const displayPictureData = (obj) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = obj.url;
  bigPicture.querySelector('.big-picture__img').alt = obj.description;
  bigPicture.querySelector('.likes-count').textContent =  obj.likes;
  bigPicture.querySelector('.social__caption').textContent =  obj.description;
};

const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  socialCommentsCount.classList.add('hidden');
  document.addEventListener('keydown', cancelByEscape);
  cancelButton.addEventListener('click', cancelByClick);

  displayPictureData(data);
  displayComments(data.comments);
};

export { showBigPicture };
