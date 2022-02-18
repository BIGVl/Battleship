import { gameboardFactory } from './gameboardFactory';
import { gamePVP } from './gameController';

export function createDOM() {
  const body = document.querySelector('body');
  const half1 = document.createElement('div');
  const pName1 = document.createElement('div');
  const grid1 = document.createElement('div');

  function creteGridCells(grid) {
    let x = 1;
    let y = 0;

    for (let i = 0; i < 100; i++) {
      const cell = document.createElement('div');
      grid.appendChild(cell);
      if (y === 10) {
      }
      cell.dataset.x = x;
      cell.dataset.y = y;
      x = x + 1;
      y = y + 1;
    }
  }
}
