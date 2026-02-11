import { state, dom } from './state.js';
import { valid, tryRotate } from './piece.js';
import { drawBoard, updateUI } from './rendering.js';
import { startGame, lock } from './game.js';

const SWIPE_THRESHOLD = 30;
const TAP_THRESHOLD = 10;

let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;
let handled = false;

function performAction(action) {
  if (!state.started || state.gameOver) {
    startGame();
    return;
  }
  if (state.paused && action !== 'pause') return;

  switch (action) {
    case 'left':
      if (valid(state.piece.shape, state.piece.x - 1, state.piece.y)) state.piece.x--;
      break;
    case 'right':
      if (valid(state.piece.shape, state.piece.x + 1, state.piece.y)) state.piece.x++;
      break;
    case 'down':
      if (valid(state.piece.shape, state.piece.x, state.piece.y + 1)) {
        state.piece.y++;
        state.score += 1;
        state.dropTimer = 0;
        updateUI();
      }
      break;
    case 'rotate':
      tryRotate();
      break;
    case 'drop': {
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
    }
    case 'pause':
      state.paused = !state.paused;
      dom.overlay.style.display = state.paused ? 'flex' : 'none';
      dom.overlayTitle.textContent = 'Paused';
      dom.overlayMsg.textContent = 'Tap pause or press P to resume';
      if (!state.paused) {
        state.lastTime = performance.now();
      }
      return;
    default:
      return;
  }
  drawBoard();
}

function initButtons() {
  document.querySelectorAll('.touch-btn').forEach((btn) => {
    const action = btn.dataset.action;
    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      performAction(action);
    });
  });
}

function initSwipe() {
  const canvas = dom.canvas;

  canvas.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
    touchStartTime = Date.now();
    handled = false;
  }, { passive: true });

  canvas.addEventListener('touchmove', (e) => {
    if (handled) return;
    const t = e.touches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;

    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      performAction(dx > 0 ? 'right' : 'left');
      touchStartX = t.clientX;
      touchStartY = t.clientY;
    } else if (dy > SWIPE_THRESHOLD && Math.abs(dy) > Math.abs(dx)) {
      performAction('down');
      touchStartY = t.clientY;
    }
  }, { passive: true });

  canvas.addEventListener('touchend', (e) => {
    if (handled) return;
    const dt = Date.now() - touchStartTime;
    const t = e.changedTouches[0];
    const dx = Math.abs(t.clientX - touchStartX);
    const dy = Math.abs(t.clientY - touchStartY);

    if (dx < TAP_THRESHOLD && dy < TAP_THRESHOLD && dt < 300) {
      performAction('rotate');
    }
  });
}

export function initTouch() {
  initButtons();
  initSwipe();
}
