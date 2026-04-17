// ============================================================================
// SK PRESIDENCY SCHOOL - FORM VALIDATION AND HANDLING
// Form validation, submission, error handling
// ============================================================================

// ============================================================================
// EMAIL VALIDATION
// ============================================================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================================================
// PHONE NUMBER VALIDATION
// ============================================================================

function isValidPhone(phone) {
    const phoneRegex = /^\d{10}$/;
    const cleanPhone = phone.replace(/\D/g, '');
    return phoneRegex.test(cleanPhone);
}

// ============================================================================
// NAME VALIDATION
// ============================================================================

function isValidName(name) {
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    return nameRegex.test(name.trim());
}

// ============================================================================
// FORM VALIDATION MASTER FUNCTION
// ============================================================================

function validateFormData(formData) {
    const errors = [];
    
    // Name validation
    if (!formData.name || formData.name.trim() === '') {
        errors.push('Name is required');
    } else if (!isValidName(formData.name)) {
        errors.push('Name should contain only letters');
    }
    
    // Email validation
    if (!formData.email || formData.email.trim() === '') {
        errors.push('Email is required');
    } else if (!isValidEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Phone validation (if provided)
    if (formData.phone && formData.phone.trim() !== '') {
        if (!isValidPhone(formData.phone)) {
            errors.push('Please enter a valid 10-digit phone number');
        }
    }
    
    // Message validation (if provided)
    if (formData.message && formData.message.trim().length < 10) {
        errors.push('Message should be at least 10 characters long');
    }
    
    return errors;
}

// ============================================================================
// DISPLAY FORM ERRORS
// ============================================================================

function displayFormErrors(formElement, errors) {
    // Remove existing error messages
    const existingErrors = formElement.querySelectorAll('.form-error-message');
    existingErrors.forEach(error => error.remove());
    
    if (errors.length === 0) {
        return;
    }
    
    // Create error container
    const errorContainer = document.createElement('div');
    errorContainer.className = 'form-error-message';
    errorContainer.style.cssText = `
        background-color: rgba(220, 53, 69, 0.1);
        border: 2px solid #dc3545;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 16px;
        color: #dc3545;
    `;
    
    // Add error list
    const errorList = document.createElement('ul');
    errorList.style.cssText = 'margin: 0; padding-left: 20px;';
    
    errors.forEach(error => {
        const li = document.createElement('li');
        li.textContent = error;
        li.style.marginBottom = '8px';
        errorList.appendChild(li);
    });
    
    errorContainer.appendChild(errorList);
    formElement.insertBefore(errorContainer, formElement.firstChild);
}

// ============================================================================
// MARK FORM FIELD AS ERROR
// ============================================================================

function markFieldError(fieldName, formElement) {
    const field = formElement.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.style.borderColor = '#dc3545';
        field.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
    }
}

// ============================================================================
// CLEAR FIELD ERROR
// ============================================================================

function clearFieldError(fieldName, formElement) {
    const field = formElement.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.style.borderColor = '';
        field.style.boxShadow = '';
    }
}

// ============================================================================
// HANDLE FORM SUBMISSION
// ============================================================================

function handleFormSubmit(formElement, callback) {
    if (!formElement) return;
    
    formElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate form
        const errors = validateFormData(data);
        
        if (errors.length > 0) {
            displayFormErrors(this, errors);
            console.warn('Form validation errors:', errors);
            return false;
        }
        
        // Clear previous errors
        displayFormErrors(this, []);
        
        // Call callback if provided
        if (typeof callback === 'function') {
            callback(data);
        } else {
            console.log('Form submitted:', data);
            showToast('Form submitted successfully!', 'success');
        }
        
        return false;
    });
}

// ============================================================================
// REAL-TIME FIELD VALIDATION
// ============================================================================

function enableRealtimeValidation(formElement) {
    if (!formElement) return;
    
    const inputs = formElement.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const fieldName = this.name;
            const value = this.value;
            let isValid = true;
            
            if (fieldName === 'email') {
                isValid = value === '' || isValidEmail(value);
            } else if (fieldName === 'phone') {
                isValid = value === '' || isValidPhone(value);
            } else if (fieldName === 'name') {
                isValid = value === '' || isValidName(value);
            }
            
            if (!isValid) {
                markFieldError(fieldName, formElement);
            } else {
                clearFieldError(fieldName, formElement);
            }
        });
        
        input.addEventListener('focus', function() {
            clearFieldError(this.name, formElement);
        });
    });
}

// ============================================================================
// PREVENT FORM DOUBLE SUBMISSION
// ============================================================================

function preventDoubleSubmit(formElement) {
    if (!formElement) return;
    
    const submitBtn = formElement.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    
    formElement.addEventListener('submit', function() {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
        }, 2000);
    });
}

// ============================================================================
// INITIALIZE ALL FORMS
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Enable real-time validation
        enableRealtimeValidation(form);
        
        // Prevent double submission
        preventDoubleSubmit(form);
        
        // Handle submission
        handleFormSubmit(form);
    });
});

// ============================================================================
// END OF FORMS.JS
// ============================================================================
