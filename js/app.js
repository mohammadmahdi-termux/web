/**
 * Mohammad Mahdi Portfolio - Main Application (No Loading Version)
 * Interactive Portfolio with Immediate Load
 * Built with Vanilla JavaScript ES6+
 */

class PortfolioApp {
    constructor() {
        // Core state - No loading state
        this.currentSection = 0;
        this.theme = this.getInitialTheme();
        this.typingComplete = false;
        this.formSubmitted = false;
        this.statsAnimated = false;
        this.elements = {};
        
        console.log('🚀 Initializing Mohammad Mahdi\'s Portfolio - Immediate Load Mode...');
        this.init();
    }

    // Get initial theme from storage or system preference
    getInitialTheme() {
        try {
            const savedTheme = localStorage.getItem('portfolio-theme');
            if (savedTheme) return savedTheme;
            
            // Use system preference
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
                ? 'dark' : 'light';
        } catch (error) {
            console.warn('Theme detection failed, defaulting to light:', error);
            return 'light';
        }
    }

    // Main initialization - Immediate start
    init() {
        try {
            // Set theme immediately
            this.setTheme(this.theme);
            
            // Cache DOM elements
            this.cacheElements();
            
            // Setup core functionality immediately
            this.setupEventListeners();
            this.setupNavigation();
            this.setupAnimations();
            this.setupForm();
            this.setupStatsCounter();
            this.setupProgressBars();
            this.setupInteractivity();
            this.setupKeyboardShortcuts();
            
            // Initialize nebula background immediately
            this.initNebula();
            
            // Start typing animation right away
            this.startTypingAnimation();
            
            console.log('✅ Portfolio initialized successfully - No loading delays!');
            
            // Trigger entrance animations immediately
            this.triggerEntranceAnimations();
            
            // Setup performance monitoring
            this.setupPerformanceMonitoring();
            
        } catch (error) {
            console.error('❌ Portfolio initialization failed:', error);
            this.showNotification(
                '⚠️ Portfolio loaded with limited functionality. Please refresh if issues persist.',
                'error'
            );
        }
    }

    // Cache DOM elements safely (No loading elements)
    cacheElements() {
        const selectors = {
            themeToggle: '#themeToggle',
            themeIcon: '#themeIcon',
            nameElement: '#nameElement',
            navDots: '.nav-dot',
            contentSections: '.content-section',
            contactForm: '#contactForm',
            submitButton: '#submitButton',
            statNumbers: '[data-count]',
            progressBars: '.progress-bar'
        };
        
        // Cache single elements
        Object.entries(selectors).forEach(([key, selector]) => {
            try {
                this.elements[key] = document.querySelector(selector);
            } catch (error) {
                console.warn(`Element not found: ${selector}`);
                this.elements[key] = null;
            }
        });
        
        // Cache multiple elements
        this.elements.navDots = document.querySelectorAll('.nav-dot') || [];
        this.elements.contentSections = document.querySelectorAll('.content-section') || [];
        this.elements.statNumbers = document.querySelectorAll('[data-count]') || [];
        this.elements.progressBars = document.querySelectorAll('.progress-bar') || [];
        
        console.log('📦 DOM elements cached:', Object.keys(this.elements).filter(key => this.elements[key]));
    }

    // Set theme and update UI
    setTheme(theme) {
        try {
            document.documentElement.setAttribute('data-theme', theme);
            this.theme = theme;
            
            // Update theme icon
            const icon = this.elements.themeIcon;
            if (icon) {
                icon.textContent = theme === 'dark' ? '☀️' : '🌙';
                icon.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
            }
            
            // Update root styles for dynamic theme
            const root = document.documentElement;
            const styles = {
                '--bg-primary': theme === 'dark' ? '#0a0a0a' : '#f8fafc',
                '--text-primary': theme === 'dark' ? '#ffffff' : '#1e293b',
                '--bg-surface': theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
                '--border-color': theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'
            };
            
            Object.entries(styles).forEach(([property, value]) => {
                root.style.setProperty(property, value);
            });
            
            // Store preference
            localStorage.setItem('portfolio-theme', theme);
            
            // Update nebula theme immediately
            if (window.CosmicNebula?.instance) {
                window.CosmicNebula.instance.setTheme(theme);
            }
            
            console.log(`🎨 Theme set to: ${theme}`);
            
        } catch (error) {
            console.error('Theme setting failed:', error);
        }
    }

    // Core event listeners
    setupEventListeners() {
        // Theme toggle
        const themeToggle = this.elements.themeToggle;
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleTheme();
            });
            
            // Keyboard support
            themeToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleTheme();
                }
            });
        }

        // Window events
        const debouncedResize = this.debounce(this.handleResize.bind(this), 250);
        window.addEventListener('resize', debouncedResize);
        window.addEventListener('orientationchange', debouncedResize);
        
        // System theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                if (!localStorage.getItem('portfolio-theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }

        // Prevent context menu on interactive elements
        document.addEventListener('contextmenu', (e) => {
            const interactive = e.target.closest('.project-card, .skill-card, .timeline-item, .social-link, .goal-card');
            if (interactive) {
                e.preventDefault();
            }
        }, { passive: false });

        // Page visibility for performance
        document.addEventListener('visibilitychange', () => {
            if (window.CosmicNebula?.instance) {
                if (document.hidden) {
                    window.CosmicNebula.instance.pause();
                } else {
                    window.CosmicNebula.instance.resume();
                }
            }
        });

        // Global error handling
        window.addEventListener('error', this.handleGlobalError.bind(this));
        window.addEventListener('unhandledrejection', this.handlePromiseError.bind(this));
    }

    // Toggle theme
    toggleTheme() {
        const newTheme = this.theme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        
        // User feedback
        const action = newTheme === 'dark' ? 'Dark' : 'Light';
        this.showNotification(`🌙 Theme switched to ${action} Mode`, 'info', 2000);
    }

    // Initialize nebula background safely - Immediate
    initNebula() {
        if (typeof CosmicNebula === 'function') {
            try {
                window.CosmicNebula = window.CosmicNebula || {};
                window.CosmicNebula.instance = new CosmicNebula();
                console.log('🌌 Cosmic Nebula initialized immediately');
            } catch (error) {
                console.warn('Nebula initialization failed:', error);
                this.initFallbackParticles();
            }
        } else {
            console.log('🌟 Using fallback particles immediately');
            this.initFallbackParticles();
        }
    }

    // Simple fallback particles - Immediate render
    initFallbackParticles() {
        const canvas = document.getElementById('nebulaCanvas');
        if (!canvas) return;
        
        try {
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            const particles = [];
            const particleCount = Math.min(60, Math.floor(window.innerWidth / 20));
            
            // Create particles
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.8,
                    vy: (Math.random() - 0.5) * 0.8,
                    radius: Math.random() * 2.5 + 1,
                    opacity: Math.random() * 0.4 + 0.2,
                    hue: Math.random() * 60 + 200
                });
            }
            
            // Animation loop - Start immediately
            const animate = () => {
                // Clear with fade
                ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                particles.forEach(particle => {
                    // Update position
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    // Bounce off edges
                    if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
                    if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;
                    
                    // Draw particle
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                    ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`;
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = `hsla(${particle.hue}, 70%, 60%, 0.5)`;
                    ctx.fill();
                });
                
                ctx.shadowBlur = 0;
                requestAnimationFrame(animate);
            };
            
            animate();
            console.log('⭐ Fallback particles active immediately');
            
        } catch (error) {
            console.error('Fallback particles failed:', error);
        }
    }

    // Navigation setup
    setupNavigation() {
        const navDots = this.elements.navDots;
        const sections = this.elements.contentSections;
        
        if (!navDots.length || !sections.length) {
            console.warn('Navigation setup incomplete');
            return;
        }
        
        // Click handlers
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.switchSection(index);
            });
            
            // Keyboard navigation
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    this.switchSection(index);
                }
            });
            
            // Tooltip support
            dot.addEventListener('mouseenter', () => {
                const tooltip = dot.getAttribute('data-tooltip');
                if (tooltip) {
                    this.showTooltip(dot, tooltip);
                }
            });
            
            dot.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });

        // Keyboard navigation (arrow keys)
        document.addEventListener('keydown', (e) => {
            // Only navigate if focused on nav or no input active
            if (e.target.closest('.nav-dots, .contact-form') || 
                e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || 
                e.target.tagName === 'SELECT') {
                return;
            }
            
            const currentIndex = this.currentSection;
            let nextIndex = currentIndex;
            
            switch(e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    nextIndex = Math.max(0, currentIndex - 1);
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    nextIndex = Math.min(sections.length - 1, currentIndex + 1);
                    break;
                case 'Home':
                    e.preventDefault();
                    nextIndex = 0;
                    break;
                case 'End':
                    e.preventDefault();
                    nextIndex = sections.length - 1;
                    break;
            }
            
            if (nextIndex !== currentIndex) {
                this.switchSection(nextIndex);
                if (navDots[nextIndex]) {
                    navDots[nextIndex].focus({ preventScroll: true });
                }
            }
        });

        // Number shortcuts (Ctrl+1-5)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && !e.target.closest('input, textarea, select') &&
                e.key >= '1' && e.key <= '5') {
                e.preventDefault();
                const index = parseInt(e.key) - 1;
                this.switchSection(index);
                if (navDots[index]) {
                    navDots[index].focus();
                }
            }
        });

        // Hash navigation
        window.addEventListener('hashchange', (e) => {
            const hash = window.location.hash.substring(1).toLowerCase();
            const sectionMap = {
                'about': 0, 'skills': 1, 'journey': 2, 
                'projects': 3, 'connect': 4
            };
            
            const targetIndex = sectionMap[hash];
            if (targetIndex !== undefined && targetIndex !== this.currentSection) {
                this.switchSection(targetIndex);
            }
        });

        console.log(`🧭 Navigation ready - ${sections.length} sections`);
    }

    // Switch sections smoothly
    switchSection(index) {
        const sections = this.elements.contentSections;
        const navDots = this.elements.navDots;
        
        if (index < 0 || index >= sections.length || index === this.currentSection) {
            return false;
        }

        const oldIndex = this.currentSection;
        this.currentSection = index;
        const sectionNames = ['About', 'Skills', 'Journey', 'Projects', 'Connect'];
        
        try {
            // Update navigation dots
            navDots.forEach((dot, i) => {
                const isActive = i === index;
                dot.classList.toggle('nav-dot--active', isActive);
                dot.setAttribute('aria-selected', isActive.toString());
                dot.setAttribute('tabindex', isActive ? '0' : '-1');
                
                if (isActive) {
                    dot.focus({ preventScroll: true });
                }
            });
            
            // Update content sections
            sections.forEach((section, i) => {
                const isActive = i === index;
                
                if (isActive) {
                    section.style.display = 'block';
                    section.classList.add('content-section--active');
                    section.setAttribute('aria-hidden', 'false');
                    section.setAttribute('tabindex', '-1');
                    
                    // Scroll to top
                    section.scrollTop = 0;
                    
                    // Animate section immediately
                    this.animateSection(section, i);
                    
                    // Update URL
                    const hash = sectionNames[i].toLowerCase();
                    if (window.location.hash !== `#${hash}`) {
                        window.history.replaceState(null, '', `#${hash}`);
                    }
                    
                } else {
                    section.classList.remove('content-section--active');
                    section.style.display = 'none';
                    section.setAttribute('aria-hidden', 'true');
                }
            });
            
            // Update nebula intensity for projects section
            if (window.CosmicNebula?.instance && index === 3) {
                window.CosmicNebula.instance.setIntensity(1.3);
            } else if (window.CosmicNebula?.instance) {
                window.CosmicNebula.instance.setIntensity(1.0);
            }
            
            console.log(`📄 Switched to: ${sectionNames[index]} (${index})`);
            return true;
            
        } catch (error) {
            console.error('Section switch failed:', error);
            return false;
        }
    }

    // Animate section entrance - Immediate
    animateSection(section, index) {
        try {
            // Reset animations
            const animatedElements = section.querySelectorAll(
                '.timeline-item, .skill-card, .project-card, .goal-card, .activity-item, .interest-item, .focus-item'
            );
            
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'none';
            });
            
            // Staggered entrance - Start immediately
            animatedElements.forEach((el, i) => {
                requestAnimationFrame(() => {
                    el.style.transition = `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s`;
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0) scale(1)';
                    
                    // Specific animations
                    if (el.classList.contains('timeline-item')) {
                        el.classList.add('animate');
                    }
                    
                    // Progress bars
                    const progressBars = el.querySelectorAll('.progress-bar');
                    progressBars.forEach((bar, j) => {
                        setTimeout(() => this.animateProgressBar(bar), i * 100 + j * 150);
                    });
                });
            });
            
            // Section header animation - Immediate
            const header = section.querySelector('.section-title');
            if (header) {
                header.style.opacity = '0';
                header.style.transform = 'translateY(-20px)';
                requestAnimationFrame(() => {
                    header.style.transition = 'all 0.6s ease 0.2s';
                    header.style.opacity = '1';
                    header.style.transform = 'translateY(0)';
                });
            }
            
            // Intro text animation
            const intro = section.querySelector('.intro-text');
            if (intro) {
                intro.style.opacity = '0';
                intro.style.transform = 'translateX(-20px)';
                requestAnimationFrame(() => {
                    intro.style.transition = 'all 0.6s ease 0.4s';
                    intro.style.opacity = '1';
                    intro.style.transform = 'translateX(0)';
                });
            }
            
        } catch (error) {
            console.error('Section animation failed:', error);
        }
    }

    // Animate single progress bar
    animateProgressBar(bar) {
        if (!bar || bar.classList.contains('animated')) return;
        
        try {
            const target = parseFloat(bar.getAttribute('data-progress')) || 0;
            bar.style.width = '0%';
            bar.classList.add('animated');
            
            requestAnimationFrame(() => {
                bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                bar.style.width = `${target}%`;
                
                // Update ARIA
                bar.setAttribute('aria-valuenow', target);
                
                // Glow effect
                bar.style.boxShadow = `0 0 12px rgba(76, 175, 80, 0.6)`;
                setTimeout(() => {
                    bar.style.boxShadow = '';
                }, 800);
                
                // Update text
                const container = bar.closest('.skill-card, .progress-container');
                const textEl = container?.querySelector('.progress-value');
                if (textEl) {
                    textEl.style.opacity = '0';
                    textEl.style.transform = 'translateX(-10px)';
                    setTimeout(() => {
                        textEl.textContent = `${Math.round(target)}%`;
                        textEl.style.transition = 'all 0.3s ease';
                        textEl.style.opacity = '1';
                        textEl.style.transform = 'translateX(0)';
                    }, 300);
                }
            });
            
        } catch (error) {
            console.error('Progress bar animation failed:', error);
        }
    }

    // Setup progress bars with Intersection Observer - Immediate
    setupProgressBars() {
        const bars = this.elements.progressBars;
        if (!bars.length) return;
        
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -20% 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    if (!bar.classList.contains('animated')) {
                        setTimeout(() => this.animateProgressBar(bar), 200);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        bars.forEach(bar => observer.observe(bar));
        console.log(`📊 ${bars.length} progress bars ready - Immediate animation`);
    }

    // Setup animated counters - Immediate on init
    setupStatsCounter() {
        const counters = this.elements.statNumbers;
        if (!counters.length) return;
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.statsAnimated) {
                    this.animateCounters();
                    this.statsAnimated = true;
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Find stats containers
        const statsContainers = document.querySelectorAll('.profile-stats, .project-stats-summary, .stats-grid');
        if (statsContainers.length) {
            statsContainers.forEach(container => observer.observe(container));
        } else {
            // Immediate fallback: animate on init
            this.animateCounters();
        }
    }

    // Animate counters smoothly - Immediate
    animateCounters() {
        const counters = this.elements.statNumbers;
        counters.forEach(counter => {
            try {
                const target = parseInt(counter.dataset.count) || 0;
                const duration = 2000; // 2 seconds
                const startTime = performance.now();
                let current = 0;
                
                const animate = (timestamp) => {
                    const elapsed = timestamp - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3); // Ease out cubic
                    
                    current = Math.floor(target * easeOut);
                    counter.textContent = current.toLocaleString();
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };
                
                requestAnimationFrame(animate);
            } catch (error) {
                console.error('Counter animation failed:', error);
                counter.textContent = counter.dataset.count || '0';
            }
        });
        
        console.log('🔢 Counters animated immediately');
    }

    // Form setup (bug-free version) - Immediate
    setupForm() {
        const form = this.elements.contactForm;
        if (!form) {
            console.warn('Contact form not found');
            return;
        }
        
        // Form events
        form.addEventListener('submit', this.handleFormSubmit.bind(this));
        form.addEventListener('reset', this.handleFormReset.bind(this));
        
        // Character counter
        const messageField = form.querySelector('#contactMessage');
        const charCounter = form.querySelector('.char-counter');
        
        if (messageField && charCounter) {
            const updateCounter = (e) => {
                const length = e.target.value.length;
                charCounter.textContent = `${length}/500`;
                
                // Color coding
                const rootStyles = getComputedStyle(document.documentElement);
                const textMuted = rootStyles.getPropertyValue('--text-muted').trim();
                
                if (length > 450) {
                    charCounter.style.color = '#ff6b6b';
                } else if (length > 400) {
                    charCounter.style.color = '#ffd700';
                } else {
                    charCounter.style.color = textMuted || '#a0aec0';
                }
                
                this.toggleSubmitButton();
            };
            
            messageField.addEventListener('input', updateCounter);
            messageField.addEventListener('paste', (e) => {
                setTimeout(() => updateCounter(e), 10);
            });
            
            // Initial state
            updateCounter({ target: { value: '' } });
        }
        
        // Real-time validation for all fields
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            ['input', 'change', 'blur'].forEach(eventType => {
                field.addEventListener(eventType, this.toggleSubmitButton.bind(this));
            });
            
            // Custom validation styling
            field.addEventListener('invalid', (e) => {
                e.preventDefault();
                this.showFieldError(field);
            });
            
            field.addEventListener('input', (e) => {
                if (e.target.validity.valid) {
                    this.hideFieldError(e.target);
                }
            });
        });
        
        // Select dropdown enhancement
        const selectField = form.querySelector('#contactSubject');
        if (selectField) {
            selectField.addEventListener('focus', () => {
                selectField.parentElement.classList.add('focused');
            });
            selectField.addEventListener('blur', () => {
                selectField.parentElement.classList.remove('focused');
            });
        }
        
        // Initial validation - Immediate
        this.toggleSubmitButton();
        console.log('📝 Form validation ready immediately');
    }

    // Toggle submit button state
    toggleSubmitButton() {
        const form = this.elements.contactForm;
        const submitBtn = this.elements.submitButton;
        
        if (!form || !submitBtn) return;
        
        const isValid = form.checkValidity();
        const messageField = form.querySelector('#contactMessage');
        const hasMessage = messageField ? messageField.value.trim().length >= 10 : false;
        
        const canSubmit = isValid && hasMessage;
        
        // Update button
        submitBtn.disabled = !canSubmit;
        submitBtn.classList.toggle('valid', canSubmit);
        submitBtn.classList.toggle('disabled', !canSubmit);
        submitBtn.classList.remove('loading');
        
        // Update text and ARIA
        const buttonText = submitBtn.querySelector('.button-text');
        if (buttonText) {
            buttonText.textContent = canSubmit ? 'Send Message' : 
                                   hasMessage ? 'Complete fields' : 'Add message (10+ chars)';
        }
        
        submitBtn.setAttribute('aria-disabled', (!canSubmit).toString());
        submitBtn.setAttribute('aria-label', 
            canSubmit ? 'Send contact message (form valid)' :
            !hasMessage ? 'Add message (minimum 10 characters required)' :
            'Complete all required fields'
        );
    }

    // Form submission handler
    async handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = this.elements.submitButton;
        const messageField = form.querySelector('#contactMessage');
        
        // Final validation
        if (!form.checkValidity() || !messageField || messageField.value.trim().length < 10) {
            this.showNotification(
                '⚠️ Please complete all fields and write a message (10+ characters)',
                'warning'
            );
            if (messageField && messageField.value.trim().length < 10) {
                messageField.focus();
            }
            return;
        }
        
        // Loading state
        const originalText = submitBtn.querySelector('.button-text')?.textContent || 'Send Message';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.classList.remove('valid', 'disabled');
        
        if (submitBtn.querySelector('.button-text')) {
            submitBtn.querySelector('.button-text').textContent = 'Sending...';
        }
        
        const successEl = document.getElementById('formSuccess');
        const errorEl = document.getElementById('formError');
        
        try {
            // Simulate API call (replace with real endpoint)
            await this.submitFormData(new FormData(form));
            
            // Success
            if (successEl) {
                successEl.style.display = 'flex';
                successEl.classList.add('show');
                successEl.setAttribute('aria-hidden', 'false');
            }
            
            // Hide error
            if (errorEl && errorEl.style.display !== 'none') {
                errorEl.style.display = 'none';
                errorEl.classList.remove('show');
                errorEl.setAttribute('aria-hidden', 'true');
            }
            
            // Reset form
            form.reset();
            this.updateCharCounter(0);
            
            // Analytics
            this.trackEvent('form_submit', 'contact', 'success');
            
            this.showNotification(
                '✅ Message sent successfully! I\'ll respond within 48 hours.',
                'success'
            );
            
        } catch (error) {
            console.error('Form submission failed:', error);
            
            // Show error
            if (errorEl) {
                errorEl.style.display = 'flex';
                errorEl.classList.add('show');
                errorEl.setAttribute('aria-hidden', 'false');
                errorEl.querySelector('.message-text').textContent = 
                    error.message || 'Failed to send message. Please try again or email me directly.';
            }
            
            // Hide success
            if (successEl && successEl.style.display !== 'none') {
                successEl.style.display = 'none';
                successEl.classList.remove('show');
                successEl.setAttribute('aria-hidden', 'true');
            }
            
            // Fallback notification
            this.showNotification(
                '📧 Message failed. Please email: mohammadmahditermux@gmail.com',
                'error'
            );
            
            // Analytics
            this.trackEvent('form_submit', 'contact', 'error');
            
        } finally {
            // Reset button state
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                submitBtn.classList.add(form.checkValidity() ? 'valid' : 'disabled');
                if (submitBtn.querySelector('.button-text')) {
                    submitBtn.querySelector('.button-text').textContent = originalText;
                }
            }, 2000);
            
            // Auto-hide messages
            setTimeout(() => {
                [successEl, errorEl].forEach(el => {
                    if (el && el.style.display !== 'none') {
                        el.style.display = 'none';
                        el.classList.remove('show');
                        el.setAttribute('aria-hidden', 'true');
                    }
                });
            }, 6000);
        }
    }

    // Submit form data (replace with real API)
    async submitFormData(formData) {
        // Simulate network delay
        await new Promise(resolve => 
            setTimeout(resolve, 1500 + Math.random() * 1000)
        );
        
        // Simulate 95% success rate
        if (Math.random() < 0.05) {
            throw new Error('Simulated server error - message queued for retry');
        }
        
        // Real implementation example:
        /*
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        return response.json();
        */
        
        console.log('📤 Form data submitted:', Object.fromEntries(formData));
        return { success: true, message: 'Message received successfully' };
    }

    // Form reset handler
    handleFormReset(e) {
        e.preventDefault();
        
        // Clear all field errors
        const fields = e.target.querySelectorAll('input, select, textarea');
        fields.forEach(field => this.hideFieldError(field));
        
        // Reset counter
        this.updateCharCounter(0);
        
        // Clear messages
        const section = e.target.closest('.contact-form-section');
        if (section) {
            const messages = section.querySelectorAll('.message');
            messages.forEach(msg => {
                msg.style.display = 'none';
                msg.classList.remove('show');
                msg.setAttribute('aria-hidden', 'true');
            });
        }
        
        // Reset button
        this.toggleSubmitButton();
        
        // Focus first field
        const firstField = e.target.querySelector('input:not([type="hidden"]), select');
        if (firstField) {
            firstField.focus();
        }
        
        this.showNotification('📝 Form reset - ready for new message', 'info', 2000);
    }

    // Update character counter
    updateCharCounter(count = 0) {
        const charCounter = document.querySelector('.char-counter');
        if (!charCounter) return;
        
        charCounter.textContent = `${count}/500`;
        
        const rootStyles = getComputedStyle(document.documentElement);
        const textMuted = rootStyles.getPropertyValue('--text-muted').trim();
        
        if (count > 450) {
            charCounter.style.color = '#ff6b6b';
        } else if (count > 400) {
            charCounter.style.color = '#ffd700';
        } else {
            charCounter.style.color = textMuted || '#a0aec0';
        }
    }

    // Show field-specific error
    showFieldError(field) {
        const parent = field.parentElement;
        if (!parent) return;
        
        // Remove existing error
        const existingError = parent.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create error element
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.setAttribute('role', 'alert');
        errorMsg.setAttribute('aria-live', 'polite');
        errorMsg.textContent = this.getValidationMessage(field);
        
        // Style error
        errorMsg.style.cssText = `
            position: absolute;
            bottom: -28px;
            left: 0;
            right: 0;
            background: rgba(244, 67, 54, 0.95);
            color: white;
            padding: 6px 10px;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 500;
            z-index: 10;
            opacity: 0;
            transform: translateY(4px);
            transition: all 0.2s ease;
            box-shadow: 0 2px 12px rgba(244, 67, 54, 0.4);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        `;
        
        parent.style.position = 'relative';
        parent.appendChild(errorMsg);
        
        // Animate in
        requestAnimationFrame(() => {
            errorMsg.style.opacity = '1';
            errorMsg.style.transform = 'translateY(0)';
        });
        
        // Auto-hide
        setTimeout(() => {
            if (errorMsg.parentNode) {
                errorMsg.style.opacity = '0';
                errorMsg.style.transform = 'translateY(4px)';
                setTimeout(() => {
                    if (errorMsg.parentNode) {
                        errorMsg.parentNode.removeChild(errorMsg);
                    }
                }, 200);
            }
        }, 4000);
    }

    // Hide field error
    hideFieldError(field) {
        const parent = field.parentElement;
        const errorMsg = parent ? parent.querySelector('.error-message') : null;
        if (errorMsg) {
            errorMsg.style.opacity = '0';
            errorMsg.style.transform = 'translateY(4px)';
            setTimeout(() => {
                if (errorMsg.parentNode) {
                    errorMsg.parentNode.removeChild(errorMsg);
                }
            }, 200);
        }
    }

    // Get validation message for field
    getValidationMessage(field) {
        const validity = field.validity;
        const fieldName = field.name || field.id || 'field';
        const value = field.value.trim();
        
        if (validity.valueMissing) {
            return `Please fill out the ${this.getFieldName(fieldName)}`;
        }
        
        if (validity.typeMismatch) {
            if (field.type === 'email') {
                return 'Please enter a valid email address';
            }
            if (field.type === 'url') {
                return 'Please enter a valid URL';
            }
            return 'Invalid format';
        }
        
        if (validity.patternMismatch) {
            return `Please match the requested ${this.getFieldName(fieldName)} format`;
        }
        
        if (field.type === 'select-one' && !value) {
            return `Please select a ${this.getFieldName(fieldName)}`;
        }
        
        if (field.id === 'contactMessage' && value.length < 10) {
            return 'Message must be at least 10 characters long';
        }
        
        if (validity.tooShort) {
            return `${this.getFieldName(fieldName)} is too short`;
        }
        
        if (validity.tooLong) {
            return `${this.getFieldName(fieldName)} is too long`;
        }
        
        return `Please check the ${this.getFieldName(fieldName)}`;
    }

    // Get friendly field name
    getFieldName(fieldName) {
        const nameMap = {
            'name': 'name',
            'contactName': 'name',
            'email': 'email address',
            'contactEmail': 'email address',
            'subject': 'subject',
            'contactSubject': 'subject',
            'message': 'message',
            'contactMessage': 'message'
        };
        return nameMap[fieldName.toLowerCase()] || fieldName;
    }

    // Typing animation for name - Immediate start
    startTypingAnimation() {
        const nameElement = this.elements.nameElement;
        if (!nameElement) return;
        
        const fullName = 'Mohammad Mahdi';
        let index = 0;
        nameElement.textContent = '';
        
        // Add cursor
        nameElement.style.borderRight = '2px solid var(--color-primary)';
        nameElement.style.overflow = 'hidden';
        
        const typeCharacter = () => {
            if (index < fullName.length) {
                nameElement.textContent += fullName.charAt(index);
                index++;
                setTimeout(typeCharacter, 120 + Math.random() * 80);
            } else {
                // Remove cursor and complete
                nameElement.style.borderRight = 'none';
                nameElement.style.overflow = '';
                
                // Completion effect
                nameElement.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    nameElement.style.transform = '';
                }, 300);
                
                this.typingComplete = true;
                this.onTypingComplete();
                
                console.log('✍️ Typing animation completed immediately');
            }
        };
        
        // Start immediately (no delay)
        typeCharacter();
    }

    // Actions after typing completes - Immediate
    onTypingComplete() {
        // Animate profile stats immediately
        this.animateProfileStats();
        
        // Show navigation immediately
        const navContainer = document.querySelector('.nav-dots');
        if (navContainer) {
            navContainer.style.opacity = '0';
            navContainer.style.transform = 'scale(0.8) translateY(10px)';
            requestAnimationFrame(() => {
                navContainer.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                navContainer.style.opacity = '1';
                navContainer.style.transform = 'scale(1) translateY(0)';
            });
        }
        
        // Focus first nav dot
        if (this.elements.navDots[0]) {
            this.elements.navDots[0].focus({ preventScroll: true });
        }
    }

    // Animate profile statistics - Immediate
    animateProfileStats() {
        const statsContainer = document.querySelector('.profile-stats');
        if (!statsContainer || this.statsAnimated) return;
        
        statsContainer.style.opacity = '0';
        statsContainer.style.transform = 'translateY(20px)';
        
        requestAnimationFrame(() => {
            statsContainer.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            statsContainer.style.opacity = '1';
            statsContainer.style.transform = 'translateY(0)';
            
            // Start counters after animation
            setTimeout(() => {
                if (!this.statsAnimated) {
                    this.animateCounters();
                }
            }, 400);
        });
    }

    // Setup interactive elements - Immediate
    setupInteractivity() {
        // Project cards
        document.querySelectorAll('.project-card').forEach((card, index) => {
            // Click to show details
            card.addEventListener('click', (e) => {
                if (e.target.closest('a, .project-links, .feature-tag')) return;
                
                e.preventDefault();
                this.createRippleEffect(e, card);
                this.showProjectDetails(index);
            });
            
            // Hover effects
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('focus-visible')) {
                    card.style.transform = 'translateY(-6px) scale(1.02)';
                    card.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
            
            // Keyboard support
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
            
            // Focus styling
            card.addEventListener('focus', () => card.classList.add('focus-visible'));
            card.addEventListener('blur', () => card.classList.remove('focus-visible'));
        });

        // Timeline interactions
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                const marker = item.querySelector('.timeline-marker');
                if (marker) {
                    marker.style.transform = 'scale(1.3)';
                    marker.style.transition = 'transform 0.2s ease';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const marker = item.querySelector('.timeline-marker');
                if (marker) {
                    marker.style.transform = 'scale(1)';
                }
            });
            
            // Click to expand/collapse details
            item.addEventListener('click', (e) => {
                if (e.target.closest('.timeline-achievements')) return;
                item.classList.toggle('expanded');
            });
        });

        // Social links
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const platform = this.getSocialPlatform(link);
                this.trackEvent('social_click', 'engagement', platform);
                
                // Copy email for email link
                if (link.classList.contains('social-link--email')) {
                    e.preventDefault();
                    if (this.copyEmail()) {
                        setTimeout(() => {
                            window.location.href = link.href;
                        }, 800);
                    }
                }
            });
            
            // Enhanced hover
            link.addEventListener('mouseenter', () => {
                const icon = link.querySelector('.social-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotateY(180deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            link.addEventListener('mouseleave', () => {
                const icon = link.querySelector('.social-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotateY(0deg)';
                }
            });
        });

        // Goal cards
        document.querySelectorAll('.goal-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                const number = card.querySelector('.goal-number');
                if (number) {
                    number.style.transform = 'scale(1.1) rotate(180deg)';
                    number.style.transition = 'transform 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const number = card.querySelector('.goal-number');
                if (number) {
                    number.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });

        // Skill cards hover
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.skill-icon');
                if (icon) {
                    icon.style.transform = 'rotateY(360deg) scale(1.1)';
                    icon.style.transition = 'transform 0.4s ease';
                }
                
                const progress = card.querySelector('.progress-bar');
                if (progress && !progress.classList.contains('animated')) {
                    this.animateProgressBar(progress);
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.skill-icon');
                if (icon) {
                    icon.style.transform = 'rotateY(0deg) scale(1)';
                }
            });
        });

        // Setup timeline animations
        this.setupTimelineAnimations();
        
        console.log('🎮 Interactivity setup complete immediately');
    }

    // Get social platform name
    getSocialPlatform(link) {
        const classList = link.className;
        if (classList.includes('telegram')) return 'Telegram';
        if (classList.includes('github')) return 'GitHub';
        if (classList.includes('instagram')) return 'Instagram';
        if (classList.includes('email')) return 'Email';
        return 'Social';
    }

    // Copy email to clipboard
    copyEmail() {
        const email = 'mohammadmahditermux@gmail.com';
        
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(email)
                .then(() => {
                    this.showNotification('📧 Email copied to clipboard!', 'success', 2000);
                    return true;
                })
                .catch((err) => {
                    console.warn('Clipboard failed:', err);
                    return this.fallbackCopy(email);
                });
        }
        
        return this.fallbackCopy(email);
    }

    // Fallback copy method
    fallbackCopy(email) {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = email;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            textArea.style.pointerEvents = 'none';
            document.body.appendChild(textArea);
            
            textArea.select();
            textArea.setSelectionRange(0, 99999);
            
            const success = document.execCommand('copy');
            document.body.removeChild(textArea);
            
            if (success) {
                this.showNotification('📧 Email copied!', 'success', 1500);
                return true;
            } else {
                this.showNotification(`📧 Copy manually: ${email}`, 'info', 3000);
                return false;
            }
        } catch (err) {
            console.error('Fallback copy failed:', err);
            this.showNotification(`📧 Please use: ${email}`, 'info', 3000);
            return false;
        }
    }

    // Create ripple effect
    createRippleEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const diameter = Math.max(rect.width, rect.height);
        const radius = diameter / 2;
        const x = e.clientX - rect.left - radius;
        const y = e.clientY - rect.top - radius;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        // Add styles if needed
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(102, 126, 234, 0.4);
                    transform: scale(0);
                    animation: rippleEffect 0.6s linear;
                    pointer-events: none;
                    z-index: 1;
                }
                @keyframes rippleEffect {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                .project-card, .skill-card { position: relative; overflow: hidden; }
            `;
            document.head.appendChild(style);
        }
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    // Show project details
    showProjectDetails(index) {
        const projects = [
            {
                title: 'Custom Termux Environment',
                description: 'Complete mobile Linux setup with automation scripts, custom configurations, and productivity tools. My daily development environment.',
                technologies: ['Bash', 'Termux', 'Git', 'Linux', 'Automation'],
                status: 'Active • 15+ Configuration Files'
            },
            {
                title: 'Network Scanner',
                description: 'Python-based tool for network discovery, port scanning, and device identification. Learning networking fundamentals and security protocols.',
                technologies: ['Python', 'Socket Programming', 'Networking', 'JSON Export'],
                status: 'Working Prototype • CLI Interface'
            },
            {
                title: 'This Portfolio',
                description: 'Modern responsive portfolio with Cosmic Code Nebula background, PWA features, and interactive animations. Showcasing front-end development skills.',
                technologies: ['HTML5', 'CSS3', 'JavaScript', 'PWA', 'Canvas API'],
                status: 'Live • Fully Responsive'
            },
            {
                title: 'Mining Data Analysis',
                description: 'University project analyzing geological survey data using Python. Applying engineering principles to data science and visualization.',
                technologies: ['Python', 'Data Analysis', 'Matplotlib', 'Pandas', 'Statistics'],
                status: 'Academic • Real Geological Data'
            }
        ];
        
        const project = projects[index] || projects[0];
        const message = `📁 ${project.title}
${project.description}
💻 ${project.technologies.join(', ')}
${project.status}`;
        
        this.showNotification(message, 'info', 5000);
        this.trackEvent('project_view', 'engagement', project.title);
    }

    // Setup timeline animations
    setupTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        if (!timelineItems.length) return;
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                        
                        // Animate achievements list
                        const achievements = entry.target.querySelectorAll('.timeline-achievements li');
                        achievements.forEach((li, i) => {
                            li.style.opacity = '0';
                            li.style.transform = 'translateX(-20px)';
                            requestAnimationFrame(() => {
                                li.style.transition = `all 0.4s ease ${i * 0.08}s`;
                                li.style.opacity = '1';
                                li.style.transform = 'translateX(0)';
                            });
                        });
                    }, index * 150);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        timelineItems.forEach(item => observer.observe(item));
    }

    // Show notifications
    showNotification(message, type = 'info', duration = 3000) {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => {
            n.classList.remove('show');
            setTimeout(() => n.remove(), 250);
        });
        
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.role = 'alert';
        notification.setAttribute('aria-live', 'polite');
        notification.setAttribute('aria-atomic', 'true');
        
        const icon = this.getNotificationIcon(type);
        const formattedMessage = this.formatNotificationMessage(message);
        
        notification.innerHTML = `
            <span class="notification-icon" aria-hidden="true">${icon}</span>
            <div class="notification-content">
                <div class="notification-message">${formattedMessage}</div>
            </div>
            <button class="notification-close" aria-label="Dismiss notification" tabindex="0">×</button>
        `;
        
        // Position and style
        const rootStyles = getComputedStyle(document.documentElement);
        const primaryColor = rootStyles.getPropertyValue('--color-primary').trim();
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            max-width: 350px;
            min-height: 56px;
            background: ${this.getNotificationBackground(type)};
            color: white;
            padding: 12px 16px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 1003;
            transform: translateX(100%);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-family: inherit;
            font-size: 0.9rem;
            font-weight: 500;
            border-left: 4px solid ${primaryColor};
            display: flex;
            align-items: center;
            gap: 12px;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
            notification.classList.add('show');
        });
        
        // Auto-dismiss
        const timeoutId = setTimeout(() => this.dismissNotification(notification), duration);
        
        // Manual dismiss
        const closeBtn = notification.querySelector('.notification-close');
        const dismissHandler = () => {
            clearTimeout(timeoutId);
            this.dismissNotification(notification);
        };
        
        closeBtn.addEventListener('click', dismissHandler);
        closeBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dismissHandler();
            }
        });
        
        // Click outside to dismiss
        notification.addEventListener('click', (e) => {
            if (e.target === notification) {
                dismissHandler();
            }
        });
    }

    // Get notification icon
    getNotificationIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    // Get notification background
    getNotificationBackground(type) {
        const backgrounds = {
            success: 'rgba(76, 175, 80, 0.95)',
            error: 'rgba(244, 67, 54, 0.95)',
            warning: 'rgba(255, 152, 0, 0.95)',
            info: 'rgba(102, 126, 234, 0.95)'
        };
        return backgrounds[type] || backgrounds.info;
    }

    // Format notification message
    formatNotificationMessage(message) {
        if (typeof message === 'string') {
            return message.replace(/\n/g, '<br>').replace(/\s{2,}/g, ' ');
        }
        return String(message);
    }

    // Dismiss notification
    dismissNotification(notification) {
        if (!notification || !notification.parentNode) return;
        
        notification.classList.remove('show');
        notification.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Show tooltip
    showTooltip(element, text) {
        // Remove existing tooltip
        this.hideTooltip();
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.setAttribute('role', 'tooltip');
        tooltip.textContent = text;
        
        tooltip.style.cssText = `
            position: absolute;
            background: var(--bg-primary);
            color: var(--text-primary);
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 500;
            white-space: nowrap;
            pointer-events: none;
            z-index: 1001;
            border: 1px solid var(--border-color);
            box-shadow: var(--shadow-md);
            opacity: 0;
            transform: translateY(-8px);
            transition: all 0.2s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        
        let left = rect.left + rect.width / 2;
        let top = rect.top - 10;
        
        // Adjust for screen edges
        const tooltipWidth = tooltip.offsetWidth;
        if (left + tooltipWidth / 2 > viewportWidth - 20) {
            left = viewportWidth - tooltipWidth - 20;
        } else if (left - tooltipWidth / 2 < 20) {
            left = 20;
        } else {
            left -= tooltipWidth / 2;
        }
        
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
        
        // Show animation
        requestAnimationFrame(() => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        });
        
        // Store for hiding
        element._tooltip = tooltip;
    }

    // Hide tooltip
    hideTooltip() {
        document.querySelectorAll('.tooltip').forEach(tooltip => {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(-8px)';
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 200);
        });
        
        // Clear references
        document.querySelectorAll('[data-tooltip]').forEach(el => {
            delete el._tooltip;
        });
    }

    // Setup keyboard shortcuts
    setupKeyboardShortcuts() {
        // Global shortcuts
        document.addEventListener('keydown', (e) => {
            // Skip if typing in form
            if (e.target.closest('.contact-form') || 
                e.target.tagName === 'INPUT' || 
                e.target.tagName === 'TEXTAREA' || 
                e.target.tagName === 'SELECT') {
                return;
            }
            
            // Escape to home
            if (e.key === 'Escape') {
                e.preventDefault();
                if (this.currentSection !== 0) {
                    this.switchSection(0);
                    if (this.elements.navDots[0]) {
                        this.elements.navDots[0].focus();
                    }
                    this.showNotification('🏠 Back to About', 'info', 1000);
                }
                return;
            }
            
            // Quick navigation
            if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '5') {
                e.preventDefault();
                const index = parseInt(e.key) - 1;
                this.switchSection(index);
                if (this.elements.navDots[index]) {
                    this.elements.navDots[index].focus();
                }
                return;
            }
            
            // Social shortcuts
            if (e.ctrlKey || e.metaKey) {
                switch(e.key.toLowerCase()) {
                    case 'g': // GitHub
                        e.preventDefault();
                        window.open('https://github.com/mohammadmahdi-termux', '_blank', 'noopener,noreferrer');
                        this.trackEvent('social_open', 'shortcut', 'GitHub');
                        break;
                    case 't': // Telegram
                        e.preventDefault();
                        window.open('https://t.me/mohammadmahdi_termux', '_blank', 'noopener,noreferrer');
                        this.trackEvent('social_open', 'shortcut', 'Telegram');
                        break;
                    case 'e': // Email
                        e.preventDefault();
                        if (this.copyEmail()) {
                            this.showNotification('📧 Email copied! Open mail client to send.', 'success', 2000);
                        }
                        break;
                }
            }
        });
        
        console.log('⌨️ Keyboard shortcuts active immediately');
    }

    // Track events (Google Analytics compatible)
    trackEvent(action, category = 'interaction', label = '', value = 1) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value
            });
        }
        
        // Console tracking for development
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            console.log('📊 Event:', { action, category, label, value });
        }
    }

    // Performance monitoring - Immediate
    setupPerformanceMonitoring() {
        if (!window.performance) return;
        
        // Mark key events
        performance.mark('app-init-start');
        
        // Track section changes
        const originalSwitch = this.switchSection;
        this.switchSection = (...args) => {
            performance.mark('section-switch-start');
            const result = originalSwitch.apply(this, args);
            performance.mark('section-switch-end');
            performance.measure('Section Switch', 'section-switch-start', 'section-switch-end');
            return result;
        };
        
        // Track form interactions
        if (this.elements.contactForm) {
            this.elements.contactForm.addEventListener('submit', () => {
                performance.mark('form-submit-start');
            });
        }
        
        // Final measurement - Immediate
        setTimeout(() => {
            performance.mark('app-init-end');
            performance.measure('App Initialization', 'app-init-start', 'app-init-end');
            
            const measures = performance.getEntriesByType('measure');
            const initMeasure = measures.find(m => m.name === 'App Initialization');
            
            if (initMeasure) {
                const duration = Math.round(initMeasure.duration);
                console.log(`⚡ App initialized in ${duration}ms - Immediate mode`);
                
                // Performance badge (development only)
                if (location.hostname === 'localhost') {
                    const badge = document.createElement('div');
                    badge.style.cssText = `
                        position: fixed;
                        top: 10px;
                        left: 10px;
                        background: rgba(0, 0, 0, 0.8);
                        color: ${duration < 1000 ? '#4CAF50' : duration < 2000 ? '#FF9800' : '#f44336'};
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-size: 0.8rem;
                        font-family: monospace;
                        z-index: 9999;
                        pointer-events: none;
                    `;
                    badge.textContent = `Load: ${duration}ms`;
                    document.body.appendChild(badge);
                }
            }
        }, 100);
    }

    // Trigger entrance animations - Immediate
    triggerEntranceAnimations() {
        // Main card - Already visible, subtle lift
        const mainCard = document.querySelector('.main-card');
        if (mainCard) {
            requestAnimationFrame(() => {
                mainCard.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                mainCard.style.transform = 'translateY(0) scale(1)';
            });
        }
        
        // Profile section
        const profileSection = document.querySelector('.profile-section');
        if (profileSection) {
            profileSection.style.opacity = '0';
            profileSection.style.transform = 'translateY(30px)';
            setTimeout(() => {
                profileSection.style.transition = 'all 0.6s ease 0.2s';
                profileSection.style.opacity = '1';
                profileSection.style.transform = 'translateY(0)';
            }, 0); // Immediate
        }
        
        // Navigation
        const navDots = document.querySelector('.nav-dots');
        if (navDots) {
            navDots.style.opacity = '0';
            navDots.style.transform = 'scale(0.8)';
            setTimeout(() => {
                navDots.style.transition = 'all 0.6s ease 0.4s';
                navDots.style.opacity = '1';
                navDots.style.transform = 'scale(1)';
            }, 0); // Immediate
        }
    }

    // Handle resize events
    handleResize() {
        // Update canvas
        if (window.CosmicNebula?.instance) {
            window.CosmicNebula.instance.resize();
        }
        
        // Adjust layout
        this.adjustLayout();
        
        // Revalidate form if visible
        if (this.elements.contactForm && this.currentSection === 4) {
            this.toggleSubmitButton();
        }
        
        // Hide tooltips on resize
        this.hideTooltip();
    }

    // Layout adjustments
    adjustLayout() {
        const socialGrid = document.querySelector('.social-grid');
        if (socialGrid) {
            if (window.innerWidth < 480) {
                socialGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
                socialGrid.style.gap = '0.5rem';
            } else if (window.innerWidth < 768) {
                socialGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                socialGrid.style.gap = '1rem';
            } else {
                socialGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(120px, 1fr))';
                socialGrid.style.gap = '1.5rem';
            }
        }
        
        // Timeline mobile adjustments
        const timeline = document.querySelector('.timeline');
        if (timeline && window.innerWidth < 768) {
            timeline.style.paddingLeft = '2rem';
            document.querySelector('.timeline')?.style.setProperty('--timeline-left', '16px');
        }
    }

    // Utility: Debounce
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Error handlers
    handleGlobalError(e) {
        console.error('💥 Global error:', e.error || e.message);
        this.showNotification(
            '⚠️ An unexpected error occurred. Core functionality is still working.',
            'warning',
            4000
        );
    }

    handlePromiseError(e) {
        console.error('💥 Promise rejection:', e.reason);
        this.showNotification(
            '⚠️ A background operation failed. Please refresh if needed.',
            'warning',
            3000
        );
        e.preventDefault();
    }
}

// Global app instance
let portfolioApp;

// Initialize when DOM is ready - Immediate
document.addEventListener('DOMContentLoaded', () => {
    try {
        portfolioApp = new PortfolioApp();
        window.portfolioApp = portfolioApp;
        
        // Handle initial hash
        setTimeout(() => {
            const hash = window.location.hash.substring(1).toLowerCase();
            const sectionMap = { 'about': 0, 'skills': 1, 'journey': 2, 'projects': 3, 'connect': 4 };
            const targetIndex = sectionMap[hash];
            
            if (targetIndex !== undefined && targetIndex !== 0) {
                portfolioApp.switchSection(targetIndex);
            }
        }, 0); // Immediate
        
        // Preload images
        const preloadImages = [
            'data:image/svg+xml;base64,...' // Profile placeholder
        ];
        
        preloadImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
        
        console.log('🎉 Portfolio fully loaded and ready immediately!');
        
    } catch (error) {
        console.error('Failed to initialize portfolio:', error);
        document.body.innerHTML += `
            <div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:2rem;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.1);text-align:center;max-width:90vw;">
                <h2>⚠️ Portfolio Load Error</h2>
                <p>Something went wrong while loading. Please refresh the page.</p>
                <button onclick="location.reload()" style="background:#667eea;color:white;border:none;padding:0.75rem 1.5rem;border-radius:6px;cursor:pointer;font-weight:500;">Refresh Page</button>
            </div>
        `;
    }
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (window.CosmicNebula?.instance) {
        window.CosmicNebula.instance.pause();
    }
});

// Service Worker registration (only in production)
if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
            .then(registration => {
                console.log('📱 PWA Service Worker registered:', registration.scope);
            })
            .catch(error => {
                console.warn('Service Worker registration failed:', error);
            });
    });
}

// Export for debugging
window.PortfolioApp = PortfolioApp;
window.portfolioApp = portfolioApp;

// Performance timing - Immediate
if ('performance' in window) {
    window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
            const loadTime = Math.round(navigation.loadEventEnd - navigation.loadEventStart);
            console.log(`📊 Page loaded in ${loadTime}ms - Immediate mode`);
        }
    });
}