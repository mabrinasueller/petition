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
    ctx.moveTo(
        e.clientX - canvas[0].offsetLeft,
        e.clientY - canvas[0].offsetTop
    );
    event.preventDefault();
});

canvas.on('mousemove', (e) => {
    console.log('Mousemove happening');
    if (isDrawing) {
        console.log(e.clientX - canvas[0].offsetLeft);
        ctx.lineTo(
            e.clientX - canvas[0].offsetLeft,
            e.clientY - canvas[0].offsetTop
        );
        ctx.stroke();
    }
});

canvas.on('mouseup', (e) => {
    isDrawing = false;
    ctx.closePath();
    inputField.val(e.target.toDataURL());
});
