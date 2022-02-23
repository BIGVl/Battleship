import './Style/main.css';
import { gameboardFactory } from './gameboardFactory';
import { createDOM, manipulateDOM } from './DOM';
import { Player } from './player';
import { gameLogic } from './gameLogic';

const DOM = createDOM();
DOM.createGridCells();
DOM.createShips();
const manipulate = manipulateDOM();

gameLogic();
