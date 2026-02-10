import { state, dom } from './state.js';
import { valid, tryRotate } from './piece.js';
import { drawBoard, updateUI } from './rendering.js';
import { startGame, lock } from './game.js';

function handleKey(e) {
  if (state.gameOver && state.started) {
    if (e.key) { startGame(); }
    return;
  }
  if (!state.started) {
    startGame();
    return;
  }
  if (e.key === 'p' || e.key === 'P') {
    state.paused = !state.paused;
    dom.overlay.style.display = state.paused ? 'flex' : 'none';
    dom.overlayTitle.textContent = 'Paused';
    dom.overlayMsg.textContent = 'Press P to resume';
    if (!state.paused) {
      state.lastTime = performance.now();
    }
    e.preventDefault();
    return;
  }
  if (state.paused) return;

  switch (e.key) {
    case 'ArrowLeft':
      if (valid(state.piece.shape, state.piece.x - 1, state.piece.y)) state.piece.x--;
      break;
    case 'ArrowRight':
      if (valid(state.piece.shape, state.piece.x + 1, state.piece.y)) state.piece.x++;
      break;
    case 'ArrowDown':
      if (valid(state.piece.shape, state.piece.x, state.piece.y + 1)) {
        state.piece.y++;
        state.score += 1;
        state.dropTimer = 0;
        updateUI();
      }
      break;
    case 'ArrowUp':
      tryRotate();
      break;
    case ' ':
      let dropped = 0;
      while (valid(state.piece.shape, state.piece.x, state.piece.y + 1)) {
        state.piece.y++;
        dropped++;
      }
      state.score += dropped * 2;
      updateUI();
      lock();
      state.dropTimer = 0;
      break;
    default:
      return;
  }
  e.preventDefault();
  drawBoard();
}

export function initInput() {
  document.addEventListener('keydown', handleKey);
  dom.overlay.addEventListener('click', () => {
    if (!state.started || state.gameOver) startGame();
  });
}
