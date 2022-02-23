import { shipFactory } from './shipFactory';

export const gameboardFactory = () => {
  const shipsArray = [];
  const wreckedShips = [];

  //Saves all coordinates so the gameboard can keep track of all the misses
  const allCoordinates = [];
  (function createCoordinates() {
    for (let i = 0; i < 100; i++) {
      if (i < 10) {
        i = '0' + i;
      }
      allCoordinates.push(i);
    }
  })();

  //Determines the length of the ships
  let manyShips = 1;
  let index = 3;

  //Places a new ship at choosen coordinates
  function placeShips(x, y, direction) {
    x = parseInt(x);
    y = parseInt(y);
    const coordinates = [];
    if (direction === 'vertical') {
      for (let i = 0; i <= index; i++) {
        coordinates.push({ x, y });
        x = x + 1;
      }
    } else if (direction === 'orizontal') {
      for (let i = 0; i <= index; i++) {
        coordinates.push({ x, y });
        y = y + 1;
      }
    }
    const ship = shipFactory(index);

    if (manyShips + index < 4) {
      manyShips = manyShips + 1;
    } else {
      manyShips = 1;
      index = index - 1;
    }

    shipsArray.push({ ship, coordinates });

    return coordinates;
  }

  //Checks if the the selected coordinates are occupied by a ship or not and
  //calls the hit function on that specific ship or marks the miss.
  function receiveAttack(x, y) {
    x = parseInt(x);
    y = parseInt(y);
    const hitCoordinates = x + '' + y;
    if (allCoordinates[hitCoordinates] === 'x') {
      return null;
    }
    allCoordinates.splice(hitCoordinates, 1, 'x');

    let returnValue = 'miss';
    shipsArray.forEach((ship) => {
      return ship.coordinates.find((coord) => {
        if (coord.x === x && coord.y === y) {
          returnValue = ship.ship.hit();
          if (returnValue === 'SUNK!') {
            wreckedShips.push(returnValue);
          }
        }
      });
    });

    return returnValue;
  }

  //Checks wether or not all the ships have been sunk

  function areAllShipsWrecked() {
    if (wreckedShips.length === 10) {
      return true;
    }
    return false;
  }

  return { shipsArray, placeShips, receiveAttack, areAllShipsWrecked };
};
