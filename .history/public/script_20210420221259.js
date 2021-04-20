const canvas = $('canvas');
const ctx = canvas.getContext('2d');
const myCanvas = canvas.get(0);
let inputField = $('#signature');
let isDrawing = false;

ctx.beginPath();
ctx.strokeStyle = 'black';

canvas.on('mousedown', (e) => {
    isDrawing = true;
    ctx.lineWidth = 1;
    ctx.beginPath();
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
