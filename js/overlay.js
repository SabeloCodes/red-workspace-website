// js/overlay.js

function setupCarouselOverlay() {
    if (!document.querySelector("#carousel-container")) return;
  
    // Start auto carousel rotation
    if (typeof startCarouselLoop === "function") {
      startCarouselLoop();
    }
  
    const heading = document.querySelector("#carousel-container .overlay h1");
    const paragraph = document.querySelector("#carousel-container .overlay p");
    const buttons = document.querySelectorAll("#carousel-container .btn");
  
    const { carouselHeading, carouselParagraph, carouselButton1, carouselButton2 } = document.body.dataset;
  
    if (heading && carouselHeading) heading.textContent = carouselHeading;
    if (paragraph && carouselParagraph) paragraph.textContent = carouselParagraph;
    if (buttons[0] && carouselButton1) buttons[0].textContent = carouselButton1;
    if (buttons[1] && carouselButton2) buttons[1].textContent = carouselButton2;
  }