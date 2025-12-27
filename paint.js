// Modern JavaScript for MSC Paint Service Website

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Debounce function for performance optimization
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

// ===========================
// DOM ELEMENTS
// ===========================

const header = document.querySelector('.header');
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const searchToggle = document.querySelector('.search-toggle');
const infoToggle = document.querySelector('.info-toggle');
const searchForm = document.querySelector('.search-form');
const contactInfo = document.querySelector('.contact-info');
const closeContactBtn = document.querySelector('.close-btn');
const backToTopBtn = document.querySelector('.back-to-top');
const progressBar = document.querySelector('.progress-bar');

// ===========================
// LOADING SCREEN
// ===========================

window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loading-screen');
  
  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }
  }, 1500);
});

// ===========================
// HEADER FUNCTIONALITY
// ===========================

// Header scroll effect
const handleHeaderScroll = throttle(() => {
  if (window.scrollY > 100) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
}, 100);

window.addEventListener('scroll', handleHeaderScroll);

// Mobile menu toggle
menuToggle?.addEventListener('click', (e) => {
  e.stopPropagation();
  menuToggle.classList.toggle('active');
  navbar?.classList.toggle('active');
  searchForm?.classList.remove('active');
});

// Search toggle
searchToggle?.addEventListener('click', (e) => {
  e.stopPropagation();
  searchForm?.classList.toggle('active');
  navbar?.classList.remove('active');
  menuToggle?.classList.remove('active');
});

// Info toggle
infoToggle?.addEventListener('click', (e) => {
  e.stopPropagation();
  contactInfo?.classList.add('active');
});

// Close contact info
closeContactBtn?.addEventListener('click', () => {
  contactInfo?.classList.remove('active');
});

// Close menus when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.header') && !e.target.closest('.contact-info')) {
    navbar?.classList.remove('active');
    searchForm?.classList.remove('active');
    menuToggle?.classList.remove('active');
  }
});

// Close menus on scroll
window.addEventListener('scroll', () => {
  navbar?.classList.remove('active');
  searchForm?.classList.remove('active');
  menuToggle?.classList.remove('active');
});

// ===========================
// SMOOTH SCROLLING NAVIGATION
// ===========================

document.addEventListener('DOMContentLoaded', function() {
  // Navigation links
  const navLinks = document.querySelectorAll('.nav-link, .footer-links a, .search-suggestions a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        let targetElement = document.getElementById(targetId);
        
        // Handle special cases
        if (!targetElement) {
          if (targetId === 'team') {
            targetElement = document.querySelector('.team');
          } else if (targetId === 'projects') {
            targetElement = document.querySelector('.projects');
          }
        }
        
        if (targetElement) {
          const headerHeight = header?.offsetHeight || 80;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu
          navbar?.classList.remove('active');
          menuToggle?.classList.remove('active');
          searchForm?.classList.remove('active');
          
          // Update active nav link
          document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
          });
          
          if (this.classList.contains('nav-link')) {
            this.classList.add('active');
          }
        }
      }
    });
  });
});

// ===========================
// SCROLL PROGRESS BAR
// ===========================

const updateScrollProgress = throttle(() => {
  if (progressBar) {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = Math.min(scrollPercent, 100) + '%';
  }
}, 50);

window.addEventListener('scroll', updateScrollProgress);

// ===========================
// BACK TO TOP BUTTON
// ===========================

const handleBackToTop = throttle(() => {
  if (backToTopBtn) {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }
}, 100);

window.addEventListener('scroll', handleBackToTop);

backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===========================
// HERO SLIDER
// ===========================

class HeroSlider {
  constructor() {
    this.slides = document.querySelectorAll('.hero-slide');
    this.indicators = document.querySelectorAll('.indicator');
    this.prevBtn = document.querySelector('.hero-prev');
    this.nextBtn = document.querySelector('.hero-next');
    this.currentSlide = 0;
    this.slideInterval = null;
    
    this.init();
  }
  
  init() {
    if (this.slides.length === 0) return;
    
    // Set first slide as active
    this.slides[0]?.classList.add('active');
    this.indicators[0]?.classList.add('active');
    
    // Event listeners
    this.prevBtn?.addEventListener('click', () => this.prevSlide());
    this.nextBtn?.addEventListener('click', () => this.nextSlide());
    
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Auto-play
    this.startAutoPlay();
    
    // Pause on hover
    const heroSection = document.querySelector('.hero');
    heroSection?.addEventListener('mouseenter', () => this.stopAutoPlay());
    heroSection?.addEventListener('mouseleave', () => this.startAutoPlay());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
  }
  
  goToSlide(index) {
    if (index === this.currentSlide) return;
    
    // Remove active class from current slide and indicator
    this.slides[this.currentSlide]?.classList.remove('active');
    this.indicators[this.currentSlide]?.classList.remove('active');
    
    // Update current slide
    this.currentSlide = index;
    
    // Add active class to new slide and indicator
    this.slides[this.currentSlide]?.classList.add('active');
    this.indicators[this.currentSlide]?.classList.add('active');
  }
  
  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }
  
  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }
  
  startAutoPlay() {
    this.stopAutoPlay(); // Clear any existing interval
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000); // Auto-scroll every 4 seconds
  }
  
  stopAutoPlay() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }
}

// Initialize hero slider
document.addEventListener('DOMContentLoaded', () => {
  new HeroSlider();
});

// ===========================
// COUNTER ANIMATION
// ===========================

function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
}

// ===========================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===========================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      
      // Animate counters when stats section is visible
      if (entry.target.classList.contains('stats-section')) {
        animateCounters();
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('[data-aos]');
  animatedElements.forEach(el => observer.observe(el));
  
  // Observe stats section
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
});

// ===========================
// SEARCH FUNCTIONALITY
// ===========================

const searchInput = document.getElementById('search-box');
const searchSuggestions = document.querySelectorAll('.search-suggestions a');

searchInput?.addEventListener('input', debounce((e) => {
  const query = e.target.value.toLowerCase();
  
  searchSuggestions.forEach(suggestion => {
    const text = suggestion.textContent.toLowerCase();
    if (text.includes(query)) {
      suggestion.style.display = 'block';
    } else {
      suggestion.style.display = query ? 'none' : 'block';
    }
  });
}, 300));

// ===========================
// CONTACT FORM HANDLING
// ===========================

class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.nameInput = document.getElementById('name');
    this.emailInput = document.getElementById('email');
    this.phoneInput = document.getElementById('phone');
    this.serviceInput = document.getElementById('service');
    this.messageInput = document.getElementById('message');
    this.submitBtn = document.querySelector('.btn-submit');
    this.btnText = document.querySelector('.btn-text');
    this.btnLoader = document.querySelector('.btn-loader');
    this.formError = document.getElementById('form-error');
    this.emailError = document.getElementById('email-error');
    
    this.init();
  }
  
  init() {
    if (!this.form) return;
    
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Real-time validation
    this.emailInput?.addEventListener('blur', () => this.validateEmail());
    this.nameInput?.addEventListener('blur', () => this.validateName());
    this.messageInput?.addEventListener('blur', () => this.validateMessage());
  }
  
  validateEmail() {
    const email = this.emailInput?.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
      this.showError(this.emailError);
      return false;
    } else {
      this.hideError(this.emailError);
      return true;
    }
  }
  
  validateName() {
    const name = this.nameInput?.value.trim();
    if (!name) {
      this.showError(this.formError);
      return false;
    } else {
      this.hideError(this.formError);
      return true;
    }
  }
  
  validateMessage() {
    const message = this.messageInput?.value.trim();
    if (!message) {
      this.showError(this.formError);
      return false;
    } else {
      this.hideError(this.formError);
      return true;
    }
  }
  
  showError(errorElement) {
    errorElement?.classList.add('show');
  }
  
  hideError(errorElement) {
    errorElement?.classList.remove('show');
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = this.validateName();
    const isEmailValid = this.validateEmail();
    const isMessageValid = this.validateMessage();
    
    if (!isNameValid || !isEmailValid || !isMessageValid) {
      return;
    }
    
    // Show loading state
    this.setLoadingState(true);
    
    try {
      // Prepare form data
      const formData = {
        name: this.nameInput?.value.trim(),
        email: this.emailInput?.value.trim(),
        phone: this.phoneInput?.value.trim(),
        service: this.serviceInput?.value,
        message: this.messageInput?.value.trim()
      };
      
      // Send email using EmailJS
      await this.sendEmail(formData);
      
      // Show success message
      this.showSuccessModal();
      
      // Reset form
      this.form.reset();
      
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Sorry, there was an error sending your message. Please try again.');
    } finally {
      this.setLoadingState(false);
    }
  }
  
  async sendEmail(formData) {
    if (typeof emailjs === 'undefined') {
      throw new Error('EmailJS not loaded');
    }
    
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
      to_name: 'MSC Paint Service'
    };
    
    return emailjs.send('service_4v7s1rp', 'template_hyikks6', templateParams);
  }
  
  setLoadingState(loading) {
    if (loading) {
      this.submitBtn?.classList.add('loading');
      this.submitBtn?.setAttribute('disabled', 'true');
    } else {
      this.submitBtn?.classList.remove('loading');
      this.submitBtn?.removeAttribute('disabled');
    }
  }
  
  showSuccessModal() {
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
  }
}

// Initialize contact form
document.addEventListener('DOMContentLoaded', () => {
  new ContactForm();
});

// ===========================
// VIDEO MODAL HANDLING
// ===========================

const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');

videoModal?.addEventListener('show.bs.modal', () => {
  modalVideo?.play();
});

videoModal?.addEventListener('hide.bs.modal', () => {
  modalVideo?.pause();
  modalVideo.currentTime = 0;
});

// ===========================
// LAZY LOADING FOR IMAGES
// ===========================

function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
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
  } else {
    // Fallback for older browsers
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  }
}

// ===========================
// PERFORMANCE OPTIMIZATIONS
// ===========================

// Preload critical images
function preloadImages() {
  const criticalImages = [
    'asset/p1.jpg',
    'asset/p2.jpg',
    'asset/p3.jpg',
    'asset/l1.jpg'
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// ===========================
// ACCESSIBILITY IMPROVEMENTS
// ===========================

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  // Close modals with Escape key
  if (e.key === 'Escape') {
    navbar?.classList.remove('active');
    searchForm?.classList.remove('active');
    contactInfo?.classList.remove('active');
    menuToggle?.classList.remove('active');
  }
  
  // Navigate with arrow keys in hero slider
  if (e.key === 'ArrowLeft') {
    document.querySelector('.hero-prev')?.click();
  } else if (e.key === 'ArrowRight') {
    document.querySelector('.hero-next')?.click();
  }
});

// Focus management
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];
  
  element.addEventListener('keydown', (e) => {
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

// ===========================
// ACTIVE NAVIGATION HIGHLIGHTING
// ===========================

function updateActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Remove active class from all nav links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to corresponding nav link
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        activeLink?.classList.add('active');
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -80px 0px'
  });
  
  sections.forEach(section => observer.observe(section));
}

// ===========================
// ERROR HANDLING
// ===========================

window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled Promise Rejection:', e.reason);
});

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initLazyLoading();
  preloadImages();
  updateActiveNavigation();
  
  // Add smooth scroll behavior to all internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = header?.offsetHeight || 80;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Initialize tooltips if Bootstrap is available
  if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }
  
  console.log('MSC Paint Service website initialized successfully!');
});

// ===========================
// EXPORT FOR TESTING
// ===========================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    HeroSlider,
    ContactForm,
    debounce,
    throttle
  };
}