document.addEventListener("mousemove", function (e) {
    const svg = document.querySelector(".eyes");
    const rect = svg.getBoundingClientRect();
    const scaleRatioX = rect.width / svg.viewBox.baseVal.width; // Предполагаем, что viewBox установлен для SVG
    const eyes = document.querySelectorAll(".eye");
    const mouseX = (e.clientX - rect.left) / scaleRatioX; // Корректировка с учетом масштаба
    const mouseY = (e.clientY - rect.top) * 1.1
    eyes.forEach((eye) => {
      const eyeCenterX = parseFloat(eye.getAttribute("cx1"));
      const eyeCenterY = parseFloat(eye.getAttribute("cy1"));

      const maxRadius = parseFloat(eye.getAttribute("data-max-radius"));

      let dx = mouseX - eyeCenterX;
      let dy = mouseY - eyeCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > maxRadius) {
        dx = (dx * maxRadius) / distance;
        dy = (dy * maxRadius) / distance;
      }

      eye.setAttribute("cx", eyeCenterX + dx);
      eye.setAttribute("cy", eyeCenterY + dy);
    });
});
