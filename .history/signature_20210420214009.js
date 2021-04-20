const canvas = $('canvas');
const ctx = canvas.getContext('2d');
let inputField = $('#signature');
let isDrawing = false;
let x = 0;
let y = 0;

ctx.beginPath();
ctx.strokeStyle = 'black';
ctx.lineWidth = 1;

canvas.on('mousedown', (e) => {
    isDrawing = true;
    // ctx.beginPath();
    x = e.offsetX;
    y = e.offsetY;
    console.log('x: ', x);
    console.log('y: ', y);
    ctx.moveTo(e.clientX - canvas.offsetLeft, event.clientY - canvas.offSetTop);
});

canvas.on('mousemoves', (e) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo();
        ctx.lineTo();
        ctx.stroke();
        ctx.closePath();
    }
});

canvas.on('mouseup', () => {
    isDrawing = false;
    inputField = canvas.toDataURL();
});

// function drawLine(ctx, x1, y1, x2, y2) {
//     ctx.beginPath();
//     ctx.strokeStyle = 'black';
//     ctx.lineWidth = 1;
//     ctx.moveTo(x1, y1);
//     ctx.lineTo(x2, y2);
//     ctx.stroke();
//     ctx.closePath();
// }
