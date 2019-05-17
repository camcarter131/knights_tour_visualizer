import Board from './board';
// const Board = require('./board');

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    const numIter = document.getElementById('num-iter');
    
    const board = new Board(canvas, ctx, numIter);
    
    const warnsdorffButton = document.getElementById("warnsdorff");
    const backtrackingButton = document.getElementById("backtracking");
    backtrackingButton.addEventListener("click", e => board.backtracking());
    warnsdorffButton.addEventListener("click", e => board.warnsdorff() );
})