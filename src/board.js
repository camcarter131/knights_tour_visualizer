const MOVE_OFFSETS = [[2,1], [1,2], [-1,2], [-2,1], [-2,-1], [-1,-2], [1,-2], [2,-1]];
import Knight from './knight';
import Path from './path';

export default class Board {
    constructor(canvas, ctx, numIterDOM, msgDOM, intervalDOM) {
        this.ctx = ctx;
        this.numIterDOM = numIterDOM;
        this.msgDOM = msgDOM;
        this.interval = parseInt(intervalDOM.value);
        // debugger
        // this.interval = 80;
        this.width = canvas.width;
        this.height = canvas.height;
        this.boardSize = 8;
        this.squareHeight = this.height/this.boardSize;
        this.boardArray = [...Array(this.boardSize)].map(e => new Array(this.boardSize).fill('X'));
        this.boardGraph = {};
        this.img = new Image();
        this.img.src = "https://cdn3.iconfinder.com/data/icons/sports-2-5/512/66-512.png";
        //Colors
        // this.purple = "#251F7CB3";
        // this.purple = "rgba(37, 31, 124, 70)";
        this.purple = "rgb(20, 100, 200)";
        this.purpleDarkened = "#251F7C";
        this.lightDarkened = "rgb(197, 193, 181)";
        this.light = "#f0ead6";
        this.possibleSquare = "rgb(156, 233, 210)";

        //Bind functions
        this.warnsdorff = this.warnsdorff.bind(this);
        this.renderSquareDarkened = this.renderSquareDarkened.bind(this);
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
        for (let i=0; i<this.boardSize; i+=1) {
            for (let j=0; j<this.boardSize; j+=1) {
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
            this.ctx.fillRect(canvasCoords[0], canvasCoords[1], this.squareHeight, this.squareHeight);
        } else {
            this.ctx.fillStyle = this.purple;
            this.ctx.fillRect(canvasCoords[0], canvasCoords[1], this.squareHeight, this.squareHeight);
        }
    }

    renderSquareDarkened(pos) {
        let x = pos[0];
        let y = pos[1];
        let canvasCoords = this.arrayToCanvas([x, y]);
        if ((x + y) % 2 === 0) {
            this.ctx.fillStyle = this.lightDarkened;
            this.ctx.fillRect(canvasCoords[0], canvasCoords[1], this.squareHeight, this.squareHeight);
        } else {
            this.ctx.fillStyle = this.purpleDarkened;
            this.ctx.fillRect(canvasCoords[0], canvasCoords[1], this.squareHeight, this.squareHeight);
        }
    }

    renderKnight(pos) {
        let x = pos[0];
        let y = pos[1];
        let canvasCoords = this.arrayToCanvas([x, y]);
        this.ctx.drawImage(this.img, canvasCoords[0] + 15, canvasCoords[1] + 15, this.squareHeight - 30, this.squareHeight - 30);
    }

    renderLine(pos1, pos2) {
        let x1 = pos1[0];
        let y1 = pos1[1];
        let canvasCoords1 = this.arrayToCanvas([x1, y1]);
        canvasCoords1[0] += this.squareHeight/2;
        canvasCoords1[1] += this.squareHeight/2;

        let x2 = pos2[0];
        let y2 = pos2[1];
        let canvasCoords2 = this.arrayToCanvas([x2, y2]);
        canvasCoords2[0] += this.squareHeight/2;
        canvasCoords2[1] += this.squareHeight/2;
        this.ctx.fillStyle = "#000000";
        this.ctx.lineWidth = 3.5;
        this.ctx.beginPath();
        this.ctx.arc(canvasCoords1[0], canvasCoords1[1], 4, 0, 2 * Math.PI);
    
        this.ctx.moveTo(canvasCoords1[0], canvasCoords1[1]);
        this.ctx.lineTo(canvasCoords2[0], canvasCoords2[1]);
        this.ctx.arc(canvasCoords2[0], canvasCoords2[1], 4, 0, 2 * Math.PI);
     
        this.ctx.fill();
        this.ctx.stroke();
    }

    renderPossibleNextMove(pos) {
        let x = pos[0];
        let y = pos[1];
        let canvasCoords = this.arrayToCanvas([x, y]);
        this.ctx.fillStyle = this.possibleSquare;
        this.ctx.fillRect(canvasCoords[0], canvasCoords[1], this.squareHeight, this.squareHeight);
    }

    renderBoard() {
        this.boardArray.forEach((row, x) => {
            row.forEach((el, y) => {
                this.renderSquare([x, y]);
            });
        });
    }

    arrayToCanvas(arrayCoordinates) {
        return [this.squareHeight * arrayCoordinates[1], this.squareHeight * arrayCoordinates[0]];
    }

    randomPosition() {
        return [Math.floor(Math.random() * (this.boardSize)), Math.floor(Math.random() * (this.boardSize))];
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
    possibleKnightMoves(position) {
        let moves = [];
        MOVE_OFFSETS.forEach(move => {
            let row = position[0];
            let col = position[1];
            let rowOffset = move[0];
            let colOffset = move[1];
            let newRow = row + rowOffset;
            let newCol = col + colOffset;
            if ((0 <= newRow) && (newRow <= this.boardSize - 1) && (0 <= newCol) && (newCol <= this.boardSize - 1)) {
                moves.push([newRow, newCol]);
                this.numIterDOM.innerText = 1 + parseInt(this.numIterDOM.innerText);
            } else {
                return;
            }
        })
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
            if (alreadyVisited.length > 0) {
                let prevPos = alreadyVisited[alreadyVisited.length - 1];
                // this.renderSquare(prevPos);
                this.renderLine(prevPos, pos);

            }
            // this.renderKnight(pos);
            alreadyVisited.push(pos);
            if (this.warnsdorffNextMove(pos, alreadyVisited).length > 0) {
                pos = this.warnsdorffNextMove(pos, alreadyVisited);
                setTimeout(() => nextIter(), this.interval);
            } else {
                (alreadyVisited.length === 64) ? this.msgDOM.innerText = "Success" 
                : this.msgDOM.innerText = "Failed to converge on a solution";
            }
        }

        setTimeout(() => nextIter(), this.interval);
    }

    warnsdorffNextMove(pos, alreadyVisited) {
        let moves = this.possibleKnightMoves(pos);
        moves = moves.map(move => !(this.includesArr(alreadyVisited, move)) ? move : undefined);
        moves = moves.filter(move => move != undefined);
        let movesDegrees = {};
        moves.forEach(move => {
            let nextMoves = this.possibleKnightMoves(move);
            nextMoves = nextMoves.filter(nextMove => !(this.includesArr(alreadyVisited, nextMove)));
            movesDegrees[move] = nextMoves.length;
        })

        //display possible next moves and there possible next moves
        // Object.keys(movesDegrees).forEach(move => this.renderPossibleNextMove([parseInt(move[0],10), parseInt(move[2],10)]));

        let minNextMoves = Math.min.apply(null, Object.values(movesDegrees));       
        let warnsdorffFinalNextMove = undefined;
        Object.keys(movesDegrees).forEach(move => {
            if (movesDegrees[move] === minNextMoves) {
                warnsdorffFinalNextMove = move;
            }
        })
        if (warnsdorffFinalNextMove) {
            return [parseInt(warnsdorffFinalNextMove[0],10), parseInt(warnsdorffFinalNextMove[2],10)];
        } else {
            return [];
        }
    }

    backtracking() {

    }

    bruteForce(pos = this.randomPosition(), interval = this.interval, alreadyVisited = []) {
        // this.renderBoard(); 
        // this.numIterDOM.innerText = 0;
        // debugger
        console.log('recursive call');
        alreadyVisited.push(pos);
        if (alreadyVisited.length > 0) {
            let prevPos = alreadyVisited[alreadyVisited.length - 1];
            // this.renderSquare(prevPos);
            this.renderLine(prevPos, pos);

        }

        if (alreadyVisited.length === (this.boardSize ** 2)) return;
        let possibleNextMoves = this.possibleKnightMoves(pos).filter(move => !(this.includesArr(alreadyVisited, move)));
        possibleNextMoves.forEach(move => {
            // debugger
            // console.log(move);
            // setTimeout(this.backtracking(move, this.interval, alreadyVisited), 1);
            setTimeout(this.bruteForce(move, this.interval, alreadyVisited), this.interval);
            

        })
        // this.renderSquare(pos);
        // let prevPos = alreadyVisited[alreadyVisited.length - 1];
        // this.renderLine(prevPos, pos);
        alreadyVisited.pop();
    }

}

