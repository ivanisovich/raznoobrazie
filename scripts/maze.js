var puzzle = document.querySelector("#maze");
puzzle.addEventListener("load", function () {
  var svgDoc = puzzle.contentDocument;

  var mouth = svgDoc.querySelector("#maze-mouth");
  let initialX = 1600
  let initialY = 2560

  svgDoc.addEventListener('keydown', function(event) {
    if (event.key === "ArrowUp") {
        newY = initialY -= 210
        console.log(`${"translate("+initialX+","+newY+")"}`);
        mouth.setAttribute("transform",`${"translate("+initialX+", "+newY+")"}`)
        // Ваш код для обработки события
    }
});
});


