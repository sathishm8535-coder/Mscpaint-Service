// ==========================
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
});

// ==========================
// CONTACT FORM (with guards)
// ==========================
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

  const serviceID  = "service_4v7s1rp";   // <-- your EmailJS service ID
  const templateID = "template_hyikks6";  // <-- your EmailJS template ID

  if (window.emailjs && emailjs.send) {
    emailjs.send(serviceID, templateID, params)
      .then(res => {
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
        console.log(res);
        alert("Your message was sent successfully");
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
    $('.btn-play').on('click', function () {
      $videoSrc = $(this).data('src');
    });

    $('#videoModal').on('shown.bs.modal', function () {
      if ($videoSrc) $("#video").attr('src', $videoSrc + "?autoplay=1&modestbranding=1&showinfo=0");
    });

    $('#videoModal').on('hide.bs.modal', function () {
      if ($videoSrc) $("#video").attr('src', $videoSrc);
    });
  });
} else {
  console.warn('jQuery not loaded. Include jQuery + Bootstrap JS in HTML for modal video.');
}
