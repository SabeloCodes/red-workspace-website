document.addEventListener("DOMContentLoaded", () => {
  // ✅ Highlight current nav link
  const currentPath = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href").split("/").pop();
    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });

  // ✅ Hamburger menu toggle for mobile with animation
  const hamburger = document.querySelector(".hamburger");
  const mainNav = document.querySelector(".main-nav");

  if (hamburger && mainNav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open"); // toggle hamburger animation
      mainNav.classList.toggle("show");   // toggle nav visibility
    });
  }
});