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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Board; });\n/* harmony import */ var _knight__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./knight */ \"./src/knight.js\");\n/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./path */ \"./src/path.js\");\nconst MOVE_OFFSETS = [[2,1], [1,2], [-1,2], [-2,1], [-2,-1], [-1,-2], [1,-2], [2,-1]];\n\n\nlet stop = false;\n\nclass Board {\n    constructor(canvas, ctx, numIterDOM, msgDOM, intervalDOM) {\n        this.ctx = ctx;\n        this.numIterDOM = numIterDOM;\n        this.msgDOM = msgDOM;\n        this.interval = parseInt(intervalDOM.value);\n        this.width = canvas.width;\n        this.height = canvas.height;\n        this.boardRows = 8;\n        this.boardCols = 8;\n        this.squareHeight = this.height/this.boardRows;\n        this.squareWidth = this.width/this.boardCols;\n        this.boardArray = [...Array(this.boardRows)].map(e => new Array(this.boardCols).fill('X'));\n        this.boardGraph = {};\n        this.knight = new Image();\n        // this.knight.src = \"https://cdn3.iconfinder.com/data/icons/sports-2-5/512/66-512.png\";\n        // this.knight.src = \"https://raw.githubusercontent.com/ognjenvucko/knights-tour/master/images/horse.png\";\n        // this.knight.src = \"https://image.flaticon.com/icons/svg/179/179650.svg\";\n        // this.knight.src = \"https://image.flaticon.com/icons/svg/32/32658.svg\";\n        // this.knight.src = \"https://image.flaticon.com/icons/png/512/1626/1626881.png\";\n        this.knight.src = \"https://image.flaticon.com/icons/svg/726/726165.svg\";\n\n        this.knightTransparent = new Image();\n        this.knightTransparent.src = \"https://raw.githubusercontent.com/ognjenvucko/knights-tour/master/images/horse2.png\";\n        //Colors\n        // this.purple = \"#251F7CB3\";\n        // this.purple = \"rgba(37, 31, 124, 70)\";\n        this.purple = \"rgb(21, 50, 216)\";\n        this.purpleDarkened = \"rgba(13, 62, 141, 0.733)\";\n        this.lightDarkened = \"rgba(163, 161, 156, 0.76)\";\n        this.light = \"#f0ead6\";\n        this.possibleSquare = \"rgb(156, 233, 210)\";\n\n        //Bind functions\n        this.warnsdorff = this.warnsdorff.bind(this);\n        this.backtracking = this.backtracking.bind(this);\n\n        //Build knight's graph and render initial board\n        // this.buildGraph();\n        this.renderBoard();\n    }\n\n    changeInterval(e) {\n        // debugger\n        this.interval = e.target.value;\n    }\n\n    //builds graph with positions on the board as keys and all \n    //possible knight moves from the key position as values\n    buildGraph() {\n        for (let i=0; i<this.boardRows; i+=1) {\n            for (let j=0; j<this.boardCols; j+=1) {\n                this.boardGraph[[i,j]] = this.possibleKnightMoves([i,j]);\n            }\n        }\n    }\n\n    //render functions\n    renderSquare(pos) {\n        let x = pos[0];\n        let y = pos[1];\n        let canvasCoords = this.arrayToCanvas([x, y]);\n        if ((x + y) % 2 === 0) {\n            this.ctx.fillStyle = this.light;\n            this.ctx.fillRect(canvasCoords[0], canvasCoords[1], this.squareWidth, this.squareHeight);\n        } else {\n            this.ctx.fillStyle = this.purple;\n            this.ctx.fillRect(canvasCoords[0], canvasCoords[1], this.squareWidth, this.squareHeight);\n        }\n    }\n\n    renderSquareDarkened(pos) {\n        let x = pos[0];\n        let y = pos[1];\n        let canvasCoords = this.arrayToCanvas([x, y]);\n        if ((x + y) % 2 === 0) {\n            this.ctx.fillStyle = this.lightDarkened;\n            this.ctx.fillRect(canvasCoords[0], canvasCoords[1], this.squareWidth, this.squareHeight);\n        } else {\n            this.ctx.fillStyle = this.purpleDarkened;\n            this.ctx.fillRect(canvasCoords[0], canvasCoords[1], this.squareWidth, this.squareHeight);\n        }\n    }\n\n    clearSquare(pos) {\n        let x = pos[0];\n        let y = pos[1];\n        let canvasCoords = this.arrayToCanvas([x, y]);\n        this.ctx.clearRect(canvasCoords[0], canvasCoords[1], this.squareWidth, this.squareHeight);\n    }\n\n    renderKnight(pos, transparent = null) {\n        let x = pos[0];\n        let y = pos[1];\n        let canvasCoords = this.arrayToCanvas([x, y]);\n        if (transparent) {\n            this.ctx.drawImage(this.knightTransparent, canvasCoords[0] + 15, canvasCoords[1] + 15, this.squareWidth - 30, this.squareHeight - 30);\n        } else {\n            this.ctx.drawImage(this.knight, canvasCoords[0] + 15, canvasCoords[1] + 15, this.squareWidth - 30, this.squareHeight - 30);\n        }\n    }\n\n    renderNum (pos, numAsString) {\n        let x = pos[0];\n        let y = pos[1];\n        let canvasCoords = this.arrayToCanvas([x, y]);\n        this.ctx.fillStyle = \"#000000\";\n        this.ctx.font = \"34px Trebuchet MS\";\n        this.ctx.fillText(numAsString, canvasCoords[0] + 22, canvasCoords[1] + 43);\n        this.ctx.fill();\n    }\n\n    //helper method for render path\n    renderLine(pos1, pos2, color=\"#000000\") {\n        // this.ctx.clearRect(0, 0, this.width, this.height);\n        // this.renderBoard();\n        let x1 = pos1[0];\n        let y1 = pos1[1];\n        let canvasCoords1 = this.arrayToCanvas([x1, y1]);\n        canvasCoords1[0] += this.squareWidth/2;\n        canvasCoords1[1] += this.squareHeight/2;\n\n        let x2 = pos2[0];\n        let y2 = pos2[1];\n        let canvasCoords2 = this.arrayToCanvas([x2, y2]);\n        canvasCoords2[0] += this.squareWidth/2;\n        canvasCoords2[1] += this.squareHeight/2;\n        this.ctx.fillStyle = color;\n        this.ctx.lineWidth = 3.5;\n        this.ctx.beginPath();\n        this.ctx.arc(canvasCoords1[0], canvasCoords1[1], 5, 0, 2 * Math.PI);\n    \n        this.ctx.moveTo(canvasCoords1[0], canvasCoords1[1]);\n        this.ctx.lineTo(canvasCoords2[0], canvasCoords2[1]);\n        this.ctx.arc(canvasCoords2[0], canvasCoords2[1], 5, 0, 2 * Math.PI);\n     \n        this.ctx.fill();\n        this.ctx.strokeStyle = color;\n        this.ctx.stroke();\n        // this.ctx.fill();\n    }\n\n    renderPath(path) {\n        this.ctx.clearRect(0, 0, this.width, this.height);\n        this.renderBoard();\n        if (path.length === 1) this.renderKnight(path[0]);\n        for (let i=0; i<path.length-1; i+=1){\n            this.renderLine(path[i], path[i+1]);\n            if (i === path.length-2) this.renderKnight(path[i+1]);\n        }\n    }\n\n    renderPathTimeout(path, interval) {\n        setTimeout(() => {\n            this.ctx.clearRect(0, 0, this.width, this.height);\n            this.renderBoard();\n            if (path.length === 1) this.renderKnight(path[0]);\n            for (let i=0; i<path.length-1; i+=1){\n                this.renderLine(path[i], path[i+1]);\n                if (i === path.length-2) this.renderKnight(path[i+1]);\n            }\n        }, interval);\n    }\n\n    renderPathWithoutClearing(path) {\n        if (path.length === 1) this.renderKnight(path[0]);\n        for (let i = 0; i < path.length - 1; i += 1) {\n            this.renderLine(path[i], path[i + 1]);\n            if (i === path.length - 2) this.renderKnight(path[i + 1]);\n        }\n    }\n\n    renderPossibleNextMove(pos) {\n        let x = pos[0];\n        let y = pos[1];\n        let canvasCoords = this.arrayToCanvas([x, y]);\n        this.ctx.fillStyle = this.possibleSquare;\n        this.ctx.fillRect(canvasCoords[0], canvasCoords[1], this.squareWidth, this.squareHeight);\n    }\n\n    renderBoard() {\n        this.boardArray.forEach((row, x) => {\n            row.forEach((el, y) => {\n                this.renderSquare([x, y]);\n            });\n        });\n    }\n\n    arrayToCanvas(arrayCoordinates) {\n        return [this.squareWidth * arrayCoordinates[1], this.squareHeight * arrayCoordinates[0]];\n    }\n\n    randomPosition() {\n        return [Math.floor(Math.random() * (this.boardRows)), Math.floor(Math.random() * (this.boardCols))];\n    }\n\n    //works for sub arrays of length 2 representing moves\n    includesArr(arr, subArr) {\n        let answer = false;\n        arr.forEach(sub => {\n            if (sub[0] === subArr[0] && sub[1] === subArr[1]) answer = true;\n        })\n        return answer;\n    }\n\n    //given a position on the board, returns all\n    //possible knight moves from that position\n    possibleKnightMoves(position, alreadyVisited=[]) {\n        let moves = [];\n        MOVE_OFFSETS.forEach(move => {\n            let row = position[0];\n            let col = position[1];\n            let rowOffset = move[0];\n            let colOffset = move[1];\n            let newRow = row + rowOffset;\n            let newCol = col + colOffset;\n            if ((0 <= newRow) && (newRow <= this.boardRows - 1) && (0 <= newCol) && (newCol <= this.boardCols - 1)) {\n                moves.push([newRow, newCol]);\n                this.numIterDOM.innerText = 1 + parseInt(this.numIterDOM.innerText);\n            } else {\n                return;\n            }\n        })\n        if (alreadyVisited.length > 0) {\n            moves = moves.map(move => !(this.includesArr(alreadyVisited, move)) ? move : undefined);\n            moves = moves.filter(move => move != undefined);\n        }\n        return moves;\n    }\n\n    //1. Set random intial position\n    //2. move to position that has the minimum viable moves from it.\n    //3. continue until the tour is complete or there is nowhere else to move.\n    warnsdorff(pos=this.randomPosition()) {\n        this.renderBoard();\n        this.msgDOM.innerText = \"\";\n        this.numIterDOM.innerText = 0;\n        let alreadyVisited = [];\n\n        const nextIter = () => {\n            alreadyVisited.push(pos);      \n            this.renderPath(alreadyVisited);\n            \n            if (this.warnsdorffNextMove(pos, alreadyVisited).length > 0) {\n                pos = this.warnsdorffNextMove(pos, alreadyVisited);\n                setTimeout(() => nextIter(), this.interval);\n            } else {\n                (alreadyVisited.length === this.boardRows * this.boardCols) ? this.msgDOM.innerText = \"Success\" \n                : this.msgDOM.innerText = \"Failed to converge on a solution\";\n            }\n        }\n\n        setTimeout(() => nextIter(), this.interval);\n    }\n\n    warnsdorffNextMove(pos, alreadyVisited) {\n        let moves = this.possibleKnightMoves(pos, alreadyVisited);\n        let movesDegrees = {};\n\n        const iterMove = (i) => {\n            if (i < moves.length) {\n                let move = moves[i];\n                let nextMoves = this.possibleKnightMoves(move);\n                nextMoves = nextMoves.filter(nextMove => !(this.includesArr(alreadyVisited, nextMove)));\n                movesDegrees[move] = nextMoves.length;\n\n                this.clearSquare(move);\n                this.renderSquareDarkened(move);\n                this.renderNum(move, movesDegrees[move]);\n                this.renderPathWithoutClearing(alreadyVisited);\n                \n                setTimeout(iterMove(i+1), this.interval);\n            } else {\n                return;\n            }\n        }\n\n        setTimeout(iterMove(0), this.interval);\n\n        //display possible next moves and there possible next moves\n        // Object.keys(movesDegrees).forEach(move => this.renderPossibleNextMove([parseInt(move[0],10), parseInt(move[2],10)]));\n\n        if (Object.keys(movesDegrees).length === moves.length) {\n            let minNextMoves = Math.min.apply(null, Object.values(movesDegrees));\n            let warnsdorffFinalNextMove = undefined;\n            Object.keys(movesDegrees).forEach(move => {\n                if (movesDegrees[move] === minNextMoves) {\n                    warnsdorffFinalNextMove = move;\n                }\n            })\n\n\n            if (warnsdorffFinalNextMove) {\n                return [parseInt(warnsdorffFinalNextMove[0], 10), parseInt(warnsdorffFinalNextMove[2], 10)];\n            } else {\n                return [];\n            }\n        }\n    }\n\n    backtrackingWrapper() {\n        this.msgDOM.innerText = \"\";\n        this.ctx.clearRect(0, 0, this.width, this.height);\n        this.numIterDOM.innerText = 0;\n        let tours = [];\n        stop = false;\n        this.backtracking([0,2], [], tours);\n        if (tours.length > 0) {\n            this.renderPath(tours[0]);\n        }\n        else {\n            this.msgDOM.innerText = \"Failed to converge on a solution\";\n            this.ctx.clearRect(0, 0, this.width, this.height);\n            this.renderBoard();\n        }\n    }\n \n    backtracking(pos = this.randomPosition(), alreadyVisited = [], tours) {\n        // if (alreadyVisited.length === 0) debugger;\n        if (stop) return;\n        alreadyVisited.push(pos);\n        this.renderPath(alreadyVisited);\n        \n        if (alreadyVisited.length === (this.boardRows * this.boardCols)) {\n            // debugger\n            // this.renderPath(alreadyVisited);\n            // this.renderPathTimeout(alreadyVisited, 100);\n            // debugger\n            let copy = [...alreadyVisited];\n            tours.push(copy);\n            this.msgDOM.innerText = \"Success\";\n            // if (tours.length === 2) {\n            //     stop = true;\n            //     debugger\n            // }\n            return;\n        }\n\n        else {\n            let possibleNextMoves = this.possibleKnightMoves(pos, alreadyVisited);\n\n            \n            // debugger\n            for (let i=0; i<possibleNextMoves.length; i+= 1) {\n                let move = possibleNextMoves[i];\n                this.backtracking(move, alreadyVisited, tours);\n                if (alreadyVisited[alreadyVisited.length - 1][0] === move[0] \n                    && alreadyVisited[alreadyVisited.length - 1][1] === move[1])\n                {\n                    alreadyVisited.pop();\n                }\n            }\n            \n            // debugger\n            if (alreadyVisited.length > 1) alreadyVisited.pop();\n            return;\n\n        }\n    }\n\n}\n\n\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/board.js\");\n\n// const Board = require('./board');\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const canvas = document.getElementById(\"canvas\");\n    const ctx = canvas.getContext('2d');\n    const numIter = document.getElementById('num-iter');\n    const msg = document.getElementById('msg-div');\n\n    const slider = document.getElementById('slider');\n    \n    const board = new _board__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas, ctx, numIter, msg, slider);\n    \n    slider.addEventListener(\"change\", e => board.changeInterval(e));\n    const warnsdorffButton = document.getElementById(\"warnsdorff\");\n    const backtrackingButton = document.getElementById(\"backtracking\");\n    backtrackingButton.addEventListener(\"click\", e => board.backtrackingWrapper());\n    warnsdorffButton.addEventListener(\"click\", e => board.warnsdorff() );\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/knight.js":
/*!***********************!*\
  !*** ./src/knight.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Knight; });\nclass Knight {\n    constructor() {\n\n    }\n\n    static renderKnight(ctx, canvasCoords, squareHeight) {\n        // debugger\n        const img = new Image();\n        img.src = \"https://cdn3.iconfinder.com/data/icons/sports-2-5/512/66-512.png\";\n        ctx.drawImage(img, canvasCoords[0] + 15, canvasCoords[1] + 15, squareHeight - 30, squareHeight - 30);\n    }\n\n}\n\n//# sourceURL=webpack:///./src/knight.js?");

/***/ }),

/***/ "./src/path.js":
/*!*********************!*\
  !*** ./src/path.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Path; });\nclass Path {\n    constructor(ctx) {\n        this.ctx = ctx;\n        this.squares = [];\n    }\n\n    addSquare(pos) {\n        this.squares.push(pos);\n    }\n\n    removeLastSquare() {\n        this.squares.pop();\n    }\n\n    renderPath() {\n        \n    }\n\n}\n\n\n\n//# sourceURL=webpack:///./src/path.js?");

/***/ })

/******/ });