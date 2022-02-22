import './Style/main.css';
import { gameboardFactory } from './gameboardFactory';
import { createDOM } from './DOM';
import { Player } from './player';
import { gameLogic } from './gameLogic';

window.onload = function () {
  const DOM = createDOM();
  DOM.createGridCells();
  gameLogic();
};
