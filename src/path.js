export default class Path {
    constructor(ctx) {
        this.ctx = ctx;
        this.squares = [];
    }

    addSquare(pos) {
        this.squares.push(pos);
    }

    removeLastSquare() {
        this.squares.pop();
    }

    renderPath() {
        
    }

}

