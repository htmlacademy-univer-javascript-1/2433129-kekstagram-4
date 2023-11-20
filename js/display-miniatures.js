const template = document.querySelector('#picture').content.querySelector('.picture');
const childs = document.querySelector('.pictures');

const createMniature = (obj)  => {
  const picture = template.cloneNode(true);
  picture.querySelector('.picture__img').src = obj.url;
  picture.querySelector('.picture__img').alt = obj.description;
  picture.querySelector('.picture__likes').textContent = obj.likes;
  picture.querySelector('.picture__comments').textContent = obj.comments.length;

  return picture;
};

export const displayMniatures = (pictures) =>{
  const container = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const miniature = createMniature(picture);
    container.append(miniature);
  });

  childs.append(container);
};
