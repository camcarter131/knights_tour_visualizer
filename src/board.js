const MOVE_OFFSETS = [[-1,-2], [-1,2], [1,-2], [1,2], [-2,-1], [-2,1], [2,-1], [2,1]];

export default class Board {
    constructor(canvas, ctx, numIterDOM) {
        this.ctx = ctx;
        this.numIterDOM = numIterDOM;
        this.interval = 50;
        this.width = canvas.width;
        this.height = canvas.height;
        this.boardSize = 8;
        this.squareHeight = this.height/this.boardSize;
        this.boardArray = [...Array(8)].map(e => new Array(this.boardSize).fill('X'));
        this.boardGraph = {};
        this.img = new Image();
        this.img.src = "https://cdn3.iconfinder.com/data/icons/sports-2-5/512/66-512.png";

        //Colors
        // this.purple = "#251F7CB3";
        // this.purple = "rgba(37, 31, 124, 70)";
        this.purple = "rgb(118, 113, 194)";
        this.purpleDarkened = "#251F7C";
        this.lightDarkened = "rgb(197, 193, 181)";
        this.light = "#f0ead6";
        this.possibleSquare = "rgb(156, 233, 210)";

        //Bind functions
        this.warnsdorff = this.warnsdorff.bind(this);
        this.renderSquareDarkened = this.renderSquareDarkened.bind(this);
        this.backtracking = this.backtracking.bind(this);

        //Build knight's graph and render initial board
        this.buildGraph();
        this.renderBoard();
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

    renderPossibleNextMove(pos) {
        let x = pos[0];
        let y = pos[1];
        let canvasCoords = this.arrayToCanvas([x, y]);
        this.ctx.fillStyle = this.possibleSquare;
        this.ctx.fillRect(canvasCoords[0], canvasCoords[1], this.squareHeight, this.squareHeight);
    }

    renderKnight(pos) {
        let x = pos[0];
        let y = pos[1];
        let canvasCoords = this.arrayToCanvas([x, y]);
        this.ctx.drawImage(this.img,canvasCoords[0]+15, canvasCoords[1]+15, this.squareHeight-30, this.squareHeight-30);
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
            ((0 <= newRow) && (newRow <= this.boardSize - 1) && (0 <= newCol) && (newCol <= this.boardSize - 1)) ?
                moves.push([newRow, newCol]) : null
        })
        return moves;
    }

    //1. Set random intial position
    //2. move to position that has the minimum viable moves from it.
    //3. continue until the tour is complete or there is nowhere else to move.
    warnsdorff(pos=this.randomPosition(), interval=this.interval) {
        this.renderBoard();
        let alreadyVisited = [pos];
        this.renderSquareDarkened(pos);
        this.renderKnight(pos);

        const nextIter = () => {
            if (this.warnsdorffNextMove(pos, alreadyVisited).length > 0) {
                this.numIterDOM.innerText = 1 + parseInt(this.numIterDOM.innerText);
                alreadyVisited.push(pos);
                pos = this.warnsdorffNextMove(pos, alreadyVisited);
                this.renderSquareDarkened(alreadyVisited[alreadyVisited.length-1])
                this.renderSquareDarkened(pos);
                this.renderKnight(pos);
                setTimeout(() => nextIter(), this.interval);
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

        // debugger

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

    backtracking(pos = this.randomPosition(), interval = this.interval, alreadyVisited=[]) {
        // this.renderBoard(); 
        alreadyVisited.push(pos);
        this.renderSquareDarkened(pos);
        this.renderKnight(pos);
        
        // const 
        if (alreadyVisited.length === (this.boardSize**2)) return;
        let possibleNextMoves = this.possibleKnightMoves(pos).filter(move => !(this.includesArr(alreadyVisited, move)));
        possibleNextMoves.forEach(move => {
            this.backtracking(move, this.interval, alreadyVisited);
        })
        this.renderSquare(pos);
        alreadyVisited.pop();
    }

}

