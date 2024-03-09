const paintCanvas = document.querySelector('.js-paint');
const context = paintCanvas.getContext('2d');
context.lineCap = 'round';

const colorPicker = document.querySelector('.js-color-picker');

colorPicker.addEventListener('change', event => {
    context.strokeStyle = event.target.value;
});

const lineWidthRange = document.querySelector('.js-line-range');
const lineWidthLabel = document.querySelector('.js-range-value');

lineWidthRange.addEventListener('input', event => {
    const width = event.target.value;
    lineWidthLabel.innerHTML = width;
    context.lineWidth = width;
});

let x = 0, y = 0;
let isMouseDown = false;

const stopDrawing = () => { isMouseDown = false; };
const startDrawing = (xCoord, yCoord) => {
    isMouseDown = true;
    [x, y] = [xCoord, yCoord];
};
const drawLine = (newX, newY) => {
    if (isMouseDown) {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(newX, newY);
        context.stroke();
        [x, y] = [newX, newY];
    }
};

// Добавление обработчиков для событий касания
paintCanvas.addEventListener('touchstart', event => {
    const touch = event.touches[0];
    const xCoord = touch.pageX - touch.target.offsetLeft;
    const yCoord = touch.pageY - touch.target.offsetTop;
    startDrawing(xCoord, yCoord);
});

paintCanvas.addEventListener('touchmove', event => {
    event.preventDefault(); // Предотвращаем прокрутку
    const touch = event.touches[0];
    const xCoord = touch.pageX - touch.target.offsetLeft;
    const yCoord = touch.pageY - touch.target.offsetTop;
    drawLine(xCoord, yCoord);
});

paintCanvas.addEventListener('touchend', stopDrawing);

// Обработчики для мыши
paintCanvas.addEventListener('mousedown', event => {
    startDrawing(event.offsetX, event.offsetY);
});

paintCanvas.addEventListener('mousemove', event => {
    drawLine(event.offsetX, event.offsetY);
});

paintCanvas.addEventListener('mouseup', stopDrawing);
paintCanvas.addEventListener('mouseout', stopDrawing);

// Функция для изменения размера canvas
const resizeCanvas = () => {
    const containerWidth = paintCanvas.parentElement.offsetWidth;
    const aspectRatio = 1 / 1;
    const containerHeight = containerWidth / aspectRatio;

    paintCanvas.width = containerWidth;
    paintCanvas.height = containerHeight;

    context.lineCap = 'round';
    context.strokeStyle = colorPicker.value;
    context.lineWidth = lineWidthRange.value;
};

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

