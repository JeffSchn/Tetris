import { COLS, ROWS, BLOCK, GHOST_ALPHA, SHAPES } from './constants.js';
import { state, dom } from './state.js';
import { drawBlock } from './board.js';
import { ghostY } from './piece.js';

export function drawBoard() {
  const { ctx, canvas } = dom;

  ctx.fillStyle = '#0e0e22';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.03)';
  ctx.lineWidth = 1;
  for (let c = 1; c < COLS; c++) {
    ctx.beginPath();
    ctx.moveTo(c * BLOCK, 0);
    ctx.lineTo(c * BLOCK, canvas.height);
    ctx.stroke();
  }
  for (let r = 1; r < ROWS; r++) {
    ctx.beginPath();
    ctx.moveTo(0, r * BLOCK);
    ctx.lineTo(canvas.width, r * BLOCK);
    ctx.stroke();
  }

  // Locked blocks
  if (!state.board) return;
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      drawBlock(ctx, c, r, state.board[r][c], BLOCK);

  if (!state.piece || state.gameOver) return;

  // Ghost piece
  const gy = ghostY();
  if (gy !== state.piece.y) {
    for (let r = 0; r < state.piece.shape.length; r++)
      for (let c = 0; c < state.piece.shape[r].length; c++)
        if (state.piece.shape[r][c])
          drawBlock(ctx, state.piece.x + c, gy + r, state.piece.type, BLOCK, GHOST_ALPHA);
  }

  // Active piece
  for (let r = 0; r < state.piece.shape.length; r++)
    for (let c = 0; c < state.piece.shape[r].length; c++)
      if (state.piece.shape[r][c] && state.piece.y + r >= 0)
        drawBlock(ctx, state.piece.x + c, state.piece.y + r, state.piece.type, BLOCK);
}

export function drawNext() {
  const { nextCtx, nextCanvas } = dom;
  const size = 20;
  nextCtx.fillStyle = '#12122a';
  nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
  if (!state.nextPiece) return;
  const shape = SHAPES[state.nextPiece];
  const offX = (nextCanvas.width / size - shape[0].length) / 2;
  const offY = (nextCanvas.height / size - shape.length) / 2;
  for (let r = 0; r < shape.length; r++)
    for (let c = 0; c < shape[r].length; c++)
      if (shape[r][c])
        drawBlock(nextCtx, offX + c, offY + r, state.nextPiece, size);
}

export function updateUI() {
  document.getElementById('score').textContent = state.score.toLocaleString();
  document.getElementById('level').textContent = state.level;
  document.getElementById('lines').textContent = state.lines;
}
