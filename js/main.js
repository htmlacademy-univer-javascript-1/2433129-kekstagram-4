import { generatePosts } from './data.js';
import { displayMniatures } from './display-miniatures.js';

const posts = generatePosts();
displayMniatures(posts);
