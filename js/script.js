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

  // --- Portfolio Carousel Logic ---
document.addEventListener("DOMContentLoaded", () => {
    const projects = [
        {
            title: "REVCAP",
            text: `For a longstanding client’s second relocation, Red Workspace provided end-to-end support from initial brief and building selection to budget management and final delivery. The project featured major structural works, including a custom cantilevered staircase, and was completed with bespoke joinery and furniture to create a refined industrial-style London HQ.`,
            image: "img/PROJECTS/REV_CAPITAL/HighRes__W9A4741.jpg"
        },
        {
            title: "US HEDGE FUND",
            text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet facilisis urna. Praesent facilisis ante sit amet erat imperdiet, vitae tincidunt justo dictum.`,
            image: "img/PROJECTS/US_HEDGE_FUND/Magnetar_0051-HDR.jpg"
        }
    ];

    let currentIndex = 0;

    const imageElement = document.querySelector(".portfolio-image img");
    const titleElement = document.querySelector(".portfolio-text h3");
    const textElement = document.querySelector(".portfolio-text p");
    const dots = document.querySelectorAll(".portfolio-dot");

    function updateSlide(index) {
        const project = projects[index];

        imageElement.classList.remove("fade-in");
        void imageElement.offsetWidth; // trigger reflow for re-animation
        imageElement.classList.add("fade-in");

        imageElement.src = project.image;
        titleElement.textContent = project.title;
        textElement.textContent = project.text;

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }

    document.querySelector(".portfolio-next").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % projects.length;
        updateSlide(currentIndex);
    });

    document.querySelector(".portfolio-prev").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        updateSlide(currentIndex);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            currentIndex = i;
            updateSlide(i);
        });
    });

    updateSlide(currentIndex);
});

// --- Testimonials Carousel Logic ---
document.addEventListener('DOMContentLoaded', function() {
    const testimonialsCarousel = document.querySelector('.testimonials-carousel');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    let currentIndex = 0;

    function showSlide(index) {
      testimonialSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
          slide.classList.add('active');
        }
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % testimonialSlides.length;
      showSlide(currentIndex);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + testimonialSlides.length) % testimonialSlides.length;
      showSlide(currentIndex);
    }

    if (prevButton && nextButton) {
      prevButton.addEventListener('click', prevSlide);
      nextButton.addEventListener('click', nextSlide);
    }

    showSlide(currentIndex); // Show the initial slide
  });