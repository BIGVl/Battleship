import './Style/main.css';
import './Style/start-screen.css';
import './Style/game-over.css';
import './Style/game-running.css';
import './Style/place-ships.css';
import { startScreen } from './Screens-scripts/startMenu';
import { placeShipsScreen } from './Screens-scripts/placeShipsScreen';
import { gameboardFactory } from './Factories/gameboardFactory';
import { createDOM, manipulateDOM } from './DOM';
import { Player } from './Factories/player';
import { gameLogic } from './gameLogic';

const start = startScreen();
const body = document.querySelector('body');
const startBody = document.querySelector('.start-body');

start.pvp.addEventListener('click', () => {
  body.removeChild(startBody);
  placeShipsScreen();
  const DOM = createDOM();
  DOM.createGridCells();
  const player1Screen = document.querySelector('.player1-screen');
  const player2Screen = document.querySelector('.player2-screen');
  const grid1 = document.querySelector('.grid-1');
  const grid2 = document.querySelector('.grid-2');
  DOM.createShips(player1Screen);
  DOM.createShips(player2Screen);
  manipulateDOM(grid1);
  manipulateDOM(grid2);
});
