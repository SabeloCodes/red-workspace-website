// --- js/carousel.js ---

// Carousel state
let carouselImage1, carouselImage2;
let currentImageIndex = 0;
let showingImage1 = true;

const heroImages = [
  "img/PROJECTS/REV_CAPITAL/HighRes__W9A4780-Edit 1.jpg",
  "img/PROJECTS/US_HEDGE_FUND/Magnetar_0051-HDR.jpg",
  "img/PROJECTS/REV_CAPITAL/HighRes__W9A4741.jpg"
];

// Setup carousel functionality
function setupCarouselLoop() {
  carouselImage1 = document.getElementById("carousel-image-1");
  carouselImage2 = document.getElementById("carousel-image-2");
  if (!carouselImage1 || !carouselImage2) return;

  carouselImage1.classList.add("zoom-animation", "active", "fade-in");
  setInterval(swapImages, 5000);
}

function swapImages() {
  const nextImageIndex = (currentImageIndex + 1) % heroImages.length;
  const nextSrc = heroImages[nextImageIndex];

  const incoming = showingImage1 ? carouselImage2 : carouselImage1;
  const outgoing = showingImage1 ? carouselImage1 : carouselImage2;

  incoming.src = nextSrc;
  incoming.classList.add("active", "fade-in", "zoom-animation");

  outgoing.classList.remove("zoom-animation");
  outgoing.classList.add("fading-out");

  setTimeout(() => {
    outgoing.classList.remove("active", "fading-out");
  }, 1000); // Matches CSS fade duration

  showingImage1 = !showingImage1;
  currentImageIndex = nextImageIndex;
}

function setupCarouselOverlay() {
  const h1 = document.querySelector("#carousel-container .overlay h1");
  const p = document.querySelector("#carousel-container .overlay p");
  const buttons = document.querySelectorAll("#carousel-container .btn");

  const heading = document.body.dataset.carouselHeading;
  const paragraph = document.body.dataset.carouselParagraph;
  const btn1 = document.body.dataset.carouselButton1;
  const btn2 = document.body.dataset.carouselButton2;

  if (h1 && heading) h1.textContent = heading;
  if (p && paragraph) p.textContent = paragraph;
  if (buttons[0] && btn1) buttons[0].textContent = btn1;
  if (buttons[1] && btn2) buttons[1].textContent = btn2;
}

window.setupCarouselLoop = setupCarouselLoop;
window.setupCarouselOverlay = setupCarouselOverlay;
