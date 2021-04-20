const canvas = $('canvas');
const ctx = $('canvas')[0].getContext('2d');

let inputField = $('#signature');
let isDrawing = false;

canvas.on('mousedown', (e) => {
    console.log('Mousedown happens');
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
            e.clientX - canvas[0].offsetLeft,
            event.clientY - canvas[0].offSetTop
        );
        ctx.stroke();
    }
});

canvas.on('mouseup', (e) => {
    isDrawing = false;
    ctx.closePath();
    inputField.val(e.target.toDataURL());
});
