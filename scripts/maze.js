var maze = document.querySelector("#maze");
maze.addEventListener("load", function () {
  var svgDoc = maze.contentDocument;

  var mouth = svgDoc.querySelector("#maze-mouth");
  let initialX = 1600;
  let initialY = 2560;

  svgDoc.addEventListener("keydown", function (event) {
    let newX = initialX;
    let newY = initialY;

    if (event.code === "KeyW") newY -= 210;
    if (event.code === "KeyS") newY += 210;
    if (event.code === "KeyA") newX -= 210;
    if (event.code === "KeyD") newX += 210;

    // Add collision detection logic here
    // If the new position does not collide with white paths
    if (!checkCollision(newX, newY)) {
      initialX = newX;
      initialY = newY;
      mouth.setAttribute("transform", `translate(${newX}, ${newY})`);
    }
  });
  function checkCollision(newX, newY) {
    // Get the bounding box of the mouth element at its new position
    let mouthBBox = {
      x: newX,
      y: newY,
      width: 304,  // The width of the mouth element
      height: 146  // The height of the mouth element
    };
  
    // Check for collisions with each white path
    let whitePaths = svgDoc.querySelectorAll('path[stroke="white"]');
    for (let i = 0; i < whitePaths.length; i++) {
      let pathBBox = whitePaths[i].getBBox();
  
      // Check if the bounding boxes intersect
      if (!(mouthBBox.x + mouthBBox.width < pathBBox.x ||
            mouthBBox.x > pathBBox.x + pathBBox.width ||
            mouthBBox.y + mouthBBox.height < pathBBox.y ||
            mouthBBox.y > pathBBox.y + pathBBox.height)) {
        // There is a collision
        return true;
      }
    }
  
    // No collision detected
    return false;
  }
  
  
  
});