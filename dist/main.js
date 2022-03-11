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
  var body = document.querySelector('body');
  var grid1 = document.createElement('div');
  var grid2 = document.createElement('div');
  grid1.dataset.grid = '1';
  grid2.dataset.grid = '2';
  var player1 = document.createElement('div');
  var player2 = document.createElement('div');
  body.appendChild(player1).classList.add('player1-screen');
  body.appendChild(player2).classList.add('player2-screen');
  player1.appendChild(grid1).classList.add('grid-1');
  player2.appendChild(grid2).classList.add('grid-2'); //Creates both grids for the players

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
  var dragged;
  var initialCoordinates = []; //Adding events for the ships when the drag starts and ends and also a click one that will change the direction it goes
  //"orizonta" or "vertical"

  ships.forEach(function (ship) {
    ship.addEventListener('drag', function (e) {
      e.target.style.opacity = '0.3';
    });
    ship.addEventListener('dragstart', function (e) {
      storeInitalCoordinates(e);
    });
    ship.addEventListener('dragend', function (e) {
      e.target.style.opacity = '1';
    });
    ship.addEventListener('click', function (e) {
      if (!e.target.parentElement.classList.contains('cell')) return;
      storeInitalCoordinates(e);
      dragged = e.target;
      if (checkValidDrop(e, 'click')) return;
      if (checkNearCells(e, 'click')) return;
      ship.classList.toggle('vertical');
      removeBusyState(e, 'click');

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
    grid.addEventListener('dragenter', function (e) {});
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
      if (checkNearCells(e)) return;
      removeBusyState(e);
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
  }

  function storeInitalCoordinates(e) {
    initialCoordinates.splice(0, initialCoordinates.length);
    dragged = e.target;

    if (dragged.parentElement.classList.contains('cell')) {
      var length = dragged.dataset.length;
      var x = e.target.parentElement.dataset.x;
      var y = e.target.parentElement.dataset.y;
      x = parseInt(x);
      y = parseInt(y);

      for (var i = 0; i < length; i++) {
        initialCoordinates.push({
          x: x,
          y: y
        });

        if (dragged.classList.contains('vertical')) {
          x = x + 1;
        } else {
          y = y + 1;
        }
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
      initialCoordinates.forEach(function (xy) {
        if (xy.x === x && xy.y === y) return;
      });
      var cell = document.querySelector("[data-x='".concat(x, "'][data-y='").concat(y, "']"));
      var currentCell = void 0;

      if (dragged.parentElement.classList.contains('cell') && initialCoordinates.length !== 0) {
        currentCell = document.querySelector("[data-x='".concat(initialCoordinates[i].x, "'][data-y='").concat(initialCoordinates[i].y, "']"));
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

      var theCell = void 0;

      if (action === 'click') {
        if (cell !== firstCell) {
          theCell = cell;

          if (cell === null || theCell.classList.contains('busy')) {
            check = true;
          }
        }
      } else if (cell === null || cell.classList.contains('busy') && theCell !== cell) {
        if (currentCell === cell) return;
        check = true;
      }
    }

    return check;
  }

  function removeBusyState(e, action) {
    if (action === 'click') {
      var x = e.target.parentElement.dataset.x;
      var y = e.target.parentElement.dataset.y;
      y = parseInt(y);
      x = parseInt(x);
      var length = dragged.dataset.length;

      for (var i = 0; i < length; i++) {
        var cell = document.querySelector("[data-x='".concat(x, "'][data-y='").concat(y, "']"));
        cell.classList.remove('busy');

        if (dragged.classList.contains('vertical')) {
          y = y + 1;
        } else {
          x = x + 1;
        }
      }
    } else {
      initialCoordinates.forEach(function (xy) {
        var cell = document.querySelector("[data-x='".concat(xy.x, "'][data-y='").concat(xy.y, "']"));
        cell.classList.remove('busy');
      });
    }
  } // Check if the nearby cells are already ocuppied so 2 ships can not be placed right next to each other


  function checkNearCells(e, action) {
    var length = dragged.dataset.length;
    var x;
    var y;
    var busy = false;

    if (action === 'click') {
      x = e.target.parentElement.dataset.x;
      y = e.target.parentElement.dataset.y;
    } else {
      x = e.target.dataset.x;
      y = e.target.dataset.y;
    }

    y = parseInt(y);
    x = parseInt(x);
    var occupiedCells = [];
    var addX = [-1, 0, 1];
    var addY = [-1, 0, 1];

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
      x = parseInt(x);
      y = parseInt(y);
      addX.forEach(function (adx) {
        var numX = x + adx;
        if (numX < 0 || numX > 9) numX = x;
        addY.forEach(function (ady) {
          var numY = y + ady;
          if (numY < 0 || numY > 9) numY = y;
          var checker = false;
          occupiedCells.forEach(function (cell) {
            if (numX === cell.x && numY === cell.y) return checker = true;
          });
          if (checker === true) return;
          var cell = document.querySelector("[data-x='".concat(numX, "'][data-y='").concat(numY, "']"));
          var isYours = initialCoordinates.find(function (xy) {
            if (xy.x === numX && xy.y === numY) return true;
          });
          if (cell.classList.contains('busy') && !isYours) busy = true;
        });
      });
    });
    return busy;
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

/***/ "./src/Factories/gameboardFactory.js":
/*!*******************************************!*\
  !*** ./src/Factories/gameboardFactory.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameboardFactory": () => (/* binding */ gameboardFactory)
/* harmony export */ });
/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipFactory */ "./src/Factories/shipFactory.js");

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

/***/ "./src/Factories/player.js":
/*!*********************************!*\
  !*** ./src/Factories/player.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboardFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboardFactory */ "./src/Factories/gameboardFactory.js");
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

/***/ "./src/Factories/shipFactory.js":
/*!**************************************!*\
  !*** ./src/Factories/shipFactory.js ***!
  \**************************************/
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

/***/ "./src/Screens-scripts/startMenu.js":
/*!******************************************!*\
  !*** ./src/Screens-scripts/startMenu.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startScreen": () => (/* binding */ startScreen)
/* harmony export */ });
var startScreen = function startScreen() {
  var body = document.querySelector('body');
  var mainBody = document.createElement('div');
  var pvp = document.createElement('button');
  pvp.textContent = 'Player vs Player';
  var pvc = document.createElement('button');
  pvc.textContent = 'Player vs Computer';
  mainBody.appendChild(pvp).classList.add('start-pvp');
  mainBody.appendChild(pvc).classList.add('start-pvc');
  body.appendChild(mainBody).classList.add('start-body');
  pvp.addEventListener('click', function (e) {});
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
/* harmony import */ var _Factories_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Factories/player */ "./src/Factories/player.js");


var gameLogic = function gameLogic() {
  var player1 = new _Factories_player__WEBPACK_IMPORTED_MODULE_1__.Player('YOYO');
  var player2 = new _Factories_player__WEBPACK_IMPORTED_MODULE_1__.Player('XOXO'); //Checks each attack if all the ships have been sunk

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

/***/ "./node_modules/css-loader/dist/cjs.js!./src/Style/game-over.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/Style/game-over.css ***!
  \***********************************************************************/
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
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/Style/game-running.css":
/*!**************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/Style/game-running.css ***!
  \**************************************************************************/
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
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


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
___CSS_LOADER_EXPORT___.push([module.id, "*,\n*::before,\n*::after {\n  box-sizing: border-box;\n  padding: 0;\n  margin: 0;\n}\n\n:root {\n  --ship: #ca6702;\n  --grid: #0a9396;\n  --border: #ae2012;\n  --yet-ship: #e9d8a6;\n}\n\nbody {\n  width: 100vw;\n  height: 100vh;\n  font-family: 'Pirata One', cursive;\n  display: grid;\n  grid-template-columns: 50% 50%;\n  grid-template-rows: 4rem auto;\n  grid-template-areas:\n    'header header'\n    'player1 player2';\n}\n\nheader {\n  grid-area: header;\n  height: 3.7rem;\n  background-color: #005f73;\n  border-bottom-left-radius: 25px;\n  border-bottom-right-radius: 25px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.title {\n  font-size: 2.9rem;\n  letter-spacing: 0.5rem;\n}\n\n.player1-screen,\n.player2-screen {\n  grid-area: player1;\n  display: grid;\n  grid-template-rows: 25% 75%;\n  grid-template-areas:\n    'ships'\n    'grids';\n}\n\n.player2-screen {\n  grid-area: player2;\n}\n\n.ships-div1 {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n  padding: 10px;\n}\n\n.ship {\n  grid-area: ships;\n  height: 3.33em;\n  background-color: var(--yet-ship);\n  border: 1px solid var(--border);\n  cursor: grab;\n  display: flex;\n  align-items: center;\n}\n\n.ship.vertical {\n  align-items: flex-start;\n  justify-content: center;\n  padding-top: 10px;\n}\n\n.reverse-img {\n  filter: invert(77%) sepia(2%) saturate(24%) hue-rotate(320deg) brightness(88%) contrast(92%);\n  opacity: 0;\n  pointer-events: none;\n  width: 18px;\n  height: 18px;\n}\n\n.cell > .ship:hover > .reverse-img {\n  opacity: 1;\n}\n\n.dragover {\n  background-color: var(--yet-ship);\n  border: 1px solid var(--border);\n}\n\n.dragged {\n  background-color: var(--ship);\n  border: 1px solid var(--border);\n}\n\n.grid-1,\n.grid-2 {\n  grid-area: grids;\n  justify-self: center;\n\n  width: 33.3em;\n  height: 33.3em;\n  display: flex;\n  flex-wrap: wrap;\n  background: var(--grid);\n  background-position-x: 50%;\n  background-position-y: 40%;\n  cursor: pointer;\n}\n\n[data-y='9'] {\n  border-right: 1px solid black;\n}\n\n[data-x='9'] {\n  border-bottom: 1px solid black;\n}\n\n.cell {\n  border-top: 1px solid black;\n  border-left: 1px solid black;\n  width: 10%;\n  height: 10%;\n}\n\n.off {\n  pointer-events: none;\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n", "",{"version":3,"sources":["webpack://./src/Style/main.css"],"names":[],"mappings":"AAEA;;;EAGE,sBAAsB;EACtB,UAAU;EACV,SAAS;AACX;;AAEA;EACE,eAAe;EACf,eAAe;EACf,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,kCAAkC;EAClC,aAAa;EACb,8BAA8B;EAC9B,6BAA6B;EAC7B;;qBAEmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,cAAc;EACd,yBAAyB;EACzB,+BAA+B;EAC/B,gCAAgC;EAChC,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,sBAAsB;AACxB;;AAEA;;EAEE,kBAAkB;EAClB,aAAa;EACb,2BAA2B;EAC3B;;WAES;AACX;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,SAAS;EACT,aAAa;AACf;;AAEA;EACE,gBAAgB;EAChB,cAAc;EACd,iCAAiC;EACjC,+BAA+B;EAC/B,YAAY;EACZ,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,uBAAuB;EACvB,uBAAuB;EACvB,iBAAiB;AACnB;;AAEA;EACE,4FAA4F;EAC5F,UAAU;EACV,oBAAoB;EACpB,WAAW;EACX,YAAY;AACd;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,iCAAiC;EACjC,+BAA+B;AACjC;;AAEA;EACE,6BAA6B;EAC7B,+BAA+B;AACjC;;AAEA;;EAEE,gBAAgB;EAChB,oBAAoB;;EAEpB,aAAa;EACb,cAAc;EACd,aAAa;EACb,eAAe;EACf,uBAAuB;EACvB,0BAA0B;EAC1B,0BAA0B;EAC1B,eAAe;AACjB;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,2BAA2B;EAC3B,4BAA4B;EAC5B,UAAU;EACV,WAAW;AACb;;AAEA;EACE,oBAAoB;EACpB,UAAU;EACV,QAAQ;EACR,SAAS;AACX","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Pirata+One&display=swap');\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n  padding: 0;\n  margin: 0;\n}\n\n:root {\n  --ship: #ca6702;\n  --grid: #0a9396;\n  --border: #ae2012;\n  --yet-ship: #e9d8a6;\n}\n\nbody {\n  width: 100vw;\n  height: 100vh;\n  font-family: 'Pirata One', cursive;\n  display: grid;\n  grid-template-columns: 50% 50%;\n  grid-template-rows: 4rem auto;\n  grid-template-areas:\n    'header header'\n    'player1 player2';\n}\n\nheader {\n  grid-area: header;\n  height: 3.7rem;\n  background-color: #005f73;\n  border-bottom-left-radius: 25px;\n  border-bottom-right-radius: 25px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.title {\n  font-size: 2.9rem;\n  letter-spacing: 0.5rem;\n}\n\n.player1-screen,\n.player2-screen {\n  grid-area: player1;\n  display: grid;\n  grid-template-rows: 25% 75%;\n  grid-template-areas:\n    'ships'\n    'grids';\n}\n\n.player2-screen {\n  grid-area: player2;\n}\n\n.ships-div1 {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n  padding: 10px;\n}\n\n.ship {\n  grid-area: ships;\n  height: 3.33em;\n  background-color: var(--yet-ship);\n  border: 1px solid var(--border);\n  cursor: grab;\n  display: flex;\n  align-items: center;\n}\n\n.ship.vertical {\n  align-items: flex-start;\n  justify-content: center;\n  padding-top: 10px;\n}\n\n.reverse-img {\n  filter: invert(77%) sepia(2%) saturate(24%) hue-rotate(320deg) brightness(88%) contrast(92%);\n  opacity: 0;\n  pointer-events: none;\n  width: 18px;\n  height: 18px;\n}\n\n.cell > .ship:hover > .reverse-img {\n  opacity: 1;\n}\n\n.dragover {\n  background-color: var(--yet-ship);\n  border: 1px solid var(--border);\n}\n\n.dragged {\n  background-color: var(--ship);\n  border: 1px solid var(--border);\n}\n\n.grid-1,\n.grid-2 {\n  grid-area: grids;\n  justify-self: center;\n\n  width: 33.3em;\n  height: 33.3em;\n  display: flex;\n  flex-wrap: wrap;\n  background: var(--grid);\n  background-position-x: 50%;\n  background-position-y: 40%;\n  cursor: pointer;\n}\n\n[data-y='9'] {\n  border-right: 1px solid black;\n}\n\n[data-x='9'] {\n  border-bottom: 1px solid black;\n}\n\n.cell {\n  border-top: 1px solid black;\n  border-left: 1px solid black;\n  width: 10%;\n  height: 10%;\n}\n\n.off {\n  pointer-events: none;\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/Style/place-ships.css":
/*!*************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/Style/place-ships.css ***!
  \*************************************************************************/
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
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/Style/start-screen.css":
/*!**************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/Style/start-screen.css ***!
  \**************************************************************************/
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
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".start-body {\n  grid-column-end: 3;\n  grid-column-start: 1;\n  background-color: #e9d8a6;\n  width: 95%;\n  height: 95%;\n  border-radius: 25px;\n  justify-self: center;\n  align-self: center;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 10%;\n  padding-bottom: 10%;\n}\n\n.start-pvp,\n.start-pvc {\n  font-family: inherit;\n  font-size: 1.5rem;\n  background-color: #ae2012;\n  border: none;\n  box-shadow: 2px 2px 6px 1px #9b2226;\n  padding: 25px;\n  width: 30rem;\n  border-radius: 25px;\n  cursor: pointer;\n}\n\n.start-pvc:hover,\n.start-pvp:hover {\n  background-color: #9b2226;\n}\n\n.start-pvp:active,\n.start-pvc:active {\n  background-color: #ca6702;\n}\n", "",{"version":3,"sources":["webpack://./src/Style/start-screen.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,oBAAoB;EACpB,yBAAyB;EACzB,UAAU;EACV,WAAW;EACX,mBAAmB;EACnB,oBAAoB;EACpB,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,QAAQ;EACR,mBAAmB;AACrB;;AAEA;;EAEE,oBAAoB;EACpB,iBAAiB;EACjB,yBAAyB;EACzB,YAAY;EACZ,mCAAmC;EACnC,aAAa;EACb,YAAY;EACZ,mBAAmB;EACnB,eAAe;AACjB;;AAEA;;EAEE,yBAAyB;AAC3B;;AAEA;;EAEE,yBAAyB;AAC3B","sourcesContent":[".start-body {\n  grid-column-end: 3;\n  grid-column-start: 1;\n  background-color: #e9d8a6;\n  width: 95%;\n  height: 95%;\n  border-radius: 25px;\n  justify-self: center;\n  align-self: center;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 10%;\n  padding-bottom: 10%;\n}\n\n.start-pvp,\n.start-pvc {\n  font-family: inherit;\n  font-size: 1.5rem;\n  background-color: #ae2012;\n  border: none;\n  box-shadow: 2px 2px 6px 1px #9b2226;\n  padding: 25px;\n  width: 30rem;\n  border-radius: 25px;\n  cursor: pointer;\n}\n\n.start-pvc:hover,\n.start-pvp:hover {\n  background-color: #9b2226;\n}\n\n.start-pvp:active,\n.start-pvc:active {\n  background-color: #ca6702;\n}\n"],"sourceRoot":""}]);
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

/***/ "./src/Style/game-over.css":
/*!*********************************!*\
  !*** ./src/Style/game-over.css ***!
  \*********************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_game_over_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./game-over.css */ "./node_modules/css-loader/dist/cjs.js!./src/Style/game-over.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_game_over_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_game_over_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_game_over_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_game_over_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/Style/game-running.css":
/*!************************************!*\
  !*** ./src/Style/game-running.css ***!
  \************************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_game_running_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./game-running.css */ "./node_modules/css-loader/dist/cjs.js!./src/Style/game-running.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_game_running_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_game_running_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_game_running_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_game_running_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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

/***/ "./src/Style/place-ships.css":
/*!***********************************!*\
  !*** ./src/Style/place-ships.css ***!
  \***********************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_place_ships_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./place-ships.css */ "./node_modules/css-loader/dist/cjs.js!./src/Style/place-ships.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_place_ships_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_place_ships_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_place_ships_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_place_ships_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/Style/start-screen.css":
/*!************************************!*\
  !*** ./src/Style/start-screen.css ***!
  \************************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_start_screen_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./start-screen.css */ "./node_modules/css-loader/dist/cjs.js!./src/Style/start-screen.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_start_screen_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_start_screen_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_start_screen_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_start_screen_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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
/* harmony import */ var _Style_start_screen_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Style/start-screen.css */ "./src/Style/start-screen.css");
/* harmony import */ var _Style_game_over_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Style/game-over.css */ "./src/Style/game-over.css");
/* harmony import */ var _Style_game_running_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Style/game-running.css */ "./src/Style/game-running.css");
/* harmony import */ var _Style_place_ships_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Style/place-ships.css */ "./src/Style/place-ships.css");
/* harmony import */ var _Screens_scripts_startMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Screens-scripts/startMenu */ "./src/Screens-scripts/startMenu.js");
/* harmony import */ var _Factories_gameboardFactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Factories/gameboardFactory */ "./src/Factories/gameboardFactory.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* harmony import */ var _Factories_player__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Factories/player */ "./src/Factories/player.js");
/* harmony import */ var _gameLogic__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./gameLogic */ "./src/gameLogic.js");










var DOM = (0,_DOM__WEBPACK_IMPORTED_MODULE_7__.createDOM)();
DOM.createGridCells();
DOM.createShips();
(0,_DOM__WEBPACK_IMPORTED_MODULE_7__.manipulateDOM)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUNsRixlQUFKO0FBQ0FrRixHQUFHLENBQUNoRyxXQUFKO0FBQ0FrQixtREFBYSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9GYWN0b3JpZXMvZ2FtZWJvYXJkRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0ZhY3Rvcmllcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9GYWN0b3JpZXMvc2hpcEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9TY3JlZW5zLXNjcmlwdHMvc3RhcnRNZW51LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUxvZ2ljLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvU3R5bGUvZ2FtZS1vdmVyLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL1N0eWxlL2dhbWUtcnVubmluZy5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9TdHlsZS9tYWluLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL1N0eWxlL3BsYWNlLXNoaXBzLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL1N0eWxlL3N0YXJ0LXNjcmVlbi5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvU3R5bGUvZ2FtZS1vdmVyLmNzcz8zOGU4Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvU3R5bGUvZ2FtZS1ydW5uaW5nLmNzcz80OGQzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvU3R5bGUvbWFpbi5jc3M/YTA5ZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL1N0eWxlL3BsYWNlLXNoaXBzLmNzcz9lMTNjIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvU3R5bGUvc3RhcnQtc2NyZWVuLmNzcz82OGE4Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmV2ZXJzZSBmcm9tICcuL2Fzc2V0cy9yZXZlcnNlLnBuZyc7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVET00gPSAoKSA9PiB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gIGNvbnN0IGdyaWQxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IGdyaWQyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGdyaWQxLmRhdGFzZXQuZ3JpZCA9ICcxJztcbiAgZ3JpZDIuZGF0YXNldC5ncmlkID0gJzInO1xuICBjb25zdCBwbGF5ZXIxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IHBsYXllcjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgYm9keS5hcHBlbmRDaGlsZChwbGF5ZXIxKS5jbGFzc0xpc3QuYWRkKCdwbGF5ZXIxLXNjcmVlbicpO1xuICBib2R5LmFwcGVuZENoaWxkKHBsYXllcjIpLmNsYXNzTGlzdC5hZGQoJ3BsYXllcjItc2NyZWVuJyk7XG4gIHBsYXllcjEuYXBwZW5kQ2hpbGQoZ3JpZDEpLmNsYXNzTGlzdC5hZGQoJ2dyaWQtMScpO1xuICBwbGF5ZXIyLmFwcGVuZENoaWxkKGdyaWQyKS5jbGFzc0xpc3QuYWRkKCdncmlkLTInKTtcblxuICAvL0NyZWF0ZXMgYm90aCBncmlkcyBmb3IgdGhlIHBsYXllcnNcbiAgZnVuY3Rpb24gY3JlYXRlU2hpcHMoKSB7XG4gICAgY29uc3Qgc2hpcHNEaXYxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBsZXQgbWFueVNoaXBzID0gMDtcbiAgICBsZXQgbGVuZ3RoID0gNDtcblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDEwOyBpKyspIHtcbiAgICAgIGlmIChtYW55U2hpcHMgKyBsZW5ndGggPD0gNCkge1xuICAgICAgICBtYW55U2hpcHMgPSBtYW55U2hpcHMgKyAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFueVNoaXBzID0gMTtcbiAgICAgICAgbGVuZ3RoID0gbGVuZ3RoIC0gMTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJldmVyc2VJdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgcmV2ZXJzZUl0LnNyYyA9IHJldmVyc2U7XG4gICAgICBjb25zdCBzaGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBzaGlwLmRyYWdnYWJsZSA9ICd0cnVlJztcbiAgICAgIHNoaXAuZGF0YXNldC5sZW5ndGggPSBsZW5ndGg7XG4gICAgICBzaGlwLmRhdGFzZXQuaW5kZXggPSBpO1xuICAgICAgbGV0IHdpZHRoID0gNTMuMjcgKiBsZW5ndGg7XG4gICAgICB3aWR0aCA9IHdpZHRoLnRvRml4ZWQoMik7XG4gICAgICBzaGlwLnN0eWxlLmNzc1RleHQgPSBgd2lkdGg6JHt3aWR0aH1weDtgO1xuXG4gICAgICBzaGlwLmFwcGVuZENoaWxkKHJldmVyc2VJdCkuY2xhc3NMaXN0LmFkZCgncmV2ZXJzZS1pbWcnKTtcbiAgICAgIHNoaXBzRGl2MS5hcHBlbmRDaGlsZChzaGlwKS5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgfVxuICAgIHBsYXllcjEuYXBwZW5kQ2hpbGQoc2hpcHNEaXYxKS5jbGFzc0xpc3QuYWRkKCdzaGlwcy1kaXYxJyk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVHcmlkQ2VsbHMoKSB7XG4gICAgbGV0IHggPSAwO1xuICAgIGxldCB5ID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGdyaWQxLmFwcGVuZENoaWxkKGNlbGwpLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcbiAgICAgIGlmICh5ID09PSAxMCkge1xuICAgICAgfVxuICAgICAgY2VsbC5kYXRhc2V0LnggPSB4O1xuICAgICAgY2VsbC5kYXRhc2V0LnkgPSB5O1xuICAgICAgeSA9IHkgKyAxO1xuICAgICAgaWYgKHkgPT09IDEwKSB7XG4gICAgICAgIHkgPSAwO1xuICAgICAgICB4ID0geCArIDE7XG4gICAgICB9XG4gICAgfVxuICAgIHggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGdyaWQyLmFwcGVuZENoaWxkKGNlbGwpLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcbiAgICAgIGlmICh5ID09PSAxMCkge1xuICAgICAgfVxuICAgICAgY2VsbC5kYXRhc2V0LnggPSB4O1xuICAgICAgY2VsbC5kYXRhc2V0LnkgPSB5O1xuICAgICAgeSA9IHkgKyAxO1xuICAgICAgaWYgKHkgPT09IDEwKSB7XG4gICAgICAgIHkgPSAwO1xuICAgICAgICB4ID0geCArIDE7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgY3JlYXRlR3JpZENlbGxzLCBjcmVhdGVTaGlwcyB9O1xufTtcblxuLy9ET00gTWFuaXB1bGF0aW9uXG5leHBvcnQgY29uc3QgbWFuaXB1bGF0ZURPTSA9ICgpID0+IHtcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ncmlkXScpO1xuICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwJyk7XG4gIGxldCBkcmFnZ2VkO1xuICBjb25zdCBpbml0aWFsQ29vcmRpbmF0ZXMgPSBbXTtcblxuICAvL0FkZGluZyBldmVudHMgZm9yIHRoZSBzaGlwcyB3aGVuIHRoZSBkcmFnIHN0YXJ0cyBhbmQgZW5kcyBhbmQgYWxzbyBhIGNsaWNrIG9uZSB0aGF0IHdpbGwgY2hhbmdlIHRoZSBkaXJlY3Rpb24gaXQgZ29lc1xuICAvL1wib3Jpem9udGFcIiBvciBcInZlcnRpY2FsXCJcbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZycsIChlKSA9PiB7XG4gICAgICBlLnRhcmdldC5zdHlsZS5vcGFjaXR5ID0gJzAuMyc7XG4gICAgfSk7XG5cbiAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIChlKSA9PiB7XG4gICAgICBzdG9yZUluaXRhbENvb3JkaW5hdGVzKGUpO1xuICAgIH0pO1xuXG4gICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgKGUpID0+IHtcbiAgICAgIGUudGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgfSk7XG5cbiAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGlmICghZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbGwnKSkgcmV0dXJuO1xuICAgICAgc3RvcmVJbml0YWxDb29yZGluYXRlcyhlKTtcbiAgICAgIGRyYWdnZWQgPSBlLnRhcmdldDtcbiAgICAgIGlmIChjaGVja1ZhbGlkRHJvcChlLCAnY2xpY2snKSkgcmV0dXJuO1xuICAgICAgaWYgKGNoZWNrTmVhckNlbGxzKGUsICdjbGljaycpKSByZXR1cm47XG4gICAgICBzaGlwLmNsYXNzTGlzdC50b2dnbGUoJ3ZlcnRpY2FsJyk7XG4gICAgICByZW1vdmVCdXN5U3RhdGUoZSwgJ2NsaWNrJyk7XG4gICAgICBpZiAoc2hpcC5jbGFzc0xpc3QuY29udGFpbnMoJ3ZlcnRpY2FsJykpIHtcbiAgICAgICAgbGV0IGJvZHkgPSA1My4yNyAqIGUudGFyZ2V0LmRhdGFzZXQubGVuZ3RoO1xuICAgICAgICBib2R5ID0gYm9keS50b0ZpeGVkKDIpO1xuICAgICAgICBzaGlwLnN0eWxlLmNzc1RleHQgPSBgaGVpZ2h0OiR7Ym9keX1weDsgd2lkdGg6NTMuMjdweDtgO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGJvZHkgPSA1My4yNyAqIGUudGFyZ2V0LmRhdGFzZXQubGVuZ3RoO1xuICAgICAgICBib2R5ID0gYm9keS50b0ZpeGVkKDIpO1xuICAgICAgICBzaGlwLnN0eWxlLmNzc1RleHQgPSBgd2lkdGg6JHtib2R5fXB4OyBoZWlnaHQ6NTMuMjdweDtgO1xuICAgICAgfVxuICAgICAgYWRkU2hpcHNUb0NlbGxzKGUsICdjbGljaycpO1xuICAgIH0pO1xuICB9KTtcblxuICBncmlkcy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCAoZSkgPT4ge30pO1xuXG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCBsZW5ndGggPSBkcmFnZ2VkLmRhdGFzZXQubGVuZ3RoO1xuICAgICAgbGV0IHggPSBlLnRhcmdldC5kYXRhc2V0Lng7XG4gICAgICBsZXQgeSA9IGUudGFyZ2V0LmRhdGFzZXQueTtcbiAgICAgIHggPSBwYXJzZUludCh4KTtcbiAgICAgIHkgPSBwYXJzZUludCh5KTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteD0nJHt4fSddW2RhdGEteT0nJHt5fSddYCk7XG4gICAgICAgIGlmIChkcmFnZ2VkLmNsYXNzTGlzdC5jb250YWlucygndmVydGljYWwnKSkge1xuICAgICAgICAgIHggPSB4ICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB5ID0geSArIDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNlbGwgIT09IG51bGwpIGNlbGwuY2xhc3NMaXN0LmFkZCgnZHJhZ292ZXInKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IGxlYXZlZENlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJhZ292ZXInKTtcbiAgICAgIGxlYXZlZENlbGwuZm9yRWFjaCgobGVhdmVkKSA9PiB7XG4gICAgICAgIGxlYXZlZC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnb3ZlcicpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgbGVhdmVkQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcmFnb3ZlcicpO1xuICAgICAgbGVhdmVkQ2VsbC5mb3JFYWNoKChsZWF2ZWQpID0+IHtcbiAgICAgICAgbGVhdmVkLmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdvdmVyJyk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGNoZWNrVmFsaWREcm9wKGUpKSByZXR1cm47XG4gICAgICBpZiAoY2hlY2tOZWFyQ2VsbHMoZSkpIHJldHVybjtcbiAgICAgIHJlbW92ZUJ1c3lTdGF0ZShlKTtcbiAgICAgIGFkZFNoaXBzVG9DZWxscyhlKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gYWRkU2hpcHNUb0NlbGxzKGUsIGFjdGlvbikge1xuICAgIGxldCB4O1xuICAgIGxldCB5O1xuXG4gICAgZHJhZ2dlZC5jbGFzc0xpc3QuYWRkKCdkcmFnZ2VkJyk7XG4gICAgaWYgKCFlLnRhcmdldC5jb250YWlucyhkcmFnZ2VkKSkge1xuICAgICAgZS50YXJnZXQuYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgfVxuICAgIGlmIChhY3Rpb24gPT09ICdjbGljaycpIHtcbiAgICAgIHggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQueDtcbiAgICAgIHkgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQueTtcbiAgICB9IGVsc2Uge1xuICAgICAgeCA9IGUudGFyZ2V0LmRhdGFzZXQueDtcbiAgICAgIHkgPSBlLnRhcmdldC5kYXRhc2V0Lnk7XG4gICAgfVxuICAgIHggPSBwYXJzZUludCh4KTtcbiAgICB5ID0gcGFyc2VJbnQoeSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkcmFnZ2VkLmRhdGFzZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14PScke3h9J11bZGF0YS15PScke3l9J11gKTtcblxuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdidXN5Jyk7XG4gICAgICBpZiAoZHJhZ2dlZC5jbGFzc0xpc3QuY29udGFpbnMoJ3ZlcnRpY2FsJykpIHtcbiAgICAgICAgeCA9IHggKyAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeSA9IHkgKyAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3JlSW5pdGFsQ29vcmRpbmF0ZXMoZSkge1xuICAgIGluaXRpYWxDb29yZGluYXRlcy5zcGxpY2UoMCwgaW5pdGlhbENvb3JkaW5hdGVzLmxlbmd0aCk7XG4gICAgZHJhZ2dlZCA9IGUudGFyZ2V0O1xuICAgIGlmIChkcmFnZ2VkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxsJykpIHtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IGRyYWdnZWQuZGF0YXNldC5sZW5ndGg7XG4gICAgICBsZXQgeCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC54O1xuICAgICAgbGV0IHkgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQueTtcbiAgICAgIHggPSBwYXJzZUludCh4KTtcbiAgICAgIHkgPSBwYXJzZUludCh5KTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpbml0aWFsQ29vcmRpbmF0ZXMucHVzaCh7IHgsIHkgfSk7XG4gICAgICAgIGlmIChkcmFnZ2VkLmNsYXNzTGlzdC5jb250YWlucygndmVydGljYWwnKSkge1xuICAgICAgICAgIHggPSB4ICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB5ID0geSArIDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvL0NoZWNrcyBpZiB0aGVyZSBpcyBhIHNoaXAgYWxyZWFkeSBvbiBhbnkgY2VsbCBvciBpZiBpdCBkb2VzIG5vdCBmaXQgaW4gdGhlIGdyaWQgYW5kIGNhbmNlbHMgdGhlIGFjdGlvbiBpZiB0cnVlXG4gIGZ1bmN0aW9uIGNoZWNrVmFsaWREcm9wKGUsIGFjdGlvbikge1xuICAgIGNvbnN0IGxlbmd0aCA9IGRyYWdnZWQuZGF0YXNldC5sZW5ndGg7XG4gICAgbGV0IHg7XG4gICAgbGV0IHk7XG5cbiAgICBpZiAoYWN0aW9uID09PSAnY2xpY2snKSB7XG4gICAgICB4ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0Lng7XG4gICAgICB5ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0Lnk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHggPSBlLnRhcmdldC5kYXRhc2V0Lng7XG4gICAgICB5ID0gZS50YXJnZXQuZGF0YXNldC55O1xuICAgIH1cbiAgICB5ID0gcGFyc2VJbnQoeSk7XG4gICAgeCA9IHBhcnNlSW50KHgpO1xuICAgIGxldCBjaGVjayA9IGZhbHNlO1xuICAgIGNvbnN0IGZpcnN0Q2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXg9JyR7eH0nXVtkYXRhLXk9JyR7eX0nXWApO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaW5pdGlhbENvb3JkaW5hdGVzLmZvckVhY2goKHh5KSA9PiB7XG4gICAgICAgIGlmICh4eS54ID09PSB4ICYmIHh5LnkgPT09IHkpIHJldHVybjtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXg9JyR7eH0nXVtkYXRhLXk9JyR7eX0nXWApO1xuICAgICAgbGV0IGN1cnJlbnRDZWxsO1xuICAgICAgaWYgKGRyYWdnZWQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbGwnKSAmJiBpbml0aWFsQ29vcmRpbmF0ZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIGN1cnJlbnRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteD0nJHtpbml0aWFsQ29vcmRpbmF0ZXNbaV0ueH0nXVtkYXRhLXk9JyR7aW5pdGlhbENvb3JkaW5hdGVzW2ldLnl9J11gKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRyYWdnZWQuY2xhc3NMaXN0LmNvbnRhaW5zKCd2ZXJ0aWNhbCcpKSB7XG4gICAgICAgIGlmIChhY3Rpb24gPT09ICdjbGljaycpIHtcbiAgICAgICAgICB5ID0geSArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgeCA9IHggKyAxO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoYWN0aW9uID09PSAnY2xpY2snKSB7XG4gICAgICAgICAgeCA9IHggKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHkgPSB5ICsgMTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgdGhlQ2VsbDtcbiAgICAgIGlmIChhY3Rpb24gPT09ICdjbGljaycpIHtcbiAgICAgICAgaWYgKGNlbGwgIT09IGZpcnN0Q2VsbCkge1xuICAgICAgICAgIHRoZUNlbGwgPSBjZWxsO1xuXG4gICAgICAgICAgaWYgKGNlbGwgPT09IG51bGwgfHwgdGhlQ2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2J1c3knKSkge1xuICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChjZWxsID09PSBudWxsIHx8IChjZWxsLmNsYXNzTGlzdC5jb250YWlucygnYnVzeScpICYmIHRoZUNlbGwgIT09IGNlbGwpKSB7XG4gICAgICAgIGlmIChjdXJyZW50Q2VsbCA9PT0gY2VsbCkgcmV0dXJuO1xuXG4gICAgICAgIGNoZWNrID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2hlY2s7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVCdXN5U3RhdGUoZSwgYWN0aW9uKSB7XG4gICAgaWYgKGFjdGlvbiA9PT0gJ2NsaWNrJykge1xuICAgICAgbGV0IHggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQueDtcbiAgICAgIGxldCB5ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0Lnk7XG4gICAgICB5ID0gcGFyc2VJbnQoeSk7XG4gICAgICB4ID0gcGFyc2VJbnQoeCk7XG4gICAgICBjb25zdCBsZW5ndGggPSBkcmFnZ2VkLmRhdGFzZXQubGVuZ3RoO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14PScke3h9J11bZGF0YS15PScke3l9J11gKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdidXN5Jyk7XG4gICAgICAgIGlmIChkcmFnZ2VkLmNsYXNzTGlzdC5jb250YWlucygndmVydGljYWwnKSkge1xuICAgICAgICAgIHkgPSB5ICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB4ID0geCArIDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaW5pdGlhbENvb3JkaW5hdGVzLmZvckVhY2goKHh5KSA9PiB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14PScke3h5Lnh9J11bZGF0YS15PScke3h5Lnl9J11gKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdidXN5Jyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBDaGVjayBpZiB0aGUgbmVhcmJ5IGNlbGxzIGFyZSBhbHJlYWR5IG9jdXBwaWVkIHNvIDIgc2hpcHMgY2FuIG5vdCBiZSBwbGFjZWQgcmlnaHQgbmV4dCB0byBlYWNoIG90aGVyXG4gIGZ1bmN0aW9uIGNoZWNrTmVhckNlbGxzKGUsIGFjdGlvbikge1xuICAgIGNvbnN0IGxlbmd0aCA9IGRyYWdnZWQuZGF0YXNldC5sZW5ndGg7XG4gICAgbGV0IHg7XG4gICAgbGV0IHk7XG4gICAgbGV0IGJ1c3kgPSBmYWxzZTtcbiAgICBpZiAoYWN0aW9uID09PSAnY2xpY2snKSB7XG4gICAgICB4ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0Lng7XG4gICAgICB5ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0Lnk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHggPSBlLnRhcmdldC5kYXRhc2V0Lng7XG4gICAgICB5ID0gZS50YXJnZXQuZGF0YXNldC55O1xuICAgIH1cblxuICAgIHkgPSBwYXJzZUludCh5KTtcbiAgICB4ID0gcGFyc2VJbnQoeCk7XG4gICAgY29uc3Qgb2NjdXBpZWRDZWxscyA9IFtdO1xuICAgIGNvbnN0IGFkZFggPSBbLTEsIDAsIDFdO1xuICAgIGNvbnN0IGFkZFkgPSBbLTEsIDAsIDFdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgb2NjdXBpZWRDZWxscy5wdXNoKHsgeCwgeSB9KTtcblxuICAgICAgaWYgKGRyYWdnZWQuY2xhc3NMaXN0LmNvbnRhaW5zKCd2ZXJ0aWNhbCcpKSB7XG4gICAgICAgIGlmIChhY3Rpb24gPT09ICdjbGljaycpIHtcbiAgICAgICAgICB5ID0geSArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgeCA9IHggKyAxO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoYWN0aW9uID09PSAnY2xpY2snKSB7XG4gICAgICAgICAgeCA9IHggKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHkgPSB5ICsgMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIG9jY3VwaWVkQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgbGV0IHkgPSBjZWxsLnk7XG4gICAgICBsZXQgeCA9IGNlbGwueDtcbiAgICAgIHggPSBwYXJzZUludCh4KTtcbiAgICAgIHkgPSBwYXJzZUludCh5KTtcblxuICAgICAgYWRkWC5mb3JFYWNoKChhZHgpID0+IHtcbiAgICAgICAgbGV0IG51bVggPSB4ICsgYWR4O1xuICAgICAgICBpZiAobnVtWCA8IDAgfHwgbnVtWCA+IDkpIG51bVggPSB4O1xuXG4gICAgICAgIGFkZFkuZm9yRWFjaCgoYWR5KSA9PiB7XG4gICAgICAgICAgbGV0IG51bVkgPSB5ICsgYWR5O1xuICAgICAgICAgIGlmIChudW1ZIDwgMCB8fCBudW1ZID4gOSkgbnVtWSA9IHk7XG4gICAgICAgICAgbGV0IGNoZWNrZXIgPSBmYWxzZTtcbiAgICAgICAgICBvY2N1cGllZENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGlmIChudW1YID09PSBjZWxsLnggJiYgbnVtWSA9PT0gY2VsbC55KSByZXR1cm4gKGNoZWNrZXIgPSB0cnVlKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmIChjaGVja2VyID09PSB0cnVlKSByZXR1cm47XG4gICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXg9JyR7bnVtWH0nXVtkYXRhLXk9JyR7bnVtWX0nXWApO1xuXG4gICAgICAgICAgY29uc3QgaXNZb3VycyA9IGluaXRpYWxDb29yZGluYXRlcy5maW5kKCh4eSkgPT4ge1xuICAgICAgICAgICAgaWYgKHh5LnggPT09IG51bVggJiYgeHkueSA9PT0gbnVtWSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2J1c3knKSAmJiAhaXNZb3VycykgYnVzeSA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGJ1c3k7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJTaGlwcyhjb29yZGluYXRlc0FycmF5LCBncmlkKSB7XG4gICAgY29vcmRpbmF0ZXNBcnJheS5mb3JFYWNoKCh4eSkgPT4ge1xuICAgICAgY29uc3QgY2VsbCA9IGdyaWQucXVlcnlTZWxlY3RvcihgW2RhdGEteD1cIiR7eHkueH1cIl1bZGF0YS15PVwiJHt4eS55fVwiXWApO1xuICAgICAgY2VsbC5zdHlsZS5jc3NUZXh0ID0gJ2JhY2tncm91bmQtY29sb3I6cmdiYSgxNjAsMTYwLDE2MCwwLjcpJztcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7IHJlbmRlclNoaXBzIH07XG59O1xuIiwiaW1wb3J0IHsgc2hpcEZhY3RvcnkgfSBmcm9tICcuL3NoaXBGYWN0b3J5JztcblxuZXhwb3J0IGNvbnN0IGdhbWVib2FyZEZhY3RvcnkgPSAoKSA9PiB7XG4gIGNvbnN0IHNoaXBzQXJyYXkgPSBbXTtcbiAgY29uc3Qgd3JlY2tlZFNoaXBzID0gW107XG5cbiAgLy9TYXZlcyBhbGwgY29vcmRpbmF0ZXMgc28gdGhlIGdhbWVib2FyZCBjYW4ga2VlcCB0cmFjayBvZiBhbGwgdGhlIG1pc3Nlc1xuICBjb25zdCBhbGxDb29yZGluYXRlcyA9IFtdO1xuICAoZnVuY3Rpb24gY3JlYXRlQ29vcmRpbmF0ZXMoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgaWYgKGkgPCAxMCkge1xuICAgICAgICBpID0gJzAnICsgaTtcbiAgICAgIH1cbiAgICAgIGFsbENvb3JkaW5hdGVzLnB1c2goaSk7XG4gICAgfVxuICB9KSgpO1xuXG4gIC8vUGxhY2VzIGEgbmV3IHNoaXAgYXQgY2hvb3NlbiBjb29yZGluYXRlc1xuICAvL1RoaXMgaXMgcmVkdW5kYW50LCB5b3UgYXJlIGdvaW5nIHRvIHBsYWNlIHNoaXBzIGluIGEgZGlmZXJyZW50IHdheSwgYWZ0ZXIgdGhlIHVzZXIgY2xpY2sgc3RhcnQgd2hlbiBoZSBmaW5pc2hlcyBhZGRpbmcgdGhlIHNoaXBzLCB0aGVuIGZvciBlYWNoIHNoaXBcbiAgLy95b3UgdGFrZXMgaXQncyBjb29yZGluYXRlcyBhbmQgdGhlbiBjcmVhdGUgdGhlIHNoaXBzIGJhc2VkIG9uIGVhY2ggY29vcmRpbmF0ZSwgeW91IHdpbGwgaGF2ZSB0byByZWZhY3RvciB0aGUgcmVjZWl2ZUF0dGFjayBhcyB3ZWxsXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcHMoeCwgeSwgZGlyZWN0aW9uKSB7XG4gICAgeCA9IHBhcnNlSW50KHgpO1xuICAgIHkgPSBwYXJzZUludCh5KTtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IFtdO1xuICAgIGlmIChkaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGluZGV4OyBpKyspIHtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaCh7IHgsIHkgfSk7XG4gICAgICAgIHggPSB4ICsgMTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ29yaXpvbnRhbCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGluZGV4OyBpKyspIHtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaCh7IHgsIHkgfSk7XG4gICAgICAgIHkgPSB5ICsgMTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc2hpcCA9IHNoaXBGYWN0b3J5KGluZGV4KTtcblxuICAgIHNoaXBzQXJyYXkucHVzaCh7IHNoaXAsIGNvb3JkaW5hdGVzIH0pO1xuXG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzO1xuICB9XG5cbiAgLy9DaGVja3MgaWYgdGhlIHRoZSBzZWxlY3RlZCBjb29yZGluYXRlcyBhcmUgb2NjdXBpZWQgYnkgYSBzaGlwIG9yIG5vdCBhbmRcbiAgLy9jYWxscyB0aGUgaGl0IGZ1bmN0aW9uIG9uIHRoYXQgc3BlY2lmaWMgc2hpcCBvciBtYXJrcyB0aGUgbWlzcy5cbiAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayh4LCB5KSB7XG4gICAgeCA9IHBhcnNlSW50KHgpO1xuICAgIHkgPSBwYXJzZUludCh5KTtcbiAgICBjb25zdCBoaXRDb29yZGluYXRlcyA9IHggKyAnJyArIHk7XG4gICAgaWYgKGFsbENvb3JkaW5hdGVzW2hpdENvb3JkaW5hdGVzXSA9PT0gJ3gnKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgYWxsQ29vcmRpbmF0ZXMuc3BsaWNlKGhpdENvb3JkaW5hdGVzLCAxLCAneCcpO1xuXG4gICAgbGV0IHJldHVyblZhbHVlID0gJ21pc3MnO1xuICAgIHNoaXBzQXJyYXkuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgcmV0dXJuIHNoaXAuY29vcmRpbmF0ZXMuZmluZCgoY29vcmQpID0+IHtcbiAgICAgICAgaWYgKGNvb3JkLnggPT09IHggJiYgY29vcmQueSA9PT0geSkge1xuICAgICAgICAgIHJldHVyblZhbHVlID0gc2hpcC5zaGlwLmhpdCgpO1xuICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZSA9PT0gJ1NVTkshJykge1xuICAgICAgICAgICAgd3JlY2tlZFNoaXBzLnB1c2gocmV0dXJuVmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cblxuICAvL0NoZWNrcyB3ZXRoZXIgb3Igbm90IGFsbCB0aGUgc2hpcHMgaGF2ZSBiZWVuIHN1bmtcblxuICBmdW5jdGlvbiBhcmVBbGxTaGlwc1dyZWNrZWQoKSB7XG4gICAgaWYgKHdyZWNrZWRTaGlwcy5sZW5ndGggPT09IDEwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHsgc2hpcHNBcnJheSwgcGxhY2VTaGlwcywgcmVjZWl2ZUF0dGFjaywgYXJlQWxsU2hpcHNXcmVja2VkIH07XG59O1xuIiwiaW1wb3J0IHsgZ2FtZWJvYXJkRmFjdG9yeSB9IGZyb20gJy4vZ2FtZWJvYXJkRmFjdG9yeSc7XG5cbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIGdhbWVib2FyZCA9IGdhbWVib2FyZEZhY3RvcnkoKTtcblxuICBpc1R1cm4gPSBmYWxzZTtcblxuICBzdGFydFR1cm4oKSB7XG4gICAgcmV0dXJuICh0aGlzLmlzVHVybiA9IHRydWUpO1xuICB9XG5cbiAgZW5kVHVybigpIHtcbiAgICByZXR1cm4gKHRoaXMuaXNUdXJuID0gZmFsc2UpO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3Qgc2hpcEZhY3RvcnkgPSAobGVuKSA9PiB7XG4gIGNvbnN0IGxlbmd0aCA9IGxlbjtcbiAgY29uc3QgcG9zaXRpb25zQXJyYXkgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8PSBsZW5ndGg7IGkrKykge1xuICAgIHBvc2l0aW9uc0FycmF5LnB1c2goaSk7XG4gIH1cblxuICBsZXQgaSA9IDA7XG5cbiAgZnVuY3Rpb24gaGl0KCkge1xuICAgIHBvc2l0aW9uc0FycmF5LnNwbGljZShpLCAxLCAnaGl0Jyk7XG4gICAgY29uc29sZS5sb2cocG9zaXRpb25zQXJyYXkpO1xuXG4gICAgaWYgKGlzU3VuaygpKSB7XG4gICAgICByZXR1cm4gJ1NVTkshJztcbiAgICB9XG4gICAgaSsrO1xuICAgIHJldHVybiAnaGl0JztcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICByZXR1cm4gcG9zaXRpb25zQXJyYXkuZXZlcnkoKHBvc2l0aW9uKSA9PiB7XG4gICAgICByZXR1cm4gcG9zaXRpb24gPT09ICdoaXQnO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHsgbGVuZ3RoLCBoaXQgfTtcbn07XG4iLCJleHBvcnQgY29uc3Qgc3RhcnRTY3JlZW4gPSAoKSA9PiB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gIGNvbnN0IG1haW5Cb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IHB2cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBwdnAudGV4dENvbnRlbnQgPSAnUGxheWVyIHZzIFBsYXllcic7XG4gIGNvbnN0IHB2YyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBwdmMudGV4dENvbnRlbnQgPSAnUGxheWVyIHZzIENvbXB1dGVyJztcblxuICBtYWluQm9keS5hcHBlbmRDaGlsZChwdnApLmNsYXNzTGlzdC5hZGQoJ3N0YXJ0LXB2cCcpO1xuICBtYWluQm9keS5hcHBlbmRDaGlsZChwdmMpLmNsYXNzTGlzdC5hZGQoJ3N0YXJ0LXB2YycpO1xuICBib2R5LmFwcGVuZENoaWxkKG1haW5Cb2R5KS5jbGFzc0xpc3QuYWRkKCdzdGFydC1ib2R5Jyk7XG5cbiAgcHZwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHt9KTtcbn07XG4iLCJpbXBvcnQgeyBtYW5pcHVsYXRlRE9NIH0gZnJvbSAnLi9ET00nO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9GYWN0b3JpZXMvcGxheWVyJztcblxuZXhwb3J0IGNvbnN0IGdhbWVMb2dpYyA9ICgpID0+IHtcbiAgY29uc3QgcGxheWVyMSA9IG5ldyBQbGF5ZXIoJ1lPWU8nKTtcbiAgY29uc3QgcGxheWVyMiA9IG5ldyBQbGF5ZXIoJ1hPWE8nKTtcbiAgLy9DaGVja3MgZWFjaCBhdHRhY2sgaWYgYWxsIHRoZSBzaGlwcyBoYXZlIGJlZW4gc3Vua1xuICBmdW5jdGlvbiBjaGVja0Zvcldpbm5lcigpIHtcbiAgICBpZiAocGxheWVyMS5nYW1lYm9hcmQuYXJlQWxsU2hpcHNXcmVja2VkKCkgPT09IHRydWUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdwbGF5ZXIyIFdPTiEnKTtcbiAgICB9IGVsc2UgaWYgKHBsYXllcjIuZ2FtZWJvYXJkLmFyZUFsbFNoaXBzV3JlY2tlZCgpID09PSB0cnVlKSB7XG4gICAgICBjb25zb2xlLmxvZygncGxheWVyMSBXT04nKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHsgY2hlY2tGb3JXaW5uZXIgfTtcbn07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIlwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJcIixcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIlwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJcIixcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVBpcmF0YStPbmUmZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKixcXG4qOjpiZWZvcmUsXFxuKjo6YWZ0ZXIge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbjpyb290IHtcXG4gIC0tc2hpcDogI2NhNjcwMjtcXG4gIC0tZ3JpZDogIzBhOTM5NjtcXG4gIC0tYm9yZGVyOiAjYWUyMDEyO1xcbiAgLS15ZXQtc2hpcDogI2U5ZDhhNjtcXG59XFxuXFxuYm9keSB7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZm9udC1mYW1pbHk6ICdQaXJhdGEgT25lJywgY3Vyc2l2ZTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDUwJSA1MCU7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDRyZW0gYXV0bztcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XFxuICAgICdoZWFkZXIgaGVhZGVyJ1xcbiAgICAncGxheWVyMSBwbGF5ZXIyJztcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGdyaWQtYXJlYTogaGVhZGVyO1xcbiAgaGVpZ2h0OiAzLjdyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA1ZjczO1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMjVweDtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAyNXB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogMi45cmVtO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXJlbTtcXG59XFxuXFxuLnBsYXllcjEtc2NyZWVuLFxcbi5wbGF5ZXIyLXNjcmVlbiB7XFxuICBncmlkLWFyZWE6IHBsYXllcjE7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAyNSUgNzUlO1xcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhczpcXG4gICAgJ3NoaXBzJ1xcbiAgICAnZ3JpZHMnO1xcbn1cXG5cXG4ucGxheWVyMi1zY3JlZW4ge1xcbiAgZ3JpZC1hcmVhOiBwbGF5ZXIyO1xcbn1cXG5cXG4uc2hpcHMtZGl2MSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgZ2FwOiAxcmVtO1xcbiAgcGFkZGluZzogMTBweDtcXG59XFxuXFxuLnNoaXAge1xcbiAgZ3JpZC1hcmVhOiBzaGlwcztcXG4gIGhlaWdodDogMy4zM2VtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0teWV0LXNoaXApO1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyKTtcXG4gIGN1cnNvcjogZ3JhYjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uc2hpcC52ZXJ0aWNhbCB7XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgcGFkZGluZy10b3A6IDEwcHg7XFxufVxcblxcbi5yZXZlcnNlLWltZyB7XFxuICBmaWx0ZXI6IGludmVydCg3NyUpIHNlcGlhKDIlKSBzYXR1cmF0ZSgyNCUpIGh1ZS1yb3RhdGUoMzIwZGVnKSBicmlnaHRuZXNzKDg4JSkgY29udHJhc3QoOTIlKTtcXG4gIG9wYWNpdHk6IDA7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIHdpZHRoOiAxOHB4O1xcbiAgaGVpZ2h0OiAxOHB4O1xcbn1cXG5cXG4uY2VsbCA+IC5zaGlwOmhvdmVyID4gLnJldmVyc2UtaW1nIHtcXG4gIG9wYWNpdHk6IDE7XFxufVxcblxcbi5kcmFnb3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS15ZXQtc2hpcCk7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xcbn1cXG5cXG4uZHJhZ2dlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zaGlwKTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlcik7XFxufVxcblxcbi5ncmlkLTEsXFxuLmdyaWQtMiB7XFxuICBncmlkLWFyZWE6IGdyaWRzO1xcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuXFxuICB3aWR0aDogMzMuM2VtO1xcbiAgaGVpZ2h0OiAzMy4zZW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgYmFja2dyb3VuZDogdmFyKC0tZ3JpZCk7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXg6IDUwJTtcXG4gIGJhY2tncm91bmQtcG9zaXRpb24teTogNDAlO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG5bZGF0YS15PSc5J10ge1xcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbltkYXRhLXg9JzknXSB7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi5jZWxsIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgYmxhY2s7XFxuICB3aWR0aDogMTAlO1xcbiAgaGVpZ2h0OiAxMCU7XFxufVxcblxcbi5vZmYge1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICBvcGFjaXR5OiAwO1xcbiAgd2lkdGg6IDA7XFxuICBoZWlnaHQ6IDA7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9TdHlsZS9tYWluLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTs7O0VBR0Usc0JBQXNCO0VBQ3RCLFVBQVU7RUFDVixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLGtDQUFrQztFQUNsQyxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLDZCQUE2QjtFQUM3Qjs7cUJBRW1CO0FBQ3JCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCx5QkFBeUI7RUFDekIsK0JBQStCO0VBQy9CLGdDQUFnQztFQUNoQyxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixzQkFBc0I7QUFDeEI7O0FBRUE7O0VBRUUsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYiwyQkFBMkI7RUFDM0I7O1dBRVM7QUFDWDs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixlQUFlO0VBQ2YsU0FBUztFQUNULGFBQWE7QUFDZjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QsaUNBQWlDO0VBQ2pDLCtCQUErQjtFQUMvQixZQUFZO0VBQ1osYUFBYTtFQUNiLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLHVCQUF1QjtFQUN2Qix1QkFBdUI7RUFDdkIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsNEZBQTRGO0VBQzVGLFVBQVU7RUFDVixvQkFBb0I7RUFDcEIsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLGlDQUFpQztFQUNqQywrQkFBK0I7QUFDakM7O0FBRUE7RUFDRSw2QkFBNkI7RUFDN0IsK0JBQStCO0FBQ2pDOztBQUVBOztFQUVFLGdCQUFnQjtFQUNoQixvQkFBb0I7O0VBRXBCLGFBQWE7RUFDYixjQUFjO0VBQ2QsYUFBYTtFQUNiLGVBQWU7RUFDZix1QkFBdUI7RUFDdkIsMEJBQTBCO0VBQzFCLDBCQUEwQjtFQUMxQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsNkJBQTZCO0FBQy9COztBQUVBO0VBQ0UsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsMkJBQTJCO0VBQzNCLDRCQUE0QjtFQUM1QixVQUFVO0VBQ1YsV0FBVztBQUNiOztBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLFVBQVU7RUFDVixRQUFRO0VBQ1IsU0FBUztBQUNYXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVBpcmF0YStPbmUmZGlzcGxheT1zd2FwJyk7XFxuXFxuKixcXG4qOjpiZWZvcmUsXFxuKjo6YWZ0ZXIge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbjpyb290IHtcXG4gIC0tc2hpcDogI2NhNjcwMjtcXG4gIC0tZ3JpZDogIzBhOTM5NjtcXG4gIC0tYm9yZGVyOiAjYWUyMDEyO1xcbiAgLS15ZXQtc2hpcDogI2U5ZDhhNjtcXG59XFxuXFxuYm9keSB7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZm9udC1mYW1pbHk6ICdQaXJhdGEgT25lJywgY3Vyc2l2ZTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDUwJSA1MCU7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDRyZW0gYXV0bztcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XFxuICAgICdoZWFkZXIgaGVhZGVyJ1xcbiAgICAncGxheWVyMSBwbGF5ZXIyJztcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGdyaWQtYXJlYTogaGVhZGVyO1xcbiAgaGVpZ2h0OiAzLjdyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA1ZjczO1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMjVweDtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAyNXB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogMi45cmVtO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXJlbTtcXG59XFxuXFxuLnBsYXllcjEtc2NyZWVuLFxcbi5wbGF5ZXIyLXNjcmVlbiB7XFxuICBncmlkLWFyZWE6IHBsYXllcjE7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAyNSUgNzUlO1xcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhczpcXG4gICAgJ3NoaXBzJ1xcbiAgICAnZ3JpZHMnO1xcbn1cXG5cXG4ucGxheWVyMi1zY3JlZW4ge1xcbiAgZ3JpZC1hcmVhOiBwbGF5ZXIyO1xcbn1cXG5cXG4uc2hpcHMtZGl2MSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgZ2FwOiAxcmVtO1xcbiAgcGFkZGluZzogMTBweDtcXG59XFxuXFxuLnNoaXAge1xcbiAgZ3JpZC1hcmVhOiBzaGlwcztcXG4gIGhlaWdodDogMy4zM2VtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0teWV0LXNoaXApO1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyKTtcXG4gIGN1cnNvcjogZ3JhYjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uc2hpcC52ZXJ0aWNhbCB7XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgcGFkZGluZy10b3A6IDEwcHg7XFxufVxcblxcbi5yZXZlcnNlLWltZyB7XFxuICBmaWx0ZXI6IGludmVydCg3NyUpIHNlcGlhKDIlKSBzYXR1cmF0ZSgyNCUpIGh1ZS1yb3RhdGUoMzIwZGVnKSBicmlnaHRuZXNzKDg4JSkgY29udHJhc3QoOTIlKTtcXG4gIG9wYWNpdHk6IDA7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIHdpZHRoOiAxOHB4O1xcbiAgaGVpZ2h0OiAxOHB4O1xcbn1cXG5cXG4uY2VsbCA+IC5zaGlwOmhvdmVyID4gLnJldmVyc2UtaW1nIHtcXG4gIG9wYWNpdHk6IDE7XFxufVxcblxcbi5kcmFnb3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS15ZXQtc2hpcCk7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xcbn1cXG5cXG4uZHJhZ2dlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zaGlwKTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlcik7XFxufVxcblxcbi5ncmlkLTEsXFxuLmdyaWQtMiB7XFxuICBncmlkLWFyZWE6IGdyaWRzO1xcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuXFxuICB3aWR0aDogMzMuM2VtO1xcbiAgaGVpZ2h0OiAzMy4zZW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgYmFja2dyb3VuZDogdmFyKC0tZ3JpZCk7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXg6IDUwJTtcXG4gIGJhY2tncm91bmQtcG9zaXRpb24teTogNDAlO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG5bZGF0YS15PSc5J10ge1xcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbltkYXRhLXg9JzknXSB7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi5jZWxsIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgYmxhY2s7XFxuICB3aWR0aDogMTAlO1xcbiAgaGVpZ2h0OiAxMCU7XFxufVxcblxcbi5vZmYge1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICBvcGFjaXR5OiAwO1xcbiAgd2lkdGg6IDA7XFxuICBoZWlnaHQ6IDA7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIlwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJcIixcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi5zdGFydC1ib2R5IHtcXG4gIGdyaWQtY29sdW1uLWVuZDogMztcXG4gIGdyaWQtY29sdW1uLXN0YXJ0OiAxO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U5ZDhhNjtcXG4gIHdpZHRoOiA5NSU7XFxuICBoZWlnaHQ6IDk1JTtcXG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAxMCU7XFxuICBwYWRkaW5nLWJvdHRvbTogMTAlO1xcbn1cXG5cXG4uc3RhcnQtcHZwLFxcbi5zdGFydC1wdmMge1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhZTIwMTI7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3gtc2hhZG93OiAycHggMnB4IDZweCAxcHggIzliMjIyNjtcXG4gIHBhZGRpbmc6IDI1cHg7XFxuICB3aWR0aDogMzByZW07XFxuICBib3JkZXItcmFkaXVzOiAyNXB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uc3RhcnQtcHZjOmhvdmVyLFxcbi5zdGFydC1wdnA6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzliMjIyNjtcXG59XFxuXFxuLnN0YXJ0LXB2cDphY3RpdmUsXFxuLnN0YXJ0LXB2YzphY3RpdmUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NhNjcwMjtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL1N0eWxlL3N0YXJ0LXNjcmVlbi5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxrQkFBa0I7RUFDbEIsb0JBQW9CO0VBQ3BCLHlCQUF5QjtFQUN6QixVQUFVO0VBQ1YsV0FBVztFQUNYLG1CQUFtQjtFQUNuQixvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixRQUFRO0VBQ1IsbUJBQW1CO0FBQ3JCOztBQUVBOztFQUVFLG9CQUFvQjtFQUNwQixpQkFBaUI7RUFDakIseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixtQ0FBbUM7RUFDbkMsYUFBYTtFQUNiLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsZUFBZTtBQUNqQjs7QUFFQTs7RUFFRSx5QkFBeUI7QUFDM0I7O0FBRUE7O0VBRUUseUJBQXlCO0FBQzNCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5zdGFydC1ib2R5IHtcXG4gIGdyaWQtY29sdW1uLWVuZDogMztcXG4gIGdyaWQtY29sdW1uLXN0YXJ0OiAxO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U5ZDhhNjtcXG4gIHdpZHRoOiA5NSU7XFxuICBoZWlnaHQ6IDk1JTtcXG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAxMCU7XFxuICBwYWRkaW5nLWJvdHRvbTogMTAlO1xcbn1cXG5cXG4uc3RhcnQtcHZwLFxcbi5zdGFydC1wdmMge1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhZTIwMTI7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3gtc2hhZG93OiAycHggMnB4IDZweCAxcHggIzliMjIyNjtcXG4gIHBhZGRpbmc6IDI1cHg7XFxuICB3aWR0aDogMzByZW07XFxuICBib3JkZXItcmFkaXVzOiAyNXB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uc3RhcnQtcHZjOmhvdmVyLFxcbi5zdGFydC1wdnA6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzliMjIyNjtcXG59XFxuXFxuLnN0YXJ0LXB2cDphY3RpdmUsXFxuLnN0YXJ0LXB2YzphY3RpdmUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NhNjcwMjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9nYW1lLW92ZXIuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9nYW1lLW92ZXIuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2dhbWUtcnVubmluZy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2dhbWUtcnVubmluZy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFpbi5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21haW4uY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3BsYWNlLXNoaXBzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcGxhY2Utc2hpcHMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0YXJ0LXNjcmVlbi5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0YXJ0LXNjcmVlbi5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgJy4vU3R5bGUvbWFpbi5jc3MnO1xuaW1wb3J0ICcuL1N0eWxlL3N0YXJ0LXNjcmVlbi5jc3MnO1xuaW1wb3J0ICcuL1N0eWxlL2dhbWUtb3Zlci5jc3MnO1xuaW1wb3J0ICcuL1N0eWxlL2dhbWUtcnVubmluZy5jc3MnO1xuaW1wb3J0ICcuL1N0eWxlL3BsYWNlLXNoaXBzLmNzcyc7XG5pbXBvcnQgeyBzdGFydFNjcmVlbiB9IGZyb20gJy4vU2NyZWVucy1zY3JpcHRzL3N0YXJ0TWVudSc7XG5pbXBvcnQgeyBnYW1lYm9hcmRGYWN0b3J5IH0gZnJvbSAnLi9GYWN0b3JpZXMvZ2FtZWJvYXJkRmFjdG9yeSc7XG5pbXBvcnQgeyBjcmVhdGVET00sIG1hbmlwdWxhdGVET00gfSBmcm9tICcuL0RPTSc7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL0ZhY3Rvcmllcy9wbGF5ZXInO1xuaW1wb3J0IHsgZ2FtZUxvZ2ljIH0gZnJvbSAnLi9nYW1lTG9naWMnO1xuXG5jb25zdCBET00gPSBjcmVhdGVET00oKTtcblxuRE9NLmNyZWF0ZUdyaWRDZWxscygpO1xuRE9NLmNyZWF0ZVNoaXBzKCk7XG5tYW5pcHVsYXRlRE9NKCk7XG4iXSwibmFtZXMiOlsicmV2ZXJzZSIsImNyZWF0ZURPTSIsImJvZHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJncmlkMSIsImNyZWF0ZUVsZW1lbnQiLCJncmlkMiIsImRhdGFzZXQiLCJncmlkIiwicGxheWVyMSIsInBsYXllcjIiLCJhcHBlbmRDaGlsZCIsImNsYXNzTGlzdCIsImFkZCIsImNyZWF0ZVNoaXBzIiwic2hpcHNEaXYxIiwibWFueVNoaXBzIiwibGVuZ3RoIiwiaSIsInJldmVyc2VJdCIsInNyYyIsInNoaXAiLCJkcmFnZ2FibGUiLCJpbmRleCIsIndpZHRoIiwidG9GaXhlZCIsInN0eWxlIiwiY3NzVGV4dCIsImNyZWF0ZUdyaWRDZWxscyIsIngiLCJ5IiwiY2VsbCIsIm1hbmlwdWxhdGVET00iLCJncmlkcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzaGlwcyIsImRyYWdnZWQiLCJpbml0aWFsQ29vcmRpbmF0ZXMiLCJmb3JFYWNoIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJvcGFjaXR5Iiwic3RvcmVJbml0YWxDb29yZGluYXRlcyIsInBhcmVudEVsZW1lbnQiLCJjb250YWlucyIsImNoZWNrVmFsaWREcm9wIiwiY2hlY2tOZWFyQ2VsbHMiLCJ0b2dnbGUiLCJyZW1vdmVCdXN5U3RhdGUiLCJhZGRTaGlwc1RvQ2VsbHMiLCJwcmV2ZW50RGVmYXVsdCIsInBhcnNlSW50IiwibGVhdmVkQ2VsbCIsImxlYXZlZCIsInJlbW92ZSIsImFjdGlvbiIsInNwbGljZSIsInB1c2giLCJjaGVjayIsImZpcnN0Q2VsbCIsInh5IiwiY3VycmVudENlbGwiLCJ0aGVDZWxsIiwiYnVzeSIsIm9jY3VwaWVkQ2VsbHMiLCJhZGRYIiwiYWRkWSIsImFkeCIsIm51bVgiLCJhZHkiLCJudW1ZIiwiY2hlY2tlciIsImlzWW91cnMiLCJmaW5kIiwicmVuZGVyU2hpcHMiLCJjb29yZGluYXRlc0FycmF5Iiwic2hpcEZhY3RvcnkiLCJnYW1lYm9hcmRGYWN0b3J5Iiwic2hpcHNBcnJheSIsIndyZWNrZWRTaGlwcyIsImFsbENvb3JkaW5hdGVzIiwiY3JlYXRlQ29vcmRpbmF0ZXMiLCJwbGFjZVNoaXBzIiwiZGlyZWN0aW9uIiwiY29vcmRpbmF0ZXMiLCJyZWNlaXZlQXR0YWNrIiwiaGl0Q29vcmRpbmF0ZXMiLCJyZXR1cm5WYWx1ZSIsImNvb3JkIiwiaGl0IiwiYXJlQWxsU2hpcHNXcmVja2VkIiwiUGxheWVyIiwibmFtZSIsImlzVHVybiIsImxlbiIsInBvc2l0aW9uc0FycmF5IiwiY29uc29sZSIsImxvZyIsImlzU3VuayIsImV2ZXJ5IiwicG9zaXRpb24iLCJzdGFydFNjcmVlbiIsIm1haW5Cb2R5IiwicHZwIiwidGV4dENvbnRlbnQiLCJwdmMiLCJnYW1lTG9naWMiLCJjaGVja0Zvcldpbm5lciIsImdhbWVib2FyZCIsIkRPTSJdLCJzb3VyY2VSb290IjoiIn0=