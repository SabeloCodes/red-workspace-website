// ---------------- Mini Carousel 3D Coverflow ----------------
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".js-carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".carousel-track");
  const items = Array.from(track.querySelectorAll(".carousel-item"));
  const prevBtn = carousel.querySelector(".carousel-arrow.prev");
  const nextBtn = carousel.querySelector(".carousel-arrow.next");

  let currentIndex = 0;

  function updateCarousel() {
    items.forEach((item, index) => {
      item.className = "carousel-item";
      if (index === currentIndex) {
        item.classList.add("center");
      } else if (index === currentIndex - 1) {
        item.classList.add("left");
      } else if (index === currentIndex + 1) {
        item.classList.add("right");
      }
    });
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
  });

  updateCarousel();
});
