/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ships.js":
/*!**********************!*\
  !*** ./src/ships.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shipFactory": () => (/* binding */ shipFactory)
/* harmony export */ });
var shipFactory = function shipFactory(shipLength, coordinates) {
  var length = shipLength;
  var positionArray = []; //The array is going to be used to remove each number that was hit

  for (var i = 1; i <= length; i++) {
    positionArray.push(i);
  } //Checks if the coordinates are still in the array and if they are removes and replaces them with 'hit'
  //so when the array contains only 'hit' items the isSunk function will be called


  function hit(position) {
    var checker = false;
    positionArray.forEach(function (coord) {
      if (position === coord) {
        positionArray.splice(coord - 1, 1, 'hit');
        checker = true;
      }
    });
    return checker;
  } //Checks if the positionArray contains only 'hit' items and if it does it declares it  sunk


  function isSunk() {
    var sank = positionArray.every(function (ele) {
      return ele === 'hit';
    });
    return sank;
  }

  return {
    hit: hit,
    isSunk: isSunk,
    length: length
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
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ "./src/ships.js");

var ship = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.shipFactory)(4);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPLElBQU1BLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUNDLFVBQUQsRUFBYUMsV0FBYixFQUE2QjtBQUN0RCxNQUFNQyxNQUFNLEdBQUdGLFVBQWY7QUFDQSxNQUFNRyxhQUFhLEdBQUcsRUFBdEIsQ0FGc0QsQ0FJdEQ7O0FBQ0EsT0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxJQUFJRixNQUFyQixFQUE2QkUsQ0FBQyxFQUE5QixFQUFrQztBQUNoQ0QsSUFBQUEsYUFBYSxDQUFDRSxJQUFkLENBQW1CRCxDQUFuQjtBQUNELEdBUHFELENBU3REO0FBQ0E7OztBQUNBLFdBQVNFLEdBQVQsQ0FBYUMsUUFBYixFQUF1QjtBQUNyQixRQUFJQyxPQUFPLEdBQUcsS0FBZDtBQUVBTCxJQUFBQSxhQUFhLENBQUNNLE9BQWQsQ0FBc0IsVUFBQ0MsS0FBRCxFQUFXO0FBQy9CLFVBQUlILFFBQVEsS0FBS0csS0FBakIsRUFBd0I7QUFDdEJQLFFBQUFBLGFBQWEsQ0FBQ1EsTUFBZCxDQUFxQkQsS0FBSyxHQUFHLENBQTdCLEVBQWdDLENBQWhDLEVBQW1DLEtBQW5DO0FBQ0FGLFFBQUFBLE9BQU8sR0FBRyxJQUFWO0FBQ0Q7QUFDRixLQUxEO0FBT0EsV0FBT0EsT0FBUDtBQUNELEdBdEJxRCxDQXVCdEQ7OztBQUNBLFdBQVNJLE1BQVQsR0FBa0I7QUFDaEIsUUFBTUMsSUFBSSxHQUFHVixhQUFhLENBQUNXLEtBQWQsQ0FBb0IsVUFBQ0MsR0FBRCxFQUFTO0FBQ3hDLGFBQU9BLEdBQUcsS0FBSyxLQUFmO0FBQ0QsS0FGWSxDQUFiO0FBR0EsV0FBT0YsSUFBUDtBQUNEOztBQUVELFNBQU87QUFBRVAsSUFBQUEsR0FBRyxFQUFIQSxHQUFGO0FBQU9NLElBQUFBLE1BQU0sRUFBTkEsTUFBUDtBQUFlVixJQUFBQSxNQUFNLEVBQU5BO0FBQWYsR0FBUDtBQUNELENBaENNOzs7Ozs7VUNBUDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7QUFFQSxJQUFNYyxJQUFJLEdBQUdqQixtREFBVyxDQUFDLENBQUQsQ0FBeEIsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHNoaXBGYWN0b3J5ID0gKHNoaXBMZW5ndGgsIGNvb3JkaW5hdGVzKSA9PiB7XG4gIGNvbnN0IGxlbmd0aCA9IHNoaXBMZW5ndGg7XG4gIGNvbnN0IHBvc2l0aW9uQXJyYXkgPSBbXTtcblxuICAvL1RoZSBhcnJheSBpcyBnb2luZyB0byBiZSB1c2VkIHRvIHJlbW92ZSBlYWNoIG51bWJlciB0aGF0IHdhcyBoaXRcbiAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcbiAgICBwb3NpdGlvbkFycmF5LnB1c2goaSk7XG4gIH1cblxuICAvL0NoZWNrcyBpZiB0aGUgY29vcmRpbmF0ZXMgYXJlIHN0aWxsIGluIHRoZSBhcnJheSBhbmQgaWYgdGhleSBhcmUgcmVtb3ZlcyBhbmQgcmVwbGFjZXMgdGhlbSB3aXRoICdoaXQnXG4gIC8vc28gd2hlbiB0aGUgYXJyYXkgY29udGFpbnMgb25seSAnaGl0JyBpdGVtcyB0aGUgaXNTdW5rIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkXG4gIGZ1bmN0aW9uIGhpdChwb3NpdGlvbikge1xuICAgIGxldCBjaGVja2VyID0gZmFsc2U7XG5cbiAgICBwb3NpdGlvbkFycmF5LmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBpZiAocG9zaXRpb24gPT09IGNvb3JkKSB7XG4gICAgICAgIHBvc2l0aW9uQXJyYXkuc3BsaWNlKGNvb3JkIC0gMSwgMSwgJ2hpdCcpO1xuICAgICAgICBjaGVja2VyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjaGVja2VyO1xuICB9XG4gIC8vQ2hlY2tzIGlmIHRoZSBwb3NpdGlvbkFycmF5IGNvbnRhaW5zIG9ubHkgJ2hpdCcgaXRlbXMgYW5kIGlmIGl0IGRvZXMgaXQgZGVjbGFyZXMgaXQgIHN1bmtcbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgIGNvbnN0IHNhbmsgPSBwb3NpdGlvbkFycmF5LmV2ZXJ5KChlbGUpID0+IHtcbiAgICAgIHJldHVybiBlbGUgPT09ICdoaXQnO1xuICAgIH0pO1xuICAgIHJldHVybiBzYW5rO1xuICB9XG5cbiAgcmV0dXJuIHsgaGl0LCBpc1N1bmssIGxlbmd0aCB9O1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgc2hpcEZhY3RvcnkgfSBmcm9tICcuL3NoaXBzJztcblxuY29uc3Qgc2hpcCA9IHNoaXBGYWN0b3J5KDQpO1xuIl0sIm5hbWVzIjpbInNoaXBGYWN0b3J5Iiwic2hpcExlbmd0aCIsImNvb3JkaW5hdGVzIiwibGVuZ3RoIiwicG9zaXRpb25BcnJheSIsImkiLCJwdXNoIiwiaGl0IiwicG9zaXRpb24iLCJjaGVja2VyIiwiZm9yRWFjaCIsImNvb3JkIiwic3BsaWNlIiwiaXNTdW5rIiwic2FuayIsImV2ZXJ5IiwiZWxlIiwic2hpcCJdLCJzb3VyY2VSb290IjoiIn0=