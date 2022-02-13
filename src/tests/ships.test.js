import { shipFactory } from '../shipFactory';

const ship = shipFactory(4);

test('check if the ship has been hit', () => {
  expect(ship.hit(3)).toBe(true);
  expect(ship.hit(3)).toBe(false);
});

test('isSunk should return true because as seen above the ship has taken hits on all positions', () => {
  expect(ship.isSunk()).toBe(false);
});

test('length should be equal to the first parameter', () => {
  expect(ship.length).toBe(4);
});
