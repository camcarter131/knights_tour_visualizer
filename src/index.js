import Board from './board';
// const Board = require('./board');

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    const numIter = document.getElementById('num-iter');
    const msg = document.getElementById('msg-div');

    const slider = document.getElementById('slider');
    
    const board = new Board(canvas, ctx, numIter, msg, slider);
    
    slider.addEventListener("change", e => board.changeInterval(e));
    const warnsdorffButton = document.getElementById("warnsdorff");
    const backtrackingButton = document.getElementById("backtracking");
    backtrackingButton.addEventListener("click", e => board.backtrackingWrapper());
    warnsdorffButton.addEventListener("click", e => board.warnsdorff() );
})