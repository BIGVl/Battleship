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

  function createShips(playerScreen) {
    var shipsDiv = document.createElement('div');
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
      shipsDiv.appendChild(ship).classList.add('ship');
    }

    playerScreen.appendChild(shipsDiv).classList.add('ships-div1');
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

var manipulateDOM = function manipulateDOM(grid) {
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
      dragged = e.target;
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
  console.log(grid);
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

  function saveShipsPosition() {}

  return {
    saveShipsPosition: saveShipsPosition
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

/***/ "./src/Screens-scripts/placeShipsScreen.js":
/*!*************************************************!*\
  !*** ./src/Screens-scripts/placeShipsScreen.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "placeShipsScreen": () => (/* binding */ placeShipsScreen)
/* harmony export */ });
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DOM */ "./src/DOM.js");

var placeShipsScreen = function placeShipsScreen() {
  var body = document.querySelector('body');
  var overlay = document.createElement('div');
  var shitButton = document.createElement('button');
  var finishPlacement = document.createElement('button');
  shitButton.textContent = 'Done';
  overlay.appendChild(shitButton).classList.add('shift-overlay');
  body.appendChild(overlay).classList.add('place-overlay');
  shitButton.addEventListener('click', function () {
    overlay.classList.add('nd');
  });
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
  return {
    pvp: pvp,
    pvc: pvc
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
___CSS_LOADER_EXPORT___.push([module.id, "*,\n*::before,\n*::after {\n  box-sizing: border-box;\n  padding: 0;\n  margin: 0;\n}\n\n:root {\n  --ship: #ca6702;\n  --grid: #0a9396;\n  --border: #ae2012;\n  --yet-ship: #e9d8a6;\n}\n\nbody {\n  width: 100vw;\n  height: 100vh;\n  font-family: 'Pirata One', cursive;\n  display: grid;\n  grid-template-columns: 50% 50%;\n  grid-template-rows: 4rem auto;\n  grid-template-areas:\n    'header header'\n    'player1 player2';\n}\n\nheader {\n  grid-area: header;\n  height: 3.7rem;\n  background-color: #005f73;\n  border-bottom-left-radius: 25px;\n  border-bottom-right-radius: 25px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.title {\n  font-size: 2.9rem;\n  letter-spacing: 0.5rem;\n}\n\n.player1-screen,\n.player2-screen {\n  grid-area: player1;\n  display: grid;\n  grid-template-rows: 25% 75%;\n  grid-template-areas:\n    'ships'\n    'grids';\n}\n\n.player2-screen {\n  grid-area: player2;\n}\n\n.ships-div1 {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n  padding: 10px;\n}\n\n.ship {\n  grid-area: ships;\n  height: 3.33em;\n  background-color: var(--yet-ship);\n  border: 1px solid var(--border);\n  cursor: grab;\n  display: flex;\n  align-items: center;\n}\n\n.ship.vertical {\n  align-items: flex-start;\n  justify-content: center;\n  padding-top: 10px;\n}\n\n.reverse-img {\n  filter: invert(77%) sepia(2%) saturate(24%) hue-rotate(320deg) brightness(88%) contrast(92%);\n  opacity: 0;\n  pointer-events: none;\n  width: 18px;\n  height: 18px;\n}\n\n.cell > .ship:hover > .reverse-img {\n  opacity: 1;\n}\n\n.dragover {\n  background-color: var(--yet-ship);\n  border: 1px solid var(--border);\n}\n\n.dragged {\n  background-color: var(--ship);\n  border: 1px solid var(--border);\n}\n\n.grid-1,\n.grid-2 {\n  grid-area: grids;\n  justify-self: center;\n  overflow: hidden;\n  width: 33.3em;\n  height: 33.3em;\n  display: flex;\n  flex-wrap: wrap;\n  background: var(--grid);\n  background-position-x: 50%;\n  background-position-y: 40%;\n  cursor: pointer;\n}\n\n[data-y='9'] {\n  border-right: 1px solid black;\n}\n\n[data-x='9'] {\n  border-bottom: 1px solid black;\n}\n\n.cell {\n  border-top: 1px solid black;\n  border-left: 1px solid black;\n  width: 10%;\n  height: 10%;\n}\n\n.off {\n  pointer-events: none;\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n", "",{"version":3,"sources":["webpack://./src/Style/main.css"],"names":[],"mappings":"AAEA;;;EAGE,sBAAsB;EACtB,UAAU;EACV,SAAS;AACX;;AAEA;EACE,eAAe;EACf,eAAe;EACf,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,kCAAkC;EAClC,aAAa;EACb,8BAA8B;EAC9B,6BAA6B;EAC7B;;qBAEmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,cAAc;EACd,yBAAyB;EACzB,+BAA+B;EAC/B,gCAAgC;EAChC,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,sBAAsB;AACxB;;AAEA;;EAEE,kBAAkB;EAClB,aAAa;EACb,2BAA2B;EAC3B;;WAES;AACX;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,SAAS;EACT,aAAa;AACf;;AAEA;EACE,gBAAgB;EAChB,cAAc;EACd,iCAAiC;EACjC,+BAA+B;EAC/B,YAAY;EACZ,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,uBAAuB;EACvB,uBAAuB;EACvB,iBAAiB;AACnB;;AAEA;EACE,4FAA4F;EAC5F,UAAU;EACV,oBAAoB;EACpB,WAAW;EACX,YAAY;AACd;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,iCAAiC;EACjC,+BAA+B;AACjC;;AAEA;EACE,6BAA6B;EAC7B,+BAA+B;AACjC;;AAEA;;EAEE,gBAAgB;EAChB,oBAAoB;EACpB,gBAAgB;EAChB,aAAa;EACb,cAAc;EACd,aAAa;EACb,eAAe;EACf,uBAAuB;EACvB,0BAA0B;EAC1B,0BAA0B;EAC1B,eAAe;AACjB;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,2BAA2B;EAC3B,4BAA4B;EAC5B,UAAU;EACV,WAAW;AACb;;AAEA;EACE,oBAAoB;EACpB,UAAU;EACV,QAAQ;EACR,SAAS;AACX","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Pirata+One&display=swap');\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n  padding: 0;\n  margin: 0;\n}\n\n:root {\n  --ship: #ca6702;\n  --grid: #0a9396;\n  --border: #ae2012;\n  --yet-ship: #e9d8a6;\n}\n\nbody {\n  width: 100vw;\n  height: 100vh;\n  font-family: 'Pirata One', cursive;\n  display: grid;\n  grid-template-columns: 50% 50%;\n  grid-template-rows: 4rem auto;\n  grid-template-areas:\n    'header header'\n    'player1 player2';\n}\n\nheader {\n  grid-area: header;\n  height: 3.7rem;\n  background-color: #005f73;\n  border-bottom-left-radius: 25px;\n  border-bottom-right-radius: 25px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.title {\n  font-size: 2.9rem;\n  letter-spacing: 0.5rem;\n}\n\n.player1-screen,\n.player2-screen {\n  grid-area: player1;\n  display: grid;\n  grid-template-rows: 25% 75%;\n  grid-template-areas:\n    'ships'\n    'grids';\n}\n\n.player2-screen {\n  grid-area: player2;\n}\n\n.ships-div1 {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n  padding: 10px;\n}\n\n.ship {\n  grid-area: ships;\n  height: 3.33em;\n  background-color: var(--yet-ship);\n  border: 1px solid var(--border);\n  cursor: grab;\n  display: flex;\n  align-items: center;\n}\n\n.ship.vertical {\n  align-items: flex-start;\n  justify-content: center;\n  padding-top: 10px;\n}\n\n.reverse-img {\n  filter: invert(77%) sepia(2%) saturate(24%) hue-rotate(320deg) brightness(88%) contrast(92%);\n  opacity: 0;\n  pointer-events: none;\n  width: 18px;\n  height: 18px;\n}\n\n.cell > .ship:hover > .reverse-img {\n  opacity: 1;\n}\n\n.dragover {\n  background-color: var(--yet-ship);\n  border: 1px solid var(--border);\n}\n\n.dragged {\n  background-color: var(--ship);\n  border: 1px solid var(--border);\n}\n\n.grid-1,\n.grid-2 {\n  grid-area: grids;\n  justify-self: center;\n  overflow: hidden;\n  width: 33.3em;\n  height: 33.3em;\n  display: flex;\n  flex-wrap: wrap;\n  background: var(--grid);\n  background-position-x: 50%;\n  background-position-y: 40%;\n  cursor: pointer;\n}\n\n[data-y='9'] {\n  border-right: 1px solid black;\n}\n\n[data-x='9'] {\n  border-bottom: 1px solid black;\n}\n\n.cell {\n  border-top: 1px solid black;\n  border-left: 1px solid black;\n  width: 10%;\n  height: 10%;\n}\n\n.off {\n  pointer-events: none;\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.id, ".place-overlay {\n  position: absolute;\n  background-color: white;\n  z-index: 5;\n  pointer-events: all;\n  right: 0%;\n  top: 8%;\n  left: 50%;\n  bottom: 0%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.shift-overlay {\n  background-color: #ae2012;\n  width: 8rem;\n  height: 3rem;\n  border-radius: 25px;\n  border: none;\n  cursor: pointer;\n  font-family: inherit;\n  font-size: 1.5rem;\n}\n\n.place-overlay.nd {\n  left: 0%;\n  right: 50%;\n}\n\n.shift-overlay:hover {\n  background-color: #9b2226;\n}\n\n.shift-overlay:active {\n  background-color: #ca6702;\n}\n", "",{"version":3,"sources":["webpack://./src/Style/place-ships.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,SAAS;EACT,OAAO;EACP,SAAS;EACT,UAAU;EACV,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,yBAAyB;EACzB,WAAW;EACX,YAAY;EACZ,mBAAmB;EACnB,YAAY;EACZ,eAAe;EACf,oBAAoB;EACpB,iBAAiB;AACnB;;AAEA;EACE,QAAQ;EACR,UAAU;AACZ;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B","sourcesContent":[".place-overlay {\n  position: absolute;\n  background-color: white;\n  z-index: 5;\n  pointer-events: all;\n  right: 0%;\n  top: 8%;\n  left: 50%;\n  bottom: 0%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.shift-overlay {\n  background-color: #ae2012;\n  width: 8rem;\n  height: 3rem;\n  border-radius: 25px;\n  border: none;\n  cursor: pointer;\n  font-family: inherit;\n  font-size: 1.5rem;\n}\n\n.place-overlay.nd {\n  left: 0%;\n  right: 50%;\n}\n\n.shift-overlay:hover {\n  background-color: #9b2226;\n}\n\n.shift-overlay:active {\n  background-color: #ca6702;\n}\n"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.id, ".start-body {\n  grid-column-end: 3;\n  grid-column-start: 1;\n  background-color: #e9d8a6;\n  width: 95%;\n  height: 95%;\n  border-radius: 25px;\n  justify-self: center;\n  align-self: center;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 10%;\n  padding-bottom: 10%;\n}\n\n.start-pvp,\n.start-pvc {\n  font-family: inherit;\n  font-size: 1.5rem;\n  background-color: #ae2012;\n  border: none;\n  box-shadow: 2px 2px 6px 1px #9b2226;\n  padding: 25px;\n  width: 30rem;\n  cursor: pointer;\n}\n\n.start-pvc:hover,\n.start-pvp:hover {\n  background-color: #9b2226;\n}\n\n.start-pvp:active,\n.start-pvc:active {\n  background-color: #ca6702;\n}\n", "",{"version":3,"sources":["webpack://./src/Style/start-screen.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,oBAAoB;EACpB,yBAAyB;EACzB,UAAU;EACV,WAAW;EACX,mBAAmB;EACnB,oBAAoB;EACpB,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,QAAQ;EACR,mBAAmB;AACrB;;AAEA;;EAEE,oBAAoB;EACpB,iBAAiB;EACjB,yBAAyB;EACzB,YAAY;EACZ,mCAAmC;EACnC,aAAa;EACb,YAAY;EACZ,eAAe;AACjB;;AAEA;;EAEE,yBAAyB;AAC3B;;AAEA;;EAEE,yBAAyB;AAC3B","sourcesContent":[".start-body {\n  grid-column-end: 3;\n  grid-column-start: 1;\n  background-color: #e9d8a6;\n  width: 95%;\n  height: 95%;\n  border-radius: 25px;\n  justify-self: center;\n  align-self: center;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 10%;\n  padding-bottom: 10%;\n}\n\n.start-pvp,\n.start-pvc {\n  font-family: inherit;\n  font-size: 1.5rem;\n  background-color: #ae2012;\n  border: none;\n  box-shadow: 2px 2px 6px 1px #9b2226;\n  padding: 25px;\n  width: 30rem;\n  cursor: pointer;\n}\n\n.start-pvc:hover,\n.start-pvp:hover {\n  background-color: #9b2226;\n}\n\n.start-pvp:active,\n.start-pvc:active {\n  background-color: #ca6702;\n}\n"],"sourceRoot":""}]);
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
/* harmony import */ var _Screens_scripts_placeShipsScreen__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Screens-scripts/placeShipsScreen */ "./src/Screens-scripts/placeShipsScreen.js");
/* harmony import */ var _Factories_gameboardFactory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Factories/gameboardFactory */ "./src/Factories/gameboardFactory.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* harmony import */ var _Factories_player__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Factories/player */ "./src/Factories/player.js");
/* harmony import */ var _gameLogic__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./gameLogic */ "./src/gameLogic.js");











var start = (0,_Screens_scripts_startMenu__WEBPACK_IMPORTED_MODULE_5__.startScreen)();
var body = document.querySelector('body');
var startBody = document.querySelector('.start-body');
start.pvp.addEventListener('click', function () {
  body.removeChild(startBody);
  (0,_Screens_scripts_placeShipsScreen__WEBPACK_IMPORTED_MODULE_6__.placeShipsScreen)();
  var DOM = (0,_DOM__WEBPACK_IMPORTED_MODULE_8__.createDOM)();
  DOM.createGridCells();
  var player1Screen = document.querySelector('.player1-screen');
  var player2Screen = document.querySelector('.player2-screen');
  var grid1 = document.querySelector('.grid-1');
  var grid2 = document.querySelector('.grid-2');
  DOM.createShips(player1Screen);
  DOM.createShips(player2Screen);
  (0,_DOM__WEBPACK_IMPORTED_MODULE_8__.manipulateDOM)(grid1);
  (0,_DOM__WEBPACK_IMPORTED_MODULE_8__.manipulateDOM)(grid2);
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQSxJQUFNRSxLQUFLLEdBQUdQLHVFQUFXLEVBQXpCO0FBQ0EsSUFBTXpHLElBQUksR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLE1BQXZCLENBQWI7QUFDQSxJQUFNK0csU0FBUyxHQUFHaEgsUUFBUSxDQUFDQyxhQUFULENBQXVCLGFBQXZCLENBQWxCO0FBRUE4RyxLQUFLLENBQUNMLEdBQU4sQ0FBVXJFLGdCQUFWLENBQTJCLE9BQTNCLEVBQW9DLFlBQU07QUFDeEN0QyxFQUFBQSxJQUFJLENBQUNrSCxXQUFMLENBQWlCRCxTQUFqQjtBQUNBYixFQUFBQSxtRkFBZ0I7QUFDaEIsTUFBTWUsR0FBRyxHQUFHcEgsK0NBQVMsRUFBckI7QUFDQW9ILEVBQUFBLEdBQUcsQ0FBQ3ZGLGVBQUo7QUFDQSxNQUFNd0YsYUFBYSxHQUFHbkgsUUFBUSxDQUFDQyxhQUFULENBQXVCLGlCQUF2QixDQUF0QjtBQUNBLE1BQU1tSCxhQUFhLEdBQUdwSCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsaUJBQXZCLENBQXRCO0FBQ0EsTUFBTUMsS0FBSyxHQUFHRixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBZDtBQUNBLE1BQU1HLEtBQUssR0FBR0osUUFBUSxDQUFDQyxhQUFULENBQXVCLFNBQXZCLENBQWQ7QUFDQWlILEVBQUFBLEdBQUcsQ0FBQ3RHLFdBQUosQ0FBZ0J1RyxhQUFoQjtBQUNBRCxFQUFBQSxHQUFHLENBQUN0RyxXQUFKLENBQWdCd0csYUFBaEI7QUFDQXJGLEVBQUFBLG1EQUFhLENBQUM3QixLQUFELENBQWI7QUFDQTZCLEVBQUFBLG1EQUFhLENBQUMzQixLQUFELENBQWI7QUFDRCxDQWJELEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0ZhY3Rvcmllcy9nYW1lYm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvRmFjdG9yaWVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0ZhY3Rvcmllcy9zaGlwRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL1NjcmVlbnMtc2NyaXB0cy9wbGFjZVNoaXBzU2NyZWVuLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvU2NyZWVucy1zY3JpcHRzL3N0YXJ0TWVudS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVMb2dpYy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL1N0eWxlL2dhbWUtb3Zlci5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9TdHlsZS9nYW1lLXJ1bm5pbmcuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvU3R5bGUvbWFpbi5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9TdHlsZS9wbGFjZS1zaGlwcy5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9TdHlsZS9zdGFydC1zY3JlZW4uY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL1N0eWxlL2dhbWUtb3Zlci5jc3M/MzhlOCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL1N0eWxlL2dhbWUtcnVubmluZy5jc3M/NDhkMyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL1N0eWxlL21haW4uY3NzP2EwOWUiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9TdHlsZS9wbGFjZS1zaGlwcy5jc3M/ZTEzYyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL1N0eWxlL3N0YXJ0LXNjcmVlbi5jc3M/NjhhOCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJldmVyc2UgZnJvbSAnLi9hc3NldHMvcmV2ZXJzZS5wbmcnO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRE9NID0gKCkgPT4ge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICBjb25zdCBncmlkMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBncmlkMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBncmlkMS5kYXRhc2V0LmdyaWQgPSAnMSc7XG4gIGdyaWQyLmRhdGFzZXQuZ3JpZCA9ICcyJztcbiAgY29uc3QgcGxheWVyMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBwbGF5ZXIyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGJvZHkuYXBwZW5kQ2hpbGQocGxheWVyMSkuY2xhc3NMaXN0LmFkZCgncGxheWVyMS1zY3JlZW4nKTtcbiAgYm9keS5hcHBlbmRDaGlsZChwbGF5ZXIyKS5jbGFzc0xpc3QuYWRkKCdwbGF5ZXIyLXNjcmVlbicpO1xuICBwbGF5ZXIxLmFwcGVuZENoaWxkKGdyaWQxKS5jbGFzc0xpc3QuYWRkKCdncmlkLTEnKTtcbiAgcGxheWVyMi5hcHBlbmRDaGlsZChncmlkMikuY2xhc3NMaXN0LmFkZCgnZ3JpZC0yJyk7XG5cbiAgLy9DcmVhdGVzIGJvdGggZ3JpZHMgZm9yIHRoZSBwbGF5ZXJzXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoaXBzKHBsYXllclNjcmVlbikge1xuICAgIGNvbnN0IHNoaXBzRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBsZXQgbWFueVNoaXBzID0gMDtcbiAgICBsZXQgbGVuZ3RoID0gNDtcblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDEwOyBpKyspIHtcbiAgICAgIGlmIChtYW55U2hpcHMgKyBsZW5ndGggPD0gNCkge1xuICAgICAgICBtYW55U2hpcHMgPSBtYW55U2hpcHMgKyAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFueVNoaXBzID0gMTtcbiAgICAgICAgbGVuZ3RoID0gbGVuZ3RoIC0gMTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJldmVyc2VJdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgcmV2ZXJzZUl0LnNyYyA9IHJldmVyc2U7XG4gICAgICBjb25zdCBzaGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBzaGlwLmRyYWdnYWJsZSA9ICd0cnVlJztcbiAgICAgIHNoaXAuZGF0YXNldC5sZW5ndGggPSBsZW5ndGg7XG4gICAgICBzaGlwLmRhdGFzZXQuaW5kZXggPSBpO1xuICAgICAgbGV0IHdpZHRoID0gNTMuMjcgKiBsZW5ndGg7XG4gICAgICB3aWR0aCA9IHdpZHRoLnRvRml4ZWQoMik7XG4gICAgICBzaGlwLnN0eWxlLmNzc1RleHQgPSBgd2lkdGg6JHt3aWR0aH1weDtgO1xuXG4gICAgICBzaGlwLmFwcGVuZENoaWxkKHJldmVyc2VJdCkuY2xhc3NMaXN0LmFkZCgncmV2ZXJzZS1pbWcnKTtcbiAgICAgIHNoaXBzRGl2LmFwcGVuZENoaWxkKHNoaXApLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICB9XG5cbiAgICBwbGF5ZXJTY3JlZW4uYXBwZW5kQ2hpbGQoc2hpcHNEaXYpLmNsYXNzTGlzdC5hZGQoJ3NoaXBzLWRpdjEnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUdyaWRDZWxscygpIHtcbiAgICBsZXQgeCA9IDA7XG4gICAgbGV0IHkgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZ3JpZDEuYXBwZW5kQ2hpbGQoY2VsbCkuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xuICAgICAgaWYgKHkgPT09IDEwKSB7XG4gICAgICB9XG4gICAgICBjZWxsLmRhdGFzZXQueCA9IHg7XG4gICAgICBjZWxsLmRhdGFzZXQueSA9IHk7XG4gICAgICB5ID0geSArIDE7XG4gICAgICBpZiAoeSA9PT0gMTApIHtcbiAgICAgICAgeSA9IDA7XG4gICAgICAgIHggPSB4ICsgMTtcbiAgICAgIH1cbiAgICB9XG4gICAgeCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZ3JpZDIuYXBwZW5kQ2hpbGQoY2VsbCkuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xuICAgICAgaWYgKHkgPT09IDEwKSB7XG4gICAgICB9XG4gICAgICBjZWxsLmRhdGFzZXQueCA9IHg7XG4gICAgICBjZWxsLmRhdGFzZXQueSA9IHk7XG4gICAgICB5ID0geSArIDE7XG4gICAgICBpZiAoeSA9PT0gMTApIHtcbiAgICAgICAgeSA9IDA7XG4gICAgICAgIHggPSB4ICsgMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBjcmVhdGVHcmlkQ2VsbHMsIGNyZWF0ZVNoaXBzIH07XG59O1xuXG4vL0RPTSBNYW5pcHVsYXRpb25cbmV4cG9ydCBjb25zdCBtYW5pcHVsYXRlRE9NID0gKGdyaWQpID0+IHtcbiAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hpcCcpO1xuICBsZXQgZHJhZ2dlZDtcbiAgY29uc3QgaW5pdGlhbENvb3JkaW5hdGVzID0gW107XG5cbiAgLy9BZGRpbmcgZXZlbnRzIGZvciB0aGUgc2hpcHMgd2hlbiB0aGUgZHJhZyBzdGFydHMgYW5kIGVuZHMgYW5kIGFsc28gYSBjbGljayBvbmUgdGhhdCB3aWxsIGNoYW5nZSB0aGUgZGlyZWN0aW9uIGl0IGdvZXNcbiAgLy9cIm9yaXpvbnRhXCIgb3IgXCJ2ZXJ0aWNhbFwiXG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWcnLCAoZSkgPT4ge1xuICAgICAgZS50YXJnZXQuc3R5bGUub3BhY2l0eSA9ICcwLjMnO1xuICAgIH0pO1xuXG4gICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZSkgPT4ge1xuICAgICAgc3RvcmVJbml0YWxDb29yZGluYXRlcyhlKTtcbiAgICAgIGRyYWdnZWQgPSBlLnRhcmdldDtcbiAgICB9KTtcblxuICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIChlKSA9PiB7XG4gICAgICBlLnRhcmdldC5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgIH0pO1xuXG4gICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBpZiAoIWUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxsJykpIHJldHVybjtcbiAgICAgIHN0b3JlSW5pdGFsQ29vcmRpbmF0ZXMoZSk7XG4gICAgICBkcmFnZ2VkID0gZS50YXJnZXQ7XG4gICAgICBpZiAoY2hlY2tWYWxpZERyb3AoZSwgJ2NsaWNrJykpIHJldHVybjtcbiAgICAgIGlmIChjaGVja05lYXJDZWxscyhlLCAnY2xpY2snKSkgcmV0dXJuO1xuICAgICAgc2hpcC5jbGFzc0xpc3QudG9nZ2xlKCd2ZXJ0aWNhbCcpO1xuICAgICAgcmVtb3ZlQnVzeVN0YXRlKGUsICdjbGljaycpO1xuICAgICAgaWYgKHNoaXAuY2xhc3NMaXN0LmNvbnRhaW5zKCd2ZXJ0aWNhbCcpKSB7XG4gICAgICAgIGxldCBib2R5ID0gNTMuMjcgKiBlLnRhcmdldC5kYXRhc2V0Lmxlbmd0aDtcbiAgICAgICAgYm9keSA9IGJvZHkudG9GaXhlZCgyKTtcbiAgICAgICAgc2hpcC5zdHlsZS5jc3NUZXh0ID0gYGhlaWdodDoke2JvZHl9cHg7IHdpZHRoOjUzLjI3cHg7YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBib2R5ID0gNTMuMjcgKiBlLnRhcmdldC5kYXRhc2V0Lmxlbmd0aDtcbiAgICAgICAgYm9keSA9IGJvZHkudG9GaXhlZCgyKTtcbiAgICAgICAgc2hpcC5zdHlsZS5jc3NUZXh0ID0gYHdpZHRoOiR7Ym9keX1weDsgaGVpZ2h0OjUzLjI3cHg7YDtcbiAgICAgIH1cbiAgICAgIGFkZFNoaXBzVG9DZWxscyhlLCAnY2xpY2snKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgY29uc29sZS5sb2coZ3JpZCk7XG4gIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgKGUpID0+IHt9KTtcblxuICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgbGVuZ3RoID0gZHJhZ2dlZC5kYXRhc2V0Lmxlbmd0aDtcbiAgICBsZXQgeCA9IGUudGFyZ2V0LmRhdGFzZXQueDtcbiAgICBsZXQgeSA9IGUudGFyZ2V0LmRhdGFzZXQueTtcbiAgICB4ID0gcGFyc2VJbnQoeCk7XG4gICAgeSA9IHBhcnNlSW50KHkpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXg9JyR7eH0nXVtkYXRhLXk9JyR7eX0nXWApO1xuICAgICAgaWYgKGRyYWdnZWQuY2xhc3NMaXN0LmNvbnRhaW5zKCd2ZXJ0aWNhbCcpKSB7XG4gICAgICAgIHggPSB4ICsgMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHkgPSB5ICsgMTtcbiAgICAgIH1cbiAgICAgIGlmIChjZWxsICE9PSBudWxsKSBjZWxsLmNsYXNzTGlzdC5hZGQoJ2RyYWdvdmVyJyk7XG4gICAgfVxuICB9KTtcblxuICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIChlKSA9PiB7XG4gICAgY29uc3QgbGVhdmVkQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcmFnb3ZlcicpO1xuICAgIGxlYXZlZENlbGwuZm9yRWFjaCgobGVhdmVkKSA9PiB7XG4gICAgICBsZWF2ZWQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ292ZXInKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgbGVhdmVkQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcmFnb3ZlcicpO1xuICAgIGxlYXZlZENlbGwuZm9yRWFjaCgobGVhdmVkKSA9PiB7XG4gICAgICBsZWF2ZWQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ292ZXInKTtcbiAgICB9KTtcblxuICAgIGlmIChjaGVja1ZhbGlkRHJvcChlKSkgcmV0dXJuO1xuICAgIGlmIChjaGVja05lYXJDZWxscyhlKSkgcmV0dXJuO1xuICAgIHJlbW92ZUJ1c3lTdGF0ZShlKTtcbiAgICBhZGRTaGlwc1RvQ2VsbHMoZSk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGFkZFNoaXBzVG9DZWxscyhlLCBhY3Rpb24pIHtcbiAgICBsZXQgeDtcbiAgICBsZXQgeTtcblxuICAgIGRyYWdnZWQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dlZCcpO1xuICAgIGlmICghZS50YXJnZXQuY29udGFpbnMoZHJhZ2dlZCkpIHtcbiAgICAgIGUudGFyZ2V0LmFwcGVuZENoaWxkKGRyYWdnZWQpO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uID09PSAnY2xpY2snKSB7XG4gICAgICB4ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0Lng7XG4gICAgICB5ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0Lnk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHggPSBlLnRhcmdldC5kYXRhc2V0Lng7XG4gICAgICB5ID0gZS50YXJnZXQuZGF0YXNldC55O1xuICAgIH1cbiAgICB4ID0gcGFyc2VJbnQoeCk7XG4gICAgeSA9IHBhcnNlSW50KHkpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZHJhZ2dlZC5kYXRhc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteD0nJHt4fSddW2RhdGEteT0nJHt5fSddYCk7XG5cbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnYnVzeScpO1xuICAgICAgaWYgKGRyYWdnZWQuY2xhc3NMaXN0LmNvbnRhaW5zKCd2ZXJ0aWNhbCcpKSB7XG4gICAgICAgIHggPSB4ICsgMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHkgPSB5ICsgMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdG9yZUluaXRhbENvb3JkaW5hdGVzKGUpIHtcbiAgICBpbml0aWFsQ29vcmRpbmF0ZXMuc3BsaWNlKDAsIGluaXRpYWxDb29yZGluYXRlcy5sZW5ndGgpO1xuICAgIGRyYWdnZWQgPSBlLnRhcmdldDtcbiAgICBpZiAoZHJhZ2dlZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnY2VsbCcpKSB7XG4gICAgICBjb25zdCBsZW5ndGggPSBkcmFnZ2VkLmRhdGFzZXQubGVuZ3RoO1xuICAgICAgbGV0IHggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQueDtcbiAgICAgIGxldCB5ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0Lnk7XG4gICAgICB4ID0gcGFyc2VJbnQoeCk7XG4gICAgICB5ID0gcGFyc2VJbnQoeSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaW5pdGlhbENvb3JkaW5hdGVzLnB1c2goeyB4LCB5IH0pO1xuICAgICAgICBpZiAoZHJhZ2dlZC5jbGFzc0xpc3QuY29udGFpbnMoJ3ZlcnRpY2FsJykpIHtcbiAgICAgICAgICB4ID0geCArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgeSA9IHkgKyAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy9DaGVja3MgaWYgdGhlcmUgaXMgYSBzaGlwIGFscmVhZHkgb24gYW55IGNlbGwgb3IgaWYgaXQgZG9lcyBub3QgZml0IGluIHRoZSBncmlkIGFuZCBjYW5jZWxzIHRoZSBhY3Rpb24gaWYgdHJ1ZVxuICBmdW5jdGlvbiBjaGVja1ZhbGlkRHJvcChlLCBhY3Rpb24pIHtcbiAgICBjb25zdCBsZW5ndGggPSBkcmFnZ2VkLmRhdGFzZXQubGVuZ3RoO1xuICAgIGxldCB4O1xuICAgIGxldCB5O1xuXG4gICAgaWYgKGFjdGlvbiA9PT0gJ2NsaWNrJykge1xuICAgICAgeCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC54O1xuICAgICAgeSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC55O1xuICAgIH0gZWxzZSB7XG4gICAgICB4ID0gZS50YXJnZXQuZGF0YXNldC54O1xuICAgICAgeSA9IGUudGFyZ2V0LmRhdGFzZXQueTtcbiAgICB9XG4gICAgeSA9IHBhcnNlSW50KHkpO1xuICAgIHggPSBwYXJzZUludCh4KTtcbiAgICBsZXQgY2hlY2sgPSBmYWxzZTtcbiAgICBjb25zdCBmaXJzdENlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14PScke3h9J11bZGF0YS15PScke3l9J11gKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGluaXRpYWxDb29yZGluYXRlcy5mb3JFYWNoKCh4eSkgPT4ge1xuICAgICAgICBpZiAoeHkueCA9PT0geCAmJiB4eS55ID09PSB5KSByZXR1cm47XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14PScke3h9J11bZGF0YS15PScke3l9J11gKTtcbiAgICAgIGxldCBjdXJyZW50Q2VsbDtcbiAgICAgIGlmIChkcmFnZ2VkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxsJykgJiYgaW5pdGlhbENvb3JkaW5hdGVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBjdXJyZW50Q2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXg9JyR7aW5pdGlhbENvb3JkaW5hdGVzW2ldLnh9J11bZGF0YS15PScke2luaXRpYWxDb29yZGluYXRlc1tpXS55fSddYCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkcmFnZ2VkLmNsYXNzTGlzdC5jb250YWlucygndmVydGljYWwnKSkge1xuICAgICAgICBpZiAoYWN0aW9uID09PSAnY2xpY2snKSB7XG4gICAgICAgICAgeSA9IHkgKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHggPSB4ICsgMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2NsaWNrJykge1xuICAgICAgICAgIHggPSB4ICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB5ID0geSArIDE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IHRoZUNlbGw7XG4gICAgICBpZiAoYWN0aW9uID09PSAnY2xpY2snKSB7XG4gICAgICAgIGlmIChjZWxsICE9PSBmaXJzdENlbGwpIHtcbiAgICAgICAgICB0aGVDZWxsID0gY2VsbDtcblxuICAgICAgICAgIGlmIChjZWxsID09PSBudWxsIHx8IHRoZUNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdidXN5JykpIHtcbiAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY2VsbCA9PT0gbnVsbCB8fCAoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2J1c3knKSAmJiB0aGVDZWxsICE9PSBjZWxsKSkge1xuICAgICAgICBpZiAoY3VycmVudENlbGwgPT09IGNlbGwpIHJldHVybjtcblxuICAgICAgICBjaGVjayA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoZWNrO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlQnVzeVN0YXRlKGUsIGFjdGlvbikge1xuICAgIGlmIChhY3Rpb24gPT09ICdjbGljaycpIHtcbiAgICAgIGxldCB4ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0Lng7XG4gICAgICBsZXQgeSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC55O1xuICAgICAgeSA9IHBhcnNlSW50KHkpO1xuICAgICAgeCA9IHBhcnNlSW50KHgpO1xuICAgICAgY29uc3QgbGVuZ3RoID0gZHJhZ2dlZC5kYXRhc2V0Lmxlbmd0aDtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteD0nJHt4fSddW2RhdGEteT0nJHt5fSddYCk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnYnVzeScpO1xuICAgICAgICBpZiAoZHJhZ2dlZC5jbGFzc0xpc3QuY29udGFpbnMoJ3ZlcnRpY2FsJykpIHtcbiAgICAgICAgICB5ID0geSArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgeCA9IHggKyAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGluaXRpYWxDb29yZGluYXRlcy5mb3JFYWNoKCh4eSkgPT4ge1xuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteD0nJHt4eS54fSddW2RhdGEteT0nJHt4eS55fSddYCk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnYnVzeScpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ2hlY2sgaWYgdGhlIG5lYXJieSBjZWxscyBhcmUgYWxyZWFkeSBvY3VwcGllZCBzbyAyIHNoaXBzIGNhbiBub3QgYmUgcGxhY2VkIHJpZ2h0IG5leHQgdG8gZWFjaCBvdGhlclxuICBmdW5jdGlvbiBjaGVja05lYXJDZWxscyhlLCBhY3Rpb24pIHtcbiAgICBjb25zdCBsZW5ndGggPSBkcmFnZ2VkLmRhdGFzZXQubGVuZ3RoO1xuICAgIGxldCB4O1xuICAgIGxldCB5O1xuICAgIGxldCBidXN5ID0gZmFsc2U7XG4gICAgaWYgKGFjdGlvbiA9PT0gJ2NsaWNrJykge1xuICAgICAgeCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC54O1xuICAgICAgeSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC55O1xuICAgIH0gZWxzZSB7XG4gICAgICB4ID0gZS50YXJnZXQuZGF0YXNldC54O1xuICAgICAgeSA9IGUudGFyZ2V0LmRhdGFzZXQueTtcbiAgICB9XG5cbiAgICB5ID0gcGFyc2VJbnQoeSk7XG4gICAgeCA9IHBhcnNlSW50KHgpO1xuICAgIGNvbnN0IG9jY3VwaWVkQ2VsbHMgPSBbXTtcbiAgICBjb25zdCBhZGRYID0gWy0xLCAwLCAxXTtcbiAgICBjb25zdCBhZGRZID0gWy0xLCAwLCAxXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIG9jY3VwaWVkQ2VsbHMucHVzaCh7IHgsIHkgfSk7XG5cbiAgICAgIGlmIChkcmFnZ2VkLmNsYXNzTGlzdC5jb250YWlucygndmVydGljYWwnKSkge1xuICAgICAgICBpZiAoYWN0aW9uID09PSAnY2xpY2snKSB7XG4gICAgICAgICAgeSA9IHkgKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHggPSB4ICsgMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2NsaWNrJykge1xuICAgICAgICAgIHggPSB4ICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB5ID0geSArIDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBvY2N1cGllZENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGxldCB5ID0gY2VsbC55O1xuICAgICAgbGV0IHggPSBjZWxsLng7XG4gICAgICB4ID0gcGFyc2VJbnQoeCk7XG4gICAgICB5ID0gcGFyc2VJbnQoeSk7XG5cbiAgICAgIGFkZFguZm9yRWFjaCgoYWR4KSA9PiB7XG4gICAgICAgIGxldCBudW1YID0geCArIGFkeDtcbiAgICAgICAgaWYgKG51bVggPCAwIHx8IG51bVggPiA5KSBudW1YID0geDtcblxuICAgICAgICBhZGRZLmZvckVhY2goKGFkeSkgPT4ge1xuICAgICAgICAgIGxldCBudW1ZID0geSArIGFkeTtcbiAgICAgICAgICBpZiAobnVtWSA8IDAgfHwgbnVtWSA+IDkpIG51bVkgPSB5O1xuICAgICAgICAgIGxldCBjaGVja2VyID0gZmFsc2U7XG4gICAgICAgICAgb2NjdXBpZWRDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICBpZiAobnVtWCA9PT0gY2VsbC54ICYmIG51bVkgPT09IGNlbGwueSkgcmV0dXJuIChjaGVja2VyID0gdHJ1ZSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoY2hlY2tlciA9PT0gdHJ1ZSkgcmV0dXJuO1xuICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14PScke251bVh9J11bZGF0YS15PScke251bVl9J11gKTtcblxuICAgICAgICAgIGNvbnN0IGlzWW91cnMgPSBpbml0aWFsQ29vcmRpbmF0ZXMuZmluZCgoeHkpID0+IHtcbiAgICAgICAgICAgIGlmICh4eS54ID09PSBudW1YICYmIHh5LnkgPT09IG51bVkpIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdidXN5JykgJiYgIWlzWW91cnMpIGJ1c3kgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBidXN5O1xuICB9XG5cbiAgZnVuY3Rpb24gc2F2ZVNoaXBzUG9zaXRpb24oKSB7fVxuXG4gIHJldHVybiB7IHNhdmVTaGlwc1Bvc2l0aW9uIH07XG59O1xuIiwiaW1wb3J0IHsgc2hpcEZhY3RvcnkgfSBmcm9tICcuL3NoaXBGYWN0b3J5JztcblxuZXhwb3J0IGNvbnN0IGdhbWVib2FyZEZhY3RvcnkgPSAoKSA9PiB7XG4gIGNvbnN0IHNoaXBzQXJyYXkgPSBbXTtcbiAgY29uc3Qgd3JlY2tlZFNoaXBzID0gW107XG5cbiAgLy9TYXZlcyBhbGwgY29vcmRpbmF0ZXMgc28gdGhlIGdhbWVib2FyZCBjYW4ga2VlcCB0cmFjayBvZiBhbGwgdGhlIG1pc3Nlc1xuICBjb25zdCBhbGxDb29yZGluYXRlcyA9IFtdO1xuICAoZnVuY3Rpb24gY3JlYXRlQ29vcmRpbmF0ZXMoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgaWYgKGkgPCAxMCkge1xuICAgICAgICBpID0gJzAnICsgaTtcbiAgICAgIH1cbiAgICAgIGFsbENvb3JkaW5hdGVzLnB1c2goaSk7XG4gICAgfVxuICB9KSgpO1xuXG4gIC8vUGxhY2VzIGEgbmV3IHNoaXAgYXQgY2hvb3NlbiBjb29yZGluYXRlc1xuICAvL1RoaXMgaXMgcmVkdW5kYW50LCB5b3UgYXJlIGdvaW5nIHRvIHBsYWNlIHNoaXBzIGluIGEgZGlmZXJyZW50IHdheSwgYWZ0ZXIgdGhlIHVzZXIgY2xpY2sgc3RhcnQgd2hlbiBoZSBmaW5pc2hlcyBhZGRpbmcgdGhlIHNoaXBzLCB0aGVuIGZvciBlYWNoIHNoaXBcbiAgLy95b3UgdGFrZXMgaXQncyBjb29yZGluYXRlcyBhbmQgdGhlbiBjcmVhdGUgdGhlIHNoaXBzIGJhc2VkIG9uIGVhY2ggY29vcmRpbmF0ZSwgeW91IHdpbGwgaGF2ZSB0byByZWZhY3RvciB0aGUgcmVjZWl2ZUF0dGFjayBhcyB3ZWxsXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcHMoeCwgeSwgZGlyZWN0aW9uKSB7XG4gICAgeCA9IHBhcnNlSW50KHgpO1xuICAgIHkgPSBwYXJzZUludCh5KTtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IFtdO1xuICAgIGlmIChkaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGluZGV4OyBpKyspIHtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaCh7IHgsIHkgfSk7XG4gICAgICAgIHggPSB4ICsgMTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ29yaXpvbnRhbCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGluZGV4OyBpKyspIHtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaCh7IHgsIHkgfSk7XG4gICAgICAgIHkgPSB5ICsgMTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc2hpcCA9IHNoaXBGYWN0b3J5KGluZGV4KTtcblxuICAgIHNoaXBzQXJyYXkucHVzaCh7IHNoaXAsIGNvb3JkaW5hdGVzIH0pO1xuXG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzO1xuICB9XG5cbiAgLy9DaGVja3MgaWYgdGhlIHRoZSBzZWxlY3RlZCBjb29yZGluYXRlcyBhcmUgb2NjdXBpZWQgYnkgYSBzaGlwIG9yIG5vdCBhbmRcbiAgLy9jYWxscyB0aGUgaGl0IGZ1bmN0aW9uIG9uIHRoYXQgc3BlY2lmaWMgc2hpcCBvciBtYXJrcyB0aGUgbWlzcy5cbiAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayh4LCB5KSB7XG4gICAgeCA9IHBhcnNlSW50KHgpO1xuICAgIHkgPSBwYXJzZUludCh5KTtcbiAgICBjb25zdCBoaXRDb29yZGluYXRlcyA9IHggKyAnJyArIHk7XG4gICAgaWYgKGFsbENvb3JkaW5hdGVzW2hpdENvb3JkaW5hdGVzXSA9PT0gJ3gnKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgYWxsQ29vcmRpbmF0ZXMuc3BsaWNlKGhpdENvb3JkaW5hdGVzLCAxLCAneCcpO1xuXG4gICAgbGV0IHJldHVyblZhbHVlID0gJ21pc3MnO1xuICAgIHNoaXBzQXJyYXkuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgcmV0dXJuIHNoaXAuY29vcmRpbmF0ZXMuZmluZCgoY29vcmQpID0+IHtcbiAgICAgICAgaWYgKGNvb3JkLnggPT09IHggJiYgY29vcmQueSA9PT0geSkge1xuICAgICAgICAgIHJldHVyblZhbHVlID0gc2hpcC5zaGlwLmhpdCgpO1xuICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZSA9PT0gJ1NVTkshJykge1xuICAgICAgICAgICAgd3JlY2tlZFNoaXBzLnB1c2gocmV0dXJuVmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cblxuICAvL0NoZWNrcyB3ZXRoZXIgb3Igbm90IGFsbCB0aGUgc2hpcHMgaGF2ZSBiZWVuIHN1bmtcblxuICBmdW5jdGlvbiBhcmVBbGxTaGlwc1dyZWNrZWQoKSB7XG4gICAgaWYgKHdyZWNrZWRTaGlwcy5sZW5ndGggPT09IDEwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHsgc2hpcHNBcnJheSwgcGxhY2VTaGlwcywgcmVjZWl2ZUF0dGFjaywgYXJlQWxsU2hpcHNXcmVja2VkIH07XG59O1xuIiwiaW1wb3J0IHsgZ2FtZWJvYXJkRmFjdG9yeSB9IGZyb20gJy4vZ2FtZWJvYXJkRmFjdG9yeSc7XG5cbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIGdhbWVib2FyZCA9IGdhbWVib2FyZEZhY3RvcnkoKTtcblxuICBpc1R1cm4gPSBmYWxzZTtcblxuICBzdGFydFR1cm4oKSB7XG4gICAgcmV0dXJuICh0aGlzLmlzVHVybiA9IHRydWUpO1xuICB9XG5cbiAgZW5kVHVybigpIHtcbiAgICByZXR1cm4gKHRoaXMuaXNUdXJuID0gZmFsc2UpO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3Qgc2hpcEZhY3RvcnkgPSAobGVuKSA9PiB7XG4gIGNvbnN0IGxlbmd0aCA9IGxlbjtcbiAgY29uc3QgcG9zaXRpb25zQXJyYXkgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8PSBsZW5ndGg7IGkrKykge1xuICAgIHBvc2l0aW9uc0FycmF5LnB1c2goaSk7XG4gIH1cblxuICBsZXQgaSA9IDA7XG5cbiAgZnVuY3Rpb24gaGl0KCkge1xuICAgIHBvc2l0aW9uc0FycmF5LnNwbGljZShpLCAxLCAnaGl0Jyk7XG4gICAgY29uc29sZS5sb2cocG9zaXRpb25zQXJyYXkpO1xuXG4gICAgaWYgKGlzU3VuaygpKSB7XG4gICAgICByZXR1cm4gJ1NVTkshJztcbiAgICB9XG4gICAgaSsrO1xuICAgIHJldHVybiAnaGl0JztcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICByZXR1cm4gcG9zaXRpb25zQXJyYXkuZXZlcnkoKHBvc2l0aW9uKSA9PiB7XG4gICAgICByZXR1cm4gcG9zaXRpb24gPT09ICdoaXQnO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHsgbGVuZ3RoLCBoaXQgfTtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVET00sIG1hbmlwdWxhdGVET00gfSBmcm9tICcuLi9ET00nO1xuXG5leHBvcnQgY29uc3QgcGxhY2VTaGlwc1NjcmVlbiA9ICgpID0+IHtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBzaGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGNvbnN0IGZpbmlzaFBsYWNlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBzaGl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0RvbmUnO1xuXG4gIG92ZXJsYXkuYXBwZW5kQ2hpbGQoc2hpdEJ1dHRvbikuY2xhc3NMaXN0LmFkZCgnc2hpZnQtb3ZlcmxheScpO1xuICBib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkpLmNsYXNzTGlzdC5hZGQoJ3BsYWNlLW92ZXJsYXknKTtcblxuICBzaGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnbmQnKTtcbiAgfSk7XG59O1xuIiwiZXhwb3J0IGNvbnN0IHN0YXJ0U2NyZWVuID0gKCkgPT4ge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICBjb25zdCBtYWluQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBwdnAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgcHZwLnRleHRDb250ZW50ID0gJ1BsYXllciB2cyBQbGF5ZXInO1xuICBjb25zdCBwdmMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgcHZjLnRleHRDb250ZW50ID0gJ1BsYXllciB2cyBDb21wdXRlcic7XG5cbiAgbWFpbkJvZHkuYXBwZW5kQ2hpbGQocHZwKS5jbGFzc0xpc3QuYWRkKCdzdGFydC1wdnAnKTtcbiAgbWFpbkJvZHkuYXBwZW5kQ2hpbGQocHZjKS5jbGFzc0xpc3QuYWRkKCdzdGFydC1wdmMnKTtcbiAgYm9keS5hcHBlbmRDaGlsZChtYWluQm9keSkuY2xhc3NMaXN0LmFkZCgnc3RhcnQtYm9keScpO1xuXG4gIHJldHVybiB7IHB2cCwgcHZjIH07XG59O1xuIiwiaW1wb3J0IHsgbWFuaXB1bGF0ZURPTSB9IGZyb20gJy4vRE9NJztcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vRmFjdG9yaWVzL3BsYXllcic7XG5cbmV4cG9ydCBjb25zdCBnYW1lTG9naWMgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYXllcjEgPSBuZXcgUGxheWVyKCdZT1lPJyk7XG4gIGNvbnN0IHBsYXllcjIgPSBuZXcgUGxheWVyKCdYT1hPJyk7XG4gIC8vQ2hlY2tzIGVhY2ggYXR0YWNrIGlmIGFsbCB0aGUgc2hpcHMgaGF2ZSBiZWVuIHN1bmtcbiAgZnVuY3Rpb24gY2hlY2tGb3JXaW5uZXIoKSB7XG4gICAgaWYgKHBsYXllcjEuZ2FtZWJvYXJkLmFyZUFsbFNoaXBzV3JlY2tlZCgpID09PSB0cnVlKSB7XG4gICAgICBjb25zb2xlLmxvZygncGxheWVyMiBXT04hJyk7XG4gICAgfSBlbHNlIGlmIChwbGF5ZXIyLmdhbWVib2FyZC5hcmVBbGxTaGlwc1dyZWNrZWQoKSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc29sZS5sb2coJ3BsYXllcjEgV09OJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiB7IGNoZWNrRm9yV2lubmVyIH07XG59O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJcIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiXCIsXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJcIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiXCIsXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1QaXJhdGErT25lJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIiosXFxuKjo6YmVmb3JlLFxcbio6OmFmdGVyIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG46cm9vdCB7XFxuICAtLXNoaXA6ICNjYTY3MDI7XFxuICAtLWdyaWQ6ICMwYTkzOTY7XFxuICAtLWJvcmRlcjogI2FlMjAxMjtcXG4gIC0teWV0LXNoaXA6ICNlOWQ4YTY7XFxufVxcblxcbmJvZHkge1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGZvbnQtZmFtaWx5OiAnUGlyYXRhIE9uZScsIGN1cnNpdmU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA1MCUgNTAlO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiA0cmVtIGF1dG87XFxuICBncmlkLXRlbXBsYXRlLWFyZWFzOlxcbiAgICAnaGVhZGVyIGhlYWRlcidcXG4gICAgJ3BsYXllcjEgcGxheWVyMic7XFxufVxcblxcbmhlYWRlciB7XFxuICBncmlkLWFyZWE6IGhlYWRlcjtcXG4gIGhlaWdodDogMy43cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwNWY3MztcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDI1cHg7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMjVweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi50aXRsZSB7XFxuICBmb250LXNpemU6IDIuOXJlbTtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjVyZW07XFxufVxcblxcbi5wbGF5ZXIxLXNjcmVlbixcXG4ucGxheWVyMi1zY3JlZW4ge1xcbiAgZ3JpZC1hcmVhOiBwbGF5ZXIxO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMjUlIDc1JTtcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XFxuICAgICdzaGlwcydcXG4gICAgJ2dyaWRzJztcXG59XFxuXFxuLnBsYXllcjItc2NyZWVuIHtcXG4gIGdyaWQtYXJlYTogcGxheWVyMjtcXG59XFxuXFxuLnNoaXBzLWRpdjEge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGdhcDogMXJlbTtcXG4gIHBhZGRpbmc6IDEwcHg7XFxufVxcblxcbi5zaGlwIHtcXG4gIGdyaWQtYXJlYTogc2hpcHM7XFxuICBoZWlnaHQ6IDMuMzNlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXlldC1zaGlwKTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlcik7XFxuICBjdXJzb3I6IGdyYWI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnNoaXAudmVydGljYWwge1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHBhZGRpbmctdG9wOiAxMHB4O1xcbn1cXG5cXG4ucmV2ZXJzZS1pbWcge1xcbiAgZmlsdGVyOiBpbnZlcnQoNzclKSBzZXBpYSgyJSkgc2F0dXJhdGUoMjQlKSBodWUtcm90YXRlKDMyMGRlZykgYnJpZ2h0bmVzcyg4OCUpIGNvbnRyYXN0KDkyJSk7XFxuICBvcGFjaXR5OiAwO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICB3aWR0aDogMThweDtcXG4gIGhlaWdodDogMThweDtcXG59XFxuXFxuLmNlbGwgPiAuc2hpcDpob3ZlciA+IC5yZXZlcnNlLWltZyB7XFxuICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4uZHJhZ292ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0teWV0LXNoaXApO1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyKTtcXG59XFxuXFxuLmRyYWdnZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2hpcCk7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xcbn1cXG5cXG4uZ3JpZC0xLFxcbi5ncmlkLTIge1xcbiAgZ3JpZC1hcmVhOiBncmlkcztcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHdpZHRoOiAzMy4zZW07XFxuICBoZWlnaHQ6IDMzLjNlbTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1ncmlkKTtcXG4gIGJhY2tncm91bmQtcG9zaXRpb24teDogNTAlO1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbi15OiA0MCU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbltkYXRhLXk9JzknXSB7XFxuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuW2RhdGEteD0nOSddIHtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmNlbGwge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBibGFjaztcXG4gIHdpZHRoOiAxMCU7XFxuICBoZWlnaHQ6IDEwJTtcXG59XFxuXFxuLm9mZiB7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIG9wYWNpdHk6IDA7XFxuICB3aWR0aDogMDtcXG4gIGhlaWdodDogMDtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL1N0eWxlL21haW4uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUVBOzs7RUFHRSxzQkFBc0I7RUFDdEIsVUFBVTtFQUNWLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGVBQWU7RUFDZixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2Isa0NBQWtDO0VBQ2xDLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsNkJBQTZCO0VBQzdCOztxQkFFbUI7QUFDckI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsY0FBYztFQUNkLHlCQUF5QjtFQUN6QiwrQkFBK0I7RUFDL0IsZ0NBQWdDO0VBQ2hDLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLHNCQUFzQjtBQUN4Qjs7QUFFQTs7RUFFRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLDJCQUEyQjtFQUMzQjs7V0FFUztBQUNYOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGVBQWU7RUFDZixTQUFTO0VBQ1QsYUFBYTtBQUNmOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxpQ0FBaUM7RUFDakMsK0JBQStCO0VBQy9CLFlBQVk7RUFDWixhQUFhO0VBQ2IsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLHVCQUF1QjtFQUN2QixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSw0RkFBNEY7RUFDNUYsVUFBVTtFQUNWLG9CQUFvQjtFQUNwQixXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsVUFBVTtBQUNaOztBQUVBO0VBQ0UsaUNBQWlDO0VBQ2pDLCtCQUErQjtBQUNqQzs7QUFFQTtFQUNFLDZCQUE2QjtFQUM3QiwrQkFBK0I7QUFDakM7O0FBRUE7O0VBRUUsZ0JBQWdCO0VBQ2hCLG9CQUFvQjtFQUNwQixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLGNBQWM7RUFDZCxhQUFhO0VBQ2IsZUFBZTtFQUNmLHVCQUF1QjtFQUN2QiwwQkFBMEI7RUFDMUIsMEJBQTBCO0VBQzFCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSwyQkFBMkI7RUFDM0IsNEJBQTRCO0VBQzVCLFVBQVU7RUFDVixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxvQkFBb0I7RUFDcEIsVUFBVTtFQUNWLFFBQVE7RUFDUixTQUFTO0FBQ1hcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UGlyYXRhK09uZSZkaXNwbGF5PXN3YXAnKTtcXG5cXG4qLFxcbio6OmJlZm9yZSxcXG4qOjphZnRlciB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuOnJvb3Qge1xcbiAgLS1zaGlwOiAjY2E2NzAyO1xcbiAgLS1ncmlkOiAjMGE5Mzk2O1xcbiAgLS1ib3JkZXI6ICNhZTIwMTI7XFxuICAtLXlldC1zaGlwOiAjZTlkOGE2O1xcbn1cXG5cXG5ib2R5IHtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICBmb250LWZhbWlseTogJ1BpcmF0YSBPbmUnLCBjdXJzaXZlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNTAlIDUwJTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogNHJlbSBhdXRvO1xcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhczpcXG4gICAgJ2hlYWRlciBoZWFkZXInXFxuICAgICdwbGF5ZXIxIHBsYXllcjInO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgZ3JpZC1hcmVhOiBoZWFkZXI7XFxuICBoZWlnaHQ6IDMuN3JlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDVmNzM7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAyNXB4O1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDI1cHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4udGl0bGUge1xcbiAgZm9udC1zaXplOiAyLjlyZW07XFxuICBsZXR0ZXItc3BhY2luZzogMC41cmVtO1xcbn1cXG5cXG4ucGxheWVyMS1zY3JlZW4sXFxuLnBsYXllcjItc2NyZWVuIHtcXG4gIGdyaWQtYXJlYTogcGxheWVyMTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDI1JSA3NSU7XFxuICBncmlkLXRlbXBsYXRlLWFyZWFzOlxcbiAgICAnc2hpcHMnXFxuICAgICdncmlkcyc7XFxufVxcblxcbi5wbGF5ZXIyLXNjcmVlbiB7XFxuICBncmlkLWFyZWE6IHBsYXllcjI7XFxufVxcblxcbi5zaGlwcy1kaXYxIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBnYXA6IDFyZW07XFxuICBwYWRkaW5nOiAxMHB4O1xcbn1cXG5cXG4uc2hpcCB7XFxuICBncmlkLWFyZWE6IHNoaXBzO1xcbiAgaGVpZ2h0OiAzLjMzZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS15ZXQtc2hpcCk7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xcbiAgY3Vyc29yOiBncmFiO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zaGlwLnZlcnRpY2FsIHtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBwYWRkaW5nLXRvcDogMTBweDtcXG59XFxuXFxuLnJldmVyc2UtaW1nIHtcXG4gIGZpbHRlcjogaW52ZXJ0KDc3JSkgc2VwaWEoMiUpIHNhdHVyYXRlKDI0JSkgaHVlLXJvdGF0ZSgzMjBkZWcpIGJyaWdodG5lc3MoODglKSBjb250cmFzdCg5MiUpO1xcbiAgb3BhY2l0eTogMDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgd2lkdGg6IDE4cHg7XFxuICBoZWlnaHQ6IDE4cHg7XFxufVxcblxcbi5jZWxsID4gLnNoaXA6aG92ZXIgPiAucmV2ZXJzZS1pbWcge1xcbiAgb3BhY2l0eTogMTtcXG59XFxuXFxuLmRyYWdvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXlldC1zaGlwKTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlcik7XFxufVxcblxcbi5kcmFnZ2VkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNoaXApO1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyKTtcXG59XFxuXFxuLmdyaWQtMSxcXG4uZ3JpZC0yIHtcXG4gIGdyaWQtYXJlYTogZ3JpZHM7XFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB3aWR0aDogMzMuM2VtO1xcbiAgaGVpZ2h0OiAzMy4zZW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgYmFja2dyb3VuZDogdmFyKC0tZ3JpZCk7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXg6IDUwJTtcXG4gIGJhY2tncm91bmQtcG9zaXRpb24teTogNDAlO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG5bZGF0YS15PSc5J10ge1xcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbltkYXRhLXg9JzknXSB7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi5jZWxsIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgYmxhY2s7XFxuICB3aWR0aDogMTAlO1xcbiAgaGVpZ2h0OiAxMCU7XFxufVxcblxcbi5vZmYge1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICBvcGFjaXR5OiAwO1xcbiAgd2lkdGg6IDA7XFxuICBoZWlnaHQ6IDA7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi5wbGFjZS1vdmVybGF5IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgei1pbmRleDogNTtcXG4gIHBvaW50ZXItZXZlbnRzOiBhbGw7XFxuICByaWdodDogMCU7XFxuICB0b3A6IDglO1xcbiAgbGVmdDogNTAlO1xcbiAgYm90dG9tOiAwJTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zaGlmdC1vdmVybGF5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhZTIwMTI7XFxuICB3aWR0aDogOHJlbTtcXG4gIGhlaWdodDogM3JlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBmb250LWZhbWlseTogaW5oZXJpdDtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbn1cXG5cXG4ucGxhY2Utb3ZlcmxheS5uZCB7XFxuICBsZWZ0OiAwJTtcXG4gIHJpZ2h0OiA1MCU7XFxufVxcblxcbi5zaGlmdC1vdmVybGF5OmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM5YjIyMjY7XFxufVxcblxcbi5zaGlmdC1vdmVybGF5OmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2E2NzAyO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvU3R5bGUvcGxhY2Utc2hpcHMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usa0JBQWtCO0VBQ2xCLHVCQUF1QjtFQUN2QixVQUFVO0VBQ1YsbUJBQW1CO0VBQ25CLFNBQVM7RUFDVCxPQUFPO0VBQ1AsU0FBUztFQUNULFVBQVU7RUFDVixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixXQUFXO0VBQ1gsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osZUFBZTtFQUNmLG9CQUFvQjtFQUNwQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxRQUFRO0VBQ1IsVUFBVTtBQUNaOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5wbGFjZS1vdmVybGF5IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgei1pbmRleDogNTtcXG4gIHBvaW50ZXItZXZlbnRzOiBhbGw7XFxuICByaWdodDogMCU7XFxuICB0b3A6IDglO1xcbiAgbGVmdDogNTAlO1xcbiAgYm90dG9tOiAwJTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zaGlmdC1vdmVybGF5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhZTIwMTI7XFxuICB3aWR0aDogOHJlbTtcXG4gIGhlaWdodDogM3JlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBmb250LWZhbWlseTogaW5oZXJpdDtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbn1cXG5cXG4ucGxhY2Utb3ZlcmxheS5uZCB7XFxuICBsZWZ0OiAwJTtcXG4gIHJpZ2h0OiA1MCU7XFxufVxcblxcbi5zaGlmdC1vdmVybGF5OmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM5YjIyMjY7XFxufVxcblxcbi5zaGlmdC1vdmVybGF5OmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2E2NzAyO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIuc3RhcnQtYm9keSB7XFxuICBncmlkLWNvbHVtbi1lbmQ6IDM7XFxuICBncmlkLWNvbHVtbi1zdGFydDogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlOWQ4YTY7XFxuICB3aWR0aDogOTUlO1xcbiAgaGVpZ2h0OiA5NSU7XFxuICBib3JkZXItcmFkaXVzOiAyNXB4O1xcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMTAlO1xcbiAgcGFkZGluZy1ib3R0b206IDEwJTtcXG59XFxuXFxuLnN0YXJ0LXB2cCxcXG4uc3RhcnQtcHZjIHtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWUyMDEyO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm94LXNoYWRvdzogMnB4IDJweCA2cHggMXB4ICM5YjIyMjY7XFxuICBwYWRkaW5nOiAyNXB4O1xcbiAgd2lkdGg6IDMwcmVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uc3RhcnQtcHZjOmhvdmVyLFxcbi5zdGFydC1wdnA6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzliMjIyNjtcXG59XFxuXFxuLnN0YXJ0LXB2cDphY3RpdmUsXFxuLnN0YXJ0LXB2YzphY3RpdmUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NhNjcwMjtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL1N0eWxlL3N0YXJ0LXNjcmVlbi5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxrQkFBa0I7RUFDbEIsb0JBQW9CO0VBQ3BCLHlCQUF5QjtFQUN6QixVQUFVO0VBQ1YsV0FBVztFQUNYLG1CQUFtQjtFQUNuQixvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixRQUFRO0VBQ1IsbUJBQW1CO0FBQ3JCOztBQUVBOztFQUVFLG9CQUFvQjtFQUNwQixpQkFBaUI7RUFDakIseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixtQ0FBbUM7RUFDbkMsYUFBYTtFQUNiLFlBQVk7RUFDWixlQUFlO0FBQ2pCOztBQUVBOztFQUVFLHlCQUF5QjtBQUMzQjs7QUFFQTs7RUFFRSx5QkFBeUI7QUFDM0JcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnN0YXJ0LWJvZHkge1xcbiAgZ3JpZC1jb2x1bW4tZW5kOiAzO1xcbiAgZ3JpZC1jb2x1bW4tc3RhcnQ6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTlkOGE2O1xcbiAgd2lkdGg6IDk1JTtcXG4gIGhlaWdodDogOTUlO1xcbiAgYm9yZGVyLXJhZGl1czogMjVweDtcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDEwJTtcXG4gIHBhZGRpbmctYm90dG9tOiAxMCU7XFxufVxcblxcbi5zdGFydC1wdnAsXFxuLnN0YXJ0LXB2YyB7XFxuICBmb250LWZhbWlseTogaW5oZXJpdDtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2FlMjAxMjtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJveC1zaGFkb3c6IDJweCAycHggNnB4IDFweCAjOWIyMjI2O1xcbiAgcGFkZGluZzogMjVweDtcXG4gIHdpZHRoOiAzMHJlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnN0YXJ0LXB2Yzpob3ZlcixcXG4uc3RhcnQtcHZwOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM5YjIyMjY7XFxufVxcblxcbi5zdGFydC1wdnA6YWN0aXZlLFxcbi5zdGFydC1wdmM6YWN0aXZlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNjYTY3MDI7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vZ2FtZS1vdmVyLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vZ2FtZS1vdmVyLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9nYW1lLXJ1bm5pbmcuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9nYW1lLXJ1bm5pbmcuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21haW4uY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYWluLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wbGFjZS1zaGlwcy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3BsYWNlLXNoaXBzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdGFydC1zY3JlZW4uY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdGFydC1zY3JlZW4uY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0ICcuL1N0eWxlL21haW4uY3NzJztcbmltcG9ydCAnLi9TdHlsZS9zdGFydC1zY3JlZW4uY3NzJztcbmltcG9ydCAnLi9TdHlsZS9nYW1lLW92ZXIuY3NzJztcbmltcG9ydCAnLi9TdHlsZS9nYW1lLXJ1bm5pbmcuY3NzJztcbmltcG9ydCAnLi9TdHlsZS9wbGFjZS1zaGlwcy5jc3MnO1xuaW1wb3J0IHsgc3RhcnRTY3JlZW4gfSBmcm9tICcuL1NjcmVlbnMtc2NyaXB0cy9zdGFydE1lbnUnO1xuaW1wb3J0IHsgcGxhY2VTaGlwc1NjcmVlbiB9IGZyb20gJy4vU2NyZWVucy1zY3JpcHRzL3BsYWNlU2hpcHNTY3JlZW4nO1xuaW1wb3J0IHsgZ2FtZWJvYXJkRmFjdG9yeSB9IGZyb20gJy4vRmFjdG9yaWVzL2dhbWVib2FyZEZhY3RvcnknO1xuaW1wb3J0IHsgY3JlYXRlRE9NLCBtYW5pcHVsYXRlRE9NIH0gZnJvbSAnLi9ET00nO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9GYWN0b3JpZXMvcGxheWVyJztcbmltcG9ydCB7IGdhbWVMb2dpYyB9IGZyb20gJy4vZ2FtZUxvZ2ljJztcblxuY29uc3Qgc3RhcnQgPSBzdGFydFNjcmVlbigpO1xuY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbmNvbnN0IHN0YXJ0Qm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydC1ib2R5Jyk7XG5cbnN0YXJ0LnB2cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgYm9keS5yZW1vdmVDaGlsZChzdGFydEJvZHkpO1xuICBwbGFjZVNoaXBzU2NyZWVuKCk7XG4gIGNvbnN0IERPTSA9IGNyZWF0ZURPTSgpO1xuICBET00uY3JlYXRlR3JpZENlbGxzKCk7XG4gIGNvbnN0IHBsYXllcjFTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMS1zY3JlZW4nKTtcbiAgY29uc3QgcGxheWVyMlNjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIyLXNjcmVlbicpO1xuICBjb25zdCBncmlkMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkLTEnKTtcbiAgY29uc3QgZ3JpZDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZC0yJyk7XG4gIERPTS5jcmVhdGVTaGlwcyhwbGF5ZXIxU2NyZWVuKTtcbiAgRE9NLmNyZWF0ZVNoaXBzKHBsYXllcjJTY3JlZW4pO1xuICBtYW5pcHVsYXRlRE9NKGdyaWQxKTtcbiAgbWFuaXB1bGF0ZURPTShncmlkMik7XG59KTtcbiJdLCJuYW1lcyI6WyJyZXZlcnNlIiwiY3JlYXRlRE9NIiwiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImdyaWQxIiwiY3JlYXRlRWxlbWVudCIsImdyaWQyIiwiZGF0YXNldCIsImdyaWQiLCJwbGF5ZXIxIiwicGxheWVyMiIsImFwcGVuZENoaWxkIiwiY2xhc3NMaXN0IiwiYWRkIiwiY3JlYXRlU2hpcHMiLCJwbGF5ZXJTY3JlZW4iLCJzaGlwc0RpdiIsIm1hbnlTaGlwcyIsImxlbmd0aCIsImkiLCJyZXZlcnNlSXQiLCJzcmMiLCJzaGlwIiwiZHJhZ2dhYmxlIiwiaW5kZXgiLCJ3aWR0aCIsInRvRml4ZWQiLCJzdHlsZSIsImNzc1RleHQiLCJjcmVhdGVHcmlkQ2VsbHMiLCJ4IiwieSIsImNlbGwiLCJtYW5pcHVsYXRlRE9NIiwic2hpcHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZHJhZ2dlZCIsImluaXRpYWxDb29yZGluYXRlcyIsImZvckVhY2giLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsIm9wYWNpdHkiLCJzdG9yZUluaXRhbENvb3JkaW5hdGVzIiwicGFyZW50RWxlbWVudCIsImNvbnRhaW5zIiwiY2hlY2tWYWxpZERyb3AiLCJjaGVja05lYXJDZWxscyIsInRvZ2dsZSIsInJlbW92ZUJ1c3lTdGF0ZSIsImFkZFNoaXBzVG9DZWxscyIsImNvbnNvbGUiLCJsb2ciLCJwcmV2ZW50RGVmYXVsdCIsInBhcnNlSW50IiwibGVhdmVkQ2VsbCIsImxlYXZlZCIsInJlbW92ZSIsImFjdGlvbiIsInNwbGljZSIsInB1c2giLCJjaGVjayIsImZpcnN0Q2VsbCIsInh5IiwiY3VycmVudENlbGwiLCJ0aGVDZWxsIiwiYnVzeSIsIm9jY3VwaWVkQ2VsbHMiLCJhZGRYIiwiYWRkWSIsImFkeCIsIm51bVgiLCJhZHkiLCJudW1ZIiwiY2hlY2tlciIsImlzWW91cnMiLCJmaW5kIiwic2F2ZVNoaXBzUG9zaXRpb24iLCJzaGlwRmFjdG9yeSIsImdhbWVib2FyZEZhY3RvcnkiLCJzaGlwc0FycmF5Iiwid3JlY2tlZFNoaXBzIiwiYWxsQ29vcmRpbmF0ZXMiLCJjcmVhdGVDb29yZGluYXRlcyIsInBsYWNlU2hpcHMiLCJkaXJlY3Rpb24iLCJjb29yZGluYXRlcyIsInJlY2VpdmVBdHRhY2siLCJoaXRDb29yZGluYXRlcyIsInJldHVyblZhbHVlIiwiY29vcmQiLCJoaXQiLCJhcmVBbGxTaGlwc1dyZWNrZWQiLCJQbGF5ZXIiLCJuYW1lIiwiaXNUdXJuIiwibGVuIiwicG9zaXRpb25zQXJyYXkiLCJpc1N1bmsiLCJldmVyeSIsInBvc2l0aW9uIiwicGxhY2VTaGlwc1NjcmVlbiIsIm92ZXJsYXkiLCJzaGl0QnV0dG9uIiwiZmluaXNoUGxhY2VtZW50IiwidGV4dENvbnRlbnQiLCJzdGFydFNjcmVlbiIsIm1haW5Cb2R5IiwicHZwIiwicHZjIiwiZ2FtZUxvZ2ljIiwiY2hlY2tGb3JXaW5uZXIiLCJnYW1lYm9hcmQiLCJzdGFydCIsInN0YXJ0Qm9keSIsInJlbW92ZUNoaWxkIiwiRE9NIiwicGxheWVyMVNjcmVlbiIsInBsYXllcjJTY3JlZW4iXSwic291cmNlUm9vdCI6IiJ9