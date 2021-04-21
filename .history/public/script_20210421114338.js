const canvas = $('canvas');
const ctx = canvas.getContext('2d');
//const canvasElem = canvas.get(0);
let inputField = $('#canvas_signature');
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

canvas.on('mousemoves', (e) => {
    console.log('Mousemove happening');
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
