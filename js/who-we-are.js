// who-we-are.js

// -------------------- Utility: Inject External Content --------------------
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

// -------------------- Utility: Inject External CSS --------------------
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

  updateCarousel();
}

// -------------------- Team Animation Logic --------------------
function setupTeamAnimations() {
  const teamMembers = document.querySelectorAll(".team-member-segment");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${index * 0.2}s`;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    teamMembers.forEach(member => observer.observe(member));
  } else {
    teamMembers.forEach(member => member.classList.add("visible")); // Fallback
  }
}

// -------------------- Animate Buttons in #who-we-are --------------------
function setupWhoWeAreButtonAnimations() {
  const section = document.getElementById("who-we-are");
  if (!section) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const buttons = entry.target.querySelectorAll(".btn:not(.btn-animate)");
        buttons.forEach(btn => btn.classList.add("btn-animate"));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(section);
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

  setupMiniCarousel();
  setupTeamAnimations();
  setupWhoWeAreButtonAnimations(); // ✅ Animate buttons inside #who-we-are
});