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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nfunction showA(msg) {\n    alert(msg);\n}\n\nexports.showA = showA;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9pbXBvcnRBLmpzPzZlNDIiXSwibmFtZXMiOlsic2hvd0EiLCJtc2ciLCJhbGVydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxTQUFTQSxLQUFULENBQWVDLEdBQWYsRUFBbUI7QUFDZkMsVUFBTUQsR0FBTjtBQUNIOztRQUVnQkQsSyxHQUFUQSxLIiwiZmlsZSI6Ii4vaW1wb3J0QS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNob3dBKG1zZyl7XHJcbiAgICBhbGVydChtc2cpXHJcbn1cclxuXHJcbmV4cG9ydCB7c2hvd0EgYXMgc2hvd0F9XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./importA.js\n");

/***/ }),

/***/ "./importB.js":
/*!********************!*\
  !*** ./importB.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nfunction showB(msg) {\n    console.log(msg);\n}\n\nexports.showB = showB;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9pbXBvcnRCLmpzP2Q3NzgiXSwibmFtZXMiOlsic2hvd0IiLCJtc2ciLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLFNBQVNBLEtBQVQsQ0FBZUMsR0FBZixFQUFtQjtBQUNmQyxZQUFRQyxHQUFSLENBQVlGLEdBQVo7QUFDSDs7UUFFZ0JELEssR0FBVEEsSyIsImZpbGUiOiIuL2ltcG9ydEIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBzaG93Qihtc2cpe1xyXG4gICAgY29uc29sZS5sb2cobXNnKVxyXG59XHJcblxyXG5leHBvcnQge3Nob3dCIGFzIHNob3dCfSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./importB.js\n");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _importA = __webpack_require__(/*! ./importA */ \"./importA.js\");\n\nvar _importB = __webpack_require__(/*! ./importB */ \"./importB.js\");\n\n(0, _importA.showA)(\"hello w\");\n(0, _importB.showB)(\"hello w\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9tYWluLmpzPzFkNTAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQSxvQkFBRSxTQUFGO0FBQ0Esb0JBQUUsU0FBRiIsImZpbGUiOiIuL21haW4uanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3Nob3dBIGFzIGF9IGZyb20gJy4vaW1wb3J0QSc7XHJcbmltcG9ydCB7c2hvd0IgYXMgYn0gZnJvbSAnLi9pbXBvcnRCJ1xyXG5hKFwiaGVsbG8gd1wiKTtcclxuYihcImhlbGxvIHdcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./main.js\n");

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