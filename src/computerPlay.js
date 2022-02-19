import { gameboardFactory } from './gameboardFactory';

export class computerPlayer {
  constructor() {
    this.name = 'Computer';
  }

  //Creates an array so when it attacks it will remove that coordinate from the array
  attackedCoordinates = [];

  gameboard = gameboardFactory();

  sendAttack() {
    //If the last attack was a hit on a ship it tries to found the next coordinates of that ship
    //by checking the adjacent cells

    //If it's the first attack it generates a random cell to shoot
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

    let areHit = this.attackedCoordinates.some((obj) => {
      return obj.x === x && obj.y === y;
    });

    while (areHit) {
      if (y === 9) {
        x = x + 1;
        y = 0;
      } else if (x === 9 && y === 9) {
        x = 0;
        y = 0;
      }

      y = y + 1;

      areHit = this.attackedCoordinates.some((obj) => {
        return obj.x === x && obj.y === y;
      });
    }
    this.attackedCoordinates.push({ x, y });
    return { x, y };
  }

  /*This was created to check wheter or not the computer would attack an already attacked cell
  checkDoubles() {
    let xy = this.attackedCoordinates.map((xy) => {
      let value = xy.x + '' + xy.y;
      return value;
    });
    let check = xy.some((item, i) => {
      console.log(item);
      return xy.indexOf(item) != i;
    });
    return check;
  }*/
}

//Create the AI for the computer to shot accordingly to last results if it found a shink that is not yet sank
