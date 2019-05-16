export default class Board {
    constructor(canvas, ctx) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.squareHeight = this.height/8;
        this.boardArray = [...Array(8)].map(e => ["X", "X", "X", "X", "X", "X", "X", "X"]);
        this.numSquares = 8;
        this.ctx = ctx;
        this.ctx.fillRect(0, 0, 70, 70);
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

}

