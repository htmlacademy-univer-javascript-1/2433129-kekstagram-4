import { generatePosts } from './data.js';
import { displayMniatures } from './display-miniatures.js';
import { openEditPopup } from './modal-editor.js';

const posts = generatePosts();

displayMniatures(posts);
openEditPopup();
