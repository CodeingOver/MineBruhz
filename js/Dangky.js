// Registration page functionality
$(document).ready(function() {
    
    // Password visibility toggle for main password
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

    // Password visibility toggle for confirm password
    $('.password-toggle-confirm').on('click', function() {
        const passwordField = $('#repassword');
        const eyeIcon = $(this).find('i');
        
        if (passwordField.attr('type') === 'password') {
            passwordField.attr('type', 'text');
            eyeIcon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            passwordField.attr('type', 'password');
            eyeIcon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });

    // Real-time password matching validation
    $('#repassword').on('input', function() {
        const password = $('#password').val();
        const repassword = $(this).val();
        const errorMsg = $('#repassword_error');
        
        if (repassword.length > 0) {
            if (password !== repassword) {
                errorMsg.show();
                $(this).closest('.form-group').addClass('error');
            } else {
                errorMsg.hide();
                $(this).closest('.form-group').removeClass('error');
            }
        } else {
            errorMsg.hide();
            $(this).closest('.form-group').removeClass('error');
        }
    });

    // Form submission handling
    $('#form-register').on('submit', function(e) {
        e.preventDefault();
        
        if (validate()) {
            const submitBtn = $('.form-submit');
            const originalText = submitBtn.html();
            
            // Show loading state
            submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Đang đăng ký...');
            submitBtn.prop('disabled', true);
            
            // Simulate registration process (replace with actual registration logic)
            setTimeout(function() {
                // Reset button state
                submitBtn.html(originalText);
                submitBtn.prop('disabled', false);
                
                // You can add actual registration logic here
                alert('Chức năng đăng ký sẽ được triển khai trong phiên bản tiếp theo!');
            }, 2000);
        }
    });

    // Input focus effects
    $('.form-input').on('focus', function() {
        $(this).closest('.form-group').addClass('focused');
    });

    $('.form-input').on('blur', function() {
        $(this).closest('.form-group').removeClass('focused');
    });

    // Form validation on input
    $('.form-input').on('input', function() {
        const input = $(this);
        const value = input.val().trim();
        
        if (value.length > 0) {
            input.addClass('has-value');
        } else {
            input.removeClass('has-value');
        }
    });

    // Keyboard accessibility for password toggles
    $('.password-toggle, .password-toggle-confirm').on('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).click();
        }
    });

    // Terms checkbox validation
    $('#terms').on('change', function() {
        const submitBtn = $('.form-submit');
        if ($(this).is(':checked')) {
            submitBtn.prop('disabled', false);
            console.log('Terms accepted');
        } else {
            submitBtn.prop('disabled', true);
            console.log('Terms not accepted');
        }
    });

    // Social registration buttons
    $('.discord-btn').on('click', function() {
        alert('Đăng ký bằng Discord sẽ được triển khai trong phiên bản tiếp theo!');
    });

    $('.google-btn').on('click', function() {
        alert('Đăng ký bằng Google sẽ được triển khai trong phiên bản tiếp theo!');
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

    // Initialize submit button state
    $('.form-submit').prop('disabled', true);

});

// Validation function (enhanced)
function validate() {
    const username = $('#username').val().trim();
    const email = $('#email').val().trim();
    const password = $('#password').val();
    const repassword = $('#repassword').val();
    const termsAccepted = $('#terms').is(':checked');
    
    // Terms validation
    if (!termsAccepted) {
        alert('Vui lòng đồng ý với Điều khoản sử dụng và Chính sách bảo mật');
        $('#terms').focus();
        return false;
    }
    
    // Username validation
    if (username.length < 3) {
        alert('Tên đăng nhập phải có ít nhất 3 ký tự');
        $('#username').focus();
        return false;
    }
    
    // Username format validation
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
        alert('Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới');
        $('#username').focus();
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Vui lòng nhập email hợp lệ');
        $('#email').focus();
        return false;
    }
    
    // Password validation
    if (password.length < 6) {
        alert('Mật khẩu phải có ít nhất 6 ký tự');
        $('#password').focus();
        return false;
    }
    
    // Password matching validation
    if (password !== repassword) {
        alert('Mật khẩu không khớp');
        $('#repassword').focus();
        return false;
    }
    
    return true;
}

// Legacy function support
function getValue(id) {
    return document.getElementById(id).value.trim();
}