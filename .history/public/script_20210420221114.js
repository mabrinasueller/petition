const canvas = $('canvas');
const ctx = canvas[0].getContext('2d');
let inputField = $('#signature');
let isDrawing = false;

ctx.beginPath();
ctx.strokeStyle = 'black';

canvas.on('mousedown', (e) => {
    isDrawing = true;
    ctx.lineWidth = 1;
    ctx.beginPath();
    x = e.offsetX;
    y = e.offsetY;
    console.log('x: ', x);
    console.log('y: ', y);
    ctx.moveTo(e.clientX - canvas.offsetLeft, event.clientY - canvas.offSetTop);
    event.preventDefault();
});

canvas.on('mousemoves', (e) => {
    if (isDrawing) {
        ctx.lineTo(
            e.clientX - canvas.offsetLeft,
            event.clientY - canvas.offSetTop
        );
        ctx.stroke();
    }
});

canvas.on('mouseup', (e) => {
    isDrawing = false;
    ctx.closePath();
    inputField.val(e.target.toDataURL());
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
