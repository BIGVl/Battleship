/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDOM": () => (/* binding */ createDOM),
/* harmony export */   "manipulateDOM": () => (/* binding */ manipulateDOM)
/* harmony export */ });
/* harmony import */ var _assets_reverse_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/reverse.png */ "./src/assets/reverse.png");

var createDOM = function createDOM() {
  var grid1 = document.querySelector('.grid-1');
  var grid2 = document.querySelector('.grid-2');
  var player1 = document.querySelector('.player1-screen');
  var player2 = document.querySelector('.player2-screen'); //Creates both grids for the players

  function createShips() {
    var shipsDiv1 = document.createElement('div');
    var manyShips = 0;
    var length = 4;

    for (var i = 1; i <= 10; i++) {
      if (manyShips + length <= 4) {
        manyShips = manyShips + 1;
      } else {
        manyShips = 1;
        length = length - 1;
      }

      var reverseIt = document.createElement('img');
      reverseIt.src = _assets_reverse_png__WEBPACK_IMPORTED_MODULE_0__;
      var ship = document.createElement('div');
      ship.draggable = 'true';
      ship.dataset.length = length;
      ship.dataset.index = i;
      var width = 53.27 * length;
      width = width.toFixed(2);
      ship.style.cssText = "width:".concat(width, "px;");
      ship.appendChild(reverseIt).classList.add('reverse-img');
      shipsDiv1.appendChild(ship).classList.add('ship');
    }

    player1.appendChild(shipsDiv1).classList.add('ships-div1');
  }

  function createGridCells() {
    var x = 0;
    var y = 0;

    for (var i = 0; i < 100; i++) {
      var cell = document.createElement('div');
      grid1.appendChild(cell).classList.add('cell');

      if (y === 10) {}

      cell.dataset.x = x;
      cell.dataset.y = y;
      y = y + 1;

      if (y === 10) {
        y = 0;
        x = x + 1;
      }
    }

    x = 0;

    for (var _i = 0; _i < 100; _i++) {
      var _cell = document.createElement('div');

      grid2.appendChild(_cell).classList.add('cell');

      if (y === 10) {}

      _cell.dataset.x = x;
      _cell.dataset.y = y;
      y = y + 1;

      if (y === 10) {
        y = 0;
        x = x + 1;
      }
    }
  }

  return {
    createGridCells: createGridCells,
    createShips: createShips
  };
}; //DOM Manipulation

var manipulateDOM = function manipulateDOM() {
  var grids = document.querySelectorAll('[data-grid]');
  var ships = document.querySelectorAll('.ship');
  var shipDiv = document.querySelector('.ships-div1');
  var dragged; //Adding events for the ships when the drag starts and ends and also a click one that will change the direction it goes
  //"orizonta" or "vertical"

  ships.forEach(function (ship) {
    ship.addEventListener('drag', function (e) {
      e.target.style.opacity = '0.3';
    });
    ship.addEventListener('dragstart', function (e) {
      changeBusynessState(e);
    });
    ship.addEventListener('dragend', function (e) {
      e.target.style.opacity = '1';
    });
    ship.addEventListener('click', function (e) {
      if (!e.target.parentElement.classList.contains('cell')) return;
      dragged = e.target;
      if (checkValidDrop(e, 'click')) return;
      checkNearCells(e, 'click');
      ship.classList.toggle('vertical');
      changeBusynessState(e, 'click');

      if (ship.classList.contains('vertical')) {
        var body = 53.27 * e.target.dataset.length;
        body = body.toFixed(2);
        ship.style.cssText = "height:".concat(body, "px; width:53.27px;");
      } else {
        var _body = 53.27 * e.target.dataset.length;

        _body = _body.toFixed(2);
        ship.style.cssText = "width:".concat(_body, "px; height:53.27px;");
      }

      addShipsToCells(e, 'click');
    });
  });
  grids.forEach(function (grid) {
    grid.addEventListener('dragover', function (e) {
      e.preventDefault();
      var length = dragged.dataset.length;
      var x = e.target.dataset.x;
      var y = e.target.dataset.y;
      x = parseInt(x);
      y = parseInt(y);

      for (var i = 0; i < length; i++) {
        var cell = document.querySelector("[data-x='".concat(x, "'][data-y='").concat(y, "']"));

        if (dragged.classList.contains('vertical')) {
          x = x + 1;
        } else {
          y = y + 1;
        }

        if (cell !== null) cell.classList.add('dragover');
      }
    });
    grid.addEventListener('dragleave', function (e) {
      var leavedCell = document.querySelectorAll('.dragover');
      leavedCell.forEach(function (leaved) {
        leaved.classList.remove('dragover');
      });
    });
    grid.addEventListener('drop', function (e) {
      e.preventDefault();
      var leavedCell = document.querySelectorAll('.dragover');
      leavedCell.forEach(function (leaved) {
        leaved.classList.remove('dragover');
      });
      if (checkValidDrop(e)) return;
      addShipsToCells(e);
    });
  });

  function addShipsToCells(e, action) {
    var x;
    var y;
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

    for (var i = 0; i < dragged.dataset.length; i++) {
      var cell = document.querySelector("[data-x='".concat(x, "'][data-y='").concat(y, "']"));
      cell.classList.add('busy');

      if (dragged.classList.contains('vertical')) {
        x = x + 1;
      } else {
        y = y + 1;
      }
    }
  } //Checks if there is a ship already on any cell or if it does not fit in the grid and cancels the action if true


  function checkValidDrop(e, action) {
    var length = dragged.dataset.length;
    var x;
    var y;

    if (action === 'click') {
      x = e.target.parentElement.dataset.x;
      y = e.target.parentElement.dataset.y;
    } else {
      x = e.target.dataset.x;
      y = e.target.dataset.y;
    }

    y = parseInt(y);
    x = parseInt(x);
    var check = false;
    var firstCell = document.querySelector("[data-x='".concat(x, "'][data-y='").concat(y, "']"));

    for (var i = 0; i < length; i++) {
      var cell = document.querySelector("[data-x='".concat(x, "'][data-y='").concat(y, "']"));

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

      var theCell = void 0;

      if (action === 'click') {
        if (cell !== firstCell) {
          theCell = cell;

          if (cell === null || theCell.classList.contains('busy')) {
            check = true;
          }
        }
      } else if (cell === null || cell.classList.contains('busy') && theCell !== cell) {
        check = true;
      }
    }

    return check;
  }

  function changeBusynessState(e, action) {
    dragged = e.target;
    e.target.style.opacity = '0.6';
    var cell = e.target.parentElement;

    if (cell.classList.contains('cell')) {
      var y = cell.dataset.y;
      var x = cell.dataset.x;
      y = parseInt(y);
      x = parseInt(x);

      for (var i = 0; i < dragged.dataset.length; i++) {
        var theCell = document.querySelector("[data-x='".concat(x, "'][data-y='").concat(y, "']")); //Even though when vertical we should target x axis, this function should delete where the ship was previously placed when clicked, so it deletes the
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
  } // Check if the nearby cells are already ocuppied so 2 ships can not be placed right next to each other


  function checkNearCells(e, action) {
    var length = dragged.dataset.length;
    var x = e.target.parentElement.dataset.x;
    var y = e.target.parentElement.dataset.y;
    y = parseInt(y);
    x = parseInt(x);
    var occupiedCells = [];
    var NEIGHBOURCELLS = [];

    for (var i = 0; i < length; i++) {
      occupiedCells.push({
        x: x,
        y: y
      });

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

    occupiedCells.forEach(function (cell) {
      var y = cell.y;
      var x = cell.x;
      var nearCell = document.querySelector(document.querySelector("[data-x='".concat(x, "'][data-y='").concat(y, "']")));
    });
  }

  function renderShips(coordinatesArray, grid) {
    coordinatesArray.forEach(function (xy) {
      var cell = grid.querySelector("[data-x=\"".concat(xy.x, "\"][data-y=\"").concat(xy.y, "\"]"));
      cell.style.cssText = 'background-color:rgba(160,160,160,0.7)';
    });
  }

  return {
    renderShips: renderShips
  };
};

/***/ }),

/***/ "./src/gameLogic.js":
/*!**************************!*\
  !*** ./src/gameLogic.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameLogic": () => (/* binding */ gameLogic)
/* harmony export */ });
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");


var gameLogic = function gameLogic() {
  var player1 = new _player__WEBPACK_IMPORTED_MODULE_1__.Player('YOYO');
  var player2 = new _player__WEBPACK_IMPORTED_MODULE_1__.Player('XOXO'); //Checks each attack if all the ships have been sunk

  function checkForWinner() {
    if (player1.gameboard.areAllShipsWrecked() === true) {
      console.log('player2 WON!');
    } else if (player2.gameboard.areAllShipsWrecked() === true) {
      console.log('player1 WON');
    }
  }

  return {
    checkForWinner: checkForWinner
  };
};

/***/ }),

/***/ "./src/gameboardFactory.js":
/*!*********************************!*\
  !*** ./src/gameboardFactory.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameboardFactory": () => (/* binding */ gameboardFactory)
/* harmony export */ });
/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipFactory */ "./src/shipFactory.js");

var gameboardFactory = function gameboardFactory() {
  var shipsArray = [];
  var wreckedShips = []; //Saves all coordinates so the gameboard can keep track of all the misses

  var allCoordinates = [];

  (function createCoordinates() {
    for (var i = 0; i < 100; i++) {
      if (i < 10) {
        i = '0' + i;
      }

      allCoordinates.push(i);
    }
  })(); //Places a new ship at choosen coordinates
  //This is redundant, you are going to place ships in a diferrent way, after the user click start when he finishes adding the ships, then for each ship
  //you takes it's coordinates and then create the ships based on each coordinate, you will have to refactor the receiveAttack as well


  function placeShips(x, y, direction) {
    x = parseInt(x);
    y = parseInt(y);
    var coordinates = [];

    if (direction === 'vertical') {
      for (var i = 0; i <= index; i++) {
        coordinates.push({
          x: x,
          y: y
        });
        x = x + 1;
      }
    } else if (direction === 'orizontal') {
      for (var _i = 0; _i <= index; _i++) {
        coordinates.push({
          x: x,
          y: y
        });
        y = y + 1;
      }
    }

    var ship = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__.shipFactory)(index);
    shipsArray.push({
      ship: ship,
      coordinates: coordinates
    });
    return coordinates;
  } //Checks if the the selected coordinates are occupied by a ship or not and
  //calls the hit function on that specific ship or marks the miss.


  function receiveAttack(x, y) {
    x = parseInt(x);
    y = parseInt(y);
    var hitCoordinates = x + '' + y;

    if (allCoordinates[hitCoordinates] === 'x') {
      return null;
    }

    allCoordinates.splice(hitCoordinates, 1, 'x');
    var returnValue = 'miss';
    shipsArray.forEach(function (ship) {
      return ship.coordinates.find(function (coord) {
        if (coord.x === x && coord.y === y) {
          returnValue = ship.ship.hit();

          if (returnValue === 'SUNK!') {
            wreckedShips.push(returnValue);
          }
        }
      });
    });
    return returnValue;
  } //Checks wether or not all the ships have been sunk


  function areAllShipsWrecked() {
    if (wreckedShips.length === 10) {
      return true;
    }

    return false;
  }

  return {
    shipsArray: shipsArray,
    placeShips: placeShips,
    receiveAttack: receiveAttack,
    areAllShipsWrecked: areAllShipsWrecked
  };
};

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboardFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboardFactory */ "./src/gameboardFactory.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var Player = /*#__PURE__*/function () {
  function Player(name) {
    _classCallCheck(this, Player);

    _defineProperty(this, "gameboard", (0,_gameboardFactory__WEBPACK_IMPORTED_MODULE_0__.gameboardFactory)());

    _defineProperty(this, "isTurn", false);

    this.name = name;
  }

  _createClass(Player, [{
    key: "startTurn",
    value: function startTurn() {
      return this.isTurn = true;
    }
  }, {
    key: "endTurn",
    value: function endTurn() {
      return this.isTurn = false;
    }
  }]);

  return Player;
}();

/***/ }),

/***/ "./src/shipFactory.js":
/*!****************************!*\
  !*** ./src/shipFactory.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shipFactory": () => (/* binding */ shipFactory)
/* harmony export */ });
var shipFactory = function shipFactory(len) {
  var length = len;
  var positionsArray = [];

  for (var _i = 0; _i <= length; _i++) {
    positionsArray.push(_i);
  }

  var i = 0;

  function hit() {
    positionsArray.splice(i, 1, 'hit');
    console.log(positionsArray);

    if (isSunk()) {
      return 'SUNK!';
    }

    i++;
    return 'hit';
  }

  function isSunk() {
    return positionsArray.every(function (position) {
      return position === 'hit';
    });
  }

  return {
    length: length,
    hit: hit
  };
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/Style/main.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/Style/main.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Pirata+One&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "*,\n*::before,\n*::after {\n  box-sizing: border-box;\n  padding: 0;\n  margin: 0;\n}\n\n:root {\n  --ship: #03045e;\n  --grid: #caf0f8;\n  --border: #03045e;\n  --yet-ship: #0077b6;\n}\n\nbody {\n  width: 100vw;\n  height: 100vh;\n  font-family: 'Pirata One', cursive;\n  display: grid;\n  grid-template-columns: 50% 50%;\n  grid-template-rows: 4rem auto;\n  grid-template-areas:\n    'header header'\n    'player1 player2';\n}\n\nheader {\n  grid-area: header;\n  height: 3.7rem;\n  background-color: #023e8a;\n  border-bottom-left-radius: 25px;\n  border-bottom-right-radius: 25px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.title {\n  font-size: 2.5rem;\n  letter-spacing: 2px;\n}\n\n.player1-screen,\n.player2-screen {\n  grid-area: player1;\n  display: grid;\n  grid-template-rows: 25% 75%;\n  grid-template-areas:\n    'ships'\n    'grids';\n}\n\n.player2-screen {\n  grid-area: player2;\n}\n\n.ships-div1 {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n  padding: 10px;\n}\n\n.ship {\n  grid-area: ships;\n  height: 3.33em;\n  background-color: var(--yet-ship);\n  border: 1px solid var(--border);\n  cursor: grab;\n  display: flex;\n  align-items: center;\n}\n\n.ship.vertical {\n  align-items: flex-start;\n  justify-content: center;\n  padding-top: 10px;\n}\n\n.reverse-img {\n  filter: invert(77%) sepia(2%) saturate(24%) hue-rotate(320deg) brightness(88%) contrast(92%);\n  opacity: 0;\n  pointer-events: none;\n}\n\n.cell > .ship:hover > .reverse-img {\n  opacity: 1;\n}\n\n.dragover {\n  background-color: var(--yet-ship);\n  border: 1px solid var(--border);\n}\n\n.dragged {\n  background-color: var(--ship);\n  border: 1px solid var(--border);\n  z-index: 5;\n}\n\n.grid-1,\n.grid-2 {\n  grid-area: grids;\n  justify-self: center;\n\n  width: 33.3em;\n  height: 33.3em;\n  display: flex;\n  flex-wrap: wrap;\n  background: var(--grid);\n  background-position-x: 50%;\n  background-position-y: 40%;\n  cursor: pointer;\n}\n\n[data-y='9'] {\n  border-right: 1px solid black;\n}\n\n[data-x='9'] {\n  border-bottom: 1px solid black;\n}\n\n.cell {\n  border-top: 1px solid black;\n  border-left: 1px solid black;\n  width: 10%;\n  height: 10%;\n}\n", "",{"version":3,"sources":["webpack://./src/Style/main.css"],"names":[],"mappings":"AAEA;;;EAGE,sBAAsB;EACtB,UAAU;EACV,SAAS;AACX;;AAEA;EACE,eAAe;EACf,eAAe;EACf,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,kCAAkC;EAClC,aAAa;EACb,8BAA8B;EAC9B,6BAA6B;EAC7B;;qBAEmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,cAAc;EACd,yBAAyB;EACzB,+BAA+B;EAC/B,gCAAgC;EAChC,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;;EAEE,kBAAkB;EAClB,aAAa;EACb,2BAA2B;EAC3B;;WAES;AACX;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,SAAS;EACT,aAAa;AACf;;AAEA;EACE,gBAAgB;EAChB,cAAc;EACd,iCAAiC;EACjC,+BAA+B;EAC/B,YAAY;EACZ,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,uBAAuB;EACvB,uBAAuB;EACvB,iBAAiB;AACnB;;AAEA;EACE,4FAA4F;EAC5F,UAAU;EACV,oBAAoB;AACtB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,iCAAiC;EACjC,+BAA+B;AACjC;;AAEA;EACE,6BAA6B;EAC7B,+BAA+B;EAC/B,UAAU;AACZ;;AAEA;;EAEE,gBAAgB;EAChB,oBAAoB;;EAEpB,aAAa;EACb,cAAc;EACd,aAAa;EACb,eAAe;EACf,uBAAuB;EACvB,0BAA0B;EAC1B,0BAA0B;EAC1B,eAAe;AACjB;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,2BAA2B;EAC3B,4BAA4B;EAC5B,UAAU;EACV,WAAW;AACb","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Pirata+One&display=swap');\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n  padding: 0;\n  margin: 0;\n}\n\n:root {\n  --ship: #03045e;\n  --grid: #caf0f8;\n  --border: #03045e;\n  --yet-ship: #0077b6;\n}\n\nbody {\n  width: 100vw;\n  height: 100vh;\n  font-family: 'Pirata One', cursive;\n  display: grid;\n  grid-template-columns: 50% 50%;\n  grid-template-rows: 4rem auto;\n  grid-template-areas:\n    'header header'\n    'player1 player2';\n}\n\nheader {\n  grid-area: header;\n  height: 3.7rem;\n  background-color: #023e8a;\n  border-bottom-left-radius: 25px;\n  border-bottom-right-radius: 25px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.title {\n  font-size: 2.5rem;\n  letter-spacing: 2px;\n}\n\n.player1-screen,\n.player2-screen {\n  grid-area: player1;\n  display: grid;\n  grid-template-rows: 25% 75%;\n  grid-template-areas:\n    'ships'\n    'grids';\n}\n\n.player2-screen {\n  grid-area: player2;\n}\n\n.ships-div1 {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n  padding: 10px;\n}\n\n.ship {\n  grid-area: ships;\n  height: 3.33em;\n  background-color: var(--yet-ship);\n  border: 1px solid var(--border);\n  cursor: grab;\n  display: flex;\n  align-items: center;\n}\n\n.ship.vertical {\n  align-items: flex-start;\n  justify-content: center;\n  padding-top: 10px;\n}\n\n.reverse-img {\n  filter: invert(77%) sepia(2%) saturate(24%) hue-rotate(320deg) brightness(88%) contrast(92%);\n  opacity: 0;\n  pointer-events: none;\n}\n\n.cell > .ship:hover > .reverse-img {\n  opacity: 1;\n}\n\n.dragover {\n  background-color: var(--yet-ship);\n  border: 1px solid var(--border);\n}\n\n.dragged {\n  background-color: var(--ship);\n  border: 1px solid var(--border);\n  z-index: 5;\n}\n\n.grid-1,\n.grid-2 {\n  grid-area: grids;\n  justify-self: center;\n\n  width: 33.3em;\n  height: 33.3em;\n  display: flex;\n  flex-wrap: wrap;\n  background: var(--grid);\n  background-position-x: 50%;\n  background-position-y: 40%;\n  cursor: pointer;\n}\n\n[data-y='9'] {\n  border-right: 1px solid black;\n}\n\n[data-x='9'] {\n  border-bottom: 1px solid black;\n}\n\n.cell {\n  border-top: 1px solid black;\n  border-left: 1px solid black;\n  width: 10%;\n  height: 10%;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/Style/main.css":
/*!****************************!*\
  !*** ./src/Style/main.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./src/Style/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/reverse.png":
/*!********************************!*\
  !*** ./src/assets/reverse.png ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "7e12741631b7fdd4c5d4.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Style_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Style/main.css */ "./src/Style/main.css");
/* harmony import */ var _gameboardFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboardFactory */ "./src/gameboardFactory.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _gameLogic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gameLogic */ "./src/gameLogic.js");





var DOM = (0,_DOM__WEBPACK_IMPORTED_MODULE_2__.createDOM)();
DOM.createGridCells();
DOM.createShips();
var manipulate = (0,_DOM__WEBPACK_IMPORTED_MODULE_2__.manipulateDOM)();
(0,_gameLogic__WEBPACK_IMPORTED_MODULE_4__.gameLogic)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztVQ2ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1RLEdBQUcsR0FBR2hHLCtDQUFTLEVBQXJCO0FBQ0FnRyxHQUFHLENBQUN0RSxlQUFKO0FBQ0FzRSxHQUFHLENBQUN6RixXQUFKO0FBQ0EsSUFBTTBGLFVBQVUsR0FBR25FLG1EQUFhLEVBQWhDO0FBRUFxQyxxREFBUyxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lTG9naWMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9TdHlsZS9tYWluLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9TdHlsZS9tYWluLmNzcz9hMDllIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmV2ZXJzZSBmcm9tICcuL2Fzc2V0cy9yZXZlcnNlLnBuZyc7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVET00gPSAoKSA9PiB7XG4gIGNvbnN0IGdyaWQxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQtMScpO1xuICBjb25zdCBncmlkMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkLTInKTtcbiAgY29uc3QgcGxheWVyMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIxLXNjcmVlbicpO1xuICBjb25zdCBwbGF5ZXIyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjItc2NyZWVuJyk7XG5cbiAgLy9DcmVhdGVzIGJvdGggZ3JpZHMgZm9yIHRoZSBwbGF5ZXJzXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoaXBzKCkge1xuICAgIGNvbnN0IHNoaXBzRGl2MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgbGV0IG1hbnlTaGlwcyA9IDA7XG4gICAgbGV0IGxlbmd0aCA9IDQ7XG5cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMDsgaSsrKSB7XG4gICAgICBpZiAobWFueVNoaXBzICsgbGVuZ3RoIDw9IDQpIHtcbiAgICAgICAgbWFueVNoaXBzID0gbWFueVNoaXBzICsgMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hbnlTaGlwcyA9IDE7XG4gICAgICAgIGxlbmd0aCA9IGxlbmd0aCAtIDE7XG4gICAgICB9XG4gICAgICBjb25zdCByZXZlcnNlSXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIHJldmVyc2VJdC5zcmMgPSByZXZlcnNlO1xuICAgICAgY29uc3Qgc2hpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgc2hpcC5kcmFnZ2FibGUgPSAndHJ1ZSc7XG4gICAgICBzaGlwLmRhdGFzZXQubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgc2hpcC5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICAgIGxldCB3aWR0aCA9IDUzLjI3ICogbGVuZ3RoO1xuICAgICAgd2lkdGggPSB3aWR0aC50b0ZpeGVkKDIpO1xuICAgICAgc2hpcC5zdHlsZS5jc3NUZXh0ID0gYHdpZHRoOiR7d2lkdGh9cHg7YDtcblxuICAgICAgc2hpcC5hcHBlbmRDaGlsZChyZXZlcnNlSXQpLmNsYXNzTGlzdC5hZGQoJ3JldmVyc2UtaW1nJyk7XG4gICAgICBzaGlwc0RpdjEuYXBwZW5kQ2hpbGQoc2hpcCkuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgIH1cbiAgICBwbGF5ZXIxLmFwcGVuZENoaWxkKHNoaXBzRGl2MSkuY2xhc3NMaXN0LmFkZCgnc2hpcHMtZGl2MScpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlR3JpZENlbGxzKCkge1xuICAgIGxldCB4ID0gMDtcbiAgICBsZXQgeSA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBncmlkMS5hcHBlbmRDaGlsZChjZWxsKS5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XG4gICAgICBpZiAoeSA9PT0gMTApIHtcbiAgICAgIH1cbiAgICAgIGNlbGwuZGF0YXNldC54ID0geDtcbiAgICAgIGNlbGwuZGF0YXNldC55ID0geTtcbiAgICAgIHkgPSB5ICsgMTtcbiAgICAgIGlmICh5ID09PSAxMCkge1xuICAgICAgICB5ID0gMDtcbiAgICAgICAgeCA9IHggKyAxO1xuICAgICAgfVxuICAgIH1cbiAgICB4ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBncmlkMi5hcHBlbmRDaGlsZChjZWxsKS5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XG4gICAgICBpZiAoeSA9PT0gMTApIHtcbiAgICAgIH1cbiAgICAgIGNlbGwuZGF0YXNldC54ID0geDtcbiAgICAgIGNlbGwuZGF0YXNldC55ID0geTtcbiAgICAgIHkgPSB5ICsgMTtcbiAgICAgIGlmICh5ID09PSAxMCkge1xuICAgICAgICB5ID0gMDtcbiAgICAgICAgeCA9IHggKyAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGNyZWF0ZUdyaWRDZWxscywgY3JlYXRlU2hpcHMgfTtcbn07XG5cbi8vRE9NIE1hbmlwdWxhdGlvblxuZXhwb3J0IGNvbnN0IG1hbmlwdWxhdGVET00gPSAoKSA9PiB7XG4gIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZ3JpZF0nKTtcbiAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hpcCcpO1xuICBjb25zdCBzaGlwRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoaXBzLWRpdjEnKTtcbiAgbGV0IGRyYWdnZWQ7XG5cbiAgLy9BZGRpbmcgZXZlbnRzIGZvciB0aGUgc2hpcHMgd2hlbiB0aGUgZHJhZyBzdGFydHMgYW5kIGVuZHMgYW5kIGFsc28gYSBjbGljayBvbmUgdGhhdCB3aWxsIGNoYW5nZSB0aGUgZGlyZWN0aW9uIGl0IGdvZXNcbiAgLy9cIm9yaXpvbnRhXCIgb3IgXCJ2ZXJ0aWNhbFwiXG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWcnLCAoZSkgPT4ge1xuICAgICAgZS50YXJnZXQuc3R5bGUub3BhY2l0eSA9ICcwLjMnO1xuICAgIH0pO1xuXG4gICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZSkgPT4ge1xuICAgICAgY2hhbmdlQnVzeW5lc3NTdGF0ZShlKTtcbiAgICB9KTtcblxuICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIChlKSA9PiB7XG4gICAgICBlLnRhcmdldC5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgIH0pO1xuXG4gICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBpZiAoIWUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxsJykpIHJldHVybjtcbiAgICAgIGRyYWdnZWQgPSBlLnRhcmdldDtcbiAgICAgIGlmIChjaGVja1ZhbGlkRHJvcChlLCAnY2xpY2snKSkgcmV0dXJuO1xuICAgICAgY2hlY2tOZWFyQ2VsbHMoZSwgJ2NsaWNrJyk7XG4gICAgICBzaGlwLmNsYXNzTGlzdC50b2dnbGUoJ3ZlcnRpY2FsJyk7XG4gICAgICBjaGFuZ2VCdXN5bmVzc1N0YXRlKGUsICdjbGljaycpO1xuICAgICAgaWYgKHNoaXAuY2xhc3NMaXN0LmNvbnRhaW5zKCd2ZXJ0aWNhbCcpKSB7XG4gICAgICAgIGxldCBib2R5ID0gNTMuMjcgKiBlLnRhcmdldC5kYXRhc2V0Lmxlbmd0aDtcbiAgICAgICAgYm9keSA9IGJvZHkudG9GaXhlZCgyKTtcbiAgICAgICAgc2hpcC5zdHlsZS5jc3NUZXh0ID0gYGhlaWdodDoke2JvZHl9cHg7IHdpZHRoOjUzLjI3cHg7YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBib2R5ID0gNTMuMjcgKiBlLnRhcmdldC5kYXRhc2V0Lmxlbmd0aDtcbiAgICAgICAgYm9keSA9IGJvZHkudG9GaXhlZCgyKTtcbiAgICAgICAgc2hpcC5zdHlsZS5jc3NUZXh0ID0gYHdpZHRoOiR7Ym9keX1weDsgaGVpZ2h0OjUzLjI3cHg7YDtcbiAgICAgIH1cbiAgICAgIGFkZFNoaXBzVG9DZWxscyhlLCAnY2xpY2snKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgbGVuZ3RoID0gZHJhZ2dlZC5kYXRhc2V0Lmxlbmd0aDtcbiAgICAgIGxldCB4ID0gZS50YXJnZXQuZGF0YXNldC54O1xuICAgICAgbGV0IHkgPSBlLnRhcmdldC5kYXRhc2V0Lnk7XG4gICAgICB4ID0gcGFyc2VJbnQoeCk7XG4gICAgICB5ID0gcGFyc2VJbnQoeSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXg9JyR7eH0nXVtkYXRhLXk9JyR7eX0nXWApO1xuICAgICAgICBpZiAoZHJhZ2dlZC5jbGFzc0xpc3QuY29udGFpbnMoJ3ZlcnRpY2FsJykpIHtcbiAgICAgICAgICB4ID0geCArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgeSA9IHkgKyAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjZWxsICE9PSBudWxsKSBjZWxsLmNsYXNzTGlzdC5hZGQoJ2RyYWdvdmVyJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIChlKSA9PiB7XG4gICAgICBjb25zdCBsZWF2ZWRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyYWdvdmVyJyk7XG4gICAgICBsZWF2ZWRDZWxsLmZvckVhY2goKGxlYXZlZCkgPT4ge1xuICAgICAgICBsZWF2ZWQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ292ZXInKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IGxlYXZlZENlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJhZ292ZXInKTtcbiAgICAgIGxlYXZlZENlbGwuZm9yRWFjaCgobGVhdmVkKSA9PiB7XG4gICAgICAgIGxlYXZlZC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnb3ZlcicpO1xuICAgICAgfSk7XG4gICAgICBpZiAoY2hlY2tWYWxpZERyb3AoZSkpIHJldHVybjtcbiAgICAgIGFkZFNoaXBzVG9DZWxscyhlKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gYWRkU2hpcHNUb0NlbGxzKGUsIGFjdGlvbikge1xuICAgIGxldCB4O1xuICAgIGxldCB5O1xuXG4gICAgZHJhZ2dlZC5jbGFzc0xpc3QuYWRkKCdkcmFnZ2VkJyk7XG4gICAgaWYgKCFlLnRhcmdldC5jb250YWlucyhkcmFnZ2VkKSkge1xuICAgICAgZS50YXJnZXQuYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgfVxuICAgIGlmIChhY3Rpb24gPT09ICdjbGljaycpIHtcbiAgICAgIHggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQueDtcbiAgICAgIHkgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQueTtcbiAgICB9IGVsc2Uge1xuICAgICAgeCA9IGUudGFyZ2V0LmRhdGFzZXQueDtcbiAgICAgIHkgPSBlLnRhcmdldC5kYXRhc2V0Lnk7XG4gICAgfVxuICAgIHggPSBwYXJzZUludCh4KTtcbiAgICB5ID0gcGFyc2VJbnQoeSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkcmFnZ2VkLmRhdGFzZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14PScke3h9J11bZGF0YS15PScke3l9J11gKTtcblxuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdidXN5Jyk7XG4gICAgICBpZiAoZHJhZ2dlZC5jbGFzc0xpc3QuY29udGFpbnMoJ3ZlcnRpY2FsJykpIHtcbiAgICAgICAgeCA9IHggKyAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeSA9IHkgKyAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vQ2hlY2tzIGlmIHRoZXJlIGlzIGEgc2hpcCBhbHJlYWR5IG9uIGFueSBjZWxsIG9yIGlmIGl0IGRvZXMgbm90IGZpdCBpbiB0aGUgZ3JpZCBhbmQgY2FuY2VscyB0aGUgYWN0aW9uIGlmIHRydWVcbiAgZnVuY3Rpb24gY2hlY2tWYWxpZERyb3AoZSwgYWN0aW9uKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gZHJhZ2dlZC5kYXRhc2V0Lmxlbmd0aDtcbiAgICBsZXQgeDtcbiAgICBsZXQgeTtcblxuICAgIGlmIChhY3Rpb24gPT09ICdjbGljaycpIHtcbiAgICAgIHggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQueDtcbiAgICAgIHkgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQueTtcbiAgICB9IGVsc2Uge1xuICAgICAgeCA9IGUudGFyZ2V0LmRhdGFzZXQueDtcbiAgICAgIHkgPSBlLnRhcmdldC5kYXRhc2V0Lnk7XG4gICAgfVxuICAgIHkgPSBwYXJzZUludCh5KTtcbiAgICB4ID0gcGFyc2VJbnQoeCk7XG4gICAgbGV0IGNoZWNrID0gZmFsc2U7XG4gICAgY29uc3QgZmlyc3RDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteD0nJHt4fSddW2RhdGEteT0nJHt5fSddYCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteD0nJHt4fSddW2RhdGEteT0nJHt5fSddYCk7XG5cbiAgICAgIGlmIChkcmFnZ2VkLmNsYXNzTGlzdC5jb250YWlucygndmVydGljYWwnKSkge1xuICAgICAgICBpZiAoYWN0aW9uID09PSAnY2xpY2snKSB7XG4gICAgICAgICAgeSA9IHkgKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHggPSB4ICsgMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2NsaWNrJykge1xuICAgICAgICAgIHggPSB4ICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB5ID0geSArIDE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IHRoZUNlbGw7XG4gICAgICBpZiAoYWN0aW9uID09PSAnY2xpY2snKSB7XG4gICAgICAgIGlmIChjZWxsICE9PSBmaXJzdENlbGwpIHtcbiAgICAgICAgICB0aGVDZWxsID0gY2VsbDtcblxuICAgICAgICAgIGlmIChjZWxsID09PSBudWxsIHx8IHRoZUNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdidXN5JykpIHtcbiAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY2VsbCA9PT0gbnVsbCB8fCAoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2J1c3knKSAmJiB0aGVDZWxsICE9PSBjZWxsKSkge1xuICAgICAgICBjaGVjayA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoZWNrO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hhbmdlQnVzeW5lc3NTdGF0ZShlLCBhY3Rpb24pIHtcbiAgICBkcmFnZ2VkID0gZS50YXJnZXQ7XG4gICAgZS50YXJnZXQuc3R5bGUub3BhY2l0eSA9ICcwLjYnO1xuICAgIGNvbnN0IGNlbGwgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgIGlmIChjZWxsLmNsYXNzTGlzdC5jb250YWlucygnY2VsbCcpKSB7XG4gICAgICBsZXQgeSA9IGNlbGwuZGF0YXNldC55O1xuICAgICAgbGV0IHggPSBjZWxsLmRhdGFzZXQueDtcbiAgICAgIHkgPSBwYXJzZUludCh5KTtcbiAgICAgIHggPSBwYXJzZUludCh4KTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZHJhZ2dlZC5kYXRhc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHRoZUNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14PScke3h9J11bZGF0YS15PScke3l9J11gKTtcbiAgICAgICAgLy9FdmVuIHRob3VnaCB3aGVuIHZlcnRpY2FsIHdlIHNob3VsZCB0YXJnZXQgeCBheGlzLCB0aGlzIGZ1bmN0aW9uIHNob3VsZCBkZWxldGUgd2hlcmUgdGhlIHNoaXAgd2FzIHByZXZpb3VzbHkgcGxhY2VkIHdoZW4gY2xpY2tlZCwgc28gaXQgZGVsZXRlcyB0aGVcbiAgICAgICAgLy9idXN5IGNsYXNzIGZyb20gdGhlIGNlbGxzIHRoYXQgd2VyZSBvY2N1cGllZFxuICAgICAgICB0aGVDZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2J1c3knKTtcbiAgICAgICAgaWYgKGRyYWdnZWQuY2xhc3NMaXN0LmNvbnRhaW5zKCd2ZXJ0aWNhbCcpKSB7XG4gICAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2NsaWNrJykge1xuICAgICAgICAgICAgeSA9IHkgKyAxO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB4ID0geCArIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChhY3Rpb24gPT09ICdjbGljaycpIHtcbiAgICAgICAgICAgIHggPSB4ICsgMTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeSA9IHkgKyAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENoZWNrIGlmIHRoZSBuZWFyYnkgY2VsbHMgYXJlIGFscmVhZHkgb2N1cHBpZWQgc28gMiBzaGlwcyBjYW4gbm90IGJlIHBsYWNlZCByaWdodCBuZXh0IHRvIGVhY2ggb3RoZXJcbiAgZnVuY3Rpb24gY2hlY2tOZWFyQ2VsbHMoZSwgYWN0aW9uKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gZHJhZ2dlZC5kYXRhc2V0Lmxlbmd0aDtcbiAgICBsZXQgeCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC54O1xuICAgIGxldCB5ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0Lnk7XG4gICAgeSA9IHBhcnNlSW50KHkpO1xuICAgIHggPSBwYXJzZUludCh4KTtcbiAgICBjb25zdCBvY2N1cGllZENlbGxzID0gW107XG4gICAgY29uc3QgTkVJR0hCT1VSQ0VMTFMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIG9jY3VwaWVkQ2VsbHMucHVzaCh7IHgsIHkgfSk7XG5cbiAgICAgIGlmIChkcmFnZ2VkLmNsYXNzTGlzdC5jb250YWlucygndmVydGljYWwnKSkge1xuICAgICAgICBpZiAoYWN0aW9uID09PSAnY2xpY2snKSB7XG4gICAgICAgICAgeSA9IHkgKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHggPSB4ICsgMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2NsaWNrJykge1xuICAgICAgICAgIHggPSB4ICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB5ID0geSArIDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgb2NjdXBpZWRDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICBsZXQgeSA9IGNlbGwueTtcbiAgICAgIGxldCB4ID0gY2VsbC54O1xuXG4gICAgICBjb25zdCBuZWFyQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteD0nJHt4fSddW2RhdGEteT0nJHt5fSddYCkpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyU2hpcHMoY29vcmRpbmF0ZXNBcnJheSwgZ3JpZCkge1xuICAgIGNvb3JkaW5hdGVzQXJyYXkuZm9yRWFjaCgoeHkpID0+IHtcbiAgICAgIGNvbnN0IGNlbGwgPSBncmlkLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXg9XCIke3h5Lnh9XCJdW2RhdGEteT1cIiR7eHkueX1cIl1gKTtcbiAgICAgIGNlbGwuc3R5bGUuY3NzVGV4dCA9ICdiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMTYwLDE2MCwxNjAsMC43KSc7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4geyByZW5kZXJTaGlwcyB9O1xufTtcbiIsImltcG9ydCB7IG1hbmlwdWxhdGVET00gfSBmcm9tICcuL0RPTSc7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcic7XG5cbmV4cG9ydCBjb25zdCBnYW1lTG9naWMgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYXllcjEgPSBuZXcgUGxheWVyKCdZT1lPJyk7XG4gIGNvbnN0IHBsYXllcjIgPSBuZXcgUGxheWVyKCdYT1hPJyk7XG4gIC8vQ2hlY2tzIGVhY2ggYXR0YWNrIGlmIGFsbCB0aGUgc2hpcHMgaGF2ZSBiZWVuIHN1bmtcbiAgZnVuY3Rpb24gY2hlY2tGb3JXaW5uZXIoKSB7XG4gICAgaWYgKHBsYXllcjEuZ2FtZWJvYXJkLmFyZUFsbFNoaXBzV3JlY2tlZCgpID09PSB0cnVlKSB7XG4gICAgICBjb25zb2xlLmxvZygncGxheWVyMiBXT04hJyk7XG4gICAgfSBlbHNlIGlmIChwbGF5ZXIyLmdhbWVib2FyZC5hcmVBbGxTaGlwc1dyZWNrZWQoKSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc29sZS5sb2coJ3BsYXllcjEgV09OJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiB7IGNoZWNrRm9yV2lubmVyIH07XG59O1xuIiwiaW1wb3J0IHsgc2hpcEZhY3RvcnkgfSBmcm9tICcuL3NoaXBGYWN0b3J5JztcblxuZXhwb3J0IGNvbnN0IGdhbWVib2FyZEZhY3RvcnkgPSAoKSA9PiB7XG4gIGNvbnN0IHNoaXBzQXJyYXkgPSBbXTtcbiAgY29uc3Qgd3JlY2tlZFNoaXBzID0gW107XG5cbiAgLy9TYXZlcyBhbGwgY29vcmRpbmF0ZXMgc28gdGhlIGdhbWVib2FyZCBjYW4ga2VlcCB0cmFjayBvZiBhbGwgdGhlIG1pc3Nlc1xuICBjb25zdCBhbGxDb29yZGluYXRlcyA9IFtdO1xuICAoZnVuY3Rpb24gY3JlYXRlQ29vcmRpbmF0ZXMoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgaWYgKGkgPCAxMCkge1xuICAgICAgICBpID0gJzAnICsgaTtcbiAgICAgIH1cbiAgICAgIGFsbENvb3JkaW5hdGVzLnB1c2goaSk7XG4gICAgfVxuICB9KSgpO1xuXG4gIC8vUGxhY2VzIGEgbmV3IHNoaXAgYXQgY2hvb3NlbiBjb29yZGluYXRlc1xuICAvL1RoaXMgaXMgcmVkdW5kYW50LCB5b3UgYXJlIGdvaW5nIHRvIHBsYWNlIHNoaXBzIGluIGEgZGlmZXJyZW50IHdheSwgYWZ0ZXIgdGhlIHVzZXIgY2xpY2sgc3RhcnQgd2hlbiBoZSBmaW5pc2hlcyBhZGRpbmcgdGhlIHNoaXBzLCB0aGVuIGZvciBlYWNoIHNoaXBcbiAgLy95b3UgdGFrZXMgaXQncyBjb29yZGluYXRlcyBhbmQgdGhlbiBjcmVhdGUgdGhlIHNoaXBzIGJhc2VkIG9uIGVhY2ggY29vcmRpbmF0ZSwgeW91IHdpbGwgaGF2ZSB0byByZWZhY3RvciB0aGUgcmVjZWl2ZUF0dGFjayBhcyB3ZWxsXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcHMoeCwgeSwgZGlyZWN0aW9uKSB7XG4gICAgeCA9IHBhcnNlSW50KHgpO1xuICAgIHkgPSBwYXJzZUludCh5KTtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IFtdO1xuICAgIGlmIChkaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGluZGV4OyBpKyspIHtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaCh7IHgsIHkgfSk7XG4gICAgICAgIHggPSB4ICsgMTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ29yaXpvbnRhbCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGluZGV4OyBpKyspIHtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaCh7IHgsIHkgfSk7XG4gICAgICAgIHkgPSB5ICsgMTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc2hpcCA9IHNoaXBGYWN0b3J5KGluZGV4KTtcblxuICAgIHNoaXBzQXJyYXkucHVzaCh7IHNoaXAsIGNvb3JkaW5hdGVzIH0pO1xuXG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzO1xuICB9XG5cbiAgLy9DaGVja3MgaWYgdGhlIHRoZSBzZWxlY3RlZCBjb29yZGluYXRlcyBhcmUgb2NjdXBpZWQgYnkgYSBzaGlwIG9yIG5vdCBhbmRcbiAgLy9jYWxscyB0aGUgaGl0IGZ1bmN0aW9uIG9uIHRoYXQgc3BlY2lmaWMgc2hpcCBvciBtYXJrcyB0aGUgbWlzcy5cbiAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayh4LCB5KSB7XG4gICAgeCA9IHBhcnNlSW50KHgpO1xuICAgIHkgPSBwYXJzZUludCh5KTtcbiAgICBjb25zdCBoaXRDb29yZGluYXRlcyA9IHggKyAnJyArIHk7XG4gICAgaWYgKGFsbENvb3JkaW5hdGVzW2hpdENvb3JkaW5hdGVzXSA9PT0gJ3gnKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgYWxsQ29vcmRpbmF0ZXMuc3BsaWNlKGhpdENvb3JkaW5hdGVzLCAxLCAneCcpO1xuXG4gICAgbGV0IHJldHVyblZhbHVlID0gJ21pc3MnO1xuICAgIHNoaXBzQXJyYXkuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgcmV0dXJuIHNoaXAuY29vcmRpbmF0ZXMuZmluZCgoY29vcmQpID0+IHtcbiAgICAgICAgaWYgKGNvb3JkLnggPT09IHggJiYgY29vcmQueSA9PT0geSkge1xuICAgICAgICAgIHJldHVyblZhbHVlID0gc2hpcC5zaGlwLmhpdCgpO1xuICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZSA9PT0gJ1NVTkshJykge1xuICAgICAgICAgICAgd3JlY2tlZFNoaXBzLnB1c2gocmV0dXJuVmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cblxuICAvL0NoZWNrcyB3ZXRoZXIgb3Igbm90IGFsbCB0aGUgc2hpcHMgaGF2ZSBiZWVuIHN1bmtcblxuICBmdW5jdGlvbiBhcmVBbGxTaGlwc1dyZWNrZWQoKSB7XG4gICAgaWYgKHdyZWNrZWRTaGlwcy5sZW5ndGggPT09IDEwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHsgc2hpcHNBcnJheSwgcGxhY2VTaGlwcywgcmVjZWl2ZUF0dGFjaywgYXJlQWxsU2hpcHNXcmVja2VkIH07XG59O1xuIiwiaW1wb3J0IHsgZ2FtZWJvYXJkRmFjdG9yeSB9IGZyb20gJy4vZ2FtZWJvYXJkRmFjdG9yeSc7XG5cbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIGdhbWVib2FyZCA9IGdhbWVib2FyZEZhY3RvcnkoKTtcblxuICBpc1R1cm4gPSBmYWxzZTtcblxuICBzdGFydFR1cm4oKSB7XG4gICAgcmV0dXJuICh0aGlzLmlzVHVybiA9IHRydWUpO1xuICB9XG5cbiAgZW5kVHVybigpIHtcbiAgICByZXR1cm4gKHRoaXMuaXNUdXJuID0gZmFsc2UpO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3Qgc2hpcEZhY3RvcnkgPSAobGVuKSA9PiB7XG4gIGNvbnN0IGxlbmd0aCA9IGxlbjtcbiAgY29uc3QgcG9zaXRpb25zQXJyYXkgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8PSBsZW5ndGg7IGkrKykge1xuICAgIHBvc2l0aW9uc0FycmF5LnB1c2goaSk7XG4gIH1cblxuICBsZXQgaSA9IDA7XG5cbiAgZnVuY3Rpb24gaGl0KCkge1xuICAgIHBvc2l0aW9uc0FycmF5LnNwbGljZShpLCAxLCAnaGl0Jyk7XG4gICAgY29uc29sZS5sb2cocG9zaXRpb25zQXJyYXkpO1xuXG4gICAgaWYgKGlzU3VuaygpKSB7XG4gICAgICByZXR1cm4gJ1NVTkshJztcbiAgICB9XG4gICAgaSsrO1xuICAgIHJldHVybiAnaGl0JztcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICByZXR1cm4gcG9zaXRpb25zQXJyYXkuZXZlcnkoKHBvc2l0aW9uKSA9PiB7XG4gICAgICByZXR1cm4gcG9zaXRpb24gPT09ICdoaXQnO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHsgbGVuZ3RoLCBoaXQgfTtcbn07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVBpcmF0YStPbmUmZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKixcXG4qOjpiZWZvcmUsXFxuKjo6YWZ0ZXIge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbjpyb290IHtcXG4gIC0tc2hpcDogIzAzMDQ1ZTtcXG4gIC0tZ3JpZDogI2NhZjBmODtcXG4gIC0tYm9yZGVyOiAjMDMwNDVlO1xcbiAgLS15ZXQtc2hpcDogIzAwNzdiNjtcXG59XFxuXFxuYm9keSB7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZm9udC1mYW1pbHk6ICdQaXJhdGEgT25lJywgY3Vyc2l2ZTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDUwJSA1MCU7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDRyZW0gYXV0bztcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XFxuICAgICdoZWFkZXIgaGVhZGVyJ1xcbiAgICAncGxheWVyMSBwbGF5ZXIyJztcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGdyaWQtYXJlYTogaGVhZGVyO1xcbiAgaGVpZ2h0OiAzLjdyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDIzZThhO1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMjVweDtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAyNXB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogMi41cmVtO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDJweDtcXG59XFxuXFxuLnBsYXllcjEtc2NyZWVuLFxcbi5wbGF5ZXIyLXNjcmVlbiB7XFxuICBncmlkLWFyZWE6IHBsYXllcjE7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAyNSUgNzUlO1xcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhczpcXG4gICAgJ3NoaXBzJ1xcbiAgICAnZ3JpZHMnO1xcbn1cXG5cXG4ucGxheWVyMi1zY3JlZW4ge1xcbiAgZ3JpZC1hcmVhOiBwbGF5ZXIyO1xcbn1cXG5cXG4uc2hpcHMtZGl2MSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgZ2FwOiAxcmVtO1xcbiAgcGFkZGluZzogMTBweDtcXG59XFxuXFxuLnNoaXAge1xcbiAgZ3JpZC1hcmVhOiBzaGlwcztcXG4gIGhlaWdodDogMy4zM2VtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0teWV0LXNoaXApO1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyKTtcXG4gIGN1cnNvcjogZ3JhYjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uc2hpcC52ZXJ0aWNhbCB7XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgcGFkZGluZy10b3A6IDEwcHg7XFxufVxcblxcbi5yZXZlcnNlLWltZyB7XFxuICBmaWx0ZXI6IGludmVydCg3NyUpIHNlcGlhKDIlKSBzYXR1cmF0ZSgyNCUpIGh1ZS1yb3RhdGUoMzIwZGVnKSBicmlnaHRuZXNzKDg4JSkgY29udHJhc3QoOTIlKTtcXG4gIG9wYWNpdHk6IDA7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuLmNlbGwgPiAuc2hpcDpob3ZlciA+IC5yZXZlcnNlLWltZyB7XFxuICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4uZHJhZ292ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0teWV0LXNoaXApO1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyKTtcXG59XFxuXFxuLmRyYWdnZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2hpcCk7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xcbiAgei1pbmRleDogNTtcXG59XFxuXFxuLmdyaWQtMSxcXG4uZ3JpZC0yIHtcXG4gIGdyaWQtYXJlYTogZ3JpZHM7XFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG5cXG4gIHdpZHRoOiAzMy4zZW07XFxuICBoZWlnaHQ6IDMzLjNlbTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1ncmlkKTtcXG4gIGJhY2tncm91bmQtcG9zaXRpb24teDogNTAlO1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbi15OiA0MCU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbltkYXRhLXk9JzknXSB7XFxuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuW2RhdGEteD0nOSddIHtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmNlbGwge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBibGFjaztcXG4gIHdpZHRoOiAxMCU7XFxuICBoZWlnaHQ6IDEwJTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL1N0eWxlL21haW4uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUVBOzs7RUFHRSxzQkFBc0I7RUFDdEIsVUFBVTtFQUNWLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGVBQWU7RUFDZixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2Isa0NBQWtDO0VBQ2xDLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsNkJBQTZCO0VBQzdCOztxQkFFbUI7QUFDckI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsY0FBYztFQUNkLHlCQUF5QjtFQUN6QiwrQkFBK0I7RUFDL0IsZ0NBQWdDO0VBQ2hDLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLG1CQUFtQjtBQUNyQjs7QUFFQTs7RUFFRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLDJCQUEyQjtFQUMzQjs7V0FFUztBQUNYOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGVBQWU7RUFDZixTQUFTO0VBQ1QsYUFBYTtBQUNmOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxpQ0FBaUM7RUFDakMsK0JBQStCO0VBQy9CLFlBQVk7RUFDWixhQUFhO0VBQ2IsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLHVCQUF1QjtFQUN2QixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSw0RkFBNEY7RUFDNUYsVUFBVTtFQUNWLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLGlDQUFpQztFQUNqQywrQkFBK0I7QUFDakM7O0FBRUE7RUFDRSw2QkFBNkI7RUFDN0IsK0JBQStCO0VBQy9CLFVBQVU7QUFDWjs7QUFFQTs7RUFFRSxnQkFBZ0I7RUFDaEIsb0JBQW9COztFQUVwQixhQUFhO0VBQ2IsY0FBYztFQUNkLGFBQWE7RUFDYixlQUFlO0VBQ2YsdUJBQXVCO0VBQ3ZCLDBCQUEwQjtFQUMxQiwwQkFBMEI7RUFDMUIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLDJCQUEyQjtFQUMzQiw0QkFBNEI7RUFDNUIsVUFBVTtFQUNWLFdBQVc7QUFDYlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1QaXJhdGErT25lJmRpc3BsYXk9c3dhcCcpO1xcblxcbiosXFxuKjo6YmVmb3JlLFxcbio6OmFmdGVyIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG46cm9vdCB7XFxuICAtLXNoaXA6ICMwMzA0NWU7XFxuICAtLWdyaWQ6ICNjYWYwZjg7XFxuICAtLWJvcmRlcjogIzAzMDQ1ZTtcXG4gIC0teWV0LXNoaXA6ICMwMDc3YjY7XFxufVxcblxcbmJvZHkge1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGZvbnQtZmFtaWx5OiAnUGlyYXRhIE9uZScsIGN1cnNpdmU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA1MCUgNTAlO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiA0cmVtIGF1dG87XFxuICBncmlkLXRlbXBsYXRlLWFyZWFzOlxcbiAgICAnaGVhZGVyIGhlYWRlcidcXG4gICAgJ3BsYXllcjEgcGxheWVyMic7XFxufVxcblxcbmhlYWRlciB7XFxuICBncmlkLWFyZWE6IGhlYWRlcjtcXG4gIGhlaWdodDogMy43cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAyM2U4YTtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDI1cHg7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMjVweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi50aXRsZSB7XFxuICBmb250LXNpemU6IDIuNXJlbTtcXG4gIGxldHRlci1zcGFjaW5nOiAycHg7XFxufVxcblxcbi5wbGF5ZXIxLXNjcmVlbixcXG4ucGxheWVyMi1zY3JlZW4ge1xcbiAgZ3JpZC1hcmVhOiBwbGF5ZXIxO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMjUlIDc1JTtcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XFxuICAgICdzaGlwcydcXG4gICAgJ2dyaWRzJztcXG59XFxuXFxuLnBsYXllcjItc2NyZWVuIHtcXG4gIGdyaWQtYXJlYTogcGxheWVyMjtcXG59XFxuXFxuLnNoaXBzLWRpdjEge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGdhcDogMXJlbTtcXG4gIHBhZGRpbmc6IDEwcHg7XFxufVxcblxcbi5zaGlwIHtcXG4gIGdyaWQtYXJlYTogc2hpcHM7XFxuICBoZWlnaHQ6IDMuMzNlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXlldC1zaGlwKTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlcik7XFxuICBjdXJzb3I6IGdyYWI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnNoaXAudmVydGljYWwge1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHBhZGRpbmctdG9wOiAxMHB4O1xcbn1cXG5cXG4ucmV2ZXJzZS1pbWcge1xcbiAgZmlsdGVyOiBpbnZlcnQoNzclKSBzZXBpYSgyJSkgc2F0dXJhdGUoMjQlKSBodWUtcm90YXRlKDMyMGRlZykgYnJpZ2h0bmVzcyg4OCUpIGNvbnRyYXN0KDkyJSk7XFxuICBvcGFjaXR5OiAwO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblxcbi5jZWxsID4gLnNoaXA6aG92ZXIgPiAucmV2ZXJzZS1pbWcge1xcbiAgb3BhY2l0eTogMTtcXG59XFxuXFxuLmRyYWdvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXlldC1zaGlwKTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlcik7XFxufVxcblxcbi5kcmFnZ2VkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNoaXApO1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyKTtcXG4gIHotaW5kZXg6IDU7XFxufVxcblxcbi5ncmlkLTEsXFxuLmdyaWQtMiB7XFxuICBncmlkLWFyZWE6IGdyaWRzO1xcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuXFxuICB3aWR0aDogMzMuM2VtO1xcbiAgaGVpZ2h0OiAzMy4zZW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgYmFja2dyb3VuZDogdmFyKC0tZ3JpZCk7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXg6IDUwJTtcXG4gIGJhY2tncm91bmQtcG9zaXRpb24teTogNDAlO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG5bZGF0YS15PSc5J10ge1xcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbltkYXRhLXg9JzknXSB7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi5jZWxsIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgYmxhY2s7XFxuICB3aWR0aDogMTAlO1xcbiAgaGVpZ2h0OiAxMCU7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFpbi5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21haW4uY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0ICcuL1N0eWxlL21haW4uY3NzJztcbmltcG9ydCB7IGdhbWVib2FyZEZhY3RvcnkgfSBmcm9tICcuL2dhbWVib2FyZEZhY3RvcnknO1xuaW1wb3J0IHsgY3JlYXRlRE9NLCBtYW5pcHVsYXRlRE9NIH0gZnJvbSAnLi9ET00nO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgZ2FtZUxvZ2ljIH0gZnJvbSAnLi9nYW1lTG9naWMnO1xuXG5jb25zdCBET00gPSBjcmVhdGVET00oKTtcbkRPTS5jcmVhdGVHcmlkQ2VsbHMoKTtcbkRPTS5jcmVhdGVTaGlwcygpO1xuY29uc3QgbWFuaXB1bGF0ZSA9IG1hbmlwdWxhdGVET00oKTtcblxuZ2FtZUxvZ2ljKCk7XG4iXSwibmFtZXMiOlsicmV2ZXJzZSIsImNyZWF0ZURPTSIsImdyaWQxIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZ3JpZDIiLCJwbGF5ZXIxIiwicGxheWVyMiIsImNyZWF0ZVNoaXBzIiwic2hpcHNEaXYxIiwiY3JlYXRlRWxlbWVudCIsIm1hbnlTaGlwcyIsImxlbmd0aCIsImkiLCJyZXZlcnNlSXQiLCJzcmMiLCJzaGlwIiwiZHJhZ2dhYmxlIiwiZGF0YXNldCIsImluZGV4Iiwid2lkdGgiLCJ0b0ZpeGVkIiwic3R5bGUiLCJjc3NUZXh0IiwiYXBwZW5kQ2hpbGQiLCJjbGFzc0xpc3QiLCJhZGQiLCJjcmVhdGVHcmlkQ2VsbHMiLCJ4IiwieSIsImNlbGwiLCJtYW5pcHVsYXRlRE9NIiwiZ3JpZHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2hpcHMiLCJzaGlwRGl2IiwiZHJhZ2dlZCIsImZvckVhY2giLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsIm9wYWNpdHkiLCJjaGFuZ2VCdXN5bmVzc1N0YXRlIiwicGFyZW50RWxlbWVudCIsImNvbnRhaW5zIiwiY2hlY2tWYWxpZERyb3AiLCJjaGVja05lYXJDZWxscyIsInRvZ2dsZSIsImJvZHkiLCJhZGRTaGlwc1RvQ2VsbHMiLCJncmlkIiwicHJldmVudERlZmF1bHQiLCJwYXJzZUludCIsImxlYXZlZENlbGwiLCJsZWF2ZWQiLCJyZW1vdmUiLCJhY3Rpb24iLCJjaGVjayIsImZpcnN0Q2VsbCIsInRoZUNlbGwiLCJvY2N1cGllZENlbGxzIiwiTkVJR0hCT1VSQ0VMTFMiLCJwdXNoIiwibmVhckNlbGwiLCJyZW5kZXJTaGlwcyIsImNvb3JkaW5hdGVzQXJyYXkiLCJ4eSIsIlBsYXllciIsImdhbWVMb2dpYyIsImNoZWNrRm9yV2lubmVyIiwiZ2FtZWJvYXJkIiwiYXJlQWxsU2hpcHNXcmVja2VkIiwiY29uc29sZSIsImxvZyIsInNoaXBGYWN0b3J5IiwiZ2FtZWJvYXJkRmFjdG9yeSIsInNoaXBzQXJyYXkiLCJ3cmVja2VkU2hpcHMiLCJhbGxDb29yZGluYXRlcyIsImNyZWF0ZUNvb3JkaW5hdGVzIiwicGxhY2VTaGlwcyIsImRpcmVjdGlvbiIsImNvb3JkaW5hdGVzIiwicmVjZWl2ZUF0dGFjayIsImhpdENvb3JkaW5hdGVzIiwic3BsaWNlIiwicmV0dXJuVmFsdWUiLCJmaW5kIiwiY29vcmQiLCJoaXQiLCJuYW1lIiwiaXNUdXJuIiwibGVuIiwicG9zaXRpb25zQXJyYXkiLCJpc1N1bmsiLCJldmVyeSIsInBvc2l0aW9uIiwiRE9NIiwibWFuaXB1bGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=