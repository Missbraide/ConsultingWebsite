// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const testimonialTrack = document.querySelector('.testimonial-track');
const slides = document.querySelectorAll('.testimonial-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');
const serviceCards = document.querySelectorAll('.service-card');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');
const videoSection = document.querySelector('.video-banner');
const videoContent = document.querySelector('.video-content');

// Variables
let currentSlide = 0;
const slideWidth = 100; // 100%

// Functions
// Header scroll effect
function handleScroll() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Update carousel position
function updateCarousel() {
  testimonialTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;

  // Update dots
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentSlide].classList.add('active');
}

// Check if element is in viewport for animation
function checkScroll() {
  const triggerBottom = window.innerHeight * 0.8;

  serviceCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < triggerBottom) {
      card.classList.add('fade-in');
    }
  });
}

// Event Listeners
// Window scroll events
window.addEventListener('scroll', handleScroll);
window.addEventListener('scroll', checkScroll);

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Testimonial carousel navigation
// Next slide
nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
});

// Previous slide
prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateCarousel();
});

// Click on dots
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    currentSlide = parseInt(dot.getAttribute('data-index'));
    updateCarousel();
  });
});

// Form submissions
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // In a real site, this would handle the form submission with AJAX
  alert('Thanks for your message! We will get back to you soon.');
});

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // In a real site, this would handle the newsletter subscription
  alert('Thanks for subscribing to our newsletter!');
});

// Video section click effect
videoSection.addEventListener('click', () => {
  // This would normally play/pause the video
  // Since we're using an image in this demo, we'll just add an animation effect
  videoContent.classList.add('fade-in');
  setTimeout(() => {
    videoContent.classList.remove('fade-in');
  }, 1000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Offset for fixed header
        behavior: 'smooth'
      });
    }
  });
});

// Auto slide testimonial carousel every 5 seconds
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
}, 5000);

// Initialize
// Check for elements in viewport on initial load
checkScroll();

// Set up initial carousel position
updateCarousel();