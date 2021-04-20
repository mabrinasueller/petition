const canvas = $('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let x = 0;
let y = 0;

ctx.beginPath();
ctx.strokeStyle = 'black';

canvas.on('mousedown', (e) => {
    isDrawing = true;
    // ctx.beginPath();
    x = e.offsetX;
    y = e.offsetY;
});

canvas.on('mousemoves', () => {
    if (isDrawing) {
        ctx.lineTo();
    }
});

canvas.on('mouseup', () => {
    isDrawing = false;
    canvas.toDataURL();
});

function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
}
