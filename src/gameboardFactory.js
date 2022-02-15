import { shipFactory } from './shipFactory';

export const gameboardFactory = () => {
  const ships = [];

  const allCoordinates = [];
  (function createCoordinates() {
    for (let i = 1; i <= 100; i++) {
      allCoordinates.push(i);
    }
  })();

  /*function iterate() {
    let x = 4;
    let y = 1;

    while (x + y <= 5) {
      console.log(x);
      y++;
      if (x + y > 5 && x !== 1) {
        x = x - 1;
        y = 1;
      }
    }
  }*/

  return { createShips, allCoordinates };
};
