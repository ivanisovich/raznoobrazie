var puzzle = document.querySelector("#puzzle");
puzzle.addEventListener("load", function () {
  var svgDoc = puzzle.contentDocument;

  var clickableElements = svgDoc.querySelectorAll(".puzzle");

  clickableElements.forEach(function (elem) {
    elem.addEventListener("click", function () {
      elem.classList.add("hidden")
    });
  });
 
});


const objectElement = document.querySelector('.puzzle-text');
objectElement.addEventListener('load', function() {
  const svgDocument = objectElement.contentDocument;

  // Добавляем обработчик клика на SVG
  svgDocument.documentElement.addEventListener('click', function() {
    // Предположим, что у вас есть анимация, контролируемая классом 'active'
    const animatableElements = svgDocument.querySelectorAll('rect');
    animatableElements.forEach(item=> {
      item.classList.add('active');
    })
  });
});