import radar from './assets/radar.jpg';
import { gameboardFactory } from './gameboardFactory';

export const createDOM = () => {
  const body = document.querySelector('body');
  const player1Screen = document.createElement('div');
  const player2Screen = document.createElement('div');

  function createHeader() {
    const header = document.createElement('div');
    const title = document.createElement('div');
    title.textContent = 'BattleShips';
    header.appendChild(title).classList.add('title');
    return header;
  }

  function createGridCells() {
    const grid = document.createElement('div');
    let x = 0;
    let y = 0;

    for (let i = 0; i < 100; i++) {
      const cell = document.createElement('div');
      grid.appendChild(cell).classList.add('cell');
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

    if (player1Screen.hasChildNodes() && !player2Screen.hasChildNodes()) {
      player2Screen.appendChild(grid).classList.add('grid-2');
    } else if (!player1Screen.hasChildNodes()) {
      player1Screen.appendChild(grid).classList.add('grid-1');
    }
  }

  body.appendChild(createHeader()).classList.add('header-div');
  body.appendChild(player1Screen).classList.add('player1-screen');
  body.appendChild(player2Screen).classList.add('player2-screen');

  return { createGridCells };
};
