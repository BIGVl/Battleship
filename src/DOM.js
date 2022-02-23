export const createDOM = () => {
  const grid1 = document.querySelector('.grid-1');
  const grid2 = document.querySelector('.grid-2');
  const player1 = document.querySelector('.player1-screen');
  const player2 = document.querySelector('.player2-screen');
  //Creates both grids for the players

  function createShips() {
    const shipsDiv1 = document.createElement('div');
    let manyShips = 0;
    let length = 4;

    for (let i = 1; i <= 10; i++) {
      if (manyShips + length <= 4) {
        manyShips = manyShips + 1;
      } else {
        manyShips = 1;
        length = length - 1;
      }
      const ship = document.createElement('div');
      ship.draggable = 'true';
      ship.dataset.length = length;
      let width = 53.27 * length;
      width = width.toFixed(2);
      ship.style.cssText = `width:${width}px;`;
      ship.addEventListener('drag');

      shipsDiv1.appendChild(ship).classList.add('ship');
    }
    player1.appendChild(shipsDiv1).classList.add('ships-div1');
  }

  function createGridCells() {
    let x = 0;
    let y = 0;

    for (let i = 0; i < 100; i++) {
      const cell = document.createElement('div');
      grid1.appendChild(cell).classList.add('cell');
      if (y === 10) {
      }
      cell.dataset.x = x;
      cell.dataset.y = y;
      y = y + 1;
      if (y === 10) {
        y = 0;
        x = x + 1;
      }
    }
    x = 0;
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement('div');
      grid2.appendChild(cell).classList.add('cell');
      if (y === 10) {
      }
      cell.dataset.x = x;
      cell.dataset.y = y;
      y = y + 1;
      if (y === 10) {
        y = 0;
        x = x + 1;
      }
    }
  }

  return { createGridCells, createShips };
};

//DOM Manipulation
export const manipulateDOM = () => {
  const grids = document.querySelectorAll('[data-grid]');

  grids.forEach((grid) => {
    grid.addEventListener('drag', () => {});
  });
  // function receiveAttack(player, board) {
  //   board.addEventListener('click', function (e) {
  //     const x = e.target.dataset.x;
  //     const y = e.target.dataset.y;
  //     console.log(player.gameboard.shipsArray);
  //     player.gameboard.receiveAttack(x, y);
  //   });
  // }

  function renderShips(coordinatesArray) {
    coordinatesArray.forEach((xy) => {
      const cell = grid1.querySelector(`[data-x="${xy.x}"][data-y="${xy.y}"]`);
      cell.style.cssText = 'background-color:rgba(160,160,160,0.7)';
    });
  }

  return { renderShips };
};
