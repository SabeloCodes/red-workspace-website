// Utility to inject external HTML
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
  
  // On DOM load
  document.addEventListener("DOMContentLoaded", () => {
    injectContent("components/nav.html", "navigation");
    injectContent("components/footer.html", "page-footer");
  
    // Inject carousel and setup
    injectCSS("css/carousel.css");
    injectContent("components/carousel.html", "carousel-placeholder", () => {
      setupCarouselOverlay(); // assume this already exists
      setupCarouselLoop();    // standard for your site
    });
  });