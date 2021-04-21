const canvas = $('#canvas-signature');

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
        e.pageX - canvas[0].offset().left,
        e.pageY - canvas[0].offset().top
    );
    event.preventDefault();
});

canvas.on('mousemove', (e) => {
    console.log('Mousemove happening');
    if (isDrawing) {
        ctx.lineTo(
            e.pageX - canvas[0].offset().left,
            e.pageY - canvas[0].offset().top
        );
        ctx.stroke();
    }
});

canvas.on('mouseup', (e) => {
    isDrawing = false;
    ctx.closePath();
    inputField.val(e.target.toDataURL());
});
