const canvas = $('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let x = 0;
let y = 0;

canvas.on('mousedown', (e) => {
    isDrawing = true;
    // ctx.beginPath();
    x = e.offsetX;
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
