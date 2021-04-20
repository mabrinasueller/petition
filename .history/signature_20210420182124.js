const canvas = $('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

canvas.on('mousedown', () => {
    isDrawing = true;
    ctx.beginPath();
});

canvas.on('mousemoves', () => {
    isDrawing = true;
});

canvas.on('mouseup', () => {
    isDrawing = false;
});
