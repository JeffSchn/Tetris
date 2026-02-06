import { COLS, ROWS, SHAPES } from './constants.js';
import { state } from './state.js';

export function createPiece(type) {
  return {
    type,
    shape: SHAPES[type].map(r => [...r]),
    x: Math.floor(COLS / 2) - Math.ceil(SHAPES[type][0].length / 2),
    y: 0,
  };
}

export function randomType() {
  return Math.floor(Math.random() * 7) + 1;
}

export function rotate(shape) {
  const N = shape.length;
  const rotated = Array.from({ length: N }, () => Array(N).fill(0));
  for (let r = 0; r < N; r++)
    for (let c = 0; c < N; c++)
      rotated[c][N - 1 - r] = shape[r][c];
  return rotated;
}

export function valid(shape, offX, offY) {
  for (let r = 0; r < shape.length; r++)
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const nx = offX + c, ny = offY + r;
      if (nx < 0 || nx >= COLS || ny >= ROWS) return false;
      if (ny >= 0 && state.board[ny][nx]) return false;
    }
  return true;
}

export function ghostY() {
  let gy = state.piece.y;
  while (valid(state.piece.shape, state.piece.x, gy + 1)) gy++;
  return gy;
}

export function tryRotate() {
  const newShape = rotate(state.piece.shape);
  const kicks = [0, -1, 1, -2, 2];
  for (const dx of kicks) {
    if (valid(newShape, state.piece.x + dx, state.piece.y)) {
      state.piece.shape = newShape;
      state.piece.x += dx;
      return true;
    }
    if (valid(newShape, state.piece.x + dx, state.piece.y - 1)) {
      state.piece.shape = newShape;
      state.piece.x += dx;
      state.piece.y -= 1;
      return true;
    }
  }
  return false;
}
