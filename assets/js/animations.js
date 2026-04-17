// ============================================================================
// SK PRESIDENCY SCHOOL - ANIMATION HELPER FUNCTIONS
// Animation utilities and helpers
// ============================================================================

// ============================================================================
// FADE IN ANIMATION
// ============================================================================

function fadeIn(element, delay = 0) {
    element.style.opacity = '0';
    element.style.transition = `opacity 0.6s ease ${delay}ms`;
    
    setTimeout(() => {
        element.style.opacity = '1';
    }, 10);
}

// ============================================================================
// SLIDE UP ANIMATION
// ============================================================================

function slideUp(element, delay = 0) {
    element.style.transform = 'translateY(30px)';
    element.style.opacity = '0';
    element.style.transition = `all 0.6s ease ${delay}ms`;
    
    setTimeout(() => {
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
    }, 10);
}

// ============================================================================
// SLIDE DOWN ANIMATION
// ============================================================================

function slideDown(element, delay = 0) {
    element.style.transform = 'translateY(-30px)';
    element.style.opacity = '0';
    element.style.transition = `all 0.6s ease ${delay}ms`;
    
    setTimeout(() => {
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
    }, 10);
}

// ============================================================================
// ZOOM IN ANIMATION
// ============================================================================

function zoomIn(element, delay = 0) {
    element.style.transform = 'scale(0.95)';
    element.style.opacity = '0';
    element.style.transition = `all 0.6s ease ${delay}ms`;
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
    }, 10);
}

// ============================================================================
// BOUNCE ANIMATION
// ============================================================================

function bounce(element) {
    element.style.animation = 'bounce 1s ease-in-out';
    
    setTimeout(() => {
        element.style.animation = 'none';
    }, 1000);
}

// ============================================================================
// PARALLAX EFFECT
// ============================================================================

function parallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-parallax') || 0.5;
            el.style.transform = `translateY(${window.scrollY * speed}px)`;
        });
    });
}

// ============================================================================
// STAGGER ANIMATION (MULTIPLE ELEMENTS)
// ============================================================================

function staggerAnimation(selector, animationClass, delayIncrement = 100) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add(animationClass);
        }, index * delayIncrement);
    });
}

// ============================================================================
// ADD ANIMATION CLASS ON HOVER
// ============================================================================

function addHoverAnimation(selector, animationClass) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add(animationClass);
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove(animationClass);
        });
    });
}

// ============================================================================
// SMOOTH SCROLL TO ELEMENT
// ============================================================================

function smoothScrollTo(element, offset = 0) {
    if (!element) return;
    
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// ============================================================================
// INITIALIZE PAGE LOAD ANIMATIONS
// ============================================================================

window.addEventListener('load', () => {
    // Fade in animations
    document.querySelectorAll('.animate-fade-in').forEach((el, i) => {
        fadeIn(el, i * 100);
    });
    
    // Slide up animations
    document.querySelectorAll('.animate-slide-up').forEach((el, i) => {
        slideUp(el, i * 100);
    });
    
    // Initialize parallax
    parallax();
});

// ============================================================================
// END OF ANIMATIONS.JS
// ============================================================================
