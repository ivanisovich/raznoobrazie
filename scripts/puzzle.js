document.addEventListener('DOMContentLoaded', () => {
  let draggedItem = null;
  let offsetX = 0;
  let offsetY = 0;

  // Обработка событий для мыши
  const addMouseListeners = (item) => {
    item.addEventListener('dragstart', (e) => {
      draggedItem = item;
      offsetX = e.clientX - draggedItem.getBoundingClientRect().left;
      offsetY = e.clientY - draggedItem.getBoundingClientRect().top;
      e.dataTransfer.setData('text', ''); // Для Firefox
    });

    item.addEventListener('dragend', () => {
      draggedItem = null;
    });
  };

  // Обработка событий для сенсорных устройств
  const addTouchListeners = (item) => {
    item.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      draggedItem = item;
      const rect = draggedItem.getBoundingClientRect();
      offsetX = touch.clientX - rect.left;
      offsetY = touch.clientY - rect.top;
    }, {passive: true});

    item.addEventListener('touchmove', (e) => {
      e.preventDefault(); // Предотвращение скроллинга
      if (!draggedItem) return;

      const touch = e.touches[0];
      const rect = e.target.closest('.puzzle-inner').getBoundingClientRect();
      draggedItem.style.left = `${touch.clientX - rect.left - offsetX}px`;
      draggedItem.style.top = `${touch.clientY - rect.top - offsetY}px`;
    }, {passive: false});

    item.addEventListener('touchend', () => {
      draggedItem = null;
    });
  };

  document.querySelectorAll('.puzzle-item').forEach(item => {
    addMouseListeners(item);
    addTouchListeners(item);
  });

  const puzzleInner = document.querySelector('.puzzle-inner');

  puzzleInner.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  puzzleInner.addEventListener('drop', (e) => {
    e.preventDefault();
    if (draggedItem) {
      const rect = puzzleInner.getBoundingClientRect();
      draggedItem.style.left = `${e.clientX - rect.left - offsetX}px`;
      draggedItem.style.top = `${e.clientY - rect.top - offsetY}px`;
    }
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