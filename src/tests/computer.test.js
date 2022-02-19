import { computerPlayer } from '../computerPlay';

const computer = new computerPlayer();

computer.sendAttack();
computer.sendAttack();

test('Mock! it checks that the computer has attacked coordinates', () => {
  expect(computer.attackedCoordinates.length).toBe(2);
  //expect(computer.checkDoubles()).toEqual(false);
});
