import { gameboardFactory } from '../gameboardFactory';

const gameboard = gameboardFactory();

test('the function should place ships at the given coordinates', () => {
  expect(gameboard.placeShips(12, 'orizontal')).toEqual([12, 13, 14, 15]);
  expect(gameboard.placeShips(22, 'vertical')).toEqual([22, 32, 42]);
  expect(gameboard.placeShips(16, 'vertical')).toEqual([16, 26, 36]);
  expect(gameboard.placeShips(45, 'vertical')).toEqual([45, 55]);
  expect(gameboard.placeShips(49, 'vertical')).toEqual([49, 59]);
  expect(gameboard.placeShips(48, 'vertical')).toEqual([48, 58]);
  expect(gameboard.placeShips(47, 'vertical')).toEqual([47]);
  expect(gameboard.placeShips(43, 'vertical')).toEqual([43]);
  expect(gameboard.placeShips(41, 'vertical')).toEqual([41]);
  expect(gameboard.placeShips(40, 'vertical')).toEqual([40]);
});

test('check if the ships array has all the ships ', () => {
  expect(gameboard.shipsArray.length).toBe(10);
});

test('when the user clicks on a cell to attack this will check if there is a ship there and if it this calls the hit function\
on the right ship or marks the postion to keep track of already hitten positons', () => {
  expect(gameboard.receiveAttack(2, 2)).toBe('hit');
  expect(gameboard.receiveAttack(2, 5)).toBe('miss');
  expect(gameboard.receiveAttack(2, 2)).toBe(null);
  expect(gameboard.receiveAttack(1, 2)).toBe('hit');
  expect(gameboard.areAllShipsWrecked()).toBe(false);
  expect(gameboard.receiveAttack(3, 2)).toBe('hit');
  expect(gameboard.receiveAttack(4, 2)).toBe('SUNK!');
});
