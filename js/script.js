// js/script.js (for index.html)

// Inject reusable components dynamically
function injectContent(url, targetId, callback) {
  fetch(url)
    .then(res => res.text())
    .then(html => {
      const target = document.getElementById(targetId);
      if (target) {
        target.innerHTML = html;
        if (typeof callback === 'function') callback();
      }
    })
    .catch(err => console.error(`Error loading ${url}:`, err));
}

// Inject external stylesheet if needed
function injectCSS(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

// Initialize homepage
document.addEventListener('DOMContentLoaded', () => {
  injectContent('components/nav.html', 'navigation');
  injectContent('components/footer.html', 'page-footer');

  injectCSS('css/carousel.css');
  injectContent('components/carousel.html', 'carousel-placeholder', () => {
    setupCarouselOverlay();
    setupCarouselLoop();
  });
});
