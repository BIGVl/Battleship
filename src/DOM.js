export const createDOM = () => {
  const grid1 = document.querySelector('.grid-1');
  const grid2 = document.querySelector('.grid-2');
  //Creates both grids for the players

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

  return { createGridCells };
};

//DOM Manipulation
export const listeners = () => {
  const grid1 = document.querySelector('.grid-1');
  const grid2 = document.querySelector('.grid-2');
  // function receiveAttack(player, board) {
  //   board.addEventListener('click', function (e) {
  //     const x = e.target.dataset.x;
  //     const y = e.target.dataset.y;
  //     console.log(player.gameboard.shipsArray);
  //     player.gameboard.receiveAttack(x, y);
  //   });
  // }

  function renderShips(coordinatesArray) {
    console.log(coordinatesArray);
    coordinatesArray.forEach((xy) => {
      const cell = grid1.querySelector(`[data-x="${xy.x}"][data-y="${xy.y}"]`);
      cell.style.cssText = 'background-color:rgba(160,160,160,0.7)';
    });
  }

  return { renderShips };
};
