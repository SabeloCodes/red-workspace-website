document.addEventListener("DOMContentLoaded", () => {
  // Inject Navigation
  injectContent("components/nav.html", "navigation", () => {
    const navScript = document.createElement("script");
    navScript.src = "js/nav.js";
    navScript.onload = () => console.log("✅ nav.js loaded");
    document.body.appendChild(navScript);
  });

  // Inject Footer
  injectContent("components/footer.html", "page-footer");

  // Inject Carousel and run setup
  injectContent("components/carousel.html", "carousel-placeholder", () => {
    if (typeof setupCarouselLoop === "function") {
      setupCarouselLoop();
    }

    setTimeout(() => {
      if (typeof setupCarouselOverlay === "function") {
        setupCarouselOverlay();
      }

      setupPortfolioCarousel(); // ✅ Runs only after DOM is ready
    }, 100);
  });
});

// Reusable content injector
function injectContent(url, targetId, callback) {
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
      return res.text();
    })
    .then((html) => {
      const target = document.getElementById(targetId);
      if (!target) {
        console.error(`❌ Element with ID "${targetId}" not found.`);
        return;
      }
      target.innerHTML = html;
      if (typeof callback === "function") callback();
    })
    .catch((err) => console.error(`❌ Error loading ${url}:`, err));
}

function setupPortfolioCarousel() {
  const slides = document.querySelectorAll(".portfolio-slide");
  const prevBtn = document.querySelector(".portfolio-prev");
  const nextBtn = document.querySelector(".portfolio-next");
  const dotsContainer = document.querySelector(".portfolio-dots");

  if (!slides.length || !dotsContainer) return;

  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) =>
      slide.classList.toggle("active", i === index)
    );
    const dots = dotsContainer.querySelectorAll(".portfolio-dot");
    dots.forEach((dot, i) =>
      dot.classList.toggle("active", i === index)
    );
  }

  function createDots() {
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("portfolio-dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentIndex = i;
        showSlide(currentIndex);
      });
      dotsContainer.appendChild(dot);
    });
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  createDots();
  showSlide(currentIndex);
}

document.addEventListener("DOMContentLoaded", setupPortfolioCarousel);