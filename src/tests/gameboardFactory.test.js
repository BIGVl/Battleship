import { gameboardFactory } from '../gameboardFactory';

const gameboard = gameboardFactory();

test('the function should place ships at the given coordinates', () => {
  expect(gameboard.placeShips(12, 'orizontal', 4)).toEqual([12, 13, 14, 15]);
  expect(gameboard.placeShips(12, 'vertical', 2)).toEqual([12, 22]);
});

test('check if the ships array has all the ships ', () => {
  expect(gameboard.shipsArray.length).toBe(2);
});

test('when the user clicks on a cell to attack this will check if there is a ship there and if it this calls the hit function\
on the right ship or marks the postion to keep track of already hitten positons', () => {
  expect(gameboard.receiveAttack(2, 2)).toBe('hit');
  expect(gameboard.receiveAttack(2, 5)).toBe('miss');
  expect(gameboard.receiveAttack(2, 2)).toBe(null);
  expect(gameboard.receiveAttack(1, 2)).toBe('SUNK!');
  expect(gameboard.areAllShipsWrecked()).toBe(false);
});
