import './Style/main.css';
import { gameboardFactory } from './gameboardFactory';
import { createDOM } from './DOM';
import { Player } from './player';
import { gameLogic } from './gameLogic';

const DOM = createDOM();
DOM.createGridCells();
gameLogic();
