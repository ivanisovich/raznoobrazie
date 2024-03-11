var maze = document.querySelector("#maze");

maze.addEventListener("load", function () {
  var svgDoc = maze.contentDocument;
  var svgElement = svgDoc.documentElement;
  var svgRect = svgElement.getBoundingClientRect();
 
  let isDragging = false;
  let lastValidX = 1600, lastValidY = 2560;
  let deltaX = 0, deltaY = 0;

  svgDoc.addEventListener("mousedown", (e) => {
    let figure = e.target.closest(".figure");
    if (figure) {
      svgDoc.querySelectorAll(".figure").forEach((item) => {
        item.classList.remove("active");
      });
      figure.classList.add("active");
      isDragging = true;
      let scaleRatioX = svgRect.width / svgElement.viewBox.baseVal.width;
      let scaleRatioY = svgRect.height / svgElement.viewBox.baseVal.height;
      let transform = figure.getAttribute("transform");
      let translate = parseTransform(transform);
      lastValidX = translate.x;
      lastValidY = translate.y;
      deltaX = (e.clientX - svgRect.left) / scaleRatioX - lastValidX;
      deltaY = (e.clientY - svgRect.top) / scaleRatioY - lastValidY;
    }
  });

  svgDoc.addEventListener("mousemove", function (event) {
    if (isDragging) {
      let scaleRatioX = svgRect.width / svgElement.viewBox.baseVal.width;
      let scaleRatioY = svgRect.height / svgElement.viewBox.baseVal.height;
      let targetX = (event.clientX - svgRect.left) / scaleRatioX - deltaX;
      let targetY = (event.clientY - svgRect.top) / scaleRatioY - deltaY;

      performMovement(targetX, lastValidY, 'x');
      performMovement(lastValidX, targetY, 'y');
    }
  });

  svgDoc.addEventListener("mouseup", function () {
    isDragging = false;
  });

  function parseTransform(transform) {
    let match = /translate\(([^,]+),\s*([^)]+)\)/.exec(transform);
    return {
      x: match ? parseFloat(match[1]) : 0,
      y: match ? parseFloat(match[2]) : 0,
    };
  }

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
  
    svgDoc.querySelector(".active").setAttribute("transform", `translate(${lastValidX}, ${lastValidY})`);
  }

  function checkCollision(x, y, svgDoc) {
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
});
