const body = document.querySelector('body');
const bigPicture = body.querySelector('.big-picture');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialComments = socialCommentsCount.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');

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
  document.removeEventListener('keydown', onDocumentKeydown );
  cancelButton.removeEventListener('click', onCancelButtonClick );
};

function onDocumentKeydown  (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

function onCancelButtonClick  () {
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
  document.addEventListener('keydown', onDocumentKeydown );
  cancelButton.addEventListener('click', onCancelButtonClick );

  displayPictureData(data);
  displayComments(data.comments);
};

export { showBigPicture };
