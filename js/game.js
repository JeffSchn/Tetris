import { COLS, EMPTY, LINE_POINTS } from './constants.js';
import { state, dom } from './state.js';
import { createBoard } from './board.js';
import { createPiece, randomType, valid } from './piece.js';
import { drawBoard, drawNext, updateUI } from './rendering.js';

function clearLines() {
  let cleared = 0;
  for (let r = state.board.length - 1; r >= 0; r--) {
    if (state.board[r].every(c => c !== EMPTY)) {
      state.board.splice(r, 1);
      state.board.unshift(Array(COLS).fill(EMPTY));
      cleared++;
      r++; // recheck row
    }
  }
  if (cleared) {
    state.lines += cleared;
    state.score += LINE_POINTS[cleared] * state.level;
    state.level = Math.floor(state.lines / 10) + 1;
    state.dropInterval = Math.max(50, 1000 - (state.level - 1) * 80);
    updateUI();
  }
}

function spawn() {
  state.piece = createPiece(state.nextPiece || randomType());
  state.nextPiece = randomType();
  if (!valid(state.piece.shape, state.piece.x, state.piece.y)) {
    state.piece.y = -1;
    if (!valid(state.piece.shape, state.piece.x, state.piece.y)) {
      endGame();
    }
  }
  drawNext();
}

export function lock() {
  for (let r = 0; r < state.piece.shape.length; r++)
    for (let c = 0; c < state.piece.shape[r].length; c++) {
      if (!state.piece.shape[r][c]) continue;
      const ny = state.piece.y + r;
      if (ny < 0) { endGame(); return; }
      state.board[ny][state.piece.x + c] = state.piece.type;
    }
  clearLines();
  spawn();
}

export function gameLoop(time = 0) {
  if (state.gameOver) return;
  if (!state.paused) {
    const delta = time - state.lastTime;
    state.lastTime = time;
    state.dropTimer += delta;
    if (state.dropTimer >= state.dropInterval) {
      state.dropTimer = 0;
      if (valid(state.piece.shape, state.piece.x, state.piece.y + 1)) {
        state.piece.y++;
      } else {
        lock();
      }
    }
    drawBoard();
  }
  requestAnimationFrame(gameLoop);
}

export function startGame() {
  state.board = createBoard();
  state.score = 0;
  state.lines = 0;
  state.level = 1;
  state.dropInterval = 1000;
  state.dropTimer = 0;
  state.gameOver = false;
  state.paused = false;
  state.started = true;
  state.nextPiece = randomType();
  spawn();
  updateUI();
  dom.overlay.style.display = 'none';
  state.lastTime = performance.now();
  requestAnimationFrame(gameLoop);
}

export function endGame() {
  state.gameOver = true;
  dom.overlay.style.display = 'flex';
  dom.overlayTitle.textContent = 'Game Over';
  dom.overlayMsg.innerHTML = `<span class="final-score">${state.score.toLocaleString()} points</span><br>Press any key to restart`;
}
