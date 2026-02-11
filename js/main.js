import { drawBoard, drawNext } from './rendering.js';
import { initInput } from './input.js';
import { initTouch } from './touch.js';

initInput();
initTouch();
drawBoard();
drawNext();
