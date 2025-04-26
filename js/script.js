// js/script.js

document.addEventListener("DOMContentLoaded", () => {
    // Inject navigation and footer content
    injectContent("components/nav.html", "navigation");
    injectContent("components/footer.html", "page-footer");
  
    // --- CAROUSEL LOGIC ---
const images = [
    "img/PROJECTS/REV_CAPITAL/HighRes__W9A4780-Edit 1.jpg",
    "img/PROJECTS/REV_CAPITAL/HighRes__W9A4675 1.jpg",
    "img/PROJECTS/US_HEDGE_FUND/Magnetar_0084.jpg",
    "img/PROJECTS/US_HEDGE_FUND/Magnetar_0009.jpg"
  ];
  
  const carouselImage1 = document.getElementById("carousel-image-1");
  const carouselImage2 = document.getElementById("carousel-image-2");
  let currentIndex = 0;
  let isImage1Active = true;
  const transitionDuration = 1000; // Fade duration
  const displayDuration = 7000; // Display time per image
  
  function changeImage() {
    const activeImage = isImage1Active ? carouselImage1 : carouselImage2;
    const nextImage = isImage1Active ? carouselImage2 : carouselImage1;
  
    // Set the next image source
    nextImage.src = images[(currentIndex + 1) % images.length];
  
    // Bring next image to front
    nextImage.classList.add("fade-in");
    activeImage.classList.remove("fade-in");
  
    // After transition, swap active
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % images.length;
      isImage1Active = !isImage1Active;
    }, transitionDuration);
  }
  
  // Initial zoom animation always running
  carouselImage1.classList.add("zoom-animation");
  carouselImage2.classList.add("zoom-animation");
  
  // Start carousel loop
  setInterval(changeImage, displayDuration);
  
    // --- Portfolio Carousel Logic ---
    const portfolioCarousel = document.querySelector(".portfolio-carousel");
    if (portfolioCarousel) {
      const portfolioSlides = document.querySelectorAll(".portfolio-slide");
      const portfolioPrevButton = document.querySelector(".portfolio-prev");
      const portfolioNextButton = document.querySelector(".portfolio-next");
      const portfolioDotsContainer = document.querySelector(".portfolio-dots");
      const projects = [
        {
          title: "REVCAP",
          text: `RED Workspace has delivered a dynamic working environment for REVCAP that blends sophistication with functionality. The space is a testament to our commitment to quality design and strategic execution.`,
          image: "img/PROJECTS/REV_CAPITAL/HighRes__W9A4741.jpg",
        },
        {
          title: "US HEDGE FUND",
          text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Sed posuere consectetur est at lobortis. Aenean lacinia bibendum nulla sed consectetur.`,
          image: "img/PROJECTS/US_HEDGE_FUND/Magnetar_0051-HDR.jpg",
        },
      ];
      let portfolioCurrentIndex = 0;
      let portfolioDots = [];
  
      function updatePortfolioSlide(index) {
        portfolioSlides.forEach((slide, i) => {
          slide.classList.remove("active");
          if (i === index) {
            slide.classList.add("active");
          }
        });
  
        const currentProject = projects[index];
        const imageElement = portfolioCarousel.querySelector(".portfolio-image img");
        const titleElement = portfolioCarousel.querySelector(".portfolio-text h3");
        const textElement = portfolioCarousel.querySelector(".portfolio-text p");
  
        if (imageElement && titleElement && textElement) {
          imageElement.src = currentProject.image;
          titleElement.textContent = currentProject.title;
          textElement.textContent = currentProject.text;
        }
  
        portfolioDots.forEach((dot, i) => {
          dot.classList.toggle("active", i === index);
        });
      }
  
      function nextPortfolioSlide() {
        portfolioCurrentIndex = (portfolioCurrentIndex + 1) % projects.length;
        updatePortfolioSlide(portfolioCurrentIndex);
      }
  
      function prevPortfolioSlide() {
        portfolioCurrentIndex =
          (portfolioCurrentIndex - 1 + projects.length) % projects.length;
        updatePortfolioSlide(portfolioCurrentIndex);
      }
  
      if (portfolioNextButton) {
        portfolioNextButton.addEventListener("click", nextPortfolioSlide);
      }
      if (portfolioPrevButton) {
        portfolioPrevButton.addEventListener("click", prevPortfolioSlide);
      }
  
      if (portfolioDotsContainer) {
        projects.forEach((_, index) => {
          const dot = document.createElement("span");
          dot.classList.add("portfolio-dot");
          if (index === 0) {
            dot.classList.add("active");
          }
          dot.addEventListener("click", () => {
            portfolioCurrentIndex = index;
            updatePortfolioSlide(index);
          });
          portfolioDotsContainer.appendChild(dot);
          portfolioDots.push(dot);
        });
      }
  
      updatePortfolioSlide(portfolioCurrentIndex);
    }
  
    // --- Testimonials Carousel Logic ---
    const testimonialsCarousel = document.querySelector(".testimonials-carousel");
    if (testimonialsCarousel) {
      const testimonialSlides = document.querySelectorAll(".testimonial-slide");
      const prevTestimonialButton = document.querySelector(".prev-testimonial");
      const nextTestimonialButton = document.querySelector(".next-testimonial");
      let testimonialCurrentIndex = 0;
  
      function showTestimonialSlide(index) {
        testimonialSlides.forEach((slide, i) => {
          slide.classList.remove("active");
          if (i === index) {
            slide.classList.add("active");
          }
        });
      }
  
      function nextTestimonialSlide() {
        testimonialCurrentIndex =
          (testimonialCurrentIndex + 1) % testimonialSlides.length;
        showTestimonialSlide(testimonialCurrentIndex);
      }
  
      function prevTestimonialSlide() {
        testimonialCurrentIndex =
          (testimonialCurrentIndex - 1 + testimonialSlides.length) %
          testimonialSlides.length;
        showTestimonialSlide(testimonialCurrentIndex);
      }
  
      if (prevTestimonialButton) {
        prevTestimonialButton.addEventListener("click", prevTestimonialSlide);
      }
      if (nextTestimonialButton) {
        nextTestimonialButton.addEventListener("click", nextTestimonialSlide);
      }
  
      showTestimonialSlide(testimonialCurrentIndex); // Show the initial slide
    }
  });
  
  function injectContent(url, targetId) {
    fetch(url)
      .then((res) => res.text())
      .then((html) => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.innerHTML = html;
        } else {
          console.error(`Target element with ID "${targetId}" not found.`);
        }
      })
      .catch((err) => console.error(`Error loading ${url}:`, err));
  }