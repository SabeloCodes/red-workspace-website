// js/who-we-are.js

// Utility function to inject HTML content dynamically
function injectContent(url, targetId, callback) {
    fetch(url)
      .then((res) => res.text())
      .then((html) => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.innerHTML = html;
          if (typeof callback === "function") callback();
        } else {
          console.error(`Target element with ID "${targetId}" not found.`);
        }
      })
      .catch((err) => console.error(`Error loading ${url}:`, err));
  }
  
  // Utility function to dynamically inject CSS file
  function injectCSS(href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }
  
  // Main logic for Who We Are page
  
  window.addEventListener("DOMContentLoaded", () => {
    injectContent("components/nav.html", "navigation");
    injectContent("components/footer.html", "page-footer");
  
    // Dynamically load carousel styles and component
    injectCSS("css/carousel.css");
    injectContent("components/carousel.html", "carousel-placeholder", () => {
      setupCarouselOverlay();
      setupCarouselLoop();
    });
  });
  