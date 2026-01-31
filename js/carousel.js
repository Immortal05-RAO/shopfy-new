// Global variables
let currentSlide = 0;
let totalSlides = 0; // Dynamic
let autoplayInterval;
const AUTOPLAY_DELAY = 7000;

document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  // Only start autoplay if we have more than 1 slide
  if (totalSlides > 1) {
    startAutoplay();
  }
});

function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  totalSlides = slides.length;
  const videos = document.querySelectorAll('.carousel-video');
  if (videos[0]) {
    videos[0].play().catch(e => console.log('Autoplay prevented:', e));
  }
  // Preload others
  videos.forEach((video, index) => {
    if (index > 0) video.load();
  });
}

function goToSlide(slideIndex) {
  stopAutoplay();
  const slides = document.querySelectorAll('.carousel-slide');
  const videos = document.querySelectorAll('.carousel-video');
  const dots = document.querySelectorAll('.pagination-dot');
  if (!slides.length) return;

  slides[currentSlide].classList.remove('active');
  if (dots.length > currentSlide) {
    dots[currentSlide].classList.remove('active');
  }

  if (videos[currentSlide]) videos[currentSlide].pause();

  currentSlide = slideIndex;

  slides[currentSlide].classList.add('active');
  if (dots.length > currentSlide) {
    dots[currentSlide].classList.add('active');
  }

  if (videos[currentSlide]) {
    videos[currentSlide].currentTime = 0;
    videos[currentSlide].play().catch(e => console.log('Autoplay prevented:', e));
  }

  if (totalSlides > 1) {
    setTimeout(() => startAutoplay(), 3000);
  }
}

function nextSlide() {
  if (totalSlides <= 1) return;
  const nextIndex = (currentSlide + 1) % totalSlides;
  goToSlide(nextIndex);
}

function prevSlide() {
  if (totalSlides <= 1) return;
  const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
  goToSlide(prevIndex);
}

function startAutoplay() {
  stopAutoplay();
  if (totalSlides <= 1) return;
  autoplayInterval = setInterval(() => {
    const nextIndex = (currentSlide + 1) % totalSlides;
    // Direct slide switch without fully stopping autoplay state
    const slides = document.querySelectorAll('.carousel-slide');
    const videos = document.querySelectorAll('.carousel-video');
    const dots = document.querySelectorAll('.pagination-dot');
    if (!slides.length) return;

    slides[currentSlide].classList.remove('active');
    if (dots.length > currentSlide) dots[currentSlide].classList.remove('active');

    if (videos[currentSlide]) videos[currentSlide].pause();

    currentSlide = nextIndex;

    slides[currentSlide].classList.add('active');
    if (dots.length > currentSlide) dots[currentSlide].classList.add('active');

    if (videos[currentSlide]) {
      videos[currentSlide].currentTime = 0;
      videos[currentSlide].play().catch(e => console.log('Autoplay prevented:', e));
    }
  }, AUTOPLAY_DELAY);
}

function stopAutoplay() {
  if (autoplayInterval) clearInterval(autoplayInterval);
}

// Window Exposes
window.prevSlide = prevSlide;
window.nextSlide = nextSlide;
window.goToSlide = goToSlide;
window.scrollToProducts = function (handle) {
  const p = document.getElementById('products');
  if (p) p.scrollIntoView({ behavior: 'smooth' });
}
