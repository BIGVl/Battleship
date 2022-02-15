import { shipFactory } from './shipFactory';
import { gameboardFactory } from './gameboardFactory';

const ship = gameboardFactory();

ship.placeShip(3, '12,13,14');
