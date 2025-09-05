// Tarunati Industries Premium Website - Fixed JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all premium functionality
    initNavigation();
    initSmoothScrolling();
    initHeaderEffects();
    initCounterAnimations();
    initScrollAnimations();
    initParallaxEffects();
    initMicroInteractions();
    initPerformanceOptimizations();
    initPremiumEffects();
    initAccessibility();
    
    console.log('🌱 Tarunati Industries premium website loaded successfully!');
    console.log('💚 Moving towards sustainable growth with premium user experience!');
});

// Fixed Navigation with Proper Scroll Detection
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.querySelector('.header');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            openMobileMenu();
        });
    }

    function openMobileMenu() {
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Staggered animation for menu items
        const menuItems = navMenu.querySelectorAll('.nav__item');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(30px)';
            setTimeout(() => {
                item.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 80);
        });
    }

    function closeMobileMenu() {
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Event listeners for closing menu
    if (navClose) {
        navClose.addEventListener('click', closeMobileMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    // Fixed active link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const headerHeight = header ? header.offsetHeight : 80;
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Update active link on scroll with throttling
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                updateActiveNavLink();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    // Initialize active link on load
    setTimeout(updateActiveNavLink, 100);
}

// Fixed Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const header = document.querySelector('.header');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                // Smooth scroll with fixed implementation
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state immediately
                setTimeout(() => {
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    this.classList.add('active');
                }, 100);
            }
        });
    });
}

// Fixed Header Effects
function initHeaderEffects() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let headerTicking = false;

    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        // Add glassmorphism effect when scrolling
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
        headerTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!headerTicking) {
            requestAnimationFrame(updateHeader);
            headerTicking = true;
        }
    }, { passive: true });
}

// Fixed Counter Animations with Correct Values
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat__number, .stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        // Set proper data-target values based on content
        const text = counter.getAttribute('data-target');
        if (!text) {
            const currentText = counter.textContent.trim();
            if (currentText.includes('4095')) {
                counter.setAttribute('data-target', '4095');
            } else if (currentText.includes('40')) {
                counter.setAttribute('data-target', '40');
            } else if (currentText.includes('15')) {
                counter.setAttribute('data-target', '15');
            } else if (currentText.includes('3')) {
                counter.setAttribute('data-target', '3');
            }
        }
        
        // Reset counter for animation
        counter.textContent = '0';
        counterObserver.observe(counter);
    });

    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target')) || 0;
        const duration = 2000;
        const start = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Smooth easing function
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(target * easeOutCubic);
            
            // Display the actual number, not abbreviated
            if (target === 4095) {
                counter.textContent = currentValue.toLocaleString();
            } else if (target >= 1000) {
                counter.textContent = (currentValue / 1000).toFixed(0) + 'K';
            } else {
                counter.textContent = currentValue.toString();
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Show final correct value
                if (target === 4095) {
                    counter.textContent = '4095';
                } else if (target >= 1000) {
                    counter.textContent = Math.floor(target / 1000) + 'K';
                } else {
                    counter.textContent = target.toString();
                }
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
}

// Fixed Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .card, .stat, .spec, .step, .hero__content, .hero__visual');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animateElement(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        // Set initial state
        if (!element.classList.contains('visible')) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
        
        scrollObserver.observe(element);
    });

    function animateElement(element) {
        // Add staggered delay for grid items
        const parent = element.parentElement;
        let delay = 0;
        
        if (parent && (parent.classList.contains('solution__grid') || 
                      parent.classList.contains('technical__grid') || 
                      parent.classList.contains('stat-grid') ||
                      parent.classList.contains('carbon__grid'))) {
            const siblings = Array.from(parent.children);
            const index = siblings.indexOf(element);
            delay = index * 100;
        }

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay);
    }
}

// Fixed Parallax Effects
function initParallaxEffects() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    let parallaxTicking = false;

    function updateParallax() {
        if (window.innerWidth <= 768) return; // Skip on mobile
        
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2;
        
        const heroContent = document.querySelector('.hero__content');
        const heroVisual = document.querySelector('.hero__visual');
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${rate}px)`;
        }
        
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${rate * 0.7}px)`;
        }
        
        parallaxTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!parallaxTicking) {
            requestAnimationFrame(updateParallax);
            parallaxTicking = true;
        }
    }, { passive: true });
}

// Fixed Micro-interactions
function initMicroInteractions() {
    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        // Add proper hover effects
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });

        // Click feedback
        btn.addEventListener('click', function(e) {
            // Create click ripple effect
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
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });

    // Card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(27, 94, 32, 0.15)';
                this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 2px 20px rgba(27, 94, 32, 0.08)';
        });
    });

    // Add ripple animation keyframes
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Premium Loading and Visual Effects
function initPremiumEffects() {
    // Add loading animation
    initLoadingAnimation();
    
    // Add scroll progress indicator
    initScrollProgress();
    
    // Initialize image loading effects
    initImageEffects();
}

function initLoadingAnimation() {
    // Show initial loading state briefly to demonstrate premium feel
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #FAFAFA 0%, rgba(76, 175, 80, 0.05) 100%);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
        transition: opacity 0.8s ease;
    `;

    loadingOverlay.innerHTML = `
        <div style="text-align: center;">
            <div style="
                width: 50px;
                height: 50px;
                border: 3px solid rgba(27, 94, 32, 0.1);
                border-top: 3px solid #4CAF50;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 16px;
            "></div>
            <h3 style="
                font-family: 'Playfair Display', serif;
                color: #1B5E20;
                margin: 0;
                font-size: 20px;
                font-weight: 700;
            ">Tarunati Industries</h3>
            <p style="
                font-family: 'Source Sans Pro', sans-serif;
                color: #424242;
                margin: 8px 0 0;
                font-size: 14px;
            ">Moving towards sustainable growth...</p>
        </div>
    `;

    // Add spin animation
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);

    document.body.appendChild(loadingOverlay);

    // Remove loading overlay
    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            if (loadingOverlay.parentNode) {
                loadingOverlay.parentNode.removeChild(loadingOverlay);
            }
        }, 800);
    }, 1500);
}

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #1B5E20, #4CAF50);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = Math.min(scrolled, 100) + '%';
    }, { passive: true });
}

function initImageEffects() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading effect for images
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }

        // Add hover effects to images
        img.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.3s ease';
            }
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Optimize scroll events
    let scrolling = false;
    window.addEventListener('scroll', () => {
        if (!scrolling) {
            requestAnimationFrame(() => {
                scrolling = false;
            });
            scrolling = true;
        }
    }, { passive: true });

    // Preload critical resources
    const criticalLinks = document.querySelectorAll('a[href^="#"]');
    criticalLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.style.willChange = 'transform, opacity';
                setTimeout(() => {
                    targetElement.style.willChange = 'auto';
                }, 1000);
            }
        });
    });
}

// Enhanced Accessibility
function initAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#hero';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -100px;
        left: 20px;
        background: #1B5E20;
        color: white;
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `;
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '20px';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-100px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Keyboard navigation
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');

    if (navToggle && navClose) {
        navToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navToggle.click();
                setTimeout(() => navClose.focus(), 100);
            }
        });

        navClose.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navClose.click();
                navToggle.focus();
            }
        });
    }
}

// Utility Functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        z-index: 10000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: 'Source Sans Pro', sans-serif;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Contact button enhancements
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="mailto:"]')) {
        showNotification('Opening email client...', 'success');
        console.log('📧 Contact initiated:', e.target.href);
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('🚨 JavaScript error:', e.error);
});

// Page visibility optimization
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
    } else {
        document.body.style.animationPlayState = 'running';
    }
});

// Touch device optimization
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// Initialize hero animations on load
window.addEventListener('load', function() {
    // Trigger hero animations
    const heroContent = document.querySelector('.hero__content');
    const heroVisual = document.querySelector('.hero__visual');
    
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }
    
    if (heroVisual) {
        heroVisual.style.opacity = '1';
        heroVisual.style.transform = 'translateX(0)';
    }
    
    // Start counter animations after a brief delay
    setTimeout(() => {
        const event = new Event('scroll');
        window.dispatchEvent(event);
    }, 1000);
});

console.log('🚀 All systems initialized successfully!');
console.log('🌱 Tarunati Industries - Moving towards sustainable growth!');
console.log('💎 Premium experience with enhanced functionality loaded!');