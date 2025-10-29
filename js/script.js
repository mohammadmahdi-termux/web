// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(error => {
                console.warn('SW registration failed: ', error);
            });
    });
}

// Offline/Online Detection
const offlineMsg = document.getElementById('offlineMsg');
window.addEventListener('online', () => {
    offlineMsg.style.display = 'none';
});
window.addEventListener('offline', () => {
    offlineMsg.style.display = 'block';
});

// Language Toggle Function with URL param
function toggleLanguage() {
    const body = document.body;
    const baseUrl = window.location.origin + window.location.pathname;
    if (body.classList.contains('en')) {
        body.classList.remove('en');
        body.classList.add('fa');
        localStorage.setItem('language', 'fa');
        history.pushState(null, null, baseUrl + '?lang=fa');
        document.querySelector('meta[property="og:locale"]').setAttribute('content', 'fa_IR');
    } else {
        body.classList.remove('fa');
        body.classList.add('en');
        localStorage.setItem('language', 'en');
        history.pushState(null, null, baseUrl + '?lang=en');
        document.querySelector('meta[property="og:locale"]').setAttribute('content', 'en_US');
    }
    const button = document.querySelector('.language-toggle');
    button.textContent = body.classList.contains('en') ? 'EN/FA' : 'FA/EN';
    // Update offline message language
    const enMsg = offlineMsg.querySelector('.lang-en');
    const faMsg = offlineMsg.querySelector('.lang-fa');
    if (body.classList.contains('en')) {
        enMsg.style.display = 'inline';
        faMsg.style.display = 'none';
    } else {
        enMsg.style.display = 'none';
        faMsg.style.display = 'inline';
    }
}

// Load saved language or from URL param
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const savedLang = localStorage.getItem('language') || urlLang || 'en';
    
    document.body.classList.add(savedLang);
    const button = document.querySelector('.language-toggle');
    button.textContent = savedLang === 'en' ? 'EN/FA' : 'FA/EN';
    
    document.querySelector('meta[property="og:locale"]').setAttribute('content', savedLang === 'en' ? 'en_US' : 'fa_IR');
    
    // Set offline message language
    const enMsg = offlineMsg.querySelector('.lang-en');
    const faMsg = offlineMsg.querySelector('.lang-fa');
    if (savedLang === 'en') {
        enMsg.style.display = 'inline';
        faMsg.style.display = 'none';
    } else {
        enMsg.style.display = 'none';
        faMsg.style.display = 'inline';
    }
});

// Animations on load
window.addEventListener('load', function() {
    // Paragraphs animation
    const paragraphs = document.querySelectorAll('.about-section p');
    paragraphs.forEach((p, index) => {
        p.style.opacity = '0';
        p.style.transform = 'translateX(20px)';
        setTimeout(() => {
            p.style.transition = `all 0.6s ease ${index * 0.2}s`;
            p.style.opacity = '1';
            p.style.transform = 'translateX(0)';
        }, 300 + (index * 100));
    });

    // Learning journey
    const learningJourney = document.querySelector('.learning-journey');
    if (learningJourney) {
        learningJourney.style.opacity = '0';
        learningJourney.style.transform = 'translateY(20px)';
        setTimeout(() => {
            learningJourney.style.transition = 'all 0.6s ease 0.6s';
            learningJourney.style.opacity = '1';
            learningJourney.style.transform = 'translateY(0)';
        }, 300);
    }

    // Projects cards stagger animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(20px)';
        setTimeout(() => {
            card.style.transition = `all 0.5s ease ${index * 0.2 + 0.8}s`;
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 300);
    });

    // Skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(15px)';
        setTimeout(() => {
            tag.style.transition = `all 0.4s ease ${index * 0.1 + 1.2}s`;
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, 300);
    });

    // Social links
    document.querySelectorAll('.social-links a').forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        setTimeout(() => {
            link.style.transition = `all 0.4s ease ${index * 0.1 + 1.6}s`;
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 300);

        // Click handlers
        link.addEventListener('click', function(e) {
            if (this.classList.contains('email')) {
                e.preventDefault();
                handleEmailClick(this);
                return;
            }
            this.style.transform = 'scale(0.95) translateY(-3px)';
            this.style.transition = 'transform 0.1s ease';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px) scale(1.05)';
                this.style.transition = 'transform 0.2s ease';
            }, 100);
            setTimeout(() => {
                this.style.transform = '';
                this.style.transition = 'all 0.3s ease';
            }, 300);

            const platform = this.classList[1];
            const titles = {
                'telegram': 'Opening Telegram...',
                'github': 'Opening GitHub...',
                'instagram': 'Opening Instagram...',
                'email': 'Email copied to clipboard!'
            };
            const originalTitle = this.title;
            this.title = titles[platform] || 'Opening...';
            setTimeout(() => {
                this.title = originalTitle;
            }, 1500);
        });

        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Skill interactions
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        });
        tag.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 0 2px #fff, 0 6px 20px rgba(0, 0, 0, 0.3)';
        });
        tag.addEventListener('blur', function() {
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        });
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.skill-tooltip').forEach(tt => tt.remove());
            const level = this.classList.contains('beginner') ? 'Beginner' : 'Intermediate';
            const tooltip = document.createElement('div');
            tooltip.className = 'skill-tooltip';
            tooltip.textContent = `Level: ${level}`;
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.75rem;
                z-index: 1000;
                pointer-events: none;
                white-space: nowrap;
                top: -30px;
                left: 50%;
                transform: translateX(-50%);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            `;
            this.parentNode.appendChild(tooltip);
            setTimeout(() => {
                if (tooltip.parentNode) tooltip.parentNode.removeChild(tooltip);
            }, 2000);
        });
    });

    // Email function
    function handleEmailClick(link) {
        const email = 'mohammadmahditermux@gmail.com';
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(email).then(() => {
                showEmailFeedback(link, 'Email copied! (Ctrl+V to paste)');
                window.location.href = `mailto:${email}`;
            }).catch(err => {
                console.warn('Clipboard failed:', err);
                showEmailFeedback(link, 'Opening email client');
                window.location.href = `mailto:${email}`;
            });
        } else {
            try {
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showEmailFeedback(link, 'Email copied! (Ctrl+V to paste)');
            } catch (err) {
                console.warn('Fallback copy failed:', err);
                showEmailFeedback(link, 'Opening email client');
            }
            window.location.href = `mailto:${email}`;
        }
    }

    function showEmailFeedback(link, message) {
        const originalTitle = link.title;
        const originalBackground = window.getComputedStyle(link).background;
        link.title = message;
        link.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        link.style.transform = 'scale(1.1) translateY(-3px)';
        setTimeout(() => {
            link.title = originalTitle;
            link.style.background = originalBackground;
            link.style.transform = '';
        }, 2000);
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Error handling
    window.addEventListener('error', function(e) {
        console.error('Global error:', e.error);
    });

    // Performance mark
    if (window.performance && window.performance.mark) {
        window.performance.mark('page-load-end');
        console.log('Page loaded successfully - PWA ready!');
    }
});

// Intersection Observer for scroll animations
if ('IntersectionObserver' in window) {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.about-section, .social-links, .education-badge, .projects-section');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}