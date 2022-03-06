import reverse from './assets/reverse.png';

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
      const reverseIt = document.createElement('img');
      reverseIt.src = reverse;
      const ship = document.createElement('div');
      ship.draggable = 'true';
      ship.dataset.length = length;
      ship.dataset.index = i;
      let width = 53.27 * length;
      width = width.toFixed(2);
      ship.style.cssText = `width:${width}px;`;

      ship.appendChild(reverseIt).classList.add('reverse-img');
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
  const ships = document.querySelectorAll('.ship');
  const shipDiv = document.querySelector('.ships-div1');
  let dragged;

  //Adding events for the ships when the drag starts and ends and also a click one that will change the direction it goes
  //"orizonta" or "vertical"
  ships.forEach((ship) => {
    ship.addEventListener('drag', (e) => {
      e.target.style.opacity = '0.3';
    });

    ship.addEventListener('dragstart', (e) => {
      changeBusynessState(e);
    });

    ship.addEventListener('dragend', (e) => {
      e.target.style.opacity = '1';
    });

    ship.addEventListener('click', (e) => {
      if (!e.target.parentElement.classList.contains('cell')) return;
      dragged = e.target;
      if (checkValidDrop(e, 'click')) return;
      checkNearCells(e, 'click');
      ship.classList.toggle('vertical');
      changeBusynessState(e, 'click');
      if (ship.classList.contains('vertical')) {
        let body = 53.27 * e.target.dataset.length;
        body = body.toFixed(2);
        ship.style.cssText = `height:${body}px; width:53.27px;`;
      } else {
        let body = 53.27 * e.target.dataset.length;
        body = body.toFixed(2);
        ship.style.cssText = `width:${body}px; height:53.27px;`;
      }
      addShipsToCells(e, 'click');
    });
  });

  grids.forEach((grid) => {
    grid.addEventListener('dragover', (e) => {
      e.preventDefault();
      const length = dragged.dataset.length;
      let x = e.target.dataset.x;
      let y = e.target.dataset.y;
      x = parseInt(x);
      y = parseInt(y);

      for (let i = 0; i < length; i++) {
        const cell = document.querySelector(`[data-x='${x}'][data-y='${y}']`);
        if (dragged.classList.contains('vertical')) {
          x = x + 1;
        } else {
          y = y + 1;
        }
        if (cell !== null) cell.classList.add('dragover');
      }
    });

    grid.addEventListener('dragleave', (e) => {
      const leavedCell = document.querySelectorAll('.dragover');
      leavedCell.forEach((leaved) => {
        leaved.classList.remove('dragover');
      });
    });

    grid.addEventListener('drop', (e) => {
      e.preventDefault();
      const leavedCell = document.querySelectorAll('.dragover');
      leavedCell.forEach((leaved) => {
        leaved.classList.remove('dragover');
      });
      if (checkValidDrop(e)) return;
      addShipsToCells(e);
    });
  });

  function addShipsToCells(e, action) {
    let x;
    let y;

    dragged.classList.add('dragged');
    if (!e.target.contains(dragged)) {
      e.target.appendChild(dragged);
    }
    if (action === 'click') {
      x = e.target.parentElement.dataset.x;
      y = e.target.parentElement.dataset.y;
    } else {
      x = e.target.dataset.x;
      y = e.target.dataset.y;
    }
    x = parseInt(x);
    y = parseInt(y);
    for (let i = 0; i < dragged.dataset.length; i++) {
      const cell = document.querySelector(`[data-x='${x}'][data-y='${y}']`);

      cell.classList.add('busy');
      if (dragged.classList.contains('vertical')) {
        x = x + 1;
      } else {
        y = y + 1;
      }
    }
  }

  //Checks if there is a ship already on any cell or if it does not fit in the grid and cancels the action if true
  function checkValidDrop(e, action) {
    const length = dragged.dataset.length;
    let x;
    let y;

    if (action === 'click') {
      x = e.target.parentElement.dataset.x;
      y = e.target.parentElement.dataset.y;
    } else {
      x = e.target.dataset.x;
      y = e.target.dataset.y;
    }
    y = parseInt(y);
    x = parseInt(x);
    let check = false;
    const firstCell = document.querySelector(`[data-x='${x}'][data-y='${y}']`);

    for (let i = 0; i < length; i++) {
      const cell = document.querySelector(`[data-x='${x}'][data-y='${y}']`);

      if (dragged.classList.contains('vertical')) {
        if (action === 'click') {
          y = y + 1;
        } else {
          x = x + 1;
        }
      } else {
        if (action === 'click') {
          x = x + 1;
        } else {
          y = y + 1;
        }
      }

      let theCell;
      if (action === 'click') {
        if (cell !== firstCell) {
          theCell = cell;

          if (cell === null || theCell.classList.contains('busy')) {
            check = true;
          }
        }
      } else if (cell === null || (cell.classList.contains('busy') && theCell !== cell)) {
        check = true;
      }
    }

    return check;
  }

  function changeBusynessState(e, action) {
    dragged = e.target;
    e.target.style.opacity = '0.6';
    const cell = e.target.parentElement;
    if (cell.classList.contains('cell')) {
      let y = cell.dataset.y;
      let x = cell.dataset.x;
      y = parseInt(y);
      x = parseInt(x);
      for (let i = 0; i < dragged.dataset.length; i++) {
        const theCell = document.querySelector(`[data-x='${x}'][data-y='${y}']`);
        //Even though when vertical we should target x axis, this function should delete where the ship was previously placed when clicked, so it deletes the
        //busy class from the cells that were occupied
        theCell.classList.remove('busy');
        if (dragged.classList.contains('vertical')) {
          if (action === 'click') {
            y = y + 1;
          } else {
            x = x + 1;
          }
        } else {
          if (action === 'click') {
            x = x + 1;
          } else {
            y = y + 1;
          }
        }
      }
    }
  }

  // Check if the nearby cells are already ocuppied so 2 ships can not be placed right next to each other
  function checkNearCells(e, action) {
    const length = dragged.dataset.length;
    let x = e.target.parentElement.dataset.x;
    let y = e.target.parentElement.dataset.y;
    y = parseInt(y);
    x = parseInt(x);
    const occupiedCells = [];
    const NEIGHBOURCELLS = [];

    for (let i = 0; i < length; i++) {
      occupiedCells.push({ x, y });

      if (dragged.classList.contains('vertical')) {
        if (action === 'click') {
          y = y + 1;
        } else {
          x = x + 1;
        }
      } else {
        if (action === 'click') {
          x = x + 1;
        } else {
          y = y + 1;
        }
      }
    }
    occupiedCells.forEach((cell) => {
      let y = cell.y;
      let x = cell.x;

      const nearCell = document.querySelector(document.querySelector(`[data-x='${x}'][data-y='${y}']`));
    });
  }

  function renderShips(coordinatesArray, grid) {
    coordinatesArray.forEach((xy) => {
      const cell = grid.querySelector(`[data-x="${xy.x}"][data-y="${xy.y}"]`);
      cell.style.cssText = 'background-color:rgba(160,160,160,0.7)';
    });
  }

  return { renderShips };
};
