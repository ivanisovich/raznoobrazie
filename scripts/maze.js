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
    initialX = newX;
    initialY = newY;
    mouth.setAttribute("transform", `translate(${newX}, ${newY})`);
    
  });
  
  
  
});