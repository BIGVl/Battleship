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

      var ship = document.createElement('div');
      ship.draggable = 'true';
      ship.dataset.length = length;
      var width = 53.27 * length;
      width = width.toFixed(2);
      ship.style.cssText = "width:".concat(width, "px;");
      ship.addEventListener('drag');
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
  grids.forEach(function (grid) {
    grid.addEventListener('drag', function () {});
  }); // function receiveAttack(player, board) {
  //   board.addEventListener('click', function (e) {
  //     const x = e.target.dataset.x;
  //     const y = e.target.dataset.y;
  //     console.log(player.gameboard.shipsArray);
  //     player.gameboard.receiveAttack(x, y);
  //   });
  // }

  function renderShips(coordinatesArray) {
    coordinatesArray.forEach(function (xy) {
      var cell = grid1.querySelector("[data-x=\"".concat(xy.x, "\"][data-y=\"").concat(xy.y, "\"]"));
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
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/radar.jpg */ "./src/assets/radar.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Pirata+One&display=swap);"]);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "*,\n*::before,\n*::after {\n  box-sizing: border-box;\n  padding: 0;\n  margin: 0;\n}\n\n:root {\n  --main: red;\n}\n\nbody {\n  width: 100vw;\n  height: 100vh;\n  font-family: 'Pirata One', cursive;\n  display: grid;\n  grid-template-columns: 50% 50%;\n  grid-template-rows: 4rem auto;\n  grid-template-areas:\n    'header header'\n    'player1 player2';\n}\n\nheader {\n  grid-area: header;\n  height: 3.7rem;\n  background-color: rgba(95, 155, 200, 0.9);\n  border-bottom-left-radius: 25px;\n  border-bottom-right-radius: 25px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.title {\n  font-size: 2.5rem;\n  letter-spacing: 2px;\n}\n\n.player1-screen,\n.player2-screen {\n  grid-area: player1;\n  display: grid;\n  grid-template-rows: 25% 75%;\n  grid-template-areas:\n    'ships'\n    'grids';\n}\n\n.player2-screen {\n  grid-area: player2;\n}\n\n.ships-div1 {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n  padding: 10px;\n}\n\n.ship {\n  grid-area: ships;\n  height: 3.33em;\n  background-color: aquamarine;\n  border: 1px solid black;\n}\n\n.grid-1,\n.grid-2 {\n  grid-area: grids;\n  justify-self: center;\n\n  width: 33.3em;\n  height: 33.3em;\n  display: flex;\n  flex-wrap: wrap;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") no-repeat, rgba(50, 230, 256, 0.6);\n  background-blend-mode: overlay;\n  background-size: cover;\n  background-position-x: 50%;\n  background-position-y: 40%;\n  cursor: pointer;\n}\n.cell {\n  border-top: 1px solid black;\n  border-left: 1px solid black;\n  width: 10%;\n  height: 10%;\n}\n", "",{"version":3,"sources":["webpack://./src/Style/main.css"],"names":[],"mappings":"AAEA;;;EAGE,sBAAsB;EACtB,UAAU;EACV,SAAS;AACX;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,kCAAkC;EAClC,aAAa;EACb,8BAA8B;EAC9B,6BAA6B;EAC7B;;qBAEmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,cAAc;EACd,yCAAyC;EACzC,+BAA+B;EAC/B,gCAAgC;EAChC,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;;EAEE,kBAAkB;EAClB,aAAa;EACb,2BAA2B;EAC3B;;WAES;AACX;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,SAAS;EACT,aAAa;AACf;;AAEA;EACE,gBAAgB;EAChB,cAAc;EACd,4BAA4B;EAC5B,uBAAuB;AACzB;;AAEA;;EAEE,gBAAgB;EAChB,oBAAoB;;EAEpB,aAAa;EACb,cAAc;EACd,aAAa;EACb,eAAe;EACf,sFAAyE;EACzE,8BAA8B;EAC9B,sBAAsB;EACtB,0BAA0B;EAC1B,0BAA0B;EAC1B,eAAe;AACjB;AACA;EACE,2BAA2B;EAC3B,4BAA4B;EAC5B,UAAU;EACV,WAAW;AACb","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Pirata+One&display=swap');\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n  padding: 0;\n  margin: 0;\n}\n\n:root {\n  --main: red;\n}\n\nbody {\n  width: 100vw;\n  height: 100vh;\n  font-family: 'Pirata One', cursive;\n  display: grid;\n  grid-template-columns: 50% 50%;\n  grid-template-rows: 4rem auto;\n  grid-template-areas:\n    'header header'\n    'player1 player2';\n}\n\nheader {\n  grid-area: header;\n  height: 3.7rem;\n  background-color: rgba(95, 155, 200, 0.9);\n  border-bottom-left-radius: 25px;\n  border-bottom-right-radius: 25px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.title {\n  font-size: 2.5rem;\n  letter-spacing: 2px;\n}\n\n.player1-screen,\n.player2-screen {\n  grid-area: player1;\n  display: grid;\n  grid-template-rows: 25% 75%;\n  grid-template-areas:\n    'ships'\n    'grids';\n}\n\n.player2-screen {\n  grid-area: player2;\n}\n\n.ships-div1 {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n  padding: 10px;\n}\n\n.ship {\n  grid-area: ships;\n  height: 3.33em;\n  background-color: aquamarine;\n  border: 1px solid black;\n}\n\n.grid-1,\n.grid-2 {\n  grid-area: grids;\n  justify-self: center;\n\n  width: 33.3em;\n  height: 33.3em;\n  display: flex;\n  flex-wrap: wrap;\n  background: url('../assets/radar.jpg') no-repeat, rgba(50, 230, 256, 0.6);\n  background-blend-mode: overlay;\n  background-size: cover;\n  background-position-x: 50%;\n  background-position-y: 40%;\n  cursor: pointer;\n}\n.cell {\n  border-top: 1px solid black;\n  border-left: 1px solid black;\n  width: 10%;\n  height: 10%;\n}\n"],"sourceRoot":""}]);
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

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
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

/***/ "./src/assets/radar.jpg":
/*!******************************!*\
  !*** ./src/assets/radar.jpg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "10d8ed97545963a91baa.jpg";

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTVEsR0FBRyxHQUFHckUsK0NBQVMsRUFBckI7QUFDQXFFLEdBQUcsQ0FBQzdDLGVBQUo7QUFDQTZDLEdBQUcsQ0FBQzlELFdBQUo7QUFDQSxJQUFNK0QsVUFBVSxHQUFHMUMsbURBQWEsRUFBaEM7QUFFQVMscURBQVMsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvRE9NLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUxvZ2ljLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXBGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvU3R5bGUvbWFpbi5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvU3R5bGUvbWFpbi5jc3M/YTA5ZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgY3JlYXRlRE9NID0gKCkgPT4ge1xuICBjb25zdCBncmlkMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkLTEnKTtcbiAgY29uc3QgZ3JpZDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZC0yJyk7XG4gIGNvbnN0IHBsYXllcjEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMS1zY3JlZW4nKTtcbiAgY29uc3QgcGxheWVyMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIyLXNjcmVlbicpO1xuICAvL0NyZWF0ZXMgYm90aCBncmlkcyBmb3IgdGhlIHBsYXllcnNcblxuICBmdW5jdGlvbiBjcmVhdGVTaGlwcygpIHtcbiAgICBjb25zdCBzaGlwc0RpdjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgbWFueVNoaXBzID0gMDtcbiAgICBsZXQgbGVuZ3RoID0gNDtcblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDEwOyBpKyspIHtcbiAgICAgIGlmIChtYW55U2hpcHMgKyBsZW5ndGggPD0gNCkge1xuICAgICAgICBtYW55U2hpcHMgPSBtYW55U2hpcHMgKyAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFueVNoaXBzID0gMTtcbiAgICAgICAgbGVuZ3RoID0gbGVuZ3RoIC0gMTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNoaXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHNoaXAuZHJhZ2dhYmxlID0gJ3RydWUnO1xuICAgICAgc2hpcC5kYXRhc2V0Lmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgIGxldCB3aWR0aCA9IDUzLjI3ICogbGVuZ3RoO1xuICAgICAgd2lkdGggPSB3aWR0aC50b0ZpeGVkKDIpO1xuICAgICAgc2hpcC5zdHlsZS5jc3NUZXh0ID0gYHdpZHRoOiR7d2lkdGh9cHg7YDtcbiAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZycpO1xuXG4gICAgICBzaGlwc0RpdjEuYXBwZW5kQ2hpbGQoc2hpcCkuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgIH1cbiAgICBwbGF5ZXIxLmFwcGVuZENoaWxkKHNoaXBzRGl2MSkuY2xhc3NMaXN0LmFkZCgnc2hpcHMtZGl2MScpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlR3JpZENlbGxzKCkge1xuICAgIGxldCB4ID0gMDtcbiAgICBsZXQgeSA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBncmlkMS5hcHBlbmRDaGlsZChjZWxsKS5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XG4gICAgICBpZiAoeSA9PT0gMTApIHtcbiAgICAgIH1cbiAgICAgIGNlbGwuZGF0YXNldC54ID0geDtcbiAgICAgIGNlbGwuZGF0YXNldC55ID0geTtcbiAgICAgIHkgPSB5ICsgMTtcbiAgICAgIGlmICh5ID09PSAxMCkge1xuICAgICAgICB5ID0gMDtcbiAgICAgICAgeCA9IHggKyAxO1xuICAgICAgfVxuICAgIH1cbiAgICB4ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBncmlkMi5hcHBlbmRDaGlsZChjZWxsKS5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XG4gICAgICBpZiAoeSA9PT0gMTApIHtcbiAgICAgIH1cbiAgICAgIGNlbGwuZGF0YXNldC54ID0geDtcbiAgICAgIGNlbGwuZGF0YXNldC55ID0geTtcbiAgICAgIHkgPSB5ICsgMTtcbiAgICAgIGlmICh5ID09PSAxMCkge1xuICAgICAgICB5ID0gMDtcbiAgICAgICAgeCA9IHggKyAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGNyZWF0ZUdyaWRDZWxscywgY3JlYXRlU2hpcHMgfTtcbn07XG5cbi8vRE9NIE1hbmlwdWxhdGlvblxuZXhwb3J0IGNvbnN0IG1hbmlwdWxhdGVET00gPSAoKSA9PiB7XG4gIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZ3JpZF0nKTtcblxuICBncmlkcy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnJywgKCkgPT4ge30pO1xuICB9KTtcbiAgLy8gZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhwbGF5ZXIsIGJvYXJkKSB7XG4gIC8vICAgYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAvLyAgICAgY29uc3QgeCA9IGUudGFyZ2V0LmRhdGFzZXQueDtcbiAgLy8gICAgIGNvbnN0IHkgPSBlLnRhcmdldC5kYXRhc2V0Lnk7XG4gIC8vICAgICBjb25zb2xlLmxvZyhwbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzQXJyYXkpO1xuICAvLyAgICAgcGxheWVyLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAvLyAgIH0pO1xuICAvLyB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyU2hpcHMoY29vcmRpbmF0ZXNBcnJheSkge1xuICAgIGNvb3JkaW5hdGVzQXJyYXkuZm9yRWFjaCgoeHkpID0+IHtcbiAgICAgIGNvbnN0IGNlbGwgPSBncmlkMS5xdWVyeVNlbGVjdG9yKGBbZGF0YS14PVwiJHt4eS54fVwiXVtkYXRhLXk9XCIke3h5Lnl9XCJdYCk7XG4gICAgICBjZWxsLnN0eWxlLmNzc1RleHQgPSAnYmFja2dyb3VuZC1jb2xvcjpyZ2JhKDE2MCwxNjAsMTYwLDAuNyknO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHsgcmVuZGVyU2hpcHMgfTtcbn07XG4iLCJpbXBvcnQgeyBtYW5pcHVsYXRlRE9NIH0gZnJvbSAnLi9ET00nO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInO1xuXG5leHBvcnQgY29uc3QgZ2FtZUxvZ2ljID0gKCkgPT4ge1xuICBjb25zdCBwbGF5ZXIxID0gbmV3IFBsYXllcignWU9ZTycpO1xuICBjb25zdCBwbGF5ZXIyID0gbmV3IFBsYXllcignWE9YTycpO1xuICAvL0NoZWNrcyBlYWNoIGF0dGFjayBpZiBhbGwgdGhlIHNoaXBzIGhhdmUgYmVlbiBzdW5rXG4gIGZ1bmN0aW9uIGNoZWNrRm9yV2lubmVyKCkge1xuICAgIGlmIChwbGF5ZXIxLmdhbWVib2FyZC5hcmVBbGxTaGlwc1dyZWNrZWQoKSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc29sZS5sb2coJ3BsYXllcjIgV09OIScpO1xuICAgIH0gZWxzZSBpZiAocGxheWVyMi5nYW1lYm9hcmQuYXJlQWxsU2hpcHNXcmVja2VkKCkgPT09IHRydWUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdwbGF5ZXIxIFdPTicpO1xuICAgIH1cbiAgfVxuICByZXR1cm4geyBjaGVja0Zvcldpbm5lciB9O1xufTtcbiIsImltcG9ydCB7IHNoaXBGYWN0b3J5IH0gZnJvbSAnLi9zaGlwRmFjdG9yeSc7XG5cbmV4cG9ydCBjb25zdCBnYW1lYm9hcmRGYWN0b3J5ID0gKCkgPT4ge1xuICBjb25zdCBzaGlwc0FycmF5ID0gW107XG4gIGNvbnN0IHdyZWNrZWRTaGlwcyA9IFtdO1xuXG4gIC8vU2F2ZXMgYWxsIGNvb3JkaW5hdGVzIHNvIHRoZSBnYW1lYm9hcmQgY2FuIGtlZXAgdHJhY2sgb2YgYWxsIHRoZSBtaXNzZXNcbiAgY29uc3QgYWxsQ29vcmRpbmF0ZXMgPSBbXTtcbiAgKGZ1bmN0aW9uIGNyZWF0ZUNvb3JkaW5hdGVzKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgIGlmIChpIDwgMTApIHtcbiAgICAgICAgaSA9ICcwJyArIGk7XG4gICAgICB9XG4gICAgICBhbGxDb29yZGluYXRlcy5wdXNoKGkpO1xuICAgIH1cbiAgfSkoKTtcblxuICAvL1BsYWNlcyBhIG5ldyBzaGlwIGF0IGNob29zZW4gY29vcmRpbmF0ZXNcbiAgLy9UaGlzIGlzIHJlZHVuZGFudCwgeW91IGFyZSBnb2luZyB0byBwbGFjZSBzaGlwcyBpbiBhIGRpZmVycmVudCB3YXksIGFmdGVyIHRoZSB1c2VyIGNsaWNrIHN0YXJ0IHdoZW4gaGUgZmluaXNoZXMgYWRkaW5nIHRoZSBzaGlwcywgdGhlbiBmb3IgZWFjaCBzaGlwXG4gIC8veW91IHRha2VzIGl0J3MgY29vcmRpbmF0ZXMgYW5kIHRoZW4gY3JlYXRlIHRoZSBzaGlwcyBiYXNlZCBvbiBlYWNoIGNvb3JkaW5hdGUsIHlvdSB3aWxsIGhhdmUgdG8gcmVmYWN0b3IgdGhlIHJlY2VpdmVBdHRhY2sgYXMgd2VsbFxuICBmdW5jdGlvbiBwbGFjZVNoaXBzKHgsIHksIGRpcmVjdGlvbikge1xuICAgIHggPSBwYXJzZUludCh4KTtcbiAgICB5ID0gcGFyc2VJbnQoeSk7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcbiAgICBpZiAoZGlyZWN0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBpbmRleDsgaSsrKSB7XG4gICAgICAgIGNvb3JkaW5hdGVzLnB1c2goeyB4LCB5IH0pO1xuICAgICAgICB4ID0geCArIDE7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdvcml6b250YWwnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBpbmRleDsgaSsrKSB7XG4gICAgICAgIGNvb3JkaW5hdGVzLnB1c2goeyB4LCB5IH0pO1xuICAgICAgICB5ID0geSArIDE7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHNoaXAgPSBzaGlwRmFjdG9yeShpbmRleCk7XG5cbiAgICBzaGlwc0FycmF5LnB1c2goeyBzaGlwLCBjb29yZGluYXRlcyB9KTtcblxuICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgfVxuXG4gIC8vQ2hlY2tzIGlmIHRoZSB0aGUgc2VsZWN0ZWQgY29vcmRpbmF0ZXMgYXJlIG9jY3VwaWVkIGJ5IGEgc2hpcCBvciBub3QgYW5kXG4gIC8vY2FsbHMgdGhlIGhpdCBmdW5jdGlvbiBvbiB0aGF0IHNwZWNpZmljIHNoaXAgb3IgbWFya3MgdGhlIG1pc3MuXG4gIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuICAgIHggPSBwYXJzZUludCh4KTtcbiAgICB5ID0gcGFyc2VJbnQoeSk7XG4gICAgY29uc3QgaGl0Q29vcmRpbmF0ZXMgPSB4ICsgJycgKyB5O1xuICAgIGlmIChhbGxDb29yZGluYXRlc1toaXRDb29yZGluYXRlc10gPT09ICd4Jykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGFsbENvb3JkaW5hdGVzLnNwbGljZShoaXRDb29yZGluYXRlcywgMSwgJ3gnKTtcblxuICAgIGxldCByZXR1cm5WYWx1ZSA9ICdtaXNzJztcbiAgICBzaGlwc0FycmF5LmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIHJldHVybiBzaGlwLmNvb3JkaW5hdGVzLmZpbmQoKGNvb3JkKSA9PiB7XG4gICAgICAgIGlmIChjb29yZC54ID09PSB4ICYmIGNvb3JkLnkgPT09IHkpIHtcbiAgICAgICAgICByZXR1cm5WYWx1ZSA9IHNoaXAuc2hpcC5oaXQoKTtcbiAgICAgICAgICBpZiAocmV0dXJuVmFsdWUgPT09ICdTVU5LIScpIHtcbiAgICAgICAgICAgIHdyZWNrZWRTaGlwcy5wdXNoKHJldHVyblZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9XG5cbiAgLy9DaGVja3Mgd2V0aGVyIG9yIG5vdCBhbGwgdGhlIHNoaXBzIGhhdmUgYmVlbiBzdW5rXG5cbiAgZnVuY3Rpb24gYXJlQWxsU2hpcHNXcmVja2VkKCkge1xuICAgIGlmICh3cmVja2VkU2hpcHMubGVuZ3RoID09PSAxMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB7IHNoaXBzQXJyYXksIHBsYWNlU2hpcHMsIHJlY2VpdmVBdHRhY2ssIGFyZUFsbFNoaXBzV3JlY2tlZCB9O1xufTtcbiIsImltcG9ydCB7IGdhbWVib2FyZEZhY3RvcnkgfSBmcm9tICcuL2dhbWVib2FyZEZhY3RvcnknO1xuXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICBnYW1lYm9hcmQgPSBnYW1lYm9hcmRGYWN0b3J5KCk7XG5cbiAgaXNUdXJuID0gZmFsc2U7XG5cbiAgc3RhcnRUdXJuKCkge1xuICAgIHJldHVybiAodGhpcy5pc1R1cm4gPSB0cnVlKTtcbiAgfVxuXG4gIGVuZFR1cm4oKSB7XG4gICAgcmV0dXJuICh0aGlzLmlzVHVybiA9IGZhbHNlKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IHNoaXBGYWN0b3J5ID0gKGxlbikgPT4ge1xuICBjb25zdCBsZW5ndGggPSBsZW47XG4gIGNvbnN0IHBvc2l0aW9uc0FycmF5ID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPD0gbGVuZ3RoOyBpKyspIHtcbiAgICBwb3NpdGlvbnNBcnJheS5wdXNoKGkpO1xuICB9XG5cbiAgbGV0IGkgPSAwO1xuXG4gIGZ1bmN0aW9uIGhpdCgpIHtcbiAgICBwb3NpdGlvbnNBcnJheS5zcGxpY2UoaSwgMSwgJ2hpdCcpO1xuICAgIGNvbnNvbGUubG9nKHBvc2l0aW9uc0FycmF5KTtcblxuICAgIGlmIChpc1N1bmsoKSkge1xuICAgICAgcmV0dXJuICdTVU5LISc7XG4gICAgfVxuICAgIGkrKztcbiAgICByZXR1cm4gJ2hpdCc7XG4gIH1cblxuICBmdW5jdGlvbiBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHBvc2l0aW9uc0FycmF5LmV2ZXJ5KChwb3NpdGlvbikgPT4ge1xuICAgICAgcmV0dXJuIHBvc2l0aW9uID09PSAnaGl0JztcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7IGxlbmd0aCwgaGl0IH07XG59O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9yYWRhci5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVBpcmF0YStPbmUmZGlzcGxheT1zd2FwKTtcIl0pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIiosXFxuKjo6YmVmb3JlLFxcbio6OmFmdGVyIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG46cm9vdCB7XFxuICAtLW1haW46IHJlZDtcXG59XFxuXFxuYm9keSB7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZm9udC1mYW1pbHk6ICdQaXJhdGEgT25lJywgY3Vyc2l2ZTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDUwJSA1MCU7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDRyZW0gYXV0bztcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XFxuICAgICdoZWFkZXIgaGVhZGVyJ1xcbiAgICAncGxheWVyMSBwbGF5ZXIyJztcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGdyaWQtYXJlYTogaGVhZGVyO1xcbiAgaGVpZ2h0OiAzLjdyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDk1LCAxNTUsIDIwMCwgMC45KTtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDI1cHg7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMjVweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi50aXRsZSB7XFxuICBmb250LXNpemU6IDIuNXJlbTtcXG4gIGxldHRlci1zcGFjaW5nOiAycHg7XFxufVxcblxcbi5wbGF5ZXIxLXNjcmVlbixcXG4ucGxheWVyMi1zY3JlZW4ge1xcbiAgZ3JpZC1hcmVhOiBwbGF5ZXIxO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMjUlIDc1JTtcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XFxuICAgICdzaGlwcydcXG4gICAgJ2dyaWRzJztcXG59XFxuXFxuLnBsYXllcjItc2NyZWVuIHtcXG4gIGdyaWQtYXJlYTogcGxheWVyMjtcXG59XFxuXFxuLnNoaXBzLWRpdjEge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGdhcDogMXJlbTtcXG4gIHBhZGRpbmc6IDEwcHg7XFxufVxcblxcbi5zaGlwIHtcXG4gIGdyaWQtYXJlYTogc2hpcHM7XFxuICBoZWlnaHQ6IDMuMzNlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWFtYXJpbmU7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmdyaWQtMSxcXG4uZ3JpZC0yIHtcXG4gIGdyaWQtYXJlYTogZ3JpZHM7XFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG5cXG4gIHdpZHRoOiAzMy4zZW07XFxuICBoZWlnaHQ6IDMzLjNlbTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpIG5vLXJlcGVhdCwgcmdiYSg1MCwgMjMwLCAyNTYsIDAuNik7XFxuICBiYWNrZ3JvdW5kLWJsZW5kLW1vZGU6IG92ZXJsYXk7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbi14OiA1MCU7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXk6IDQwJTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLmNlbGwge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBibGFjaztcXG4gIHdpZHRoOiAxMCU7XFxuICBoZWlnaHQ6IDEwJTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL1N0eWxlL21haW4uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUVBOzs7RUFHRSxzQkFBc0I7RUFDdEIsVUFBVTtFQUNWLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2Isa0NBQWtDO0VBQ2xDLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsNkJBQTZCO0VBQzdCOztxQkFFbUI7QUFDckI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsY0FBYztFQUNkLHlDQUF5QztFQUN6QywrQkFBK0I7RUFDL0IsZ0NBQWdDO0VBQ2hDLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLG1CQUFtQjtBQUNyQjs7QUFFQTs7RUFFRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLDJCQUEyQjtFQUMzQjs7V0FFUztBQUNYOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGVBQWU7RUFDZixTQUFTO0VBQ1QsYUFBYTtBQUNmOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCw0QkFBNEI7RUFDNUIsdUJBQXVCO0FBQ3pCOztBQUVBOztFQUVFLGdCQUFnQjtFQUNoQixvQkFBb0I7O0VBRXBCLGFBQWE7RUFDYixjQUFjO0VBQ2QsYUFBYTtFQUNiLGVBQWU7RUFDZixzRkFBeUU7RUFDekUsOEJBQThCO0VBQzlCLHNCQUFzQjtFQUN0QiwwQkFBMEI7RUFDMUIsMEJBQTBCO0VBQzFCLGVBQWU7QUFDakI7QUFDQTtFQUNFLDJCQUEyQjtFQUMzQiw0QkFBNEI7RUFDNUIsVUFBVTtFQUNWLFdBQVc7QUFDYlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1QaXJhdGErT25lJmRpc3BsYXk9c3dhcCcpO1xcblxcbiosXFxuKjo6YmVmb3JlLFxcbio6OmFmdGVyIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG46cm9vdCB7XFxuICAtLW1haW46IHJlZDtcXG59XFxuXFxuYm9keSB7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZm9udC1mYW1pbHk6ICdQaXJhdGEgT25lJywgY3Vyc2l2ZTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDUwJSA1MCU7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDRyZW0gYXV0bztcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XFxuICAgICdoZWFkZXIgaGVhZGVyJ1xcbiAgICAncGxheWVyMSBwbGF5ZXIyJztcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGdyaWQtYXJlYTogaGVhZGVyO1xcbiAgaGVpZ2h0OiAzLjdyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDk1LCAxNTUsIDIwMCwgMC45KTtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDI1cHg7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMjVweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi50aXRsZSB7XFxuICBmb250LXNpemU6IDIuNXJlbTtcXG4gIGxldHRlci1zcGFjaW5nOiAycHg7XFxufVxcblxcbi5wbGF5ZXIxLXNjcmVlbixcXG4ucGxheWVyMi1zY3JlZW4ge1xcbiAgZ3JpZC1hcmVhOiBwbGF5ZXIxO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMjUlIDc1JTtcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XFxuICAgICdzaGlwcydcXG4gICAgJ2dyaWRzJztcXG59XFxuXFxuLnBsYXllcjItc2NyZWVuIHtcXG4gIGdyaWQtYXJlYTogcGxheWVyMjtcXG59XFxuXFxuLnNoaXBzLWRpdjEge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGdhcDogMXJlbTtcXG4gIHBhZGRpbmc6IDEwcHg7XFxufVxcblxcbi5zaGlwIHtcXG4gIGdyaWQtYXJlYTogc2hpcHM7XFxuICBoZWlnaHQ6IDMuMzNlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWFtYXJpbmU7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmdyaWQtMSxcXG4uZ3JpZC0yIHtcXG4gIGdyaWQtYXJlYTogZ3JpZHM7XFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG5cXG4gIHdpZHRoOiAzMy4zZW07XFxuICBoZWlnaHQ6IDMzLjNlbTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBiYWNrZ3JvdW5kOiB1cmwoJy4uL2Fzc2V0cy9yYWRhci5qcGcnKSBuby1yZXBlYXQsIHJnYmEoNTAsIDIzMCwgMjU2LCAwLjYpO1xcbiAgYmFja2dyb3VuZC1ibGVuZC1tb2RlOiBvdmVybGF5O1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gIGJhY2tncm91bmQtcG9zaXRpb24teDogNTAlO1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbi15OiA0MCU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5jZWxsIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgYmxhY2s7XFxuICB3aWR0aDogMTAlO1xcbiAgaGVpZ2h0OiAxMCU7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7IC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfSAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG5cblxuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYWluLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFpbi5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJpbXBvcnQgJy4vU3R5bGUvbWFpbi5jc3MnO1xuaW1wb3J0IHsgZ2FtZWJvYXJkRmFjdG9yeSB9IGZyb20gJy4vZ2FtZWJvYXJkRmFjdG9yeSc7XG5pbXBvcnQgeyBjcmVhdGVET00sIG1hbmlwdWxhdGVET00gfSBmcm9tICcuL0RPTSc7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgeyBnYW1lTG9naWMgfSBmcm9tICcuL2dhbWVMb2dpYyc7XG5cbmNvbnN0IERPTSA9IGNyZWF0ZURPTSgpO1xuRE9NLmNyZWF0ZUdyaWRDZWxscygpO1xuRE9NLmNyZWF0ZVNoaXBzKCk7XG5jb25zdCBtYW5pcHVsYXRlID0gbWFuaXB1bGF0ZURPTSgpO1xuXG5nYW1lTG9naWMoKTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVET00iLCJncmlkMSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImdyaWQyIiwicGxheWVyMSIsInBsYXllcjIiLCJjcmVhdGVTaGlwcyIsInNoaXBzRGl2MSIsImNyZWF0ZUVsZW1lbnQiLCJtYW55U2hpcHMiLCJsZW5ndGgiLCJpIiwic2hpcCIsImRyYWdnYWJsZSIsImRhdGFzZXQiLCJ3aWR0aCIsInRvRml4ZWQiLCJzdHlsZSIsImNzc1RleHQiLCJhZGRFdmVudExpc3RlbmVyIiwiYXBwZW5kQ2hpbGQiLCJjbGFzc0xpc3QiLCJhZGQiLCJjcmVhdGVHcmlkQ2VsbHMiLCJ4IiwieSIsImNlbGwiLCJtYW5pcHVsYXRlRE9NIiwiZ3JpZHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImdyaWQiLCJyZW5kZXJTaGlwcyIsImNvb3JkaW5hdGVzQXJyYXkiLCJ4eSIsIlBsYXllciIsImdhbWVMb2dpYyIsImNoZWNrRm9yV2lubmVyIiwiZ2FtZWJvYXJkIiwiYXJlQWxsU2hpcHNXcmVja2VkIiwiY29uc29sZSIsImxvZyIsInNoaXBGYWN0b3J5IiwiZ2FtZWJvYXJkRmFjdG9yeSIsInNoaXBzQXJyYXkiLCJ3cmVja2VkU2hpcHMiLCJhbGxDb29yZGluYXRlcyIsImNyZWF0ZUNvb3JkaW5hdGVzIiwicHVzaCIsInBsYWNlU2hpcHMiLCJkaXJlY3Rpb24iLCJwYXJzZUludCIsImNvb3JkaW5hdGVzIiwiaW5kZXgiLCJyZWNlaXZlQXR0YWNrIiwiaGl0Q29vcmRpbmF0ZXMiLCJzcGxpY2UiLCJyZXR1cm5WYWx1ZSIsImZpbmQiLCJjb29yZCIsImhpdCIsIm5hbWUiLCJpc1R1cm4iLCJsZW4iLCJwb3NpdGlvbnNBcnJheSIsImlzU3VuayIsImV2ZXJ5IiwicG9zaXRpb24iLCJET00iLCJtYW5pcHVsYXRlIl0sInNvdXJjZVJvb3QiOiIifQ==