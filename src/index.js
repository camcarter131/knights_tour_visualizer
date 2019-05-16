import Board from './board';
// const Board = require('./board');

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    // debugger
    let board = new Board(canvas, ctx);
})