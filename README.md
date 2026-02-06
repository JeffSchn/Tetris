# Tetris

A classic Tetris game built with pure HTML5 Canvas, CSS, and vanilla JavaScript. No frameworks, no dependencies — just open and play.

![Tetris](https://img.shields.io/badge/game-Tetris-blue)
![HTML5](https://img.shields.io/badge/HTML5-Canvas-orange)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow)

## How to Play

Open `tetris.html` in any modern web browser. No build step or installation required.

### Controls

| Key | Action |
|-----|--------|
| `←` / `→` | Move piece left / right |
| `↑` | Rotate piece |
| `↓` | Soft drop (+1 point per cell) |
| `Space` | Hard drop (+2 points per cell) |
| `P` | Pause / Resume |

## Features

- **All 7 Tetrominoes** — I, O, T, S, Z, J, and L pieces with classic colors
- **Ghost Piece** — Semi-transparent preview showing where the piece will land
- **Next Piece Preview** — See the upcoming piece in a side panel
- **Wall Kicks** — Smart rotation system that adjusts position near walls and other pieces
- **Scoring System** — Points for soft drops, hard drops, and line clears (up to 800 points for a Tetris)
- **Level Progression** — Speed increases every 10 lines cleared; drop interval decreases from 1000ms down to a minimum of 50ms
- **Formatted Score Display** — Score, level, and lines cleared shown in a side panel

## Scoring

| Lines Cleared | Points (× Level) |
|---------------|-------------------|
| 1 (Single) | 100 |
| 2 (Double) | 300 |
| 3 (Triple) | 500 |
| 4 (Tetris) | 800 |

Soft drops award 1 point per cell. Hard drops award 2 points per cell.

## Project Structure

```
tetris.html   # Game entry point (HTML + embedded JavaScript)
tetris.css    # Styling and layout
```

## Technical Details

- **Rendering**: HTML5 Canvas (300×600px, 10×20 grid)
- **Game Loop**: `requestAnimationFrame` with time-based movement for smooth 60 FPS gameplay
- **Collision Detection**: Full boundary and piece-overlap validation before every move
- **Wall Kicks**: Tests horizontal offsets (0, ±1, ±2) and upward kicks on rotation
- **Level Speed**: `max(50, 1000 - (level - 1) × 80)` ms per drop

## License

This project is provided as-is for personal and educational use.
