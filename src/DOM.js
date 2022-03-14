import reverse from './assets/reverse.png';

export const createDOM = () => {
  const body = document.querySelector('body');
  const grid1 = document.createElement('div');
  const grid2 = document.createElement('div');
  grid1.dataset.grid = '1';
  grid2.dataset.grid = '2';
  const player1 = document.createElement('div');
  const player2 = document.createElement('div');
  body.appendChild(player1).classList.add('player1-screen');
  body.appendChild(player2).classList.add('player2-screen');
  player1.appendChild(grid1).classList.add('grid-1');
  player2.appendChild(grid2).classList.add('grid-2');

  //Creates both grids for the players
  function createShips(playerScreen) {
    const shipsDiv = document.createElement('div');

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
      shipsDiv.appendChild(ship).classList.add('ship');
    }

    playerScreen.appendChild(shipsDiv).classList.add('ships-div1');
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
export const manipulateDOM = (grid) => {
  const ships = document.querySelectorAll('.ship');
  let dragged;
  const initialCoordinates = [];

  //Adding events for the ships when the drag starts and ends and also a click one that will change the direction it goes
  //"orizonta" or "vertical"
  ships.forEach((ship) => {
    ship.addEventListener('drag', (e) => {
      e.target.style.opacity = '0.3';
    });

    ship.addEventListener('dragstart', (e) => {
      storeInitalCoordinates(e);
      dragged = e.target;
    });

    ship.addEventListener('dragend', (e) => {
      e.target.style.opacity = '1';
    });

    ship.addEventListener('click', (e) => {
      if (!e.target.parentElement.classList.contains('cell')) return;
      storeInitalCoordinates(e);
      dragged = e.target;
      if (checkValidDrop(e, 'click')) return;
      if (checkNearCells(e, 'click')) return;
      ship.classList.toggle('vertical');
      removeBusyState(e, 'click');
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

  console.log(grid);
  grid.addEventListener('dragenter', (e) => {});

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
    if (checkNearCells(e)) return;
    removeBusyState(e);
    addShipsToCells(e);
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

  function storeInitalCoordinates(e) {
    initialCoordinates.splice(0, initialCoordinates.length);
    dragged = e.target;
    if (dragged.parentElement.classList.contains('cell')) {
      const length = dragged.dataset.length;
      let x = e.target.parentElement.dataset.x;
      let y = e.target.parentElement.dataset.y;
      x = parseInt(x);
      y = parseInt(y);

      for (let i = 0; i < length; i++) {
        initialCoordinates.push({ x, y });
        if (dragged.classList.contains('vertical')) {
          x = x + 1;
        } else {
          y = y + 1;
        }
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
      initialCoordinates.forEach((xy) => {
        if (xy.x === x && xy.y === y) return;
      });
      const cell = document.querySelector(`[data-x='${x}'][data-y='${y}']`);
      let currentCell;
      if (dragged.parentElement.classList.contains('cell') && initialCoordinates.length !== 0) {
        currentCell = document.querySelector(`[data-x='${initialCoordinates[i].x}'][data-y='${initialCoordinates[i].y}']`);
      }

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
        if (currentCell === cell) return;

        check = true;
      }
    }

    return check;
  }

  function removeBusyState(e, action) {
    if (action === 'click') {
      let x = e.target.parentElement.dataset.x;
      let y = e.target.parentElement.dataset.y;
      y = parseInt(y);
      x = parseInt(x);
      const length = dragged.dataset.length;

      for (let i = 0; i < length; i++) {
        const cell = document.querySelector(`[data-x='${x}'][data-y='${y}']`);
        cell.classList.remove('busy');
        if (dragged.classList.contains('vertical')) {
          y = y + 1;
        } else {
          x = x + 1;
        }
      }
    } else {
      initialCoordinates.forEach((xy) => {
        const cell = document.querySelector(`[data-x='${xy.x}'][data-y='${xy.y}']`);
        cell.classList.remove('busy');
      });
    }
  }

  // Check if the nearby cells are already ocuppied so 2 ships can not be placed right next to each other
  function checkNearCells(e, action) {
    const length = dragged.dataset.length;
    let x;
    let y;
    let busy = false;
    if (action === 'click') {
      x = e.target.parentElement.dataset.x;
      y = e.target.parentElement.dataset.y;
    } else {
      x = e.target.dataset.x;
      y = e.target.dataset.y;
    }

    y = parseInt(y);
    x = parseInt(x);
    const occupiedCells = [];
    const addX = [-1, 0, 1];
    const addY = [-1, 0, 1];

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
      x = parseInt(x);
      y = parseInt(y);

      addX.forEach((adx) => {
        let numX = x + adx;
        if (numX < 0 || numX > 9) numX = x;

        addY.forEach((ady) => {
          let numY = y + ady;
          if (numY < 0 || numY > 9) numY = y;
          let checker = false;
          occupiedCells.forEach((cell) => {
            if (numX === cell.x && numY === cell.y) return (checker = true);
          });

          if (checker === true) return;
          const cell = document.querySelector(`[data-x='${numX}'][data-y='${numY}']`);

          const isYours = initialCoordinates.find((xy) => {
            if (xy.x === numX && xy.y === numY) return true;
          });

          if (cell.classList.contains('busy') && !isYours) busy = true;
        });
      });
    });
    return busy;
  }

  function saveShipsPosition() {}

  return { saveShipsPosition };
};
