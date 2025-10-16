/**
 * Cosmic Code Nebula - Advanced Animated Background
 * Grok's Masterpiece for Mohammad Mahdi's Portfolio
 * Immediate Load Optimized Version
 */

class CosmicNebula {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.neuralLines = [];
        this.codeStreams = [];
        this.dataBlocks = [];
        this.cosmicParticles = [];
        this.mouseTrail = [];
        this.animationFrame = null;
        this.isRunning = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.theme = document.body.getAttribute('data-theme') || 'dark';
        this.intensity = 1.0;
        this.refreshTimeouts = []; // Track timeouts for cleanup
        this.particleCount = Math.min(50, Math.floor(window.innerWidth / 25)); // Optimized count
        
        this.init(); // Immediate init
        window.CosmicNebula.instance = this;
        console.log('🌌 Cosmic Code Nebula initialized immediately - Intensity:', this.intensity);
    }

    init() {
        this.createNebulaContainer();
        this.setupCanvas();
        this.generateNeuralNetwork();
        this.createCodeStreams();
        this.createDataBlocks();
        this.createCosmicParticles();
        this.setupEventListeners();
        this.startAnimationLoop(); // Start immediately
        
        // Initial resize for correct sizing
        setTimeout(() => this.resizeCanvas(), 0);
    }

    createNebulaContainer() {
        // Remove existing container
        const existing = document.querySelector('.cosmic-bg');
        if (existing) {
            existing.remove();
        }
        
        const container = document.createElement('div');
        container.className = 'cosmic-bg nebula-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            pointer-events: none;
            background: radial-gradient(ellipse at center, 
                ${this.theme === 'dark' ? '#0a0a0a' : '#f8fafc'} 0%, 
                ${this.theme === 'dark' ? '#000' : '#e2e8f0'} 70%, 
                ${this.theme === 'dark' ? '#0c0c0c' : '#f1f5f9'} 100%);
        `;
        
        // Neural network layer
        const neuralLayer = document.createElement('div');
        neuralLayer.className = 'neural-net';
        container.appendChild(neuralLayer);
        
        // Code matrix layer
        const codeLayer = document.createElement('div');
        codeLayer.className = 'code-matrix';
        container.appendChild(codeLayer);
        
        // Digital grid
        const grid = document.createElement('div');
        grid.className = 'digital-grid';
        container.appendChild(grid);
        
        // Nebula glow effect
        const glow = document.createElement('div');
        glow.className = 'nebula-glow';
        container.appendChild(glow);
        
        document.body.insertBefore(container, document.body.firstChild);
        this.container = container;
    }

    setupCanvas() {
        this.canvas = document.getElementById('nebulaCanvas') || document.createElement('canvas');
        if (!this.canvas.id) {
            this.canvas.id = 'nebulaCanvas';
            this.container.appendChild(this.canvas);
        }
        
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        `;
        
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) {
            console.warn('Canvas context not supported - using fallback');
            this.initFallback();
            return;
        }
        
        this.resizeCanvas();
        this.ctx.imageSmoothingEnabled = true;
    }

    resizeCanvas() {
        if (!this.canvas) return;
        
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Lower cap for perf
        const rect = this.container.getBoundingClientRect();
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        this.ctx.scale(dpr, dpr);
        
        // Optimized regenerate - reposition only
        this.repositionResponsiveElements();
    }

    // Optimized reposition instead of full regenerate
    repositionResponsiveElements() {
        const rect = this.container.getBoundingClientRect();
        const lineCount = Math.min(40, Math.floor(rect.width / 40));
        
        // Neural lines
        this.neuralLines.forEach((line, i) => {
            const type = line.classList.contains('neural-line--horizontal') ? 'horizontal' : 
                        line.classList.contains('neural-line--vertical') ? 'vertical' : 'diagonal';
            const progress = i / Math.max(1, lineCount);
            
            if (type === 'horizontal') {
                line.style.top = `${progress * 100}%`;
                line.style.width = `${rect.width}px`;
            } else if (type === 'vertical') {
                line.style.left = `${progress * 100}%`;
                line.style.height = `${rect.height}px`;
            } else {
                line.style.left = `${progress * 50}%`;
                line.style.width = `${Math.sqrt(2) * rect.width}px`;
            }
        });
        
        // Particles and blocks - simple reposition
        this.cosmicParticles.forEach(particle => {
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
        });
        
        this.dataBlocks.forEach(block => {
            block.style.left = `${Math.random() * 90}%`;
            block.style.top = `${Math.random() * 90}%`;
        });
    }

    generateNeuralNetwork() {
        const container = this.container.querySelector('.neural-net');
        if (!container) return;
        
        const lineCount = Math.min(40, Math.floor(window.innerWidth / 40));
        this.neuralLines = [];
        
        // Horizontal lines
        for (let i = 0; i < lineCount; i++) {
            const line = this.createNeuralLine('horizontal', i / lineCount);
            container.appendChild(line);
            this.neuralLines.push(line);
        }
        
        // Vertical lines (half count for perf)
        for (let i = 0; i < lineCount / 2; i++) {
            const line = this.createNeuralLine('vertical', i / (lineCount / 2));
            container.appendChild(line);
            this.neuralLines.push(line);
        }
        
        // Diagonal connections (third for perf)
        for (let i = 0; i < lineCount / 3; i++) {
            const line = this.createNeuralLine('diagonal', i / (lineCount / 3));
            container.appendChild(line);
            this.neuralLines.push(line);
        }
    }

    createNeuralLine(type, progress) {
        const line = document.createElement('div');
        line.className = `neural-line neural-line--${type}`;
        line.dataset.progress = progress; // Store for reposition
        
        const containerRect = this.container.getBoundingClientRect();
        const isHorizontal = type === 'horizontal';
        const isVertical = type === 'vertical';
        
        // Position
        if (isHorizontal) {
            line.style.top = `${progress * 100}%`;
            line.style.left = '0';
            line.style.width = '0%';
            line.style.height = '1px';
        } else if (isVertical) {
            line.style.left = `${progress * 100}%`;
            line.style.top = '0';
            line.style.width = '1px';
            line.style.height = '0%';
        } else {
            // Diagonal
            line.style.left = `${progress * 50}%`;
            line.style.top = '0';
            line.style.width = '0%';
            line.style.height = '1px';
            line.style.transform = 'rotate(45deg)';
            line.style.transformOrigin = 'left center';
        }
        
        // Color and animation
        const hue = (220 + progress * 140 + Date.now() * 0.001) % 360;
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * duration;
        
        line.style.background = isHorizontal || isVertical 
            ? `linear-gradient(${isHorizontal ? '90' : '180'}deg, 
                hsla(${hue}, 70%, 60%, 0), 
                hsla(${hue}, 80%, 70%, 0.6), 
                hsla(${hue}, 70%, 60%, 0))`
            : `linear-gradient(45deg, 
                hsla(${hue}, 70%, 60%, 0), 
                hsla(${hue}, 80%, 70%, 0.6), 
                hsla(${hue}, 70%, 60%, 0))`;
        
        line.style.animation = isHorizontal || isVertical 
            ? `neuralFlow${isVertical ? 'Vertical' : ''} ${duration}s linear infinite`
            : `neuralFlowDiagonal ${duration}s linear infinite`;
        
        line.style.animationDelay = `${delay}s`;
        line.style.opacity = 0.2 + Math.random() * 0.3;
        
        return line;
    }

    createCodeStreams() {
        const container = this.container.querySelector('.code-matrix');
        if (!container) return;
        
        const streamCount = Math.min(20, Math.floor(window.innerWidth / 80));
        this.codeStreams = [];
        
        const symbols = [
            '0','1','2','3','4','5','6','7','8','9',
            'A','B','C','D','E','F','G','H','I','J',
            'K','L','M','N','O','P','Q','R','S','T',
            'U','V','W','X','Y','Z',
            'a','b','c','d','e','f','g','h','i','j',
            'k','l','m','n','o','p','q','r','s','t',
            'u','v','w','x','y','z',
            '{','}','[',']','(',')','<','>','=','+',
            '-','*','/','%','&','|','!','~','?','%',
            '🔒','💻','🐍','⚡','🌐','🔑','📡','🛡️','🔍','📊',
            '404','SQL','XSS','CSRF','AES','SHA','HTTP','TCP','IP'
        ];
        
        for (let i = 0; i < streamCount; i++) {
            const stream = document.createElement('div');
            stream.className = 'code-stream';
            
            // Generate code string
            const length = 15 + Math.floor(Math.random() * 25);
            let code = '';
            for (let j = 0; j < length; j++) {
                const symbol = symbols[Math.floor(Math.random() * symbols.length)];
                const isSpecial = Math.random() < 0.2;
                code += isSpecial ? `<span class="code-symbol">${symbol}</span>` : symbol;
                if (Math.random() < 0.1) code += ' ';
            }
            
            stream.innerHTML = code;
            
            // Position and styling
            stream.style.left = `${(i * 100) / streamCount}%`;
            stream.style.fontSize = `${8 + Math.random() * 8}px`;
            stream.style.lineHeight = '1';
            stream.style.letterSpacing = `${-0.5 + Math.random()}px`;
            
            // Animation - Start immediately
            const duration = 4 + Math.random() * 4;
            stream.style.animationDuration = `${duration}s`;
            stream.style.animationDelay = `${Math.random() * 2}s`;
            
            // Color variations
            const greenShades = [
                'rgba(0, 255, 0, 0.25)', 'rgba(34, 255, 34, 0.3)', 
                'rgba(0, 200, 0, 0.35)', 'rgba(50, 255, 50, 0.2)',
                'rgba(102, 255, 102, 0.28)', 'rgba(0, 255, 100, 0.22)'
            ];
            stream.style.color = greenShades[Math.floor(Math.random() * greenShades.length)];
            stream.style.textShadow = `
                0 0 3px currentColor,
                0 0 6px currentColor
            `;
            
            container.appendChild(stream);
            this.codeStreams.push(stream);
            
            // Auto-refresh stream - Start after short delay
            const timeoutId = setTimeout(() => this.refreshCodeStream(stream), 8000 + Math.random() * 4000);
            this.refreshTimeouts.push(timeoutId);
        }
    }

    refreshCodeStream(stream) {
        if (!stream || !stream.parentNode) return;
        
        const symbols = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','{','}','[',']','(',')','<','>','=','+','-','*','/','%','&','|','!','~','?','🔒','💻','🐍','⚡','🌐','🔑'];
        
        const length = 15 + Math.floor(Math.random() * 25);
        let code = '';
        for (let j = 0; j < length; j++) {
            const symbol = symbols[Math.floor(Math.random() * symbols.length)];
            const isSpecial = Math.random() < 0.25;
            code += isSpecial ? `<span class="code-symbol">${symbol}</span>` : symbol;
            if (Math.random() < 0.08) code += ' ';
        }
        
        // Reset animation
        stream.style.animation = 'none';
        stream.style.opacity = '0';
        stream.innerHTML = code;
        stream.offsetHeight; // Trigger reflow
        
        // Restart animation
        const duration = 4 + Math.random() * 4;
        stream.style.animation = `codeStream ${duration}s linear infinite`;
        stream.style.animationDelay = '0s';
        stream.style.opacity = '1';
        
        // Schedule next refresh
        const timeoutId = setTimeout(() => this.refreshCodeStream(stream), 8000 + Math.random() * 4000);
        this.refreshTimeouts.push(timeoutId);
    }

    createDataBlocks() {
        const container = this.container.querySelector('.code-matrix');
        if (!container) return;
        
        const blockCount = Math.min(10, Math.floor(window.innerWidth / 150));
        this.dataBlocks = [];
        
        const dataEntries = [
            'user_auth: success', 'scan_port: 443/open', 'hash_md5: 8f14e45f',
            'sql_inject: blocked', 'xss_detected: false', 'api_key: secured',
            'conn_status: active', 'payload_size: 2.4KB', 'response_time: 145ms',
            'threat_level: LOW', 'session_id: abc123xyz', 'ip_whitelist: 192.168.1.0/24',
            'firewall_rule: ALLOW', 'crypto_hash: SHA256', 'data_encrypted: AES-256',
            'backup_status: COMPLETE', 'log_level: INFO', 'cache_hit: 87%',
            'db_query: 0.23ms', 'memory_usage: 128MB', 'cpu_load: 23%',
            'security_scan: clean', 'vulnerability: none', 'patch_level: current'
        ];
        
        for (let i = 0; i < blockCount; i++) {
            const block = document.createElement('div');
            block.className = 'data-block';
            
            const data = dataEntries[Math.floor(Math.random() * dataEntries.length)];
            block.textContent = data;
            
            // Position
            block.style.left = `${Math.random() * 90}%`;
            block.style.top = `${Math.random() * 90}%`;
            
            // Size and styling
            const fontSize = 9 + Math.random() * 5;
            block.style.fontSize = `${fontSize}px`;
            block.style.padding = `${4 + Math.random() * 4}px ${6 + Math.random() * 6}px`;
            block.style.maxWidth = `${100 + Math.random() * 80}px`;
            
            // Animation
            const duration = 10 + Math.random() * 8;
            block.style.animationDuration = `${duration}s`;
            block.style.animationDelay = `${Math.random() * 5}s`;
            
            // Color
            const colors = [
                { bg: 'rgba(102, 126, 234, 0.1)', text: 'rgba(102, 126, 234, 0.9)', border: 'rgba(102, 126, 234, 0.3)' },
                { bg: 'rgba(76, 175, 80, 0.1)', text: 'rgba(76, 175, 80, 0.9)', border: 'rgba(76, 175, 80, 0.3)' },
                { bg: 'rgba(255, 152, 0, 0.1)', text: 'rgba(255, 152, 0, 0.9)', border: 'rgba(255, 152, 0, 0.3)' },
                { bg: 'rgba(156, 39, 176, 0.1)', text: 'rgba(156, 39, 176, 0.9)', border: 'rgba(156, 39, 176, 0.3)' }
            ];
            
            const colorScheme = colors[Math.floor(Math.random() * colors.length)];
            block.style.background = colorScheme.bg;
            block.style.color = colorScheme.text;
            block.style.border = `1px solid ${colorScheme.border}`;
            block.style.textShadow = `0 0 4px ${colorScheme.text}`;
            
            container.appendChild(block);
            this.dataBlocks.push(block);
        }
    }

    createCosmicParticles() {
        const container = this.container;
        if (!container) return;
        
        // Optimized count for perf
        const particleCount = Math.min(50, Math.floor(window.innerWidth / 25));
        this.cosmicParticles = [];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'cosmic-particle';
            
            const size = Math.random() * 6 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Animation properties
            const duration = 12 + Math.random() * 18;
            const delay = Math.random() * duration;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            // Color and glow
            const hue = (200 + Math.random() * 160) % 360;
            const opacity = 0.3 + Math.random() * 0.5;
            particle.style.background = `radial-gradient(circle at center, 
                hsla(${hue}, 80%, 70%, ${opacity}) 0%, 
                hsla(${hue}, 60%, 50%, ${opacity * 0.5}) 50%, 
                transparent 100%)`;
            
            particle.style.boxShadow = `
                0 0 8px hsla(${hue}, 80%, 70%, ${opacity * 0.8}),
                0 0 16px hsla(${hue}, 80%, 70%, ${opacity * 0.4}),
                inset 0 0 4px rgba(255, 255, 255, 0.2)
            `;
            
            container.appendChild(particle);
            this.cosmicParticles.push(particle);
        }
    }

    setupEventListeners() {
        // Mouse movement for interactivity
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
        
        // Resize handler - Optimized
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 200));
        window.addEventListener('orientationchange', this.handleResize.bind(this));
        
        // Theme changes
        const observer = new MutationObserver(() => {
            const newTheme = document.body.getAttribute('data-theme');
            if (newTheme !== this.theme) {
                this.setTheme(newTheme);
            }
        });
        
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
        
        // Pause on visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });
    }

    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        
        // Create mouse trail
        this.createMouseTrail();
        
        // React to mouse proximity
        this.reactToMouse();
    }

    handleTouchMove(e) {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            this.mouseX = touch.clientX;
            this.mouseY = touch.clientY;
            this.createMouseTrail();
            this.reactToMouse();
        }
    }

    createMouseTrail() {
        // Limit trail length for perf
        if (this.mouseTrail.length > 8) {
            const oldTrail = this.mouseTrail.shift();
            if (oldTrail && oldTrail.parentNode) {
                oldTrail.parentNode.removeChild(oldTrail);
            }
        }
        
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.left = `${this.mouseX}px`;
        trail.style.top = `${this.mouseY}px`;
        
        // Dynamic color based on theme
        const hue = this.theme === 'dark' ? 220 : 200;
        trail.style.background = `radial-gradient(circle, 
            hsla(${hue}, 80%, 70%, 0.8) 0%, 
            hsla(${hue}, 60%, 50%, 0.4) 100%)`;
        
        document.body.appendChild(trail);
        this.mouseTrail.push(trail);
        
        // Auto-remove
        setTimeout(() => {
            const index = this.mouseTrail.indexOf(trail);
            if (index > -1) {
                this.mouseTrail.splice(index, 1);
            }
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 800);
    }

    reactToMouse() {
        // Neural lines reaction - Optimized (every 2nd frame)
        if (Date.now() % 16 < 8) return;
        
        this.neuralLines.forEach((line, index) => {
            if (!line.getBoundingClientRect) return;
            
            const rect = line.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.hypot(this.mouseX - centerX, this.mouseY - centerY);
            
            const maxDistance = 200;
            if (distance < maxDistance) {
                const intensity = 1 - (distance / maxDistance);
                line.style.animationDuration = `${2 - intensity}s`;
                line.style.opacity = `${0.3 + intensity * 0.4}`;
                
                // Color shift
                const hueShift = intensity * 60;
                const baseHue = 220 + (index * 30) % 140;
                line.style.filter = `hue-rotate(${hueShift}deg) brightness(${1 + intensity * 0.3})`;
            } else {
                line.style.animationDuration = '4s';
                line.style.opacity = '0.3';
                line.style.filter = 'hue-rotate(0deg) brightness(1)';
            }
        });
        
        // Particles attraction - Optimized
        this.cosmicParticles.forEach((particle, index) => {
            if (index % 3 !== 0) return; // Every 3rd particle for perf
            
            if (!particle.getBoundingClientRect) return;
            
            const rect = particle.getBoundingClientRect();
            const dx = this.mouseX - (rect.left + rect.width / 2);
            const dy = this.mouseY - (rect.top + rect.height / 2);
            const distance = Math.hypot(dx, dy);
            
            const maxAttraction = 150;
            if (distance < maxAttraction) {
                const force = (maxAttraction - distance) / maxAttraction;
                const moveX = dx * 0.02 * force * this.intensity;
                const moveY = dy * 0.02 * force * this.intensity;
                
                particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.3})`;
                particle.style.opacity = `${0.4 + force * 0.4}`;
                particle.style.zIndex = '3';
            } else {
                particle.style.transform = '';
                particle.style.opacity = '';
                particle.style.zIndex = '';
            }
        });
    }

    setTheme(theme) {
        this.theme = theme;
        const container = this.container;
        if (!container) return;
        
        // Update background colors
        const bgStart = theme === 'dark' ? '#0a0a0a' : '#f8fafc';
        const bgMid = theme === 'dark' ? '#000' : '#e2e8f0';
        const bgEnd = theme === 'dark' ? '#0c0c0c' : '#f1f5f9';
        
        container.style.background = `radial-gradient(ellipse at center, 
            ${bgStart} 0%, ${bgMid} 70%, ${bgEnd} 100%)`;
        
        // Update particle colors
        this.cosmicParticles.forEach(particle => {
            const hue = theme === 'dark' ? (200 + Math.random() * 160) % 360 : (0 + Math.random() * 60) % 360;
            particle.style.background = `radial-gradient(circle at center, 
                hsla(${hue}, 80%, ${theme === 'dark' ? '70' : '60'}%, 0.6) 0%, 
                hsla(${hue}, 60%, ${theme === 'dark' ? '50' : '80'}%, 0.3) 50%, 
                transparent 100%)`;
        });
        
        // Update code streams
        this.codeStreams.forEach(stream => {
            const greenShades = theme === 'dark' 
                ? ['rgba(0, 255, 0, 0.25)', 'rgba(34, 255, 34, 0.3)', 'rgba(0, 200, 0, 0.35)']
                : ['rgba(0, 100, 0, 0.6)', 'rgba(34, 139, 34, 0.7)', 'rgba(0, 128, 0, 0.8)'];
            stream.style.color = greenShades[Math.floor(Math.random() * greenShades.length)];
        });
    }

    setIntensity(level) {
        this.intensity = Math.max(0.5, Math.min(2.0, level));
        console.log(`🌌 Nebula intensity set to: ${this.intensity}`);
    }

    startAnimationLoop() {
        if (this.isRunning) return;
        this.isRunning = true;
        
        let frameCount = 0;
        const animate = (timestamp) => {
            if (!this.isRunning) return;
            
            frameCount++;
            
            // Canvas animations (60fps optimized)
            if (frameCount % 2 === 0) {
                this.animateCanvas();
            }
            
            // DOM element updates (30fps)
            if (frameCount % 4 === 0) {
                this.updateDOMElements();
            }
            
            // Random effects (5fps)
            if (frameCount % 12 === 0) {
                this.addRandomEffect();
            }
            
            // Mouse trail cleanup
            this.cleanupMouseTrail();
            
            this.animationFrame = requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate); // Start immediately
    }

    animateCanvas() {
        if (!this.ctx || !this.canvas) return;
        
        const { width, height } = this.canvas;
        
        // Clear with trail effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
        this.ctx.fillRect(0, 0, width, height);
        
        // Neural nodes network - Optimized
        this.drawNeuralNetwork();
        
        // Particle trails
        this.drawParticleTrails();
        
        // Glowing connections - Every 3rd frame for perf
        if (Date.now() % 32 < 16) {
            this.drawGlowingConnections();
        }
    }

    drawNeuralNetwork() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const nodeCount = 24; // Fixed for consistency
        
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = 'rgba(102, 126, 234, 0.6)';
        
        for (let i = 0; i < nodeCount; i++) {
            const angle = (Date.now() * 0.0005 + i * (Math.PI * 2 / nodeCount)) % (Math.PI * 2);
            const radius = 120 + Math.sin(Date.now() * 0.0008 + i) * 60;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius * 0.6; // Elliptical
            
            const size = 3 + Math.sin(Date.now() * 0.002 + i) * 2;
            const opacity = 0.4 + Math.sin(Date.now() * 0.0015 + i) * 0.3;
            
            // Draw node
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(102, 126, 234, ${opacity})`;
            this.ctx.fill();
            
            // Inner glow
            this.ctx.shadowBlur = 12;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size * 1.5, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(102, 126, 234, ${opacity * 0.3})`;
            this.ctx.fill();
        }
        
        this.ctx.shadowBlur = 0;
    }

    drawParticleTrails() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const trailCount = 8;
        
        for (let i = 0; i < trailCount; i++) {
            const angle = (Date.now() * 0.001 + i * (Math.PI * 2 / trailCount)) % (Math.PI * 2);
            const speed = 1.5 + i * 0.3;
            const radius = 80 + Math.sin(Date.now() * 0.0006 + i) * 40;
            
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            // Trail effect
            for (let j = 0; j < 5; j++) {
                const trailX = x + Math.cos(angle + j * 0.5) * j * 8;
                const trailY = y + Math.sin(angle + j * 0.5) * j * 8;
                const trailOpacity = (5 - j) / 5 * 0.3;
                
                this.ctx.beginPath();
                this.ctx.arc(trailX, trailY, 1.5, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(255, 255, 255, ${trailOpacity})`;
                this.ctx.fill();
            }
        }
    }

    drawGlowingConnections() {
        const nodes = [];
        const nodeCount = 12;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Generate node positions
        for (let i = 0; i < nodeCount; i++) {
            const angle = (Date.now() * 0.0003 + i * (Math.PI * 2 / nodeCount)) % (Math.PI * 2);
            const radius = 150 + Math.sin(Date.now() * 0.0007 + i) * 50;
            nodes.push({
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius * 0.7,
                id: i
            });
        }
        
        // Draw connections between close nodes - Optimized (only nearby)
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length && j < i + 4; j++) { // Limit connections for perf
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 180) {
                    const alpha = (1 - distance / 180) * 0.15 * this.intensity;
                    const hue = (220 + (i + j) * 15) % 360;
                    
                    // Glowing line
                    this.ctx.shadowBlur = 6;
                    this.ctx.shadowColor = `hsla(${hue}, 70%, 60%, ${alpha})`;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(nodes[i].x, nodes[i].y);
                    this.ctx.lineTo(nodes[j].x, nodes[j].y);
                    this.ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${alpha})`;
                    this.ctx.stroke();
                }
            }
        }
        
        this.ctx.shadowBlur = 0;
    }

    updateDOMElements() {
        // Update code streams position slightly
        this.codeStreams.forEach((stream, index) => {
            if (!stream.getBoundingClientRect) return;
            
            const swayX = Math.sin(Date.now() * 0.001 + index) * 2;
            const swayY = Math.cos(Date.now() * 0.0008 + index) * 1;
            stream.style.transform = `translate(${swayX}px, ${swayY}px)`;
        });
        
        // Update data blocks
        this.dataBlocks.forEach((block, index) => {
            if (!block.getBoundingClientRect) return;
            
            const floatX = Math.sin(Date.now() * 0.0005 + index) * 3;
            const floatY = Math.cos(Date.now() * 0.0007 + index) * 2;
            block.style.transform = `translate(${floatX}px, ${floatY}px) rotate(${floatX * 0.1}deg)`;
        });
    }

    addRandomEffect() {
        // Random burst effect
        this.createBurstEffect();
        
        // Random color wave
        if (Math.random() < 0.3) {
            this.triggerColorWave();
        }
        
        // Random particle explosion
        if (Math.random() < 0.2) {
            this.createParticleExplosion();
        }
    }

    createBurstEffect() {
        const burst = document.createElement('div');
        burst.className = 'effect-burst';
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = 60 + Math.random() * 80;
        
        burst.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, 
                rgba(102, 126, 234, 0.8) 0%, 
                rgba(118, 75, 162, 0.6) 50%, 
                transparent 100%);
            transform: translate(-50%, -50%);
            animation: burstEffect 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            pointer-events: none;
            z-index: 5;
            box-shadow: 0 0 30px rgba(102, 126, 234, 0.5);
        `;
        
        this.container.appendChild(burst);
        
        setTimeout(() => {
            if (burst.parentNode) {
                burst.parentNode.removeChild(burst);
            }
        }, 800);
    }

    triggerColorWave() {
        const hue = Math.random() * 360;
        const brightness = 50 + Math.random() * 30;
        
        this.neuralLines.forEach((line, index) => {
            const delay = index * 50;
            setTimeout(() => {
                line.style.filter = `hue-rotate(${hue}deg) brightness(${brightness}%) saturate(1.2)`;
                setTimeout(() => {
                    line.style.filter = '';
                }, 300);
            }, delay);
        });
    }

    createParticleExplosion() {
        const centerX = Math.random() * window.innerWidth;
        const centerY = Math.random() * window.innerHeight;
        const particleCount = 12 + Math.floor(Math.random() * 8);
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const velocity = 2 + Math.random() * 3;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            const particle = document.createElement('div');
            particle.className = 'explosion-particle';
            particle.style.cssText = `
                position: absolute;
                left: ${centerX}px;
                top: ${centerY}px;
                width: ${2 + Math.random() * 3}px;
                height: ${2 + Math.random() * 3}px;
                background: radial-gradient(circle, 
                    rgba(255, 255, 255, 0.8) 0%, 
                    rgba(102, 126, 234, 0.6) 100%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 6;
                animation: explosionParticle 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                transform: translate(0, 0);
            `;
            
            // Custom animation for each particle
            const distance = 100 + Math.random() * 50;
            const rotation = Math.random() * 360;
            particle.style.setProperty('--vx', `${vx}px`);
            particle.style.setProperty('--vy', `${vy}px`);
            particle.style.setProperty('--distance', `${distance}px`);
            particle.style.setProperty('--rotation', `${rotation}deg`);
            
            this.container.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }
    }

    cleanupMouseTrail() {
        // Remove old trail elements
        while (this.mouseTrail.length > 8) {
            const oldTrail = this.mouseTrail.shift();
            if (oldTrail && oldTrail.parentNode) {
                oldTrail.parentNode.removeChild(oldTrail);
            }
        }
    }

    // Public methods
    pause() {
        this.isRunning = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        console.log('⏸️ Nebula paused');
    }

    resume() {
        this.isRunning = true;
        this.startAnimationLoop(); // Restart immediately
        console.log('▶️ Nebula resumed');
    }

    resize() {
        this.resizeCanvas();
        console.log('📐 Nebula resized');
    }

    setIntensity(level) {
        this.intensity = Math.max(0.1, Math.min(2.0, level));
        console.log(`🌟 Nebula intensity: ${this.intensity.toFixed(2)}`);
    }

    destroy() {
        this.pause();
        
        // Clear all timeouts
        this.refreshTimeouts.forEach(id => clearTimeout(id));
        this.refreshTimeouts = [];
        
        // Cleanup DOM elements
        this.neuralLines.forEach(line => line.remove());
        this.codeStreams.forEach(stream => stream.remove());
        this.dataBlocks.forEach(block => block.remove());
        this.cosmicParticles.forEach(particle => particle.remove());
        this.mouseTrail.forEach(trail => {
            if (trail && trail.parentNode) trail.parentNode.removeChild(trail);
        });
        
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        
        const container = document.querySelector('.cosmic-bg');
        if (container && container.parentNode) {
            container.parentNode.removeChild(container);
        }
        
        // Remove styles
        const styles = document.querySelector('#nebula-styles');
        if (styles) styles.remove();
        
        console.log('🗑️ Nebula destroyed');
    }

    // Utility: Debounce
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Handle resize
    handleResize() {
        this.resize();
    }

    // Fallback if canvas fails
    initFallback() {
        console.log('🛡️ Canvas fallback - Simple CSS particles');
        // Add CSS-only particles if needed
    }
}

// Add required CSS dynamically - Immediate
function injectNebulaStyles() {
    if (document.querySelector('#nebula-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'nebula-styles';
    styles.textContent = `
        /* Neural Lines */
        .neural-line {
            position: absolute;
            border-radius: 1px;
            box-shadow: 0 0 8px rgba(102, 126, 234, 0.2);
            will-change: transform;
        }
        
        .neural-line--vertical {
            animation-name: neuralFlowVertical !important;
        }
        
        .neural-line--diagonal {
            animation-name: neuralFlowDiagonal !important;
            transform-origin: left center !important;
        }
        
        @keyframes neuralFlow {
            0% { width: 0; left: 0; opacity: 0; }
            20% { opacity: 1; width: 20%; }
            80% { opacity: 1; width: 80%; }
            100% { width: 100%; left: 100%; opacity: 0; }
        }
        
        @keyframes neuralFlowVertical {
            0% { height: 0; top: 0; opacity: 0; }
            20% { opacity: 1; height: 20%; }
            80% { opacity: 1; height: 80%; }
            100% { height: 100%; top: 100%; opacity: 0; }
        }
        
        @keyframes neuralFlowDiagonal {
            0% { 
                width: 0; 
                left: 0; 
                opacity: 0; 
                transform: rotate(45deg) scaleX(0); 
            }
            20% { opacity: 1; transform: rotate(45deg) scaleX(0.2); }
            80% { opacity: 1; transform: rotate(45deg) scaleX(0.8); }
            100% { 
                width: 141.42%; 
                left: 100%; 
                opacity: 0; 
                transform: rotate(45deg) scaleX(1); 
            }
        }
        
        /* Code Streams */
        .code-stream {
            position: absolute;
            will-change: transform;
            mix-blend-mode: screen;
        }
        
        .code-symbol {
            display: inline-block;
            animation: symbolGlow 2s ease-in-out infinite;
            filter: drop-shadow(0 0 2px currentColor);
        }
        
        .code-symbol:nth-child(odd) { animation-delay: 1s; }
        
        @keyframes symbolGlow {
            0%, 100% { 
                text-shadow: 0 0 4px currentColor; 
                transform: scale(1); 
            }
            50% { 
                text-shadow: 
                    0 0 12px currentColor,
                    0 0 20px currentColor; 
                transform: scale(1.1); 
            }
        }
        
        @keyframes codeStream {
            0% { 
                transform: translateY(-100%) scaleY(0.8); 
                opacity: 0; 
            }
            10% { opacity: 1; transform: translateY(0) scaleY(1); }
            90% { opacity: 1; }
            100% { 
                transform: translateY(100%) scaleY(1.2); 
                opacity: 0; 
            }
        }
        
        /* Data Blocks */
        .data-block {
            position: absolute;
            border-radius: var(--radius-md);
            font-family: 'Courier New', 'Consolas', monospace;
            font-weight: 500;
            letter-spacing: 0.5px;
            text-shadow: 0 0 4px currentColor;
            will-change: transform;
            mix-blend-mode: screen;
            cursor: default;
            user-select: none;
            pointer-events: none;
            backdrop-filter: blur(5px);
        }
        
        @keyframes dataFloat {
            0% { 
                transform: translate(0, 0) rotate(0deg) scale(1); 
                opacity: 0; 
            }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { 
                transform: translate(var(--tx, 100px), var(--ty, -100px)) rotate(360deg) scale(1.1); 
                opacity: 0; 
            }
        }
        
        /* Cosmic Particles */
        .cosmic-particle {
            position: absolute;
            border-radius: 50%;
            will-change: transform;
            mix-blend-mode: screen;
            pointer-events: none;
            filter: drop-shadow(0 0 8px currentColor);
        }
        
        .cosmic-particle::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            background: inherit;
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: particleExpand 3s ease-out infinite;
            opacity: 0.5;
        }
        
        @keyframes particleExpand {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0.8; }
            50% { opacity: 0.3; }
            100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
        }
        
        @keyframes cosmicFloat {
            0%, 100% { 
                transform: translate(0, 0) rotate(0deg) scale(1); 
                opacity: 0.4; 
            }
            33% { 
                transform: translate(20px, -30px) rotate(120deg) scale(1.3); 
                opacity: 0.8; 
            }
            66% { 
                transform: translate(-15px, -15px) rotate(240deg) scale(0.8); 
                opacity: 0.6; 
            }
        }
        
        /* Mouse Trail */
        .mouse-trail {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            will-change: transform;
            mix-blend-mode: screen;
        }
        
        @keyframes mouseGlow {
            0% { 
                transform: scale(0) translate(0, 0); 
                opacity: 1; 
                box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.8); 
            }
            100% { 
                transform: scale(4) translate(20px, -20px); 
                opacity: 0; 
                box-shadow: 0 0 0 20px rgba(102, 126, 234, 0); 
            }
        }
        
        /* Effects */
        .effect-burst {
            position: absolute;
            pointer-events: none;
            z-index: 5;
            will-change: transform;
            mix-blend-mode: screen;
        }
        
        @keyframes burstEffect {
            0% { 
                width: 0; 
                height: 0; 
                opacity: 1; 
                transform: scale(0); 
            }
            50% { 
                opacity: 1; 
                transform: scale(1); 
            }
            100% { 
                width: var(--size, 200px); 
                height: var(--size, 200px); 
                opacity: 0; 
                transform: scale(1.5); 
            }
        }
        
        .explosion-particle {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            z-index: 6;
            will-change: transform;
        }
        
        @keyframes explosionParticle {
            0% { 
                transform: translate(0, 0) scale(1); 
                opacity: 1; 
            }
            100% { 
                transform: translate(var(--vx, 50px), var(--vy, 50px)) 
                          scale(0) rotate(var(--rotation, 360deg)); 
                opacity: 0; 
            }
        }
        
        /* Digital Grid */
        .digital-grid {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                linear-gradient(rgba(102, 126, 234, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(102, 126, 234, 0.08) 1px, transparent 1px);
            background-size: 60px 60px;
            opacity: 0.1;
            pointer-events: none;
            will-change: transform;
        }
        
        @keyframes gridShift {
            0% { 
                background-position: 0 0, 0 0; 
                filter: hue-rotate(0deg) brightness(1); 
            }
            25% { 
                background-position: 30px 30px, 30px 0; 
                filter: hue-rotate(90deg) brightness(1.1); 
            }
            50% { 
                background-position: 60px 0, 0 30px; 
                filter: hue-rotate(180deg) brightness(0.9); 
            }
            75% { 
                background-position: 30px 30px, 60px 30px; 
                filter: hue-rotate(270deg) brightness(1.05); 
            }
            100% { 
                background-position: 0 0, 0 0; 
                filter: hue-rotate(360deg) brightness(1); 
            }
        }
        
        /* Nebula Glow */
        .nebula-glow {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(ellipse at 20% 20%, rgba(102, 126, 234, 0.06) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 80%, rgba(118, 75, 162, 0.06) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 50%, rgba(255, 107, 107, 0.04) 0%, transparent 70%);
            pointer-events: none;
            will-change: opacity, transform;
        }
        
        @keyframes nebulaBreathe {
            0%, 100% { 
                opacity: 0.3; 
                transform: scale(1); 
            }
            50% { 
                opacity: 0.6; 
                transform: scale(1.02); 
            }
        }
    `;
    
    document.head.appendChild(styles);
}

// Initialize when DOM is ready - Immediate
document.addEventListener('DOMContentLoaded', () => {
    // No delay - start immediately if not already
    if (!document.querySelector('.cosmic-bg')) {
        const nebula = new CosmicNebula();
        
        // Store instance globally
        window.CosmicNebula = window.CosmicNebula || {};
        window.CosmicNebula.instance = nebula;
        
        // Inject styles if not present
        injectNebulaStyles();
    }
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (window.CosmicNebula && window.CosmicNebula.instance) {
            window.CosmicNebula.instance.destroy();
        }
    });
});

// Performance optimization - Immediate
if ('performance' in window) {
    performance.mark('nebula-load-start');
    
    document.addEventListener('DOMContentLoaded', () => {
        performance.mark('nebula-load-end');
        performance.measure('Nebula Loading', 'nebula-load-start', 'nebula-load-end');
    });
}