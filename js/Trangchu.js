
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navContent = document.querySelector('.nav-content');
    const navMenuList = document.querySelectorAll('.nav-menu-list.father');

    // Toggle mobile menu
    if (mobileMenuToggle && navContent) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenuToggle.classList.toggle('active');
            navContent.classList.toggle('active');
        });
    }    // Handle dropdown menus on mobile
    navMenuList.forEach(item => {
        const link = item.querySelector('.linking');
        const submenu = item.querySelector('.sub-nav-menu');
        
        if (link && submenu) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault(); // Ngăn chặn điều hướng
                    e.stopPropagation();
                    
                    // Toggle dropdown
                    item.classList.toggle('active');
                    
                    // Đóng các dropdown khác
                    navMenuList.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                }
            });
            
            // Xử lý click vào submenu links
            const subLinks = submenu.querySelectorAll('a');
            subLinks.forEach(subLink => {
                subLink.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // Cho phép điều hướng bình thường cho submenu items
                    // Đóng menu sau khi click
                    mobileMenuToggle.classList.remove('active');
                    navContent.classList.remove('active');
                    item.classList.remove('active');
                });
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.nav') && navContent.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navContent.classList.remove('active');
                navMenuList.forEach(item => item.classList.remove('active'));
            }
        }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            mobileMenuToggle.classList.remove('active');
            navContent.classList.remove('active');
            navMenuList.forEach(item => item.classList.remove('active'));
        }
    });
});

// New Gallery Slider
document.addEventListener('DOMContentLoaded', () => {
    const sliderTrack = document.querySelector('.gallery-slider .slider-track');
    const slideItems = document.querySelectorAll('.gallery-slider .slide-item');
    const dots = document.querySelectorAll('.gallery-slider .dot');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');    let currentSlide = 0;
    const totalSlides = slideItems.length;
    let autoSlideInterval;
    let lastClickTime = 0; // Track last click time for debouncing
    let isTabVisible = true; // Track tab visibility
    const clickCooldown = 250; // Minimum time between clicks (ms)
      function updateSlider(noAnimation = false, specialEffect = false) {
        if (sliderTrack && slideItems.length > 0) {
            const translateX = -currentSlide * 100;
            
            // Special effect for wrap-around transitions
            if (specialEffect) {
                sliderTrack.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                sliderTrack.style.filter = 'brightness(1.2) contrast(1.1)';
            }
            // Disable animation if needed
            else if (noAnimation) {
                sliderTrack.style.transition = 'none';
            } else {
                sliderTrack.style.transition = '';
                sliderTrack.style.filter = '';
            }
            
            sliderTrack.style.transform = `translateX(${translateX}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
            
            // Reset effects after animation
            if (specialEffect) {
                setTimeout(() => {
                    sliderTrack.style.transition = '';
                    sliderTrack.style.filter = '';
                }, 300);
            }
            // Re-enable animation after a short delay
            else if (noAnimation) {
                setTimeout(() => {
                    sliderTrack.style.transition = '';
                }, 50);
            }
        }
    }    function nextSlide() {
        const now = Date.now();
        if (now - lastClickTime < clickCooldown) return; // Debounce rapid clicks
        lastClickTime = now;
        
        if (currentSlide === totalSlides - 1) {
            // Special effect when wrapping from last to first
            currentSlide = 0;
            updateSlider(false, true); // Use special effect
        } else {
            currentSlide++;
            updateSlider();
        }
    }    function prevSlide() {
        const now = Date.now();
        if (now - lastClickTime < clickCooldown) return; // Debounce rapid clicks
        lastClickTime = now;
        
        if (currentSlide === 0) {
            // Special effect when wrapping from first to last
            currentSlide = totalSlides - 1;
            updateSlider(false, true); // Use special effect
        } else {
            currentSlide--;
            updateSlider();
        }
    }

    function startAutoSlide() {
        if (isTabVisible) {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
            resetAutoSlide();
        });
    }    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            const now = Date.now();
            if (now - lastClickTime < clickCooldown) return; // Debounce rapid clicks
            lastClickTime = now;
            
            e.preventDefault();
            currentSlide = index;
            updateSlider();
            resetAutoSlide();
        });
    });

    // Tab visibility change detection
    document.addEventListener('visibilitychange', () => {
        isTabVisible = !document.hidden;
        
        if (isTabVisible) {
            // Tab is visible again, restart auto-slide
            startAutoSlide();
        } else { 
            // Tab is hidden, stop auto-slide
            clearInterval(autoSlideInterval);
        }
    });    // Keyboard navigation with debouncing
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const now = Date.now();
            if (now - lastClickTime < clickCooldown) return; // Debounce rapid key presses
            lastClickTime = now;
            
            e.preventDefault();
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
            resetAutoSlide();
        }
    });

    // Pause on hover
    const sliderContainer = document.querySelector('.slider-container');    // Touch/Swipe support with debouncing
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        sliderContainer.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastClickTime < clickCooldown) return; // Debounce rapid swipes
            
            touchEndX = e.changedTouches[0].screenX;
            const swipeDistance = Math.abs(touchEndX - touchStartX);
            
            if (swipeDistance > minSwipeDistance) {
                lastClickTime = now;
                if (touchEndX < touchStartX) {
                    // Swipe left - next slide
                    nextSlide();
                } else if (touchEndX > touchStartX) {
                    // Swipe right - previous slide
                    prevSlide();
                }
                resetAutoSlide();
            }
        });
        
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }

    // Initialize
    updateSlider();
    startAutoSlide();

    // Handle window resize
    window.addEventListener('resize', updateSlider);
});