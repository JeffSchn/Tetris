import { ROWS, COLS, EMPTY, COLORS } from './constants.js';

export function createBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));
}

export function drawBlock(context, x, y, colorIdx, size, alpha = 1) {
  if (!colorIdx) return;
  const color = COLORS[colorIdx];
  const px = x * size, py = y * size;
  context.globalAlpha = alpha;

  // Main fill
  context.fillStyle = color;
  context.fillRect(px + 1, py + 1, size - 2, size - 2);

  // Highlight
  context.fillStyle = 'rgba(255,255,255,0.18)';
  context.fillRect(px + 1, py + 1, size - 2, 3);
  context.fillRect(px + 1, py + 1, 3, size - 2);

  // Shadow
  context.fillStyle = 'rgba(0,0,0,0.25)';
  context.fillRect(px + size - 3, py + 1, 2, size - 2);
  context.fillRect(px + 1, py + size - 3, size - 2, 2);

  context.globalAlpha = 1;
}
