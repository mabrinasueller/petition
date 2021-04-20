const canvas = $('canvas');
const ctx = $('canvas').getContext('2d');
const canvasElem = canvas.get(0);
let inputField = $('#signature');
let isDrawing = false;

canvas.on('mousedown', (e) => {
    isDrawing = true;
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(
        e.clientX - canvasElem.offsetLeft,
        event.clientY - canvasElem.offSetTop
    );
    event.preventDefault();
});

canvas.on('mousemoves', (e) => {
    if (isDrawing) {
        ctx.lineTo(
            e.clientX - canvasElem.offsetLeft,
            event.clientY - canvasElem.offSetTop
        );
        ctx.stroke();
    }
});

canvas.on('mouseup', (e) => {
    isDrawing = false;
    ctx.closePath();
    inputField.val(e.target.toDataURL());
});
