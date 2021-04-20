const canvas = $('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let x = 0;
let y = 0;

ctx.beginPath();
ctx.fillStyle = 'thistle';

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
