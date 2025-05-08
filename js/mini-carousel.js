document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.js-carousel');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const prevButton = carousel.querySelector('.carousel-arrow.prev');
    const nextButton = carousel.querySelector('.carousel-arrow.next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    let currentIndex = 0;

    // Generate dots
    const dots = items.map((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('carousel-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
      return dot;
    });

    function updateCarousel() {
      items.forEach((item, i) => {
        item.classList.remove('center', 'left', 'right', 'left-far', 'right-far');
        if (i === currentIndex) item.classList.add('center');
        else if (i === currentIndex - 1) item.classList.add('left');
        else if (i === currentIndex + 1) item.classList.add('right');
        else if (i < currentIndex - 1) item.classList.add('left-far');
        else if (i > currentIndex + 1) item.classList.add('right-far');
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % items.length;
      updateCarousel();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateCarousel();
    }

    updateCarousel();
    nextButton?.addEventListener('click', nextSlide);
    prevButton?.addEventListener('click', prevSlide);
  });
});