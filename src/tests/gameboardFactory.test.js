import { gameboardFactory } from '../gameboardFactory';

const gameboard = gameboardFactory();

test('check if the ships array has all the ships and with the right length', () => {
  expect(gameboard.shipsArray.length).toBe(10);
});
