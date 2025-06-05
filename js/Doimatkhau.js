// Password Reset Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('form-reset-password');
    const emailInput = document.getElementById('email');
    const submitBtn = document.getElementById('submit-btn');
    const messageContainer = document.getElementById('message-container');

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Clear previous messages
        clearMessages();
        
        // Validate email
        if (!email) {
            showMessage('Vui lòng nhập địa chỉ email của bạn.', 'error');
            emailInput.focus();
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Địa chỉ email không hợp lệ. Vui lòng kiểm tra lại.', 'error');
            emailInput.focus();
            return;
        }
        
        // Show loading state
        setLoadingState(true);
        
        try {
            // Simulate API call (replace with actual API endpoint)
            await simulatePasswordReset(email);
            
            // Show success message
            showMessage(
                `Liên kết đặt lại mật khẩu đã được gửi đến ${email}. Vui lòng kiểm tra hộp thư của bạn.`,
                'success'
            );
            
            // Clear the form
            emailInput.value = '';
            
            // Optional: Redirect after delay
            setTimeout(() => {
                // window.location.href = 'Dangnhap.html';
            }, 3000);
            
        } catch (error) {
            showMessage(
                'Có lỗi xảy ra khi gửi liên kết đặt lại mật khẩu. Vui lòng thử lại sau.',
                'error'
            );
            console.error('Password reset error:', error);
        } finally {
            setLoadingState(false);
        }
    });

    // Email input validation on blur
    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        if (email && !isValidEmail(email)) {
            showFieldError(this, 'Địa chỉ email không hợp lệ');
        } else {
            clearFieldError(this);
        }
    });

    // Clear error on input
    emailInput.addEventListener('input', function() {
        clearFieldError(this);
        clearMessages();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Enter key to submit
        if (e.key === 'Enter' && document.activeElement === emailInput) {
            form.dispatchEvent(new Event('submit'));
        }
        
        // Escape key to clear form
        if (e.key === 'Escape') {
            clearForm();
        }
    });

    // Utility Functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showMessage(message, type = 'info') {
        clearMessages();
        
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        
        const icon = type === 'success' ? 'fas fa-check-circle' : 
                    type === 'error' ? 'fas fa-exclamation-circle' : 
                    'fas fa-info-circle';
        
        messageElement.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
        `;
        
        messageContainer.appendChild(messageElement);
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.remove();
                }
            }, 5000);
        }
    }

    function clearMessages() {
        messageContainer.innerHTML = '';
    }

    function showFieldError(field, message) {
        clearFieldError(field);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
        `;
        
        field.parentNode.appendChild(errorElement);
        field.style.borderColor = 'var(--error-color)';
    }

    function clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.style.borderColor = '';
    }

    function setLoadingState(loading) {
        if (loading) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            emailInput.disabled = true;
        } else {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            emailInput.disabled = false;
        }
    }

    function clearForm() {
        emailInput.value = '';
        clearMessages();
        clearFieldError(emailInput);
        emailInput.focus();
    }

    // Simulate password reset API call
    async function simulatePasswordReset(email) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve({ success: true, email });
                } else {
                    reject(new Error('Network error'));
                }
            }, 1500); // Simulate network delay
        });
    }

    // Animation for form elements
    function addAnimations() {
        const formGroups = document.querySelectorAll('.form-group');
        const infoCards = document.querySelectorAll('.info-card');
        
        // Stagger animation for form elements
        formGroups.forEach((group, index) => {
            group.style.opacity = '0';
            group.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                group.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        // Animate info cards
        infoCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }, 500 + (index * 150));
        });
    }

    // Initialize animations
    addAnimations();

    // Focus on email input
    emailInput.focus();

    // Add ripple effect to buttons
    function addRippleEffect() {
        const buttons = document.querySelectorAll('.form-submit, .action-link');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Add ripple effect styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .field-error {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--error-color);
            font-size: 0.85rem;
            margin-top: 8px;
            animation: slideIn 0.3s ease;
        }
        
        .field-error i {
            font-size: 0.8rem;
        }
    `;
    document.head.appendChild(style);

    // Initialize ripple effects
    addRippleEffect();

    console.log('Password Reset page initialized successfully');
});
