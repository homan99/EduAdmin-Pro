// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navButtons = document.querySelector('.nav-buttons');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('mobile-open');
        navButtons.classList.toggle('mobile-open');
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('mobile-open')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('mobile-open');
                navButtons.classList.remove('mobile-open');
            }
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Form Submission Handler
const demoForm = document.getElementById('demo-form');

if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = demoForm.querySelector('input[type="email"]').value;

        // Simulate form submission
        const button = demoForm.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Submitting...';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = 'Success!';
            button.style.background = '#10b981';
            demoForm.querySelector('input').value = '';

            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.disabled = false;
            }, 2000);
        }, 1000);
    });
}

// Intersection Observer for Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards and other animated elements
document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .benefit-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
});

// Add animation class styles dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.5s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .nav-links.mobile-open,
    .nav-buttons.mobile-open {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 72px;
        left: 0;
        right: 0;
        background: white;
        padding: 24px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .nav-links.mobile-open {
        gap: 16px;
    }

    .nav-buttons.mobile-open {
        top: auto;
        padding-top: 0;
        box-shadow: none;
    }

    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }

    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Counter Animation for Stats
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };

    updateCounter();
};

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('K') || text.includes('M')) {
                    // Skip complex numbers, keep original
                } else if (text.includes('%')) {
                    // Animate percentage
                    const num = parseFloat(text);
                    animateCounter(stat, num, 1500);
                    stat.textContent = '0%';
                    setTimeout(() => {
                        stat.textContent = text;
                    }, 1500);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Add hover effect to pricing cards
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        document.querySelectorAll('.pricing-card').forEach(c => {
            if (c !== card) {
                c.style.transform = 'scale(0.98)';
                c.style.opacity = '0.7';
            }
        });
    });

    card.addEventListener('mouseleave', () => {
        document.querySelectorAll('.pricing-card').forEach(c => {
            c.style.transform = '';
            c.style.opacity = '';
        });
    });
});

console.log('EduAdmin Pro - Website loaded successfully');

// ============================================
// PHASE 1: ENHANCED INTERACTIONS
// ============================================

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    const heroContent = document.querySelector('.hero-content');

    if (heroImage && scrolled < 800) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    if (heroContent && scrolled < 800) {
        heroContent.style.transform = `translateY(${scrolled * -0.1}px)`;
    }
});

// Enhanced Scroll Reveal with Intersection Observer
const revealElements = document.querySelectorAll('.benefits-content, .cta-content');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    revealObserver.observe(el);
});

// Interactive Dashboard Preview
const dashboardPreview = document.querySelector('.dashboard-preview');
if (dashboardPreview) {
    dashboardPreview.addEventListener('mousemove', (e) => {
        const rect = dashboardPreview.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        // Simplified hover - just a subtle lift
        dashboardPreview.style.transform = 'translateY(-4px) scale(1.01)';
    });

    dashboardPreview.addEventListener('mouseleave', () => {
        dashboardPreview.style.transform = '';
    });
}

// Animated Number Counters for Stats (Enhanced)
const animateValue = (element, start, end, duration) => {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = Math.round(end).toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current).toLocaleString();
        }
    }, 16);
};

// Trigger number animation on scroll
const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const text = element.getAttribute('data-count') || element.textContent;
            const number = parseInt(text.replace(/[^0-9]/g, ''));

            if (!isNaN(number)) {
                element.textContent = '0';
                setTimeout(() => {
                    animateValue(element, 0, number, 2000);
                }, 200);
            }

            numberObserver.unobserve(element);
        }
    });
}, { threshold: 0.5 });

// Observe stat numbers
document.querySelectorAll('.dash-card-number').forEach(el => {
    el.setAttribute('data-count', el.textContent);
    numberObserver.observe(el);
});

// Smooth Active Navigation Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinkElements = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinkElements.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active class style
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-links a.active {
        color: var(--primary);
    }
`;
document.head.appendChild(activeStyle);

// Button Click Ripple Effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple effect style
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Loading Progress Bar
window.addEventListener('load', () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: var(--gradient);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.3s ease;
        z-index: 9999;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight);
        progressBar.style.transform = `scaleX(${scrolled})`;
    });
});

console.log('🎨 Enhanced design features loaded');


// ============================================
// PHASE 2: FAQ ACCORDION FUNCTIONALITY
// ============================================

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
           faqItem.classList.add('active');
        }
    });
});

console.log('?? Phase 2: New sections loaded');

// ============================================
// PHASE 5: CONTACT FORM VALIDATION
// ============================================

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            school: document.getElementById('school').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$;
        if (!emailRegex.test(formData.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Validate message length
        if (formData.message.length < 10) {
            showFormMessage('Please provide a more detailed message (at least 10 characters).', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (in production, send to your backend)
        setTimeout(() => {
            // Success message
            showFormMessage('Thank you! Your message has been sent. We\'ll get back to you within 24 hours.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Log to analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'Contact',
                    'event_label': formData.subject
                });
            }
        }, 1500);
    });
}

// Show form message helper
function showFormMessage(message, type) {
    // Remove existing message
    const existingMsg = document.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();
    
    // Create message element
    const msgDiv = document.createElement('div');
    msgDiv.className = orm-message form-message-;
    msgDiv.textContent = message;
    
    // Insert before form
    contactForm.insertAdjacentElement('beforebegin', msgDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        msgDiv.remove();
    }, 5000);
}

// Newsletter Form Handler
const newsletterForms = document.querySelectorAll('.cta-form');
newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show success
        const btn = form.querySelector('.btn');
        const originalText = btn.textContent;
        btn.textContent = 'Subscribed! ?';
        btn.style.background = '#10b981';
        emailInput.value = '';
        
        // Log to analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_signup', {
                'event_category': 'Newsletter'
            });
        }
        
        // Reset button after 3 seconds
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 3000);
    });
});

console.log('?? Phase 5: Form handlers loaded');
