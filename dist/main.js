/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
  var ships = [];
  var coordinates = [];

  (function createCoordinates() {
    for (var i = 1; i <= 100; i++) {
      coordinates.push(i);
    }
  })(); //Creates a new ship, it will be used when the user clicks on the grid


  function placeShip(len, coord) {
    var ship = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__.shipFactory)(len, coord);
    var coordinates = coord.split(',');
    ships.push({
      ship: ship,
      coordinates: coordinates
    });
  }

  function receiveAttack(attackedCoord) {
    var attack = attackedCoord;
    var checker = ships.forEach(function (ship, i) {
      ship.coordinates.forEach(function (coord) {
        if (coord === attack) {
          ship.ship.hit(attack);
          return attack;
        }
      });
    });
    return checker;
  }

  return {
    placeShip: placeShip,
    receiveAttack: receiveAttack
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
var shipFactory = function shipFactory(len, coord) {
  var length = len;
  var coordinates = coord.split(',');

  function hit(hitPosition) {
    if (isSunk()) {
      return 'SUNK!';
    }

    var positionHit = coordinates.find(function (coord, i) {
      if (coord == hitPosition) {
        coordinates.splice(i, 1, 'hit');
        return coord;
      }
    });
    return parseInt(positionHit);
  }

  function isSunk() {
    return coordinates.every(function (coord) {
      return coord === 'hit';
    });
  }

  return {
    length: length,
    hit: hit,
    isSunk: isSunk
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
/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipFactory */ "./src/shipFactory.js");
/* harmony import */ var _gameboardFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboardFactory */ "./src/gameboardFactory.js");


var ship = (0,_gameboardFactory__WEBPACK_IMPORTED_MODULE_1__.gameboardFactory)();
ship.placeShip(3, '12,13,14');
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFFQSxJQUFNVixJQUFJLEdBQUdULG1FQUFnQixFQUE3QjtBQUVBUyxJQUFJLENBQUNILFNBQUwsQ0FBZSxDQUFmLEVBQWtCLFVBQWxCLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzaGlwRmFjdG9yeSB9IGZyb20gJy4vc2hpcEZhY3RvcnknO1xuXG5leHBvcnQgY29uc3QgZ2FtZWJvYXJkRmFjdG9yeSA9ICgpID0+IHtcbiAgY29uc3Qgc2hpcHMgPSBbXTtcblxuICBjb25zdCBjb29yZGluYXRlcyA9IFtdO1xuICAoZnVuY3Rpb24gY3JlYXRlQ29vcmRpbmF0ZXMoKSB7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTAwOyBpKyspIHtcbiAgICAgIGNvb3JkaW5hdGVzLnB1c2goaSk7XG4gICAgfVxuICB9KSgpO1xuXG4gIC8vQ3JlYXRlcyBhIG5ldyBzaGlwLCBpdCB3aWxsIGJlIHVzZWQgd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIGdyaWRcbiAgZnVuY3Rpb24gcGxhY2VTaGlwKGxlbiwgY29vcmQpIHtcbiAgICBjb25zdCBzaGlwID0gc2hpcEZhY3RvcnkobGVuLCBjb29yZCk7XG5cbiAgICBjb25zdCBjb29yZGluYXRlcyA9IGNvb3JkLnNwbGl0KCcsJyk7XG5cbiAgICBzaGlwcy5wdXNoKHsgc2hpcCwgY29vcmRpbmF0ZXMgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKGF0dGFja2VkQ29vcmQpIHtcbiAgICBjb25zdCBhdHRhY2sgPSBhdHRhY2tlZENvb3JkO1xuXG4gICAgY29uc3QgY2hlY2tlciA9IHNoaXBzLmZvckVhY2goKHNoaXAsIGkpID0+IHtcbiAgICAgIHNoaXAuY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgICAgaWYgKGNvb3JkID09PSBhdHRhY2spIHtcbiAgICAgICAgICBzaGlwLnNoaXAuaGl0KGF0dGFjayk7XG4gICAgICAgICAgcmV0dXJuIGF0dGFjaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY2hlY2tlcjtcbiAgfVxuXG4gIHJldHVybiB7IHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjayB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBzaGlwRmFjdG9yeSA9IChsZW4sIGNvb3JkKSA9PiB7XG4gIGNvbnN0IGxlbmd0aCA9IGxlbjtcbiAgY29uc3QgY29vcmRpbmF0ZXMgPSBjb29yZC5zcGxpdCgnLCcpO1xuXG4gIGZ1bmN0aW9uIGhpdChoaXRQb3NpdGlvbikge1xuICAgIGlmIChpc1N1bmsoKSkge1xuICAgICAgcmV0dXJuICdTVU5LISc7XG4gICAgfVxuICAgIGNvbnN0IHBvc2l0aW9uSGl0ID0gY29vcmRpbmF0ZXMuZmluZCgoY29vcmQsIGkpID0+IHtcbiAgICAgIGlmIChjb29yZCA9PSBoaXRQb3NpdGlvbikge1xuICAgICAgICBjb29yZGluYXRlcy5zcGxpY2UoaSwgMSwgJ2hpdCcpO1xuICAgICAgICByZXR1cm4gY29vcmQ7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGFyc2VJbnQocG9zaXRpb25IaXQpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgIHJldHVybiBjb29yZGluYXRlcy5ldmVyeSgoY29vcmQpID0+IHtcbiAgICAgIHJldHVybiBjb29yZCA9PT0gJ2hpdCc7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4geyBsZW5ndGgsIGhpdCwgaXNTdW5rIH07XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBzaGlwRmFjdG9yeSB9IGZyb20gJy4vc2hpcEZhY3RvcnknO1xuaW1wb3J0IHsgZ2FtZWJvYXJkRmFjdG9yeSB9IGZyb20gJy4vZ2FtZWJvYXJkRmFjdG9yeSc7XG5cbmNvbnN0IHNoaXAgPSBnYW1lYm9hcmRGYWN0b3J5KCk7XG5cbnNoaXAucGxhY2VTaGlwKDMsICcxMiwxMywxNCcpO1xuIl0sIm5hbWVzIjpbInNoaXBGYWN0b3J5IiwiZ2FtZWJvYXJkRmFjdG9yeSIsInNoaXBzIiwiY29vcmRpbmF0ZXMiLCJjcmVhdGVDb29yZGluYXRlcyIsImkiLCJwdXNoIiwicGxhY2VTaGlwIiwibGVuIiwiY29vcmQiLCJzaGlwIiwic3BsaXQiLCJyZWNlaXZlQXR0YWNrIiwiYXR0YWNrZWRDb29yZCIsImF0dGFjayIsImNoZWNrZXIiLCJmb3JFYWNoIiwiaGl0IiwibGVuZ3RoIiwiaGl0UG9zaXRpb24iLCJpc1N1bmsiLCJwb3NpdGlvbkhpdCIsImZpbmQiLCJzcGxpY2UiLCJwYXJzZUludCIsImV2ZXJ5Il0sInNvdXJjZVJvb3QiOiIifQ==