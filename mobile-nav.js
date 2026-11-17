// Mobile Responsive Navigation Menu
document.addEventListener('DOMContentLoaded', function() {
    const kebabMenu = document.querySelector('.kebab-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!kebabMenu || !navbar) return;

    function toggleMobileMenu(e) {
        if (e) e.stopPropagation();
        kebabMenu.classList.toggle('active');
        navbar.classList.toggle('active');
        document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        kebabMenu.classList.remove('active');
        navbar.classList.remove('active');
        document.body.style.overflow = '';
    }

    kebabMenu.addEventListener('click', toggleMobileMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', function(e) {
        if (!kebabMenu.contains(e.target) && !navbar.contains(e.target)) {
            closeMobileMenu();
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            closeMobileMenu();
        }
    }, { passive: true });
});