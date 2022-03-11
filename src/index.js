import './Style/main.css';
import './Style/start-screen.css';
import './Style/game-over.css';
import './Style/game-running.css';
import './Style/place-ships.css';
import { startScreen } from './Screens-scripts/startMenu';
import { gameboardFactory } from './Factories/gameboardFactory';
import { createDOM, manipulateDOM } from './DOM';
import { Player } from './Factories/player';
import { gameLogic } from './gameLogic';

const DOM = createDOM();

DOM.createGridCells();
DOM.createShips();
manipulateDOM();
