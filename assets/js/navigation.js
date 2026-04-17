// ============================================================================
// SK PRESIDENCY SCHOOL - NAVIGATION HANDLING
// Mobile menu, dropdown, smooth transitions
// ============================================================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-btn)');
const dropdownBtns = document.querySelectorAll('.dropdown-btn');

// ============================================================================
// MOBILE HAMBURGER MENU TOGGLE
// ============================================================================

if (hamburger) {
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        
        // Change hamburger text
        if (navMenu.classList.contains('active')) {
            hamburger.textContent = '✕';
        } else {
            hamburger.textContent = '☰';
        }
    });
}

// ============================================================================
// CLOSE MENU WHEN LINK CLICKED
// ============================================================================

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Only close menu if it's a regular link (not dropdown)
        if (!this.classList.contains('dropdown-btn')) {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.textContent = '☰';
            }
        }
    });
});

// ============================================================================
// DROPDOWN TOGGLE ON MOBILE
// ============================================================================

dropdownBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdownContent = this.nextElementSibling;
            
            if (dropdownContent && dropdownContent.classList.contains('dropdown-content')) {
                dropdownContent.classList.toggle('active');
            }
        }
    });
});

// ============================================================================
// CLOSE MENU ON OUTSIDE CLICK
// ============================================================================

document.addEventListener('click', function(e) {
    if (!navMenu || !hamburger) return;
    
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.textContent = '☰';
        }
    }
});

// ============================================================================
// CLOSE MENU ON ESCAPE KEY
// ============================================================================

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.textContent = '☰';
        }
    }
});

// ============================================================================
// RESPONSIVE MENU HANDLING
// ============================================================================

window.addEventListener('resize', function() {
    // Reset menu on resize
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.textContent = '☰';
        }
    }
});

// ============================================================================
// STICKY NAVBAR EFFECT
// ============================================================================

const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.08)';
        }
    });
}

// ============================================================================
// DROPDOWN MOBILE STYLING
// ============================================================================

const dropdownContents = document.querySelectorAll('.dropdown-content');

dropdownContents.forEach(dropdown => {
    if (window.innerWidth <= 768) {
        dropdown.style.position = 'static';
        dropdown.style.opacity = '0';
        dropdown.style.visibility = 'hidden';
        dropdown.style.transform = 'none';
        dropdown.style.marginTop = '0';
    }
});

// ============================================================================
// END OF NAVIGATION.JS
// ============================================================================
