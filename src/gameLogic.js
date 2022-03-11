import { manipulateDOM } from './DOM';
import { Player } from './Factories/player';

export const gameLogic = () => {
  const player1 = new Player('YOYO');
  const player2 = new Player('XOXO');
  //Checks each attack if all the ships have been sunk
  function checkForWinner() {
    if (player1.gameboard.areAllShipsWrecked() === true) {
      console.log('player2 WON!');
    } else if (player2.gameboard.areAllShipsWrecked() === true) {
      console.log('player1 WON');
    }
  }
  return { checkForWinner };
};
