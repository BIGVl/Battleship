import './Style/main.css';
import { gameboardFactory } from './gameboardFactory';
import { createDOM } from './DOM';

const DOM = createDOM();

window.onload = function () {
  DOM.createGridCells();
  DOM.createGridCells();
};
