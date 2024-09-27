const slider = document.querySelector('.slider');
const slides = Array.from(document.querySelectorAll('.slide')); // Преобразуем NodeList в массив
const leftButton = document.querySelector('.left');
const rightButton = document.querySelector('.right');
const paginationItems = document.querySelectorAll('.pagination .item');

let currentIndex = 0; // Индекс текущего слайда

function updatePagination() {
    paginationItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentIndex); // Обновляем активный элемент
    });
}

function shiftSlides(direction) {
    if (direction === 'right') {
        const firstSlide = slides.shift(); // Удаляем первый слайд из массива
        slides.push(firstSlide); // Добавляем его в конец
        currentIndex = (currentIndex + 1) % slides.length; // Обновляем индекс
    } else if (direction === 'left') {
        const lastSlide = slides.pop(); // Удаляем последний слайд из массива
        slides.unshift(lastSlide); // Добавляем его в начало
        currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Обновляем индекс
    }
    
    // Обновляем отображение слайдов
    slider.innerHTML = ''; // Очищаем слайдер
    slides.forEach(slide => slider.appendChild(slide)); // Добавляем слайды обратно
    updatePagination(); // Обновляем пагинацию
}

rightButton.addEventListener('click', () => shiftSlides('right'));
leftButton.addEventListener('click', () => shiftSlides('left'));

paginationItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index; // Устанавливаем индекс на кликнутый элемент
        // Перемещаем слайды, чтобы соответствовать текущему индексу
        const offset = index - slides.indexOf(slides[0]); // Вычисляем смещение
        for (let i = 0; i < Math.abs(offset); i++) {
            shiftSlides(offset > 0 ? 'right' : 'left'); // Сдвигаем слайды
        }
    });
});

// Инициализация пагинации
updatePagination();

function toggleAside() {
    const aside_block = document.querySelector('.aside_block');
    const aside = document.querySelector('.aside');
    aside_block.classList.toggle('active'); 
    aside.classList.toggle('active'); 
}