var raznoobrazie = document.querySelector("#raznoobrazie");
puzzle.addEventListener("load", function () {
  var svgDoc = raznoobrazie.contentDocument;

  var clickableElements = svgDoc.querySelectorAll(".card");

  clickableElements.forEach(function (elem) {
    elem.addEventListener("click", function () {
      elem.classList.toggle('flipped');
    });
    elem.addEventListener("touchstart", function () {
      elem.classList.toggle('flipped');
    });
  });
});
