const paintCanvas = document.querySelector( '.js-paint' );
const context = paintCanvas.getContext( '2d' );
context.lineCap = 'round';

const colorPicker = document.querySelector( '.js-color-picker');

colorPicker.addEventListener( 'change', event => {
    context.strokeStyle = event.target.value; 
} );

const lineWidthRange = document.querySelector( '.js-line-range' );
const lineWidthLabel = document.querySelector( '.js-range-value' );

lineWidthRange.addEventListener( 'input', event => {
    const width = event.target.value;
    lineWidthLabel.innerHTML = width;
    context.lineWidth = width;
} );

let x = 0, y = 0;
let isMouseDown = false;

const stopDrawing = () => { isMouseDown = false; }
const startDrawing = event => {
   isMouseDown = true;   
   [x, y] = [event.offsetX, event.offsetY];  
}
const drawLine = event => {
    if ( isMouseDown ) {
        const newX = event.offsetX;
        const newY = event.offsetY;
        context.beginPath();
        context.moveTo( x, y );
        context.lineTo( newX, newY );
        context.stroke();
        //[x, y] = [newX, newY];
        x = newX;
        y = newY;
    }
}
const resizeCanvas = () => {
    const containerWidth = paintCanvas.parentElement.offsetWidth;
    
    // Задаем высоту canvas, сохраняя соотношение сторон, например, 16:9
    const aspectRatio = 1 / 1;
    const containerHeight = containerWidth / aspectRatio;

    paintCanvas.width = containerWidth;
    paintCanvas.height = containerHeight;

    // После изменения размеров необходимо восстановить настройки контекста
    context.lineCap = 'round';
    context.strokeStyle = colorPicker.value; 
    context.lineWidth = lineWidthRange.value;
};




// Вызываем функцию resizeCanvas при загрузке страницы и при каждом изменении размера окна


paintCanvas.addEventListener( 'mousedown', startDrawing );
paintCanvas.addEventListener( 'mousemove', drawLine );
paintCanvas.addEventListener( 'mouseup', stopDrawing );
paintCanvas.addEventListener( 'mouseout', stopDrawing );
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);