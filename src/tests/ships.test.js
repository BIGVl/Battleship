import { shipFactory } from '../shipFactory';

const ship = shipFactory(3);

test('The ship will have the given length in param 1', () => {
  expect(ship.length).toBe(3);
});

test("the hit function should return the position that was hit and wheter or not they've been sunk by calling isSunk()", () => {
  expect(ship.hit()).toBe('hit');
  expect(ship.hit()).toBe('hit');
  expect(ship.hit()).toBe('SUNK!');
  expect(ship.hit()).toBe('SUNK!');
});
