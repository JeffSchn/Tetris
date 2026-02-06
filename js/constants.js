export const COLS = 10;
export const ROWS = 20;
export const BLOCK = 30;
export const EMPTY = 0;
export const LINE_POINTS = [0, 100, 300, 500, 800];
export const GHOST_ALPHA = 0.2;

export const COLORS = [
  null,
  '#00f0f0', // I - cyan
  '#f0f000', // O - yellow
  '#a000f0', // T - purple
  '#00f000', // S - green
  '#f00000', // Z - red
  '#0000f0', // J - blue
  '#f0a000', // L - orange
];

export const SHAPES = [
  null,
  [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], // I
  [[2,2],[2,2]],                                 // O
  [[0,3,0],[3,3,3],[0,0,0]],                     // T
  [[0,4,4],[4,4,0],[0,0,0]],                     // S
  [[5,5,0],[0,5,5],[0,0,0]],                     // Z
  [[6,0,0],[6,6,6],[0,0,0]],                     // J
  [[0,0,7],[7,7,7],[0,0,0]],                     // L
];
