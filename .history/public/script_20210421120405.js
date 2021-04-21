const canvas = $('#canvas-signature');
console.log(canvas);
const ctx = canvas[0].getContext('2d');

let inputField = $('#signature');
let isDrawing = false;

canvas.on('mousedown', (e) => {
    console.log('Mousedown happening');
    isDrawing = true;
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, event.clientY - canvas.offSetTop);
    event.preventDefault();
});

canvas.on('mousemove', (e) => {
    console.log('Mousemove happening');
    if (isDrawing) {
        console.log(e.clientX - canvas.offsetLeft);
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
