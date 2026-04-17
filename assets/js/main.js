// ============================================================================
// SK PRESIDENCY SCHOOL - MAIN JAVASCRIPT FILE
// Intersection Observer, Animations, Form Validation
// ============================================================================

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-rotate, .reveal-zoom').forEach(el => {
    observer.observe(el);
});

// ============================================================================
// COUNTER ANIMATION FOR STATISTICS
// ============================================================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counters when visible
const statNumbers = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.textContent);
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(num => counterObserver.observe(num));

// ============================================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ============================================================================
// ACTIVE LINK IN NAVIGATION
// ============================================================================

function updateActiveLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (href === 'index.html' && currentPage === '/')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Update active link on page load
updateActiveLink();

// ============================================================================
// FORM VALIDATION UTILITIES
// ============================================================================

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim() === '') {
        errors.push('Name is required');
    }
    
    if (!formData.email || !validateEmail(formData.email)) {
        errors.push('Valid email is required');
    }
    
    if (formData.phone && !validatePhone(formData.phone)) {
        errors.push('Valid 10-digit phone number is required');
    }
    
    return errors;
}

// ============================================================================
// TOAST NOTIFICATIONS
// ============================================================================

function showToast(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#ffc107'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideUp 0.3s ease forwards;
        font-weight: 600;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideUp 0.3s ease reverse forwards';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Get element by ID with error handling
function getElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`Element with ID "${id}" not found`);
    }
    return element;
}

// Add event listener with error handling
function addEvent(selector, eventType, callback) {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
        console.warn(`No elements found for selector "${selector}"`);
        return;
    }
    
    elements.forEach(element => {
        element.addEventListener(eventType, callback);
    });
}

// ============================================================================
// PAGE LOAD EVENT
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('SK Presidency School Website - Loaded');
    
    // Initialize all animations
    document.querySelectorAll('.animate-fade-in, .animate-slide-up').forEach(el => {
        // Animations are already CSS-based
    });
    
    // Log performance metrics
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    }
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

window.addEventListener('error', function(event) {
    console.error('JavaScript Error:', event.message);
});

// ============================================================================
// END OF MAIN.JS
// ============================================================================
