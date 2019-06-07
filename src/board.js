const MOVE_OFFSETS = [[2,1], [1,2], [-1,2], [-2,1], [-2,-1], [-1,-2], [1,-2], [2,-1]];
import Knight from './knight';
import Path from './path';
let stop = false;

export default class Board {
    constructor(canvas, ctx, numIterDOM, msgDOM, intervalDOM) {
        this.ctx = ctx;
        this.numIterDOM = numIterDOM;
        this.msgDOM = msgDOM;
        this.interval = parseInt(intervalDOM.value);
        this.width = canvas.width;
        this.height = canvas.height;
        this.boardRows = 5;
        this.boardCols = 5;
        this.squareHeight = this.height/this.boardRows;
        this.squareWidth = this.width/this.boardCols;
        this.boardArray = [...Array(this.boardRows)].map(e => new Array(this.boardCols).fill('X'));
        this.boardGraph = {};
        this.knight = new Image();
        // this.knight.src = "https://cdn3.iconfinder.com/data/icons/sports-2-5/512/66-512.png";
        // this.knight.src = "https://raw.githubusercontent.com/ognjenvucko/knights-tour/master/images/horse.png";
        // this.knight.src = "https://image.flaticon.com/icons/svg/179/179650.svg";
        // this.knight.src = "https://image.flaticon.com/icons/svg/32/32658.svg";
        // this.knight.src = "https://image.flaticon.com/icons/png/512/1626/1626881.png";
        this.knight.src = "https://image.flaticon.com/icons/svg/726/726165.svg";

        this.knightTransparent = new Image();
        this.knightTransparent.src = "https://raw.githubusercontent.com/ognjenvucko/knights-tour/master/images/horse2.png";
        //Colors
        // this.purple = "#251F7CB3";
        // this.purple = "rgba(37, 31, 124, 70)";
        this.purple = "rgb(21, 50, 216)";
        this.purpleDarkened = "rgba(13, 62, 141, 0.733)";
        this.lightDarkened = "rgba(163, 161, 156, 0.76)";
        this.light = "#f0ead6";
        this.possibleSquare = "rgb(156, 233, 210)";

        //Bind functions
        this.warnsdorff = this.warnsdorff.bind(this);
        this.backtracking = this.backtracking.bind(this);

        //Build knight's graph and render initial board
        // this.buildGraph();
        this.renderBoard();
    }

    changeInterval(e) {
        // debugger
        this.interval = e.target.value;
    }

    //builds graph with positions on the board as keys and all 
    //possible knight moves from the key position as values
    buildGraph() {
        for (let i=0; i<this.boardRows; i+=1) {
            for (let j=0; j<this.boardCols; j+=1) {
                this.boardGraph[[i,j]] = this.possibleKnightMoves([i,j]);
            }
        }
    }

    //render functions
    renderSquare(pos) {
        let x = pos[0];
        let y = pos[1];
        let canvasCoords = this.arrayToCanvas([x, y]);
        if ((x + y) % 2 === 0) {
            this.ctx.fillStyle = this.light;
            this.ctx.fillRect(canvasCoords[0], canvasCoords[1], this.squareWidth, this.squareHeight);
        } else {
            this.ctx.fillStyle = this.purple;
            this.ctx.fillRect(canvasCoords[0], canvasCoords[1], this.squareWidth, this.squareHeight);
        }
    }

    renderSquareDarkened(pos) {
        let x = pos[0];
        let y = pos[1];
        let canvasCoords = this.arrayToCanvas([x, y]);
        if ((x + y) % 2 === 0) {
            this.ctx.fillStyle = this.lightDarkened;
            this.ctx.fillRect(canvasCoords[0], canvasCoords[1], this.squareWidth, this.squareHeight);
        } else {
            this.ctx.fillStyle = this.purpleDarkened;
            this.ctx.fillRect(canvasCoords[0], canvasCoords[1], this.squareWidth, this.squareHeight);
        }
    }

    clearSquare(pos) {
        let x = pos[0];
        let y = pos[1];
        let canvasCoords = this.arrayToCanvas([x, y]);
        this.ctx.clearRect(canvasCoords[0], canvasCoords[1], this.squareWidth, this.squareHeight);
    }

    renderKnight(pos, transparent = null) {
        let x = pos[0];
        let y = pos[1];
        let canvasCoords = this.arrayToCanvas([x, y]);
        if (transparent) {
            this.ctx.drawImage(this.knightTransparent, canvasCoords[0] + 15, canvasCoords[1] + 15, this.squareWidth - 30, this.squareHeight - 30);
        } else {
            this.ctx.drawImage(this.knight, canvasCoords[0] + 15, canvasCoords[1] + 15, this.squareWidth - 30, this.squareHeight - 30);
        }
    }

    renderNum (pos, numAsString) {
        let x = pos[0];
        let y = pos[1];
        let canvasCoords = this.arrayToCanvas([x, y]);
        this.ctx.fillStyle = "#000000";
        this.ctx.font = "34px Trebuchet MS";
        this.ctx.fillText(numAsString, canvasCoords[0] + 22, canvasCoords[1] + 43);
        this.ctx.fill();
    }

    //helper method for render path
    renderLine(pos1, pos2, color="#000000") {
        // this.ctx.clearRect(0, 0, this.width, this.height);
        // this.renderBoard();
        let x1 = pos1[0];
        let y1 = pos1[1];
        let canvasCoords1 = this.arrayToCanvas([x1, y1]);
        canvasCoords1[0] += this.squareWidth/2;
        canvasCoords1[1] += this.squareHeight/2;

        let x2 = pos2[0];
        let y2 = pos2[1];
        let canvasCoords2 = this.arrayToCanvas([x2, y2]);
        canvasCoords2[0] += this.squareWidth/2;
        canvasCoords2[1] += this.squareHeight/2;
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = 3.5;
        this.ctx.beginPath();
        this.ctx.arc(canvasCoords1[0], canvasCoords1[1], 5, 0, 2 * Math.PI);
    
        this.ctx.moveTo(canvasCoords1[0], canvasCoords1[1]);
        this.ctx.lineTo(canvasCoords2[0], canvasCoords2[1]);
        this.ctx.arc(canvasCoords2[0], canvasCoords2[1], 5, 0, 2 * Math.PI);
     
        this.ctx.fill();
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
        // this.ctx.fill();
    }

    renderPath(path) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.renderBoard();
        if (path.length === 1) this.renderKnight(path[0]);
        for (let i=0; i<path.length-1; i+=1){
            this.renderLine(path[i], path[i+1]);
            if (i === path.length-2) this.renderKnight(path[i+1]);
        }
    }

    renderPathTimeout(path, interval) {
        setTimeout(() => {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.renderBoard();
            if (path.length === 1) this.renderKnight(path[0]);
            for (let i=0; i<path.length-1; i+=1){
                this.renderLine(path[i], path[i+1]);
                if (i === path.length-2) this.renderKnight(path[i+1]);
            }
        }, interval);
    }

    renderPathWithoutClearing(path) {
        if (path.length === 1) this.renderKnight(path[0]);
        for (let i = 0; i < path.length - 1; i += 1) {
            this.renderLine(path[i], path[i + 1]);
            if (i === path.length - 2) this.renderKnight(path[i + 1]);
        }
    }

    renderPossibleNextMove(pos) {
        let x = pos[0];
        let y = pos[1];
        let canvasCoords = this.arrayToCanvas([x, y]);
        this.ctx.fillStyle = this.possibleSquare;
        this.ctx.fillRect(canvasCoords[0], canvasCoords[1], this.squareWidth, this.squareHeight);
    }

    renderBoard() {
        this.boardArray.forEach((row, x) => {
            row.forEach((el, y) => {
                this.renderSquare([x, y]);
            });
        });
    }

    arrayToCanvas(arrayCoordinates) {
        return [this.squareWidth * arrayCoordinates[1], this.squareHeight * arrayCoordinates[0]];
    }

    randomPosition() {
        return [Math.floor(Math.random() * (this.boardRows)), Math.floor(Math.random() * (this.boardCols))];
    }

    //works for sub arrays of length 2 representing moves
    includesArr(arr, subArr) {
        let answer = false;
        arr.forEach(sub => {
            if (sub[0] === subArr[0] && sub[1] === subArr[1]) answer = true;
        })
        return answer;
    }

    //given a position on the board, returns all
    //possible knight moves from that position
    possibleKnightMoves(position, alreadyVisited=[]) {
        let moves = [];
        MOVE_OFFSETS.forEach(move => {
            let row = position[0];
            let col = position[1];
            let rowOffset = move[0];
            let colOffset = move[1];
            let newRow = row + rowOffset;
            let newCol = col + colOffset;
            if ((0 <= newRow) && (newRow <= this.boardRows - 1) && (0 <= newCol) && (newCol <= this.boardCols - 1)) {
                moves.push([newRow, newCol]);
                this.numIterDOM.innerText = 1 + parseInt(this.numIterDOM.innerText);
            } else {
                return;
            }
        })
        if (alreadyVisited.length > 0) {
            moves = moves.map(move => !(this.includesArr(alreadyVisited, move)) ? move : undefined);
            moves = moves.filter(move => move != undefined);
        }
        return moves;
    }

    //1. Set random intial position
    //2. move to position that has the minimum viable moves from it.
    //3. continue until the tour is complete or there is nowhere else to move.
    warnsdorff(pos=this.randomPosition()) {
        this.renderBoard();
        this.msgDOM.innerText = "";
        this.numIterDOM.innerText = 0;
        let alreadyVisited = [];

        const nextIter = () => {
            alreadyVisited.push(pos);      
            this.renderPath(alreadyVisited);
            
            if (this.warnsdorffNextMove(pos, alreadyVisited).length > 0) {
                pos = this.warnsdorffNextMove(pos, alreadyVisited);
                setTimeout(() => nextIter(), this.interval);
            } else {
                (alreadyVisited.length === this.boardRows * this.boardCols) ? this.msgDOM.innerText = "Success" 
                : this.msgDOM.innerText = "Failed to converge on a solution";
            }
        }

        setTimeout(() => nextIter(), this.interval);
    }

    warnsdorffNextMove(pos, alreadyVisited) {
        let moves = this.possibleKnightMoves(pos, alreadyVisited);
        let movesDegrees = {};

        const iterMove = (i) => {
            if (i < moves.length) {
                let move = moves[i];
                let nextMoves = this.possibleKnightMoves(move);
                nextMoves = nextMoves.filter(nextMove => !(this.includesArr(alreadyVisited, nextMove)));
                movesDegrees[move] = nextMoves.length;

                this.clearSquare(move);
                this.renderSquareDarkened(move);
                this.renderNum(move, movesDegrees[move]);
                this.renderPathWithoutClearing(alreadyVisited);
                
                setTimeout(iterMove(i+1), this.interval);
            } else {
                return;
            }
        }

        setTimeout(iterMove(0), this.interval);

        //display possible next moves and there possible next moves
        // Object.keys(movesDegrees).forEach(move => this.renderPossibleNextMove([parseInt(move[0],10), parseInt(move[2],10)]));

        if (Object.keys(movesDegrees).length === moves.length) {
            let minNextMoves = Math.min.apply(null, Object.values(movesDegrees));
            let warnsdorffFinalNextMove = undefined;
            Object.keys(movesDegrees).forEach(move => {
                if (movesDegrees[move] === minNextMoves) {
                    warnsdorffFinalNextMove = move;
                }
            })


            if (warnsdorffFinalNextMove) {
                return [parseInt(warnsdorffFinalNextMove[0], 10), parseInt(warnsdorffFinalNextMove[2], 10)];
            } else {
                return [];
            }
        }
    }

    backtrackingWrapper() {
        this.msgDOM.innerText = "";
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.numIterDOM.innerText = 0;
        let tours = [];
        stop = false;
        this.backtracking([0,2], [], tours);
        if (tours.length > 0) {
            this.renderPath(tours[0]);
        }
        else {
            this.msgDOM.innerText = "Failed to converge on a solution";
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.renderBoard();
        }
    }
 
    backtracking(pos = this.randomPosition(), alreadyVisited = [], tours) {
        // if (alreadyVisited.length === 0) debugger;
        if (stop) return;
        alreadyVisited.push(pos);
        this.renderPath(alreadyVisited);
        
        if (alreadyVisited.length === (this.boardRows * this.boardCols)) {
            // debugger
            // this.renderPath(alreadyVisited);
            // this.renderPathTimeout(alreadyVisited, 100);
            // debugger
            let copy = [...alreadyVisited];
            tours.push(copy);
            this.msgDOM.innerText = "Success";
            if (tours.length === 1) {
                stop = true;
                debugger
            }
            return;
        }

        else {
            let possibleNextMoves = this.possibleKnightMoves(pos, alreadyVisited);

            
            // debugger
            for (let i=0; i<possibleNextMoves.length; i+= 1) {
                let move = possibleNextMoves[i];
                this.backtracking(move, alreadyVisited, tours);
                if (alreadyVisited[alreadyVisited.length - 1][0] === move[0] 
                    && alreadyVisited[alreadyVisited.length - 1][1] === move[1])
                {
                    alreadyVisited.pop();
                }
            }
            
            // debugger
            if (alreadyVisited.length > 1) alreadyVisited.pop();
            return;

        }
    }

}

