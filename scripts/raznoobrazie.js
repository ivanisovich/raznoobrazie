var raznoobrazie = document.querySelector("#raznoobrazie");
puzzle.addEventListener("load", function () {
  var svgDoc = raznoobrazie.contentDocument;

  var clickableElements = svgDoc.querySelectorAll(".card");

  clickableElements.forEach(function (elem) {
    elem.addEventListener("click", function () {
      console.log(elem);
      elem.classList.toggle('flipped');
    });
  });
});
