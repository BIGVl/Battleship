import { Player } from '../player';

const player = new Player();

test("if it's the player's turn ", () => {
  player.startTurn();
  expect(player.isTurn).toBe(true);
  player.endTurn();
  expect(player.isTurn).toBe(false);
});
