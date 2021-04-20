const canvas = $('canvas');
const ctx = $('canvas')[0].getContext('2d');

let inputField = $('#signature');
let isDrawing = false;

canvas.on('mousedown', (e) => {
    isDrawing = true;
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(
        e.clientX - canvas[0].offsetLeft,
        event.clientY - canvas[0].offSetTop
    );
    //event.preventDefault();
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
