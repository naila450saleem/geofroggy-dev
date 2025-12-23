// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const hamburgerIcon = document.getElementById('hamburgerIcon');
    const desktopNavItems = document.querySelectorAll('.nav-item');
    const mobileNavItems = document.querySelectorAll('.mobile-item');
    const signinBtns = document.querySelectorAll('.signin-btn');
    
    // ==========================================
    // ACTIVE NAVIGATION MANAGEMENT
    // ==========================================
    function setActiveNavItem(clickedItem, isMobile = false) {
        // Remove active class from all items
        desktopNavItems.forEach(item => item.classList.remove('active'));
        mobileNavItems.forEach(item => item.classList.remove('active'));
        
        // Add active to clicked item
        clickedItem.classList.add('active');
        
        // Sync desktop and mobile
        if (!isMobile) {
            const text = clickedItem.textContent.trim();
            mobileNavItems.forEach(mobileItem => {
                if (mobileItem.textContent.trim() === text) {
                    mobileItem.classList.add('active');
                }
            });
        } else {
            const text = clickedItem.textContent.trim();
            desktopNavItems.forEach(desktopItem => {
                if (desktopItem.textContent.trim() === text) {
                    desktopItem.classList.add('active');
                }
            });
        }
    }
    
    // ==========================================
    // DESKTOP NAVIGATION CLICK HANDLERS
    // ==========================================
    desktopNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveNavItem(this, false);
        });
    });
    
    // ==========================================
    // MOBILE NAVIGATION CLICK HANDLERS
    // ==========================================
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveNavItem(this, true);
            
            // Close mobile menu
            mobileNav.classList.remove('show');
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
        });
    });
    
    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    hamburger.addEventListener('click', () => {
        mobileNav.classList.toggle('show');
        
        // Change hamburger icon
        if (mobileNav.classList.contains('show')) {
            hamburgerIcon.classList.remove('fa-bars');
            hamburgerIcon.classList.add('fa-times');
        } else {
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
        }
    });
    
    // ==========================================
    // SIGN IN BUTTONS
    // ==========================================
    signinBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Sign In functionality would go here!');
        });
    });
    
    // ==========================================
    // INITIAL SETUP - Default Active Item
    // ==========================================
    // Set Home as default active
    const defaultActive = document.querySelector('.nav-item:first-child');
    if (defaultActive) {
        setActiveNavItem(defaultActive, false);
    }
    
    // ==========================================
    // CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    // ==========================================
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
            mobileNav.classList.remove('show');
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
        }
    });
});

// ==========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// CARD HOVER EFFECTS
// ==========================================
const cards = document.querySelectorAll('.experience-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ==========================================
// NEWSLETTER FORM HANDLING - FIXED CLASS NAMES
// ==========================================
const newsletterBtn = document.querySelector('.newsletter-submit');
const newsletterEmail = document.querySelector('.newsletter-email');

if (newsletterBtn && newsletterEmail) {
    newsletterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = newsletterEmail.value.trim();
        
        if (email === '') {
            alert('Please enter your email address');
            newsletterEmail.focus();
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            newsletterEmail.focus();
            return;
        }
        
        // Success message
        alert('Thank you for subscribing to GeoFroggy newsletter! 🎉');
        newsletterEmail.value = '';
    });
}

// Email validation function
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================
let lastScrollPosition = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;
    
    if (currentScrollPosition > 120) {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.25)';
    } else {
        header.style.boxShadow = '0 3px 12px rgba(0,0,0,0.15)';
    }
    
    lastScrollPosition = currentScrollPosition;
});

// ==========================================
// INTERSECTION OBSERVER FOR CARDS ANIMATION
// ==========================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(35px)';
    card.style.transition = `all 0.7s ease ${index * 0.18}s`;
    cardObserver.observe(card);
});

// ==========================================
// BUTTON CLICK ANIMATION
// ==========================================
const allButtons = document.querySelectorAll('.card-btn, .signin-btn, .newsletter-submit');
allButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Scale animation
        this.style.transform = 'scale(0.96)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// ==========================================
// CLOSE MOBILE MENU ON WINDOW RESIZE
// ==========================================
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        mobileNav.classList.remove('show');
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars');
    }
});

// ==========================================
// PREVENT SCROLL WHEN MOBILE MENU IS OPEN
// ==========================================
const body = document.body;
hamburger.addEventListener('click', () => {
    if (mobileNav.classList.contains('show')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
});

// ==========================================
// PAGE LOAD ANIMATION
// ==========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==========================================
// CONSOLE WELCOME MESSAGE
// ==========================================
console.log('%c🐸 Welcome to GeoFroggy! 🌍', 'color: #7ec845; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
console.log('%cExplore global stories, connect with cultures worldwide!', 'color: #0c5a8a; font-size: 14px; font-weight: 600;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #7ec845;');

// Cards ke liye scroll animation
function initCardAnimations() {
    const cards = document.querySelectorAll('.experience-card');
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add show class to trigger animation
                entry.target.classList.add('show');
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2, // Card ka 20% visible hone par trigger
        rootMargin: '0px 0px -50px 0px' // Bottom se 50px pehle trigger
    });
    
    // Observe each card
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // Page load pe jo cards already visible hain unko bhi show karo
    window.addEventListener('load', () => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                card.classList.add('show');
                observer.unobserve(card);
            }
        });
    });
}

// DOM ready pe initialize karo
document.addEventListener('DOMContentLoaded', function() {
    // Card animations initialize
    initCardAnimations();
    
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const hamburgerIcon = document.getElementById('hamburgerIcon');
    
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function() {
            mobileNav.classList.toggle('show');
            
            if (mobileNav.classList.contains('show')) {
                hamburgerIcon.classList.remove('fa-bars');
                hamburgerIcon.classList.add('fa-times');
            } else {
                hamburgerIcon.classList.remove('fa-times');
                hamburgerIcon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileNav && mobileNav.classList.contains('show') && 
            !event.target.closest('.nav-container') && 
            !event.target.closest('.mobile-nav')) {
            mobileNav.classList.remove('show');
            if (hamburgerIcon) {
                hamburgerIcon.classList.remove('fa-times');
                hamburgerIcon.classList.add('fa-bars');
            }
        }
    });
    
    // Add hover animations for cards
    const cards = document.querySelectorAll('.experience-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('show')) {
                this.style.transform = 'translateY(-15px) scale(1.03)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('show')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.card-btn, .newsletter-submit, .signin-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });
    
    // Social icon hover effects
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(10deg) scale(1.2)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0) scale(1)';
        });
    });
    
    // Add animation to footer links
    const footerLinks = document.querySelectorAll('.footer-link-col ul li a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});

// Re-trigger animations when scrolling up
window.addEventListener('scroll', function() {
    document.querySelectorAll('.fade-up, .fade-zoom, .slide-left').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
            el.classList.add('show');
        }
    });
});