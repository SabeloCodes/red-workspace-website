// case-studies.js

// Utility function to inject external content
function injectContent(url, targetId, callback) {
  fetch(url)
    .then((res) => res.text())
    .then((html) => {
      const target = document.getElementById(targetId);
      if (target) {
        target.innerHTML = html;
        if (typeof callback === "function") callback();
      } else {
        console.error(`Element with ID "${targetId}" not found.`);
      }
    })
    .catch((err) => console.error(`Error loading ${url}:`, err));
}

// Utility to inject external CSS
function injectCSS(href) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

// -------------------- Mini Carousel Logic --------------------
function setupMiniCarousel() {
  const track = document.querySelector(".mini-carousel-track");
  const items = document.querySelectorAll(".mini-carousel-track img");
  const prevBtn = document.querySelector(".mini-carousel-prev");
  const nextBtn = document.querySelector(".mini-carousel-next");

  if (!track || items.length < 3) return;

  let currentIndex = 1;

  function updateCarousel() {
    const itemWidth = items[0].offsetWidth;
    const shift = itemWidth * (currentIndex - 1);
    track.style.transform = `translateX(-${shift}px)`;

    // Update "center" styling
    items.forEach((item, i) => {
      item.classList.toggle("center", i === currentIndex);
    });
  }

  function moveLeft() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }

  function moveRight() {
    if (currentIndex < items.length - 2) {
      currentIndex++;
      updateCarousel();
    }
  }

  prevBtn?.addEventListener("click", moveLeft);
  nextBtn?.addEventListener("click", moveRight);

  updateCarousel(); // Initial call
}

// -------------------- Page Initialization --------------------
document.addEventListener("DOMContentLoaded", () => {
  injectContent("components/nav.html", "navigation");
  injectContent("components/footer.html", "page-footer");

  injectCSS("css/carousel.css");
  injectContent("components/carousel.html", "carousel-placeholder", () => {
    setupCarouselOverlay();
    setupCarouselLoop();
  });

  setupMiniCarousel(); // Custom mini carousel logic
});