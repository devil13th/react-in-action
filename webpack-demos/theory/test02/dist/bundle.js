/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./importA.js":
/*!********************!*\
  !*** ./importA.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction showA(msg) {\n    alert(msg);\n}\n\nmodule.exports = showA;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9pbXBvcnRBLmpzPzZlNDIiXSwibmFtZXMiOlsic2hvd0EiLCJtc2ciLCJhbGVydCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsU0FBU0EsS0FBVCxDQUFlQyxHQUFmLEVBQW1CO0FBQ2ZDLFVBQU1ELEdBQU47QUFDSDs7QUFFREUsT0FBT0MsT0FBUCxHQUFpQkosS0FBakIiLCJmaWxlIjoiLi9pbXBvcnRBLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gc2hvd0EobXNnKXtcclxuICAgIGFsZXJ0KG1zZylcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzaG93QTtcclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./importA.js\n");

/***/ }),

/***/ "./importB.js":
/*!********************!*\
  !*** ./importB.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction showB(msg) {\n    console.log(msg);\n}\n\nmodule.exports = showB;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9pbXBvcnRCLmpzP2Q3NzgiXSwibmFtZXMiOlsic2hvd0IiLCJtc2ciLCJjb25zb2xlIiwibG9nIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUFTQSxLQUFULENBQWVDLEdBQWYsRUFBbUI7QUFDZkMsWUFBUUMsR0FBUixDQUFZRixHQUFaO0FBQ0g7O0FBRURHLE9BQU9DLE9BQVAsR0FBaUJMLEtBQWpCIiwiZmlsZSI6Ii4vaW1wb3J0Qi5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNob3dCKG1zZyl7XHJcbiAgICBjb25zb2xlLmxvZyhtc2cpXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc2hvd0I7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./importB.js\n");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar a = __webpack_require__(/*! ./importA */ \"./importA.js\");\nvar b = __webpack_require__(/*! ./importB */ \"./importB.js\");\n\na(\"hello w\");\nb(\"hello w\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9tYWluLmpzPzFkNTAiXSwibmFtZXMiOlsiYSIsInJlcXVpcmUiLCJiIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLElBQUksbUJBQUFDLENBQVEsK0JBQVIsQ0FBUjtBQUNBLElBQUlDLElBQUksbUJBQUFELENBQVEsK0JBQVIsQ0FBUjs7QUFFQUQsRUFBRSxTQUFGO0FBQ0FFLEVBQUUsU0FBRiIsImZpbGUiOiIuL21haW4uanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgYSA9IHJlcXVpcmUoJy4vaW1wb3J0QScpO1xyXG5sZXQgYiA9IHJlcXVpcmUoJy4vaW1wb3J0QicpO1xyXG5cclxuYShcImhlbGxvIHdcIik7XHJcbmIoXCJoZWxsbyB3XCIpOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./main.js\n");

/***/ }),

/***/ 0:
/*!***********************!*\
  !*** multi ./main.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./main.js */"./main.js");


/***/ })

/******/ });