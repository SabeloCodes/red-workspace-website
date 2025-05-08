// contact.js

// Utility function to inject external content
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
  
  // Utility function to inject external CSS
  function injectCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
  
  // Setup overlay content for the contact page carousel
  function setupCarouselOverlay() {
    const heading = document.querySelector('.carousel-overlay-heading');
    const paragraph = document.querySelector('.carousel-overlay-paragraph');
  
    if (heading && paragraph) {
      heading.textContent = 'Contact Us';
      paragraph.textContent = `At Red Workspace, we’re always ready to talk ideas, projects, or just have a friendly chat about how we can help transform your workspace. Whether you're at the early stages of planning or ready to get started, our team is here to support you every step of the way.`;
    }
  }
  
  // Initialize page content
  document.addEventListener('DOMContentLoaded', () => {
    injectContent('components/nav.html', 'navigation');
    injectContent('components/footer.html', 'page-footer');
  
    injectCSS('css/carousel.css');
    injectContent('components/carousel.html', 'carousel-placeholder', () => {
      setupCarouselOverlay();
      setupCarouselLoop?.(); // Optional if loop effect is active
    });
  });