// Mobile Responsive Sidebar Menu
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    const body = document.body;
    
    // Create mobile overlay
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-overlay';
    body.appendChild(mobileOverlay);
    
    // Create sidebar close button
    const sidebarClose = document.createElement('div');
    sidebarClose.className = 'sidebar-close';
    sidebarClose.innerHTML = '<i class="fas fa-times"></i>';
    navbar.appendChild(sidebarClose);
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        menuToggle.classList.toggle('active');
        navbar.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        menuToggle.classList.remove('active');
        navbar.classList.remove('active');
        mobileOverlay.classList.remove('active');
        body.style.overflow = '';
    }
    
    // Event listeners
    menuToggle.addEventListener('click', toggleMobileMenu);
    sidebarClose.addEventListener('click', closeMobileMenu);
    mobileOverlay.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            closeMobileMenu();
        }
    });
});