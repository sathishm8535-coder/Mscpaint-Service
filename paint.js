// ==========================
<<<<<<< HEAD
// NAVBAR, SEARCH, CONTACT INFO TOGGLE (defensive)
// ==========================
const navbar = document.querySelector('.header .navbar');
const searchForm = document.querySelector('.header .search-form');
const loginForm  = document.querySelector('.header .login-form');
const contactInfo = document.querySelector('.contact-info');

const menuBtn  = document.querySelector('#menu-btn');
const searchBtn = document.querySelector('#search-btn');
const infoBtn   = document.querySelector('#info-btn');
const closeContactBtn = document.querySelector('#close-contact-info');

menuBtn && (menuBtn.onclick = () => {
  navbar && navbar.classList.toggle('active');
  searchForm && searchForm.classList.remove('active');
  loginForm && loginForm.classList.remove('active');
});

searchBtn && (searchBtn.onclick = () => {
  searchForm && searchForm.classList.toggle('active');
  navbar && navbar.classList.remove('active');
  loginForm && loginForm.classList.remove('active');
});

infoBtn && (infoBtn.onclick = () => {
  contactInfo && contactInfo.classList.add('active');
});

closeContactBtn && (closeContactBtn.onclick = () => {
  contactInfo && contactInfo.classList.remove('active');
});

window.addEventListener('scroll', () => {
  navbar && navbar.classList.remove('active');
  searchForm && searchForm.classList.remove('active');
  loginForm && loginForm.classList.remove('active');
  contactInfo && contactInfo.classList.remove('active');
=======
// LOADING SCREEN & INITIALIZATION
// ==========================
document.addEventListener('DOMContentLoaded', function() {
  // Hide loading screen after page loads
  const loadingScreen = document.getElementById('loading-screen');
  
  window.addEventListener('load', function() {
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 500);
      }
    }, 1000);
  });
});

// ==========================
// SCROLL PROGRESS BAR
// ==========================
window.addEventListener('scroll', function() {
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  }
});

// ==========================
// BACK TO TOP BUTTON
// ==========================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', function() {
  if (backToTopBtn) {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==========================
// SCROLL ANIMATIONS
// ==========================
function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('animate');
    }
  });
}

window.addEventListener('scroll', animateOnScroll);

// ==========================
// HEADER SCROLL EFFECT
// ==========================
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (header) {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// ==========================
// NAVBAR, SEARCH, CONTACT INFO TOGGLE
// ==========================
const navbar = document.querySelector('.header .navbar');
const searchForm = document.querySelector('.header .search-form');
const contactInfo = document.querySelector('.contact-info');

const menuBtn = document.querySelector('#menu-btn');
const searchBtn = document.querySelector('#search-btn');
const infoBtn = document.querySelector('#info-btn');
const closeContactBtn = document.querySelector('#close-contact-info');

// Menu button toggle
if (menuBtn) {
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (navbar) navbar.classList.toggle('active');
    if (searchForm) searchForm.classList.remove('active');
  });
}

// Search button toggle
if (searchBtn) {
  searchBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (searchForm) searchForm.classList.toggle('active');
    if (navbar) navbar.classList.remove('active');
  });
}

// Info button toggle
if (infoBtn) {
  infoBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (contactInfo) contactInfo.classList.add('active');
  });
}

// Close contact info
if (closeContactBtn) {
  closeContactBtn.addEventListener('click', () => {
    if (contactInfo) contactInfo.classList.remove('active');
  });
}

// Close menus on scroll
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.remove('active');
  if (searchForm) searchForm.classList.remove('active');
  if (contactInfo) contactInfo.classList.remove('active');
});

// Close menus when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.header') && !e.target.closest('.contact-info')) {
    if (navbar) navbar.classList.remove('active');
    if (searchForm) searchForm.classList.remove('active');
  }
});

// ==========================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ==========================
document.addEventListener('DOMContentLoaded', function() {
  // Fix navigation links
  const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      let targetElement;
      
      // Handle special cases
      if (targetId === '#our team') {
        targetElement = document.querySelector('[id="our team"], .team, section:has(.team)');
      } else {
        targetElement = document.querySelector(targetId);
      }
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Close mobile menu after click
        if (navbar) navbar.classList.remove('active');
      }
    });
  });
>>>>>>> 03a67ab526edc8607915457defccea957a53850a
});

// ==========================
// CONTACT FORM (with guards)
// ==========================
<<<<<<< HEAD
const contactSection     = document.querySelector('.contact-section');
const formSection        = document.querySelector('.form-section');
const contactSubmitAfter = document.querySelector('.contact-submit-after');
const csaOK              = document.querySelector('.csa-ok');

const contactForm  = document.querySelector('#contact-form');
const nameInput    = document.getElementById('name');
const emailInput   = document.getElementById('email');
const messageInput = document.getElementById('message');
const errorDiv       = document.querySelector('.error');
const emailErrorDiv  = document.querySelector('.email-error');
const contactButton  = document.querySelector('.contact-button');
const contactLoad    = document.querySelector('.contact-load');
const submitText     = document.querySelector('.submit-text');
=======
const contactSection = document.querySelector('.contact-section');
const formSection = document.querySelector('.form-section');
const contactSubmitAfter = document.querySelector('.contact-submit-after');
const csaOK = document.querySelector('.csa-ok');

const contactForm = document.querySelector('#contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const errorDiv = document.querySelector('.error');
const emailErrorDiv = document.querySelector('.email-error');
const contactButton = document.querySelector('.contact-button');
const contactLoad = document.querySelector('.contact-load');
const submitText = document.querySelector('.submit-text');
>>>>>>> 03a67ab526edc8607915457defccea957a53850a

// Close success popup
csaOK && (csaOK.onclick = () => {
  contactSubmitAfter && contactSubmitAfter.classList.remove('show');
  formSection && formSection.classList.remove('hide');
  contactSection && contactSection.classList.remove('csa-cs');
  contactForm && contactForm.classList.remove('csa-cf');
  contactButton && contactButton.classList.remove('loading');
  contactLoad && contactLoad.classList.remove('show');
  submitText && submitText.classList.remove('hide');
  contactForm && contactForm.reset();
});

// Email regex
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email || '').trim());
}

// Validate + submit
function validateForm(e) {
  e.preventDefault();

  if (!(nameInput && emailInput && messageInput)) return;

  let isValid = true;
  let nameIsValid = !!nameInput.value.trim();
  let emailIsValid = isValidEmail(emailInput.value);
  let messageIsValid = !!messageInput.value.trim();

  isValid = nameIsValid && emailIsValid && messageIsValid;

  if (!isValid) {
    errorDiv && errorDiv.classList.add('error-show');
    emailErrorDiv && emailErrorDiv.classList.toggle('error-show', nameIsValid && messageIsValid && !emailIsValid);
  } else {
    emailErrorDiv && emailErrorDiv.classList.remove('error-show');
    errorDiv && errorDiv.classList.remove('error-show');

    contactButton && contactButton.classList.add('loading');
    contactLoad && contactLoad.classList.add('show');
    submitText && submitText.classList.add('hide');

    setTimeout(sendMail, 2000);
  }
}

contactForm && contactForm.addEventListener('submit', validateForm);

// Send via EmailJS (only if available)
function sendMail() {
  if (!(nameInput && emailInput && messageInput)) return;

  contactSubmitAfter && contactSubmitAfter.classList.add('show');
  formSection && formSection.classList.add('hide');
  contactSection && contactSection.classList.add('csa-cs');
  contactForm && contactForm.classList.add('csa-cf');

  const params = {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value
  };

<<<<<<< HEAD
  const serviceID  = "service_4v7s1rp";   // <-- your EmailJS service ID
  const templateID = "template_hyikks6";  // <-- your EmailJS template ID
=======
  const serviceID = "service_4v7s1rp";
  const templateID = "template_hyikks6";
>>>>>>> 03a67ab526edc8607915457defccea957a53850a

  if (window.emailjs && emailjs.send) {
    emailjs.send(serviceID, templateID, params)
      .then(res => {
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
        console.log(res);
<<<<<<< HEAD
        alert("Your message was sent successfully");
=======
>>>>>>> 03a67ab526edc8607915457defccea957a53850a
      })
      .catch(err => {
        console.error(err);
        alert("Error sending message");
      });
  } else {
    console.warn('EmailJS not loaded. Include the EmailJS SDK and emailjs.init(...) in HTML.');
  }
}

// ==========================
// SWIPER SLIDERS (only if Swiper + containers exist)
// ==========================
if (window.Swiper) {
<<<<<<< HEAD
  const hasHome   = document.querySelector('.home-slider');
  const hasReview = document.querySelector('.reviews-slider');
  const hasBlogs  = document.querySelector('.blogs-slider');
  const hasLogos  = document.querySelector('.logo-slider');

  hasHome && new Swiper(".home-slider", {
    loop: true, grabCursor: true,
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
  });

  hasReview && new Swiper(".reviews-slider", {
    loop: true, grabCursor: true, spaceBetween: 20,
    breakpoints: { 640:{slidesPerView:1}, 768:{slidesPerView:2}, 991:{slidesPerView:3} }
  });

  hasBlogs && new Swiper(".blogs-slider", {
    loop: true, grabCursor: true, spaceBetween: 20,
    breakpoints: { 640:{slidesPerView:1}, 768:{slidesPerView:2}, 991:{slidesPerView:3} }
  });

  hasLogos && new Swiper(".logo-slider", {
    loop: true, grabCursor: true, spaceBetween: 20,
    breakpoints: { 450:{slidesPerView:2}, 640:{slidesPerView:3}, 768:{slidesPerView:4}, 1000:{slidesPerView:5} }
=======
  const hasHome = document.querySelector('.home-slider');
  const hasReview = document.querySelector('.reviews-slider');
  const hasBlogs = document.querySelector('.blogs-slider');
  const hasLogos = document.querySelector('.logo-slider');

  hasHome && new Swiper(".home-slider", {
    loop: true, 
    grabCursor: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    navigation: { 
      nextEl: ".swiper-button-next", 
      prevEl: ".swiper-button-prev" 
    }
  });

  hasReview && new Swiper(".reviews-slider", {
    loop: true, 
    grabCursor: true, 
    spaceBetween: 20,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: { 
      640: {slidesPerView: 1}, 
      768: {slidesPerView: 2}, 
      991: {slidesPerView: 3} 
    }
  });

  hasBlogs && new Swiper(".blogs-slider", {
    loop: true, 
    grabCursor: true, 
    spaceBetween: 20,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
    breakpoints: { 
      640: {slidesPerView: 1}, 
      768: {slidesPerView: 2}, 
      991: {slidesPerView: 3} 
    }
  });

  hasLogos && new Swiper(".logo-slider", {
    loop: true, 
    grabCursor: true, 
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: { 
      450: {slidesPerView: 2}, 
      640: {slidesPerView: 3}, 
      768: {slidesPerView: 4}, 
      1000: {slidesPerView: 5} 
    }
>>>>>>> 03a67ab526edc8607915457defccea957a53850a
  });
} else {
  console.warn('Swiper not loaded. Include Swiper JS/CSS in HTML.');
}

// ==========================
// MODAL VIDEO (jQuery + Bootstrap guards)
// ==========================
if (window.jQuery) {
  $(document).ready(function () {
    var $videoSrc;
<<<<<<< HEAD
    $('.btn-play').on('click', function () {
      $videoSrc = $(this).data('src');
    });

    $('#videoModal').on('shown.bs.modal', function () {
      if ($videoSrc) $("#video").attr('src', $videoSrc + "?autoplay=1&modestbranding=1&showinfo=0");
    });

    $('#videoModal').on('hide.bs.modal', function () {
      if ($videoSrc) $("#video").attr('src', $videoSrc);
=======
    
    $('.btn-play, .video-thumbnail').on('click', function () {
      $videoSrc = $(this).data('src') || 'videos/v2.mp4';
    });

    $('#videoModal').on('shown.bs.modal', function () {
      if ($videoSrc) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&modestbranding=1&showinfo=0");
      }
    });

    $('#videoModal').on('hide.bs.modal', function () {
      $("#video").attr('src', '');
>>>>>>> 03a67ab526edc8607915457defccea957a53850a
    });
  });
} else {
  console.warn('jQuery not loaded. Include jQuery + Bootstrap JS in HTML for modal video.');
}
<<<<<<< HEAD
=======

// ==========================
// PERFORMANCE OPTIMIZATIONS
// ==========================

// Lazy loading for images
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
  lazyLoadImages();
}

// ==========================
// UTILITY FUNCTIONS
// ==========================

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
  animateOnScroll();
}, 100);

window.addEventListener('scroll', throttledScroll);

// ==========================
// ACCESSIBILITY IMPROVEMENTS
// ==========================

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
  // Close modals with Escape key
  if (e.key === 'Escape') {
    navbar && navbar.classList.remove('active');
    searchForm && searchForm.classList.remove('active');
    loginForm && loginForm.classList.remove('active');
    contactInfo && contactInfo.classList.remove('active');
  }
});

// Focus management for modals
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
  const focusableContent = element.querySelectorAll(focusableElements);
  const firstFocusableElement = focusableContent[0];
  const lastFocusableElement = focusableContent[focusableContent.length - 1];

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }
  });
}

// ==========================
// ERROR HANDLING
// ==========================
window.addEventListener('error', function(e) {
  console.error('JavaScript Error:', e.error);
});

// ==========================
// INITIALIZE ANIMATIONS ON LOAD
// ==========================
document.addEventListener('DOMContentLoaded', function() {
  // Add animation classes to elements
  const aboutBoxes = document.querySelectorAll('.about .box-container .box');
  const serviceBoxes = document.querySelectorAll('.services .box-container .box');
  const projectBoxes = document.querySelectorAll('.projects .box-container .box');
  
  aboutBoxes.forEach((box, index) => {
    box.classList.add('fade-in-up');
    box.style.animationDelay = `${index * 0.1}s`;
  });
  
  serviceBoxes.forEach((box, index) => {
    box.classList.add('fade-in-up');
    box.style.animationDelay = `${index * 0.2}s`;
  });
  
  projectBoxes.forEach((box, index) => {
    box.classList.add('fade-in-up');
    box.style.animationDelay = `${index * 0.1}s`;
  });
  
  // Initial animation check
  setTimeout(animateOnScroll, 100);
});

// ==========================
// PRELOADER FOR IMAGES
// ==========================
function preloadImages() {
  const images = [
    'asset/p1.jpg',
    'asset/p2.jpg', 
    'asset/p3.jpg',
    'asset/l1.jpg'
  ];
  
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Preload critical images
preloadImages();
>>>>>>> 03a67ab526edc8607915457defccea957a53850a
