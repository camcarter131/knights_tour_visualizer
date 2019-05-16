export default class Board {
    constructor(canvas, ctx) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.squareHeight = this.height/8;
        this.boardArray = [...Array(8)].map(e => ["X", "X", "X", "X", "X", "X", "X", "X"]);
        this.numSquares = 8;
        this.ctx = ctx;
        this.ctx.fillRect(0, 0, 80, 80);
        this.renderBoard();
    }

    drawBoard() {
        // debugger

        for (let i=0; i<this.width; i+= this.squareHeight) {
            for (let j = 0; j < this.width; j += this.squareHeight) {
                if ((i+j) % 2 === 0) {
                    debugger
                    this.ctx.fillRect(i, j, this.squareHeight, this.squareHeight);
                }
            }
        }

    }

    renderBoard() {
        this.boardArray.forEach((row, x) => {
            row.forEach((el, y) => {
                let canvasCoords = this.arrayToCanvas([x, y]);
                if ((x + y) % 2 === 0) {
                    // debugger
                    this.ctx.fillStyle = "#f0ead6";
                    this.ctx.fillRect(canvasCoords[0], canvasCoords[1], this.squareHeight, this.squareHeight);
                }
            })
        })

    }

    arrayToCanvas(arrayCoordinates) {
        return [80 * arrayCoordinates[1], 80 * arrayCoordinates[0]];
    }

}

