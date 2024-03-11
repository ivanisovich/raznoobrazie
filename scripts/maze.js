var maze = document.querySelector("#maze");

maze.addEventListener("load", function () {
  var svgDoc = maze.contentDocument;
  var svgElement = svgDoc.documentElement;
  var svgRect = svgElement.getBoundingClientRect();
 
  let isDragging = false;
  let lastValidX = 1600, lastValidY = 2560;
  let deltaX = 0, deltaY = 0;

  // Функция для получения позиции при касании
  function getTouchPosition(event) {
    var touch = event.touches[0];
    let scaleRatioX = svgRect.width / svgElement.viewBox.baseVal.width;
    let scaleRatioY = svgRect.height / svgElement.viewBox.baseVal.height;
    return {
      x: (touch.clientX - svgRect.left) / scaleRatioX,
      y: (touch.clientY - svgRect.top) / scaleRatioY
    };
  }

  // Обработчик начала перетаскивания
  function startDragging(event) {
    let figure = event.target.closest(".figure");
    if (figure) {
      svgDoc.querySelectorAll(".figure").forEach((item) => {
        item.classList.remove("active");
      });
      figure.classList.add("active");
      isDragging = true;
      let pos = event.touches ? getTouchPosition(event) : { x: event.clientX, y: event.clientY };
     
      let transform = figure.getAttribute("transform");
      let translate = parseTransform(transform);
      lastValidX = translate.x;
      lastValidY = translate.y;
      deltaX = pos.x - lastValidX  ;
      deltaY = pos.y - lastValidY;
  
    }
  }

  // Обработчик перемещения
  function moveFigure(event) {
    if (isDragging) {
      let scaleRatioX = svgRect.width / svgElement.viewBox.baseVal.width;
      let scaleRatioY = svgRect.height / svgElement.viewBox.baseVal.height;
      let pos = event.touches ? getTouchPosition(event) : { x: event.clientX, y: event.clientY };
      let targetX = pos.x - deltaX;
      let targetY = pos.y - deltaY;

      performMovement(targetX, lastValidY, 'x');
      performMovement(lastValidX, targetY, 'y');

      event.preventDefault(); // Предотвращаем стандартное поведение скроллинга
    }
  }

  // Обработчик начала перетаскивания для десктопа
  function startDraggingDesk(event) {
    let figure = event.target.closest(".figure");
    if (figure) {
      svgDoc.querySelectorAll(".figure").forEach((item) => {
        item.classList.remove("active");
      });
      figure.classList.add("active");
      isDragging = true;
      let pos = event.touches ? getTouchPosition(event) : { x: event.clientX, y: event.clientY };
      let scaleRatioX = svgRect.width / svgElement.viewBox.baseVal.width;
      let scaleRatioY = svgRect.height / svgElement.viewBox.baseVal.height;
      let transform = figure.getAttribute("transform");
      let translate = parseTransform(transform);
      lastValidX = translate.x;
      lastValidY = translate.y;
    
      // Учитываем смещение между курсором и центром фигуры
      deltaX = pos.x - (lastValidX * scaleRatioX);
      deltaY = pos.y - (lastValidY * scaleRatioY);
    }
  }
  
  

  
  
    // Обработчик перемещения
// Обработчик перемещения для десктопа
function moveFigureDesk(event) {
  if (isDragging) {
    let pos = { x: event.clientX, y: event.clientY };
    let scaleRatioX = svgRect.width / svgElement.viewBox.baseVal.width;
    let scaleRatioY = svgRect.height / svgElement.viewBox.baseVal.height;

    // Учитываем смещение курсора относительно SVG
    let targetX = (pos.x - svgRect.left) / scaleRatioX - deltaX;
    let targetY = (pos.y - svgRect.top) / scaleRatioY - deltaY;

    performMovement(targetX, targetY, 'x');
    performMovement(targetX, targetY, 'y');

    event.preventDefault(); // Предотвращаем стандартное поведение скроллинга
  }
}


  // Обработчик завершения перетаскивания
  function stopDragging() {
    isDragging = false;
  }

  // Функция для разбора строки трансформации и извлечения координат x и y
  function parseTransform(transform) {
    let match = /translate\(([^,]+),\s*([^)]+)\)/.exec(transform);
    return {
      x: match ? parseFloat(match[1]) : 0,
      y: match ? parseFloat(match[2]) : 0,
    };
  }
  

  // Функция для выполнения перемещения фигуры
  function performMovement(newX, newY, axis) {
    let steps = 3;  // Увеличиваем количество шагов для большей плавности
    let stepX = (newX - lastValidX) / steps;
    let stepY = (newY - lastValidY) / steps;
  
    for (let i = 0; i < steps; i++) {
      let nextX = axis === 'x' ? lastValidX + stepX : lastValidX;
      let nextY = axis === 'y' ? lastValidY + stepY : lastValidY;
  
      if (!checkCollision(nextX, nextY)) {
        lastValidX = nextX;
        lastValidY = nextY;
      } else {
        // Останавливаемся на последней допустимой позиции
        break;
      }
    }
  
    svgDoc.querySelector(".active").setAttribute("transform", `translate(${lastValidX}, ${lastValidY})`);
  }

  // Функция для проверки коллизий с препятствиями
  function checkCollision(x, y) {
    let activeFigure = svgDoc.querySelector(".active");
    let figureRect = activeFigure.getBBox();
    let figureBBox = { x: x, y: y, width: figureRect.width, height: figureRect.height };
    let whitePaths = svgDoc.querySelectorAll('.path');

    for (let path of whitePaths) {
      let pathBBox = path.getBBox();
      if (!(figureBBox.x + figureBBox.width < pathBBox.x ||
            figureBBox.x > pathBBox.x + pathBBox.width ||
            figureBBox.y + figureBBox.height < pathBBox.y ||
            figureBBox.y > pathBBox.y + pathBBox.height)) {
        return true;
      }
    }
    return false;
  }

  // Назначаем обработчики событий
  svgDoc.addEventListener("mousedown", startDraggingDesk);
  svgDoc.addEventListener("mousemove", moveFigureDesk);
  svgDoc.addEventListener("mouseup", stopDragging);
  svgDoc.addEventListener("touchstart", startDragging, { passive: false });
  svgDoc.addEventListener("touchmove", moveFigure, { passive: false });
  svgDoc.addEventListener("touchend", stopDragging);
});