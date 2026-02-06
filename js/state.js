export const state = {
  board: null,
  piece: null,
  nextPiece: null,
  score: 0,
  lines: 0,
  level: 1,
  dropInterval: 1000,
  dropTimer: 0,
  gameOver: false,
  paused: false,
  started: false,
  lastTime: 0,
};

export const dom = {
  canvas: document.getElementById('game-canvas'),
  ctx: document.getElementById('game-canvas').getContext('2d'),
  nextCanvas: document.getElementById('next-canvas'),
  nextCtx: document.getElementById('next-canvas').getContext('2d'),
  overlay: document.getElementById('overlay'),
  overlayTitle: document.getElementById('overlay-title'),
  overlayMsg: document.getElementById('overlay-msg'),
};
