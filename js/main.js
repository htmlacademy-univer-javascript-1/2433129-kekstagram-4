const usedCommentId = [];
const sentences = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const names = [
  'Остапа', 'Ермака', 'Радомира', 'Кузьму', 'Сильвестра', 'Генриха', 'Корнея', 'Соломона', 'Ярополка', 'Добрыню'
];

const randomInt = (min, max) =>  Math.floor(min + Math.random() * (max + 1 - min));


const generateComment = ()  => {
  let id = randomInt(15, 200);
  usedCommentId.push(id);
  const messages = [];
  const name = names[randomInt(1, names.length - 1)];
  const avatar = `img/avatar-{${randomInt(1, 6)}}.svg`;
  const countOfSentences = randomInt(1, 2);
  for (let i = 1; i <= countOfSentences; i++) {
    messages.push(sentences[randomInt(1, names.length - 1)]);
  }
  if (usedCommentId.find((index) => index === id)) {
    id = randomInt(Math.max(usedCommentId), Math.max(usedCommentId) + 1);
  }

  return {
    id: id,
    avatar: avatar,
    message: messages,
    name: name
  };
};

const generateObject = (number) => {
  const id = number;
  const url = `photos/{${number}}.jpg`;
  const description = 'any info';
  const likes = randomInt(1, 200);
  const comments = [];
  for (let j = 0; j <= randomInt(0, 30); j++) {
    comments.push(generateComment());
  }
  return {
    id: id,
    url: url,
    description: description,
    likes: likes,
    comments: comments
  };
};

const generateList = () => {
  const objects = [];
  for (let i = 1; i <= 25; i++) {
    objects.push(generateObject(i));
  }

  return objects;
};
