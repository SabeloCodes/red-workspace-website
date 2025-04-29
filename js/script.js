// js/script.js

document.addEventListener("DOMContentLoaded", () => {
    // Inject nav and footer
    injectContent("components/nav.html", "navigation");
    injectContent("components/footer.html", "page-footer");
  
    // Inject carousel and only then run overlay + loop setup
    injectContent("components/carousel.html", "carousel-placeholder", () => {
      setupCarouselOverlay();
      setupCarouselLoop();
    });
  
    // ... rest of your existing code below ...

  document.addEventListener("DOMContentLoaded", () => {
    // --- Portfolio Carousel ---
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
          slide.classList.toggle("active", i === index);
        });
  
        const { image, title, text } = projects[index];
        portfolioCarousel.querySelector(".portfolio-image img").src = image;
        portfolioCarousel.querySelector(".portfolio-text h3").textContent = title;
        portfolioCarousel.querySelector(".portfolio-text p").textContent = text;
  
        portfolioDots.forEach((dot, i) => {
          dot.classList.toggle("active", i === index);
        });
      }
  
      function nextPortfolioSlide() {
        portfolioCurrentIndex = (portfolioCurrentIndex + 1) % projects.length;
        updatePortfolioSlide(portfolioCurrentIndex);
      }
  
      function prevPortfolioSlide() {
        portfolioCurrentIndex = (portfolioCurrentIndex - 1 + projects.length) % projects.length;
        updatePortfolioSlide(portfolioCurrentIndex);
      }
  
      portfolioNextButton?.addEventListener("click", nextPortfolioSlide);
      portfolioPrevButton?.addEventListener("click", prevPortfolioSlide);
  
      if (portfolioDotsContainer) {
        projects.forEach((_, index) => {
          const dot = document.createElement("span");
          dot.classList.add("portfolio-dot");
          if (index === 0) dot.classList.add("active");
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
  
    // --- Testimonials Carousel ---
    const testimonialsCarousel = document.querySelector(".testimonials-carousel");
    if (testimonialsCarousel) {
      const testimonialSlides = document.querySelectorAll(".testimonial-slide");
      const prevBtn = document.querySelector(".prev-testimonial");
      const nextBtn = document.querySelector(".next-testimonial");
      let currentTestimonialIndex = 0;
  
      function showTestimonialSlide(index) {
        testimonialSlides.forEach((slide, i) => {
          slide.classList.toggle("active", i === index);
        });
      }
  
      function nextTestimonialSlide() {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialSlides.length;
        showTestimonialSlide(currentTestimonialIndex);
      }
  
      function prevTestimonialSlide() {
        currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialSlides.length) % testimonialSlides.length;
        showTestimonialSlide(currentTestimonialIndex);
      }
  
      prevBtn?.addEventListener("click", prevTestimonialSlide);
      nextBtn?.addEventListener("click", nextTestimonialSlide);
  
      showTestimonialSlide(currentTestimonialIndex);
    }
  });

  // Utility function to inject HTML components into target containers
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
});