
const PORTION_COMMENTS_SHOWN = 5;

const body = document.querySelector('body');
const bigPicture = body.querySelector('.big-picture');
const socialComments  = bigPicture.querySelector('.social__comments');
const socialComment  = socialComments .querySelector('.social__comment');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const totalCommentsElement = bigPicture.querySelector('.comments-count');
const commentsShownElement = bigPicture.querySelector('.comments-shown');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const createComment = (obj) => {
  const comment = socialComment.cloneNode(true);

  comment.querySelector('.social__picture').src = obj.avatar;
  comment.querySelector('.social__picture').alt = obj.name;
  comment.querySelector('.social__text').textContent = obj.message;

  return comment;
};

let commentsShown = 0;
let comments = null;

const displayComments = () => {
  socialComments.innerHTML='';

  commentsShown += PORTION_COMMENTS_SHOWN;
  if(commentsShown >= comments.length){
    commentsShown = comments.length;
    commentsLoader.classList.add('hidden');
  }
  else {
    commentsLoader.classList.remove('hidden');
  }
  for(let i=0; i<commentsShown; i++){
    const comment = createComment(comments[i]);
    socialComments.appendChild(comment);
  }
  commentsShownElement.textContent = commentsShown;
  totalCommentsElement.textContent = comments.length;
};

const onCommentsLoaderElementClick = () => {
  displayComments();
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButton.removeEventListener('click', onCancelButtonClick);
  commentsLoader.removeEventListener('click', onCommentsLoaderElementClick);
  commentsShown = 0;
};

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

function onCancelButtonClick () {
  hideBigPicture();
}

const displayPictureDetails = (obj) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src =obj. url;
  bigPicture.querySelector('.big-picture__img').alt = obj.description;
  bigPicture.querySelector('.likes-count').textContent = obj.likes;
  bigPicture.querySelector('.social__caption').textContent = obj.description;
};

const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  cancelButton.addEventListener('click', onCancelButtonClick);
  commentsLoader.addEventListener('click', onCommentsLoaderElementClick);

  displayPictureDetails(data);
  comments = data.comments.slice();
  displayComments(comments);
};

export { showBigPicture };
