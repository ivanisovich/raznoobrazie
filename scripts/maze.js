var maze = document.querySelector("#maze");

maze.addEventListener("load", function () {
  var svgDoc = maze.contentDocument;
  var svgElement = svgDoc.documentElement;
  var svgRect = svgElement.getBoundingClientRect();
  var mouth = svgDoc.querySelector("#maze-mouth");
  let isDragging = false;
  let lastValidX = 1600, lastValidY = 2560;
  let deltaX = 0, deltaY = 0;

  mouth.addEventListener("mousedown", function(event) {
    isDragging = true;
    let scaleRatioX = svgRect.width / svgElement.viewBox.baseVal.width;
    let scaleRatioY = svgRect.height / svgElement.viewBox.baseVal.height;
    let transform = mouth.getAttribute("transform");
    let translate = parseTransform(transform);
    lastValidX = translate.x;
    lastValidY = translate.y;
    deltaX = (event.clientX - svgRect.left) / scaleRatioX - lastValidX;
    deltaY = (event.clientY - svgRect.top) / scaleRatioY - lastValidY;
  });
  
  // Функция для разбора строки трансформации и извлечения координат x и y
  function parseTransform(transform) {
    let match = /translate\(([^,]+),\s*([^)]+)\)/.exec(transform);
    return {
      x: match ? parseFloat(match[1]) : 0,
      y: match ? parseFloat(match[2]) : 0,
    };
  }

  svgDoc.addEventListener("mousemove", function(event) {
    if (isDragging) {
      let scaleRatioX = svgRect.width / svgElement.viewBox.baseVal.width;
      let scaleRatioY = svgRect.height / svgElement.viewBox.baseVal.height;
      let targetX = (event.clientX - svgRect.left) / scaleRatioX - deltaX;
      let targetY = (event.clientY - svgRect.top) / scaleRatioY - deltaY;

      performMovement(targetX, lastValidY, 'x');
      performMovement(lastValidX, targetY, 'y');
    }
  });

  svgDoc.addEventListener("mouseup", function() {
    isDragging = false;
  });

  function getTouchPosition(event) {
    var touch = event.touches[0];
    let scaleRatioX = svgRect.width / svgElement.viewBox.baseVal.width;
    let scaleRatioY = svgRect.height / svgElement.viewBox.baseVal.height;
    return {
      x: (touch.clientX - svgRect.left) / scaleRatioX,
      y: (touch.clientY - svgRect.top) / scaleRatioY
    };
  }

  mouth.addEventListener("touchstart", function(event) {
    isDragging = true;
    let pos = getTouchPosition(event);
    let transform = mouth.getAttribute("transform");
    let translate = parseTransform(transform);
    lastValidX = translate.x;
    lastValidY = translate.y;
    deltaX = pos.x - lastValidX;
    deltaY = pos.y - lastValidY;
    event.preventDefault(); // Предотвращаем стандартное поведение касания
  }, { passive: false });

  svgDoc.addEventListener("touchmove", function(event) {
    if (isDragging) {
      let pos = getTouchPosition(event);
      let targetX = pos.x - deltaX;
      let targetY = pos.y - deltaY;

      performMovement(targetX, lastValidY, 'x');
      performMovement(lastValidX, targetY, 'y');
      event.preventDefault(); // Предотвращаем стандартное поведение скроллинга
    }
  }, { passive: false });

  svgDoc.addEventListener("touchend", function() {
    isDragging = false;
  });

  function performMovement(newX, newY, axis) {
    let steps = 5;  // Увеличиваем количество шагов для большей плавности
    let stepX = (newX - lastValidX) / steps;
    let stepY = (newY - lastValidY) / steps;
  
    for (let i = 0; i < steps; i++) {
      let nextX = axis === 'x' ? lastValidX + stepX : lastValidX;
      let nextY = axis === 'y' ? lastValidY + stepY : lastValidY;
  
      if (!checkCollision(nextX, nextY, svgDoc)) {
        lastValidX = nextX;
        lastValidY = nextY;
      } else {
        // Останавливаемся на последней допустимой позиции
        break;
      }
    }
  
    mouth.setAttribute("transform", `translate(${lastValidX}, ${lastValidY})`);
  }

  function checkCollision(x, y, svgDoc) {
    let mouthRect = mouth.getBBox();
    let mouthBBox = { x: x, y: y, width: mouthRect.width, height: mouthRect.height };
    let whitePaths = svgDoc.querySelectorAll('.path');

    for (let path of whitePaths) {
      let pathBBox = path.getBBox();
      if (!(mouthBBox.x + mouthBBox.width < pathBBox.x ||
            mouthBBox.x > pathBBox.x + pathBBox.width ||
            mouthBBox.y + mouthBBox.height < pathBBox.y ||
            mouthBBox.y > pathBBox.y + pathBBox.height)) {
        return true;
      }
    }
    return false;
  }
});
