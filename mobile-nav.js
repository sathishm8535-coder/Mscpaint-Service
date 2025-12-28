// Mobile Responsive Navigation Menu
document.addEventListener('DOMContentLoaded', function() {
    const kebabMenu = document.querySelector('.kebab-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        kebabMenu.classList.toggle('active');
        navbar.classList.toggle('active');
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        kebabMenu.classList.remove('active');
        navbar.classList.remove('active');
    }
    
    // Event listeners
    kebabMenu.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!kebabMenu.contains(e.target) && !navbar.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            closeMobileMenu();
        }
    });
});