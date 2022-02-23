import { listeners } from './DOM';
import { Player } from './player';

const listener = listeners();

export const gameLogic = () => {
  const player1 = new Player('YOYO');
  const player2 = new Player('XOXO');
  const board1 = document.querySelector('.grid-1');
  const board2 = document.querySelector('.grid-2');

  board1.addEventListener('mousedown', (e) => {
    if (player1.gameboard.shipsArray.length >= 10) return;
    const x = e.target.dataset.x;
    const y = e.target.dataset.y;

    const coord = player1.gameboard.placeShips(x, y, 'orizontal');
    listener.renderShips(coord);
  });

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
