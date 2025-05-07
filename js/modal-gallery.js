// ---------------- Modal Gallery ----------------
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-image");
  const closeBtn = document.querySelector(".close-modal");
  const nextBtn = document.getElementById("modal-next");
  const prevBtn = document.getElementById("modal-prev");

  const galleries = {
    revcap: [
      "img/PROJECTS/REV_CAPITAL/HighRes__W9A4675 1.jpg",
      "img/PROJECTS/REV_CAPITAL/HighRes__W9A4689.jpg",
      "img/PROJECTS/REV_CAPITAL/HighRes__W9A4741.jpg",
      "img/PROJECTS/REV_CAPITAL/HighRes__W9A4780-Edit 1.jpg",
      "img/PROJECTS/REV_CAPITAL/HighRes__W9A4802 1.jpg"
    ],
    hedge: [
      "img/PROJECTS/US_HEDGE_FUND/img1.jpg",
      "img/PROJECTS/US_HEDGE_FUND/img2.jpg",
      "img/PROJECTS/US_HEDGE_FUND/img3.jpg"
    ]
  };

  let currentGallery = [];
  let currentIndex = 0;

  document.querySelectorAll(".open-gallery").forEach(btn => {
    btn.addEventListener("click", () => {
      const galleryName = btn.getAttribute("data-gallery");
      currentGallery = galleries[galleryName];
      currentIndex = 0;
      modal.style.display = "flex";
      modalImg.src = currentGallery[currentIndex];
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    modalImg.src = currentGallery[currentIndex];
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    modalImg.src = currentGallery[currentIndex];
  });
});
