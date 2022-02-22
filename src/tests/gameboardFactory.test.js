import { gameboardFactory } from '../gameboardFactory';

const gameboard = gameboardFactory();

gameboard.placeShips(1, 3, 'vertical');
gameboard.placeShips(1, 4, 'vertical');
gameboard.placeShips(1, 5, 'vertical');
gameboard.placeShips(1, 6, 'vertical');
gameboard.placeShips(1, 7, 'vertical');
gameboard.placeShips(1, 8, 'vertical');
gameboard.placeShips(1, 9, 'vertical');
gameboard.placeShips(1, 2, 'vertical');
gameboard.placeShips(1, 1, 'vertical');
gameboard.placeShips(1, 0, 'vertical');

test('check if the ships array has all the ships ', () => {
  expect(gameboard.shipsArray.length).toBe(10);
});

test('when the user clicks on a cell to attack this will check if there is a ship there and if it this calls the hit function\
on the right ship or marks the postion to keep track of already hitten positons', () => {
  expect(gameboard.receiveAttack(1, 3)).toBe('hit');
  expect(gameboard.receiveAttack(9, 5)).toBe('miss');
  expect(gameboard.receiveAttack(9, 5)).toBe(null);
  expect(gameboard.receiveAttack(1, 2)).toBe('hit');
  expect(gameboard.areAllShipsWrecked()).toBe(false);
  expect(gameboard.receiveAttack(1, 4)).toBe('hit');
  expect(gameboard.receiveAttack(1, 5)).toBe('hit');
});
