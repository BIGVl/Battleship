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
/* harmony export */   "createDOM": () => (/* binding */ createDOM)
/* harmony export */ });
/* harmony import */ var _gameboardFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboardFactory */ "./src/gameboardFactory.js");
/* harmony import */ var _gameController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameController */ "./src/gameController.js");


function createDOM() {
  var body = document.querySelector('body');
  var half1 = document.createElement('div');
  var pName1 = document.createElement('div');
  var grid1 = document.createElement('div');

  function creteGridCells(grid) {
    var x = 1;
    var y = 0;

    for (var i = 0; i < 100; i++) {
      var cell = document.createElement('div');
      grid.appendChild(cell);

      if (y === 10) {}

      cell.dataset.x = x;
      cell.dataset.y = y;
      x = x + 1;
      y = y + 1;
    }
  }
}

/***/ }),

/***/ "./src/gameController.js":
/*!*******************************!*\
  !*** ./src/gameController.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gamePVP": () => (/* binding */ gamePVP)
/* harmony export */ });
/* harmony import */ var _gameboardFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboardFactory */ "./src/gameboardFactory.js");

function gamePVP() {
  var player1 = (0,_gameboardFactory__WEBPACK_IMPORTED_MODULE_0__.gameboardFactory)();
  var player2 = (0,_gameboardFactory__WEBPACK_IMPORTED_MODULE_0__.gameboardFactory)();
}

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
    for (var i = 10; i <= 110; i++) {
      allCoordinates.push(i);
    }
  })(); //Determines the length of the ships
  //Places a new ship at choosen coordinates


  function placeShips(startingPoint, direction, len) {
    var coordinates = [];

    if (direction === 'vertical') {
      for (var i = 0; i < len; i++) {
        coordinates.push(startingPoint);
        startingPoint = startingPoint + 10;
      }
    } else if (direction === 'orizontal') {
      for (var _i = 0; _i < len; _i++) {
        coordinates.push(startingPoint);
        startingPoint = startingPoint + 1;
      }
    }

    var ship = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__.shipFactory)(len);
    shipsArray.push({
      ship: ship,
      coordinates: coordinates
    });
    return coordinates;
  } //Checks if the the selected coordinates are occupied by a ship or not and
  //calls the hit function on that specific ship or marks the miss.


  function receiveAttack(x, y) {
    var hitCoordinates = x + '' + y;

    if (allCoordinates[hitCoordinates] === 'x') {
      return null;
    }

    allCoordinates.splice(hitCoordinates, 1, 'x');
    var returnValue = 'miss';
    shipsArray.forEach(function (ship) {
      ship.coordinates.forEach(function (coord) {
        if (coord == hitCoordinates) {
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

  for (var _i = 0; _i < length; _i++) {
    positionsArray.push(_i);
  }

  var i = 0;

  function hit() {
    positionsArray.splice(i, 1, 'hit');

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
/******/ 			// no module.id needed
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameboardFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboardFactory */ "./src/gameboardFactory.js");
/* harmony import */ var _gameController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameController */ "./src/gameController.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvRE9NLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2FtZWJvYXJkRmFjdG9yeSB9IGZyb20gJy4vZ2FtZWJvYXJkRmFjdG9yeSc7XG5pbXBvcnQgeyBnYW1lUFZQIH0gZnJvbSAnLi9nYW1lQ29udHJvbGxlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVET00oKSB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gIGNvbnN0IGhhbGYxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IHBOYW1lMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBncmlkMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gIGZ1bmN0aW9uIGNyZXRlR3JpZENlbGxzKGdyaWQpIHtcbiAgICBsZXQgeCA9IDE7XG4gICAgbGV0IHkgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZ3JpZC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgIGlmICh5ID09PSAxMCkge1xuICAgICAgfVxuICAgICAgY2VsbC5kYXRhc2V0LnggPSB4O1xuICAgICAgY2VsbC5kYXRhc2V0LnkgPSB5O1xuICAgICAgeCA9IHggKyAxO1xuICAgICAgeSA9IHkgKyAxO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2FtZWJvYXJkRmFjdG9yeSB9IGZyb20gJy4vZ2FtZWJvYXJkRmFjdG9yeSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnYW1lUFZQKCkge1xuICBjb25zdCBwbGF5ZXIxID0gZ2FtZWJvYXJkRmFjdG9yeSgpO1xuICBjb25zdCBwbGF5ZXIyID0gZ2FtZWJvYXJkRmFjdG9yeSgpO1xufVxuIiwiaW1wb3J0IHsgc2hpcEZhY3RvcnkgfSBmcm9tICcuL3NoaXBGYWN0b3J5JztcblxuZXhwb3J0IGNvbnN0IGdhbWVib2FyZEZhY3RvcnkgPSAoKSA9PiB7XG4gIGNvbnN0IHNoaXBzQXJyYXkgPSBbXTtcbiAgY29uc3Qgd3JlY2tlZFNoaXBzID0gW107XG5cbiAgLy9TYXZlcyBhbGwgY29vcmRpbmF0ZXMgc28gdGhlIGdhbWVib2FyZCBjYW4ga2VlcCB0cmFjayBvZiBhbGwgdGhlIG1pc3Nlc1xuICBjb25zdCBhbGxDb29yZGluYXRlcyA9IFtdO1xuICAoZnVuY3Rpb24gY3JlYXRlQ29vcmRpbmF0ZXMoKSB7XG4gICAgZm9yIChsZXQgaSA9IDEwOyBpIDw9IDExMDsgaSsrKSB7XG4gICAgICBhbGxDb29yZGluYXRlcy5wdXNoKGkpO1xuICAgIH1cbiAgfSkoKTtcblxuICAvL0RldGVybWluZXMgdGhlIGxlbmd0aCBvZiB0aGUgc2hpcHNcblxuICAvL1BsYWNlcyBhIG5ldyBzaGlwIGF0IGNob29zZW4gY29vcmRpbmF0ZXNcbiAgZnVuY3Rpb24gcGxhY2VTaGlwcyhzdGFydGluZ1BvaW50LCBkaXJlY3Rpb24sIGxlbikge1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW107XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKHN0YXJ0aW5nUG9pbnQpO1xuICAgICAgICBzdGFydGluZ1BvaW50ID0gc3RhcnRpbmdQb2ludCArIDEwO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnb3Jpem9udGFsJykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKHN0YXJ0aW5nUG9pbnQpO1xuICAgICAgICBzdGFydGluZ1BvaW50ID0gc3RhcnRpbmdQb2ludCArIDE7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHNoaXAgPSBzaGlwRmFjdG9yeShsZW4pO1xuICAgIHNoaXBzQXJyYXkucHVzaCh7IHNoaXAsIGNvb3JkaW5hdGVzIH0pO1xuICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgfVxuXG4gIC8vQ2hlY2tzIGlmIHRoZSB0aGUgc2VsZWN0ZWQgY29vcmRpbmF0ZXMgYXJlIG9jY3VwaWVkIGJ5IGEgc2hpcCBvciBub3QgYW5kXG4gIC8vY2FsbHMgdGhlIGhpdCBmdW5jdGlvbiBvbiB0aGF0IHNwZWNpZmljIHNoaXAgb3IgbWFya3MgdGhlIG1pc3MuXG4gIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuICAgIGNvbnN0IGhpdENvb3JkaW5hdGVzID0geCArICcnICsgeTtcblxuICAgIGlmIChhbGxDb29yZGluYXRlc1toaXRDb29yZGluYXRlc10gPT09ICd4Jykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGFsbENvb3JkaW5hdGVzLnNwbGljZShoaXRDb29yZGluYXRlcywgMSwgJ3gnKTtcblxuICAgIGxldCByZXR1cm5WYWx1ZSA9ICdtaXNzJztcbiAgICBzaGlwc0FycmF5LmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIHNoaXAuY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgICAgaWYgKGNvb3JkID09IGhpdENvb3JkaW5hdGVzKSB7XG4gICAgICAgICAgcmV0dXJuVmFsdWUgPSBzaGlwLnNoaXAuaGl0KCk7XG4gICAgICAgICAgaWYgKHJldHVyblZhbHVlID09PSAnU1VOSyEnKSB7XG4gICAgICAgICAgICB3cmVja2VkU2hpcHMucHVzaChyZXR1cm5WYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cblxuICAvL0NoZWNrcyB3ZXRoZXIgb3Igbm90IGFsbCB0aGUgc2hpcHMgaGF2ZSBiZWVuIHN1bmtcblxuICBmdW5jdGlvbiBhcmVBbGxTaGlwc1dyZWNrZWQoKSB7XG4gICAgaWYgKHdyZWNrZWRTaGlwcy5sZW5ndGggPT09IDEwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHsgc2hpcHNBcnJheSwgcGxhY2VTaGlwcywgcmVjZWl2ZUF0dGFjaywgYXJlQWxsU2hpcHNXcmVja2VkIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IHNoaXBGYWN0b3J5ID0gKGxlbikgPT4ge1xuICBjb25zdCBsZW5ndGggPSBsZW47XG4gIGNvbnN0IHBvc2l0aW9uc0FycmF5ID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHBvc2l0aW9uc0FycmF5LnB1c2goaSk7XG4gIH1cblxuICBsZXQgaSA9IDA7XG5cbiAgZnVuY3Rpb24gaGl0KCkge1xuICAgIHBvc2l0aW9uc0FycmF5LnNwbGljZShpLCAxLCAnaGl0Jyk7XG5cbiAgICBpZiAoaXNTdW5rKCkpIHtcbiAgICAgIHJldHVybiAnU1VOSyEnO1xuICAgIH1cbiAgICBpKys7XG4gICAgcmV0dXJuICdoaXQnO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgIHJldHVybiBwb3NpdGlvbnNBcnJheS5ldmVyeSgocG9zaXRpb24pID0+IHtcbiAgICAgIHJldHVybiBwb3NpdGlvbiA9PT0gJ2hpdCc7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4geyBsZW5ndGgsIGhpdCB9O1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2FtZWJvYXJkRmFjdG9yeSB9IGZyb20gJy4vZ2FtZWJvYXJkRmFjdG9yeSc7XG5pbXBvcnQgeyBnYW1lUFZQIH0gZnJvbSAnLi9nYW1lQ29udHJvbGxlcic7XG5pbXBvcnQgeyBjcmVhdGVET00gfSBmcm9tICcuL0RPTSc7XG4iXSwibmFtZXMiOlsiZ2FtZWJvYXJkRmFjdG9yeSIsImdhbWVQVlAiLCJjcmVhdGVET00iLCJib2R5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaGFsZjEiLCJjcmVhdGVFbGVtZW50IiwicE5hbWUxIiwiZ3JpZDEiLCJjcmV0ZUdyaWRDZWxscyIsImdyaWQiLCJ4IiwieSIsImkiLCJjZWxsIiwiYXBwZW5kQ2hpbGQiLCJkYXRhc2V0IiwicGxheWVyMSIsInBsYXllcjIiLCJzaGlwRmFjdG9yeSIsInNoaXBzQXJyYXkiLCJ3cmVja2VkU2hpcHMiLCJhbGxDb29yZGluYXRlcyIsImNyZWF0ZUNvb3JkaW5hdGVzIiwicHVzaCIsInBsYWNlU2hpcHMiLCJzdGFydGluZ1BvaW50IiwiZGlyZWN0aW9uIiwibGVuIiwiY29vcmRpbmF0ZXMiLCJzaGlwIiwicmVjZWl2ZUF0dGFjayIsImhpdENvb3JkaW5hdGVzIiwic3BsaWNlIiwicmV0dXJuVmFsdWUiLCJmb3JFYWNoIiwiY29vcmQiLCJoaXQiLCJhcmVBbGxTaGlwc1dyZWNrZWQiLCJsZW5ndGgiLCJwb3NpdGlvbnNBcnJheSIsImlzU3VuayIsImV2ZXJ5IiwicG9zaXRpb24iXSwic291cmNlUm9vdCI6IiJ9