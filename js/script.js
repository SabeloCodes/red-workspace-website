document.addEventListener("DOMContentLoaded", () => {
    // Inject nav and footer
    injectContent("components/nav.html", "navigation");
    injectContent("components/footer.html", "page-footer");
  
    // Carousel logic
    const carouselImage = document.getElementById("carousel-image");
    const images = [
      "img/PROJECTS/REV_CAPITAL/HighRes__W9A4780-Edit 1.jpg",
      "img/PROJECTS/REV_CAPITAL/HighRes__W9A4675 1.jpg",
      "img/PROJECTS/US_HEDGE_FUND/Magnetar_0084.jpg",
      "img/PROJECTS/US_HEDGE_FUND/Magnetar_0009.jpg"
    ];
    let currentIndex = 0;
  
    function changeImage() {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * images.length);
      } while (nextIndex === currentIndex);
  
      currentIndex = nextIndex;
      carouselImage.style.opacity = 0;
  
      setTimeout(() => {
        carouselImage.src = images[currentIndex];
        carouselImage.style.opacity = 1;
      }, 1000);
    }
  
    setInterval(changeImage, 5000);
  });
  
  function injectContent(url, targetId) {
    fetch(url)
      .then((res) => res.text())
      .then((html) => {
        document.getElementById(targetId).innerHTML = html;
      })
      .catch((err) => console.error(`Error loading ${url}:`, err));
  }