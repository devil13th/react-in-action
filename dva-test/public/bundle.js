/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	eval("import dva from 'dva';\nimport './index.css';\nimport createLoading from 'dva-loading';\n\n// 1. Initialize\nconst app = dva({\n  initialState: {\n    inputs: { input: 'devil13th' }\n  },\n});\n\napp.model(__webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module \\\"./models/list\\\"\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));\napp.model(__webpack_require__(3));\n\n// 2. Plugins\n// app.use({});\napp.use(createLoading({})); // 开启loading  createLoading的参数opts 仅有一个 namespace 字段，默认为 loading。\n\n// 3. Model\n// app.model(require('./models/example'));\n\n// 4. Router\napp.router(__webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module \\\"./router\\\"\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));\n\n// 5. Start\napp.start('#root');\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/OTU1MiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2Isd0JBQXdCLEdBQUc7O0FBRTNCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6IjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZHZhIGZyb20gJ2R2YSc7XG5pbXBvcnQgJy4vaW5kZXguY3NzJztcbmltcG9ydCBjcmVhdGVMb2FkaW5nIGZyb20gJ2R2YS1sb2FkaW5nJztcblxuLy8gMS4gSW5pdGlhbGl6ZVxuY29uc3QgYXBwID0gZHZhKHtcbiAgaW5pdGlhbFN0YXRlOiB7XG4gICAgaW5wdXRzOiB7IGlucHV0OiAnZGV2aWwxM3RoJyB9XG4gIH0sXG59KTtcblxuYXBwLm1vZGVsKHJlcXVpcmUoJy4vbW9kZWxzL2xpc3QnKSk7XG5hcHAubW9kZWwocmVxdWlyZSgnLi9tb2RlbHMvYWRkJykpO1xuXG4vLyAyLiBQbHVnaW5zXG4vLyBhcHAudXNlKHt9KTtcbmFwcC51c2UoY3JlYXRlTG9hZGluZyh7fSkpOyAvLyDlvIDlkK9sb2FkaW5nICBjcmVhdGVMb2FkaW5n55qE5Y+C5pWwb3B0cyDku4XmnInkuIDkuKogbmFtZXNwYWNlIOWtl+aute+8jOm7mOiupOS4uiBsb2FkaW5n44CCXG5cbi8vIDMuIE1vZGVsXG4vLyBhcHAubW9kZWwocmVxdWlyZSgnLi9tb2RlbHMvZXhhbXBsZScpKTtcblxuLy8gNC4gUm91dGVyXG5hcHAucm91dGVyKHJlcXVpcmUoJy4vcm91dGVyJykpO1xuXG4vLyA1LiBTdGFydFxuYXBwLnN0YXJ0KCcjcm9vdCcpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

	eval("/**\n * Created by chengfan on 2017/5/24.\n */\nexport default {\n  namespace: 'inputs',\n  state: {\n    input: 'name',\n  },\n  effects: {\n    *change({payload:name}, { call, put, select }) {\n      yield put({type:'change2',payload:name});\n      //调用其他模块的reducers\n      yield put({type:'lists/add',payload:name});\n    },\n  },\n\n  reducers: {\n    change2(state, { payload: name }) {\n      console.log(state);\n      return { input: name };\n    },\n  },\n};\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL2FkZC5qcz9jM2FjIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsYUFBYSxhQUFhLEdBQUcsb0JBQW9CO0FBQ2pELGlCQUFpQiw0QkFBNEI7QUFDN0M7QUFDQSxpQkFBaUIsOEJBQThCO0FBQy9DLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0Esb0JBQW9CLGdCQUFnQjtBQUNwQztBQUNBLGNBQWM7QUFDZCxLQUFLO0FBQ0wsR0FBRztBQUNIIiwiZmlsZSI6IjMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgY2hlbmdmYW4gb24gMjAxNy81LzI0LlxuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWVzcGFjZTogJ2lucHV0cycsXG4gIHN0YXRlOiB7XG4gICAgaW5wdXQ6ICduYW1lJyxcbiAgfSxcbiAgZWZmZWN0czoge1xuICAgICpjaGFuZ2Uoe3BheWxvYWQ6bmFtZX0sIHsgY2FsbCwgcHV0LCBzZWxlY3QgfSkge1xuICAgICAgeWllbGQgcHV0KHt0eXBlOidjaGFuZ2UyJyxwYXlsb2FkOm5hbWV9KTtcbiAgICAgIC8v6LCD55So5YW25LuW5qih5Z2X55qEcmVkdWNlcnNcbiAgICAgIHlpZWxkIHB1dCh7dHlwZTonbGlzdHMvYWRkJyxwYXlsb2FkOm5hbWV9KTtcbiAgICB9LFxuICB9LFxuXG4gIHJlZHVjZXJzOiB7XG4gICAgY2hhbmdlMihzdGF0ZSwgeyBwYXlsb2FkOiBuYW1lIH0pIHtcbiAgICAgIGNvbnNvbGUubG9nKHN0YXRlKTtcbiAgICAgIHJldHVybiB7IGlucHV0OiBuYW1lIH07XG4gICAgfSxcbiAgfSxcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb2RlbHMvYWRkLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ })
/******/ ]);