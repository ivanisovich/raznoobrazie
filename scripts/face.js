document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
  
    document.querySelectorAll('.face-parts__item').forEach(img => {
      img.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', img.outerHTML);
      });
    });
  
    dropZone.addEventListener('dragover', (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    });
  
    dropZone.addEventListener('drop', (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const dropRect = dropZone.getBoundingClientRect();
      
        // Создание элемента изображения из данных перетаскивания
        const wrapper = document.createElement('div');
        wrapper.innerHTML = data;
        const img = wrapper.firstChild;
      
        // Добавляем img в dropZone для измерения его размеров, делаем его невидимым
        img.style.visibility = 'hidden';
        dropZone.appendChild(img);
      
        setTimeout(() => {
          const imgWidth = img.offsetWidth / 2;
          const imgHeight = img.offsetHeight / 2;
          // Учитываем скролл страницы или контейнера
          const scrollX = window.scrollX || document.documentElement.scrollLeft;
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          const x = ((event.clientX  - dropRect.left - imgWidth) / dropRect.width) * 100;
          const y = ((event.clientY  - dropRect.top - imgHeight) / dropRect.height) * 100;
      
          img.style.left = `${x}%`;
          img.style.top = `${y}%`;
          img.style.visibility = 'visible';
          console.log(img.style.left)
      
          // Применяем функцию makeDraggable к новому элементу img
          makeDraggable(img);
        }, 0); // Минимальная задержка для обновления DOM и измерения размеров img
      });
      
      
      
  
    function makeDraggable(img) {
        img.addEventListener('dragstart', (e) => {
          // В этот раз не используем setDragImage, чтобы картинка оставалась под курсором,
          // но вы можете настроить это поведение по своему усмотрению.
          e.dataTransfer.setData('text/plain', ''); // Для Firefox
      
          const initX = e.clientX;
          const initY = e.clientY;
      
          const dragOverHandler = (e) => {
            const dropRect = dropZone.getBoundingClientRect();
      
            // Учитываем размеры картинки для центрирования
            const imgWidth = img.offsetWidth / 2; // Половина ширины картинки
            const imgHeight = img.offsetHeight / 2; // Половина высоты картинки
      
            // Рассчитываем положение так, чтобы курсор был в центре картинки
            let x = ((e.clientX - dropRect.left - imgWidth) / dropRect.width) * 100;
            let y = ((e.clientY - dropRect.top - imgHeight) / dropRect.height) * 100;
      
            // Ограничиваем значения x и y, чтобы картинка не выходила за пределы dropZone
            x = Math.max(0, Math.min(100, x));
            y = Math.max(0, Math.min(100, y));
      
            img.style.left = `${x}%`;
            img.style.top = `${y}%`;
          };
      
          const dragEndHandler = () => {
            dropZone.removeEventListener('dragover', dragOverHandler);
            img.removeEventListener('dragend', dragEndHandler);
          };
      
          dropZone.addEventListener('dragover', dragOverHandler);
          img.addEventListener('dragend', dragEndHandler);
        });
      }
      
  });

  document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');

    document.querySelectorAll('.face-parts__item').forEach(img => {
        img.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const dataTransfer = new DataTransfer();
            dataTransfer.setData('text/plain', img.outerHTML);
            img.dataTransfer = dataTransfer;
        }, { passive: false });
    });

    dropZone.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Предотвращаем скролл
        const touch = e.touches[0];
    }, { passive: false });

    dropZone.addEventListener('touchend', (e) => {
        e.preventDefault();
        const touch = e.changedTouches[0];
        const data = e.target.dataTransfer.getData('text/plain');
        const dropRect = dropZone.getBoundingClientRect();

        const wrapper = document.createElement('div');
        wrapper.innerHTML = data;
        const img = wrapper.firstChild;

        img.style.visibility = 'hidden';
        dropZone.appendChild(img);

        setTimeout(() => {
            const imgWidth = img.offsetWidth / 2;
            const imgHeight = img.offsetHeight / 2;
            const x = ((touch.clientX - dropRect.left - imgWidth) / dropRect.width) * 100;
            const y = ((touch.clientY - dropRect.top - imgHeight) / dropRect.height) * 100;

            img.style.left = `${x}%`;
            img.style.top = `${y}%`;
            img.style.visibility = 'visible';

            makeDraggable(img);
        }, 0);
    });

    function makeDraggable(img) {
        img.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const initX = touch.clientX;
            const initY = touch.clientY;

            const dragMoveHandler = (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const dropRect = dropZone.getBoundingClientRect();

                let x = ((touch.clientX - dropRect.left - img.offsetWidth / 2) / dropRect.width) * 100;
                let y = ((touch.clientY - dropRect.top - img.offsetHeight / 2) / dropRect.height) * 100;

                x = Math.max(0, Math.min(100, x));
                y = Math.max(0, Math.min(100, y));

                img.style.left = `${x}%`;
                img.style.top = `${y}%`;
            };

            const dragEndHandler = () => {
                dropZone.removeEventListener('touchmove', dragMoveHandler);
                img.removeEventListener('touchend', dragEndHandler);
            };

            dropZone.addEventListener('touchmove', dragMoveHandler, { passive: false });
            img.addEventListener('touchend', dragEndHandler, { passive: false });
        }, { passive: false });
    }
});
