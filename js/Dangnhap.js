// Login page functionality
$(document).ready(function() {
    
    // Password visibility toggle
    $('.password-toggle').on('click', function() {
        const passwordField = $('#password');
        const eyeIcon = $(this).find('i');
        
        if (passwordField.attr('type') === 'password') {
            passwordField.attr('type', 'text');
            eyeIcon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            passwordField.attr('type', 'password');
            eyeIcon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });

    // Form submission handling
    $('#form-login').on('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = $('.form-submit');
        const originalText = submitBtn.html();
        
        // Show loading state
        submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Đang đăng nhập...');
        submitBtn.prop('disabled', true);
        
        // Simulate login process (replace with actual login logic)
        setTimeout(function() {
            // Reset button state
            submitBtn.html(originalText);
            submitBtn.prop('disabled', false);
            
            // You can add actual login logic here
            alert('Chức năng đăng nhập sẽ được triển khai trong phiên bản tiếp theo!');
        }, 2000);
    });

    // Social login buttons
    $('.discord-btn').on('click', function() {
        alert('Đăng nhập bằng Discord sẽ được triển khai trong phiên bản tiếp theo!');
    });

    $('.google-btn').on('click', function() {
        alert('Đăng nhập bằng Google sẽ được triển khai trong phiên bản tiếp theo!');
    });

    // Input focus effects
    $('.form-input').on('focus', function() {
        $(this).closest('.form-group').addClass('focused');
    });

    $('.form-input').on('blur', function() {
        $(this).closest('.form-group').removeClass('focused');
    });

    // Form validation
    $('.form-input').on('input', function() {
        const input = $(this);
        const value = input.val().trim();
        
        if (value.length > 0) {
            input.addClass('has-value');
        } else {
            input.removeClass('has-value');
        }
    });

    // Remember me functionality
    $('#remember').on('change', function() {
        if ($(this).is(':checked')) {
            console.log('Remember me option enabled');
        } else {
            console.log('Remember me option disabled');
        }
    });

    // Keyboard accessibility for password toggle
    $('.password-toggle').on('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).click();
        }
    });

    // Logo animation on hover
    $('.logo-image').on('mouseenter', function() {
        $(this).css('transform', 'scale(1.1) rotate(5deg)');
    });

    $('.logo-image').on('mouseleave', function() {
        $(this).css('transform', 'scale(1) rotate(0deg)');
    });

    // Quick links hover effects
    $('.quick-link').on('mouseenter', function() {
        $(this).find('i').addClass('fa-bounce');
    });

    $('.quick-link').on('mouseleave', function() {
        $(this).find('i').removeClass('fa-bounce');
    });

});
