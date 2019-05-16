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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Board; });\nconst MOVE_OFFSETS = [[-1,-2], [-1,2], [1,-2], [1,2], [-2,-1], [-2,1], [2,-1], [2,1]];\n\nclass Board {\n    constructor(canvas, ctx) {\n        this.width = canvas.width;\n        this.height = canvas.height;\n        this.boardSize = 8;\n        this.squareHeight = this.height/this.boardSize;\n        this.boardArray = [...Array(8)].map(e => new Array(this.boardSize).fill('X'));\n        this.boardGraph = {};\n        this.numSquares = 8;\n        this.ctx = ctx;\n        this.ctx.fillRect(0, 0, 70, 70);\n        this.buildGraph();\n        this.renderBoard();\n\n    }\n\n    //given a position on the board, returns all\n    //possible knight moves from that position\n    possibleKnightMoves(position) {\n        let moves = [];\n        MOVE_OFFSETS.forEach(move => {\n            let row = position[0];\n            let col = position[1];\n            let rowOffset = move[0];\n            let colOffset = move[1];\n            let newRow = row + rowOffset;\n            let newCol = col + colOffset;\n            ((0 <= newRow)&&(newRow <= this.boardSize - 1)&&(0 <= newCol)&&(newCol <= this.boardSize - 1)) ?\n            moves.push([newRow, newCol]) : null\n        })\n        return moves;\n    }\n\n    //builds graph with positions on the board as keys and all \n    //possible knight moves from the key position as values\n    buildGraph() {\n        for (let i=0; i<this.boardSize; i+=1) {\n            for (let j=0; j<this.boardSize; j+=1) {\n                this.boardGraph[[i,j]] = this.possibleKnightMoves([i,j]);\n            }\n        }\n    }\n\n    renderBoard() {\n        // let img = new Image();\n        // img.src = \"https://cdn3.iconfinder.com/data/icons/sports-2-5/512/66-512.png\";\n        // debugger\n        \n        this.boardArray.forEach((row, x) => {\n            row.forEach((el, y) => {\n                let canvasCoords = this.arrayToCanvas([x, y]);\n                if (x === 0 && y === 0) {\n                    // this.ctx.drawImage(img, canvasCoords[0], canvasCoords[1], this.squareHeight, this.squareHeight);\n                    this.ctx.fillStyle = \"#B7B6AC\";\n                    this.ctx.fillRect(canvasCoords[0], canvasCoords[1], this.squareHeight, this.squareHeight);\n                } else if ((x + y) % 2 === 0) {\n                    // debugger\n                    this.ctx.fillStyle = \"#f0ead6\";\n                    this.ctx.fillRect(canvasCoords[0], canvasCoords[1], this.squareHeight, this.squareHeight);\n                }\n\n            })\n        })\n\n    }\n\n    arrayToCanvas(arrayCoordinates) {\n        return [this.squareHeight * arrayCoordinates[1], this.squareHeight * arrayCoordinates[0]];\n    }\n\n    dfs(start) {\n        \n    }\n\n}\n\n\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/board.js\");\n\n// const Board = require('./board');\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const canvas = document.getElementById(\"canvas\");\n    const ctx = canvas.getContext('2d');\n    // debugger\n    let board = new _board__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas, ctx);\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });