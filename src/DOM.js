import { gameboardFactory } from './gameboardFactory';

export const createDOM = () => {
  const body = document.querySelector('body');
  const player1Screen = document.querySelector('.player1-screen');
  const player2Screen = document.querySelector('.player2-screen');

  function createGridCells() {
    const grid1 = document.querySelector('.grid-1');
    const grid2 = document.querySelector('.grid-2');
    let x = 0;
    let y = 0;

    for (let i = 0; i < 100; i++) {
      const cell = document.createElement('div');
      grid1.appendChild(cell).classList.add('cell');
      if (y === 10) {
      }
      cell.dataset.x = x;
      cell.dataset.y = y;
      y = y + 1;
      if (y === 10) {
        y = 0;
        x = x + 1;
      }
    }

    for (let i = 0; i < 100; i++) {
      const cell = document.createElement('div');
      grid2.appendChild(cell).classList.add('cell');
      if (y === 10) {
      }
      cell.dataset.x = x;
      cell.dataset.y = y;
      y = y + 1;
      if (y === 10) {
        y = 0;
        x = x + 1;
      }
    }
  }

  return { createGridCells };
};
