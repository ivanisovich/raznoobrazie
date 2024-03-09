var raznoobrazie = document.querySelector("#raznoobrazie");
puzzle.addEventListener("load", function () {
  var svgDoc = raznoobrazie.contentDocument;

  var clickableElements = svgDoc.querySelectorAll(".card");

  clickableElements.forEach(function (elem) {
    elem.addEventListener("click", function () {
      console.log(elem);
      if (!elem.classList.contains("flipped")){
        elem.classList.add('flipped');
      } else {
        elem.classList.remove("flipped")
      }
    });
  });
});
