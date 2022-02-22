import './Style/main.css';
import { gameboardFactory } from './gameboardFactory';
import { createDOM } from './DOM';
import { Player } from './player';

export const gameLogic = () => {
  const player1 = new Player('YOYO');
  const player2 = new Player('XOXO');

  const board1 = document.querySelector('.grid-1');
  const board2 = document.querySelector('.grid-2');

  player1.gameboard.placeShips(1, 1, 'vertical');
  player1.gameboard.placeShips(1, 0, 'vertical');
  player1.gameboard.placeShips(1, 2, 'vertical');
  player1.gameboard.placeShips(1, 3, 'vertical');
  player1.gameboard.placeShips(1, 4, 'vertical');
  player1.gameboard.placeShips(1, 5, 'vertical');
  console.log(player1.gameboard.shipsArray);

  board1.addEventListener('click', function (e) {
    const x = e.target.dataset.x;
    const y = e.target.dataset.y;

    player1.gameboard.receiveAttack(x, y);
  });
};
