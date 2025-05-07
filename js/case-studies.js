// ---------------- Component Injection ----------------

function injectComponent(id, file, callback) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (typeof callback === 'function') callback();
    });
}

injectComponent('navigation', 'components/nav.html');
injectComponent('page-footer', 'components/footer.html');
injectComponent('carousel-placeholder', 'components/carousel.html', () => {
  if (typeof initializeCarousel === 'function') {
    initializeCarousel();
  }
});
