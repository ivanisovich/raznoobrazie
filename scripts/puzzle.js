var puzzle = document.querySelector("#puzzle");
puzzle.addEventListener("load", function () {
  var svgDoc = puzzle.contentDocument;

  var clickableElements = svgDoc.querySelectorAll(".puzzle");

  clickableElements.forEach(function (elem) {
    elem.addEventListener("click", function () {
      console.log(elem);
      elem.classList.add("hidden")
    });
  });
 
});