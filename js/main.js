const PHOTO_ID = {
  MIN: 1,
  MAX: 25
};
const LIKES_COUNT = {
  MIN: 15,
  MAX: 200
};
const COMMENTS_COUNT = {
  MIN: 0,
  MAX: 30
};
const MESSAGES_COUNT = {
  MIN: 1,
  MAX: 2
};

const OBJECTS_COUNT = 25;

const SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Остапа', 'Ермака', 'Радомира', 'Кузьму', 'Сильвестра', 'Генриха', 'Корнея', 'Соломона', 'Ярополка', 'Добрыню'
];

const getRandomInt = (min, max) =>  Math.floor(min + Math.random() * (max + 1 - min));

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const getComment = (_, id)  => {
  const comment =  {
    id: id,
    avatar: `img/avatar-{${getRandomInt(PHOTO_ID.MIN, PHOTO_ID.MAX)}}.svg`,
    message: shuffle(SENTENCES).slice(0, getRandomInt(MESSAGES_COUNT.MIN, MESSAGES_COUNT.MAX)),
    name: NAMES[getRandomInt(0, NAMES.length - 1)]
  };

  return comment;
};

const getPost = (_, id) => {
  id++;
  const post =  {
    id: id,
    url: `photos/{${id}}.jpg`,
    description: `any info about id: ${id}`,
    likes: getRandomInt(LIKES_COUNT.MIN, LIKES_COUNT.MAX),
    comments: Array.from({ length: getRandomInt(COMMENTS_COUNT.MIN, COMMENTS_COUNT.MAX) }, getComment)
  };

  return post;
};

const generatePosts = () => Array.from({ length: OBJECTS_COUNT }, getPost);

generatePosts();
