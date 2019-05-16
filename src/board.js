const MOVE_OFFSETS = [[-1,-2], [-1,2], [1,-2], [1,2], [-2,-1], [-2,1], [2,-1], [2,1]];

export default class Board {
    constructor(canvas, ctx) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.boardSize = 8;
        this.squareHeight = this.height/this.boardSize;
        this.boardArray = [...Array(8)].map(e => new Array(this.boardSize).fill('X'));
        this.boardGraph = {};
        this.numSquares = 8;
        this.ctx = ctx;
        this.ctx.fillRect(0, 0, 70, 70);
        this.buildGraph();
        this.renderBoard();

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
            ((0 <= newRow)&&(newRow <= this.boardSize - 1)&&(0 <= newCol)&&(newCol <= this.boardSize - 1)) ?
            moves.push([newRow, newCol]) : null
        })
        return moves;
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

    renderBoard() {
        // let img = new Image();
        // img.src = "https://cdn3.iconfinder.com/data/icons/sports-2-5/512/66-512.png";
        // debugger
        
        this.boardArray.forEach((row, x) => {
            row.forEach((el, y) => {
                let canvasCoords = this.arrayToCanvas([x, y]);
                if (x === 0 && y === 0) {
                    // this.ctx.drawImage(img, canvasCoords[0], canvasCoords[1], this.squareHeight, this.squareHeight);
                    this.ctx.fillStyle = "#B7B6AC";
                    this.ctx.fillRect(canvasCoords[0], canvasCoords[1], this.squareHeight, this.squareHeight);
                } else if ((x + y) % 2 === 0) {
                    // debugger
                    this.ctx.fillStyle = "#f0ead6";
                    this.ctx.fillRect(canvasCoords[0], canvasCoords[1], this.squareHeight, this.squareHeight);
                }

            })
        })

    }

    arrayToCanvas(arrayCoordinates) {
        return [this.squareHeight * arrayCoordinates[1], this.squareHeight * arrayCoordinates[0]];
    }

    dfs(start) {
        
    }

}

