import { gameboardFactory } from './gameboardFactory';

export class Player {
  constructor(name) {
    this.name = name;
  }

  gameboard = gameboardFactory();

  isTurn = false;

  startTurn() {
    return (this.isTurn = true);
  }

  endTurn() {
    return (this.isTurn = false);
  }
}
