export default class Knight {
    constructor() {

    }

    static renderKnight(ctx, canvasCoords, squareHeight) {
        // debugger
        const img = new Image();
        img.src = "https://cdn3.iconfinder.com/data/icons/sports-2-5/512/66-512.png";
        ctx.drawImage(img, canvasCoords[0] + 15, canvasCoords[1] + 15, squareHeight - 30, squareHeight - 30);
    }

}