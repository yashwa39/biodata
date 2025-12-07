// ============================================
// CYBER-SYNTHESIZER PORTFOLIO INTERACTIVITY
// ============================================

// Custom Cursor Movement
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorOutline.style.left = e.clientX + 'px';
            cursorOutline.style.top = e.clientY + 'px';
        }, 50);
    });
}

// Cursor hover effects
const interactiveElements = document.querySelectorAll('button, a, .project-card, .score-row');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.opacity = '0.8';
    });
    
    element.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.opacity = '0.5';
    });
});

// Screen Navigation System
const screens = document.querySelectorAll('.screen');
const screenFlicker = document.querySelector('.screen-flicker');

function switchScreen(targetId) {
    console.log('switchScreen called with:', targetId);
    const currentScreen = document.querySelector('.screen.active');
    const targetScreen = document.getElementById(targetId);
    
    console.log('Current screen:', currentScreen?.id);
    console.log('Target screen:', targetScreen?.id);
    
    if (!targetScreen) {
        console.error('Target screen not found:', targetId);
        return;
    }
    
    if (currentScreen === targetScreen) {
        console.log('Already on target screen');
        return;
    }
    
    // Trigger screen flicker
    if (screenFlicker) {
        screenFlicker.classList.add('active');
        setTimeout(() => {
            screenFlicker.classList.remove('active');
        }, 100);
    }
    
    // Pixel dissolve transition
    if (currentScreen) {
        currentScreen.classList.add('transitioning-out');
    }
    
    setTimeout(() => {
        if (currentScreen) {
            currentScreen.classList.remove('active', 'transitioning-out');
        }
        targetScreen.classList.add('active');
        console.log('Screen switched to:', targetId);
        
        // Animate stat bars when entering player-select
        if (targetId === 'player-select') {
            animateStatBars();
        }
    }, 300);
}

// Data Stream Animation (needed before enhancedSwitchScreen)
function showDataStream() {
    const dataStream = document.getElementById('dataStream');
    if (!dataStream) return;
    
    dataStream.classList.add('active');
    dataStream.innerHTML = '';
    
    const hexChars = '0123456789ABCDEF';
    const lines = 20;
    
    for (let i = 0; i < lines; i++) {
        const line = document.createElement('div');
        line.className = 'data-stream-line';
        
        let hexString = '';
        for (let j = 0; j < 50; j++) {
            hexString += hexChars[Math.floor(Math.random() * hexChars.length)];
        }
        
        line.textContent = hexString;
        line.style.top = (i * 5) + '%';
        line.style.animationDuration = (Math.random() * 2 + 1) + 's';
        line.style.animationDelay = (i * 0.1) + 's';
        
        dataStream.appendChild(line);
    }
    
    setTimeout(() => {
        dataStream.classList.remove('active');
    }, 2000);
}

// Enhanced Screen Transitions with Data Stream
function enhancedSwitchScreen(targetId) {
    showDataStream();
    setTimeout(() => {
        switchScreen(targetId);
    }, 500);
}

// Button click handlers - wait for DOM to be ready
function initButtonHandlers() {
    const buttons = document.querySelectorAll('[data-target]');
    console.log('Found buttons:', buttons.length);
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const target = button.getAttribute('data-target');
            console.log('Button clicked, target:', target);
            
            // Button press animation
            button.style.transform = 'translateY(4px)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
            
            // Navigate to target screen
            if (target) {
                console.log('Calling switchScreen with:', target);
                switchScreen(target);
            }
        });
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initButtonHandlers);
} else {
    // DOM is already ready
    initButtonHandlers();
}

// Animate stat bars on load
function animateStatBars() {
    const statFills = document.querySelectorAll('.stat-fill');
    statFills.forEach(fill => {
        const level = fill.getAttribute('data-level');
        fill.style.width = '0%';
        setTimeout(() => {
            fill.style.width = level + '%';
        }, 100);
    });
}

// Project card hover effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Terminal link glitch effect
const terminalLinks = document.querySelectorAll('.terminal-link');
terminalLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        const commandText = link.querySelector('.command-text');
        commandText.style.animation = 'glitch 0.3s';
        
        setTimeout(() => {
            commandText.style.animation = '';
        }, 300);
    });
});

// High score row animations
const scoreRows = document.querySelectorAll('.score-row');
scoreRows.forEach((row, index) => {
    row.style.opacity = '0';
    row.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        row.style.transition = 'all 0.5s ease';
        row.style.opacity = '1';
        row.style.transform = 'translateX(0)';
    }, index * 100);
});

// Screen wipe transition (alternative)
function screenWipe(targetId, direction = 'vertical') {
    const currentScreen = document.querySelector('.screen.active');
    const targetScreen = document.getElementById(targetId);
    
    if (!targetScreen || currentScreen === targetScreen) return;
    
    const wipe = document.createElement('div');
    wipe.className = 'screen-wipe';
    wipe.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--dark-primary);
        z-index: 10000;
        transform: ${direction === 'vertical' ? 'scaleY(0)' : 'scaleX(0)'};
        transform-origin: ${direction === 'vertical' ? 'top' : 'left'};
        transition: transform 0.5s ease;
    `;
    
    document.body.appendChild(wipe);
    
    setTimeout(() => {
        wipe.style.transform = direction === 'vertical' ? 'scaleY(1)' : 'scaleX(1)';
    }, 10);
    
    setTimeout(() => {
        currentScreen.classList.remove('active');
        targetScreen.classList.add('active');
        wipe.style.transform = direction === 'vertical' ? 'scaleY(0)' : 'scaleX(0)';
        wipe.style.transformOrigin = direction === 'vertical' ? 'bottom' : 'right';
    }, 500);
    
    setTimeout(() => {
        document.body.removeChild(wipe);
    }, 1000);
}

// Keyboard navigation removed - mouse only

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial screen
    const mainMenu = document.getElementById('main-menu');
    if (mainMenu) {
        mainMenu.classList.add('active');
    }
    
    // Add loading animation
    document.body.classList.add('loading');
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 1000);
    
    // Animate main title on load
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        mainTitle.style.opacity = '0';
        mainTitle.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            mainTitle.style.transition = 'all 1s ease';
            mainTitle.style.opacity = '1';
            mainTitle.style.transform = 'translateY(0)';
        }, 200);
    }
});

// Smooth scroll for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to background (subtle)
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    
    const starfield = document.querySelector('body::before');
    // Parallax effect would be applied here if needed
});

// Prevent default cursor on interactive elements
interactiveElements.forEach(element => {
    element.style.cursor = 'none';
});

// Add click ripple effect
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Apply ripple to buttons
document.querySelectorAll('.arcade-button, .nav-button, .back-button').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Background Music Controls
const bgMusic = document.getElementById('bgMusic');
const bgMusicToggle = document.getElementById('bgMusicToggle');
const bgVolumeSlider = document.getElementById('bgVolumeSlider');
const volumeValue = document.getElementById('volumeValue');
const musicStatus = document.getElementById('musicStatus');
const trackStatus = document.getElementById('trackStatus');

let isPlaying = false;

// Initialize volume
if (bgMusic) {
    bgMusic.volume = 0.5; // 50% volume by default
}

// Toggle music playback
function toggleMusic() {
    if (!bgMusic) return;
    
    if (isPlaying) {
        bgMusic.pause();
        isPlaying = false;
        if (musicStatus) musicStatus.textContent = 'PLAY';
        if (trackStatus) trackStatus.textContent = 'PAUSED';
    } else {
        bgMusic.play().catch(err => {
            console.log('Autoplay prevented. User interaction required.');
            // Music will play on first user interaction
        });
        isPlaying = true;
        if (musicStatus) musicStatus.textContent = 'PAUSE';
        if (trackStatus) trackStatus.textContent = 'PLAYING';
    }
}

// Volume control
function updateVolume(value) {
    if (!bgMusic) return;
    const volume = value / 100;
    bgMusic.volume = volume;
    if (volumeValue) volumeValue.textContent = value + '%';
}

// Event listeners for music controls (only from Config screen)
if (bgMusicToggle) {
    bgMusicToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMusic();
    });
}

if (bgVolumeSlider) {
    bgVolumeSlider.addEventListener('input', (e) => {
        updateVolume(e.target.value);
    });
}

// Handle music state changes
if (bgMusic) {
    bgMusic.addEventListener('play', () => {
        isPlaying = true;
        if (musicToggle) musicToggle.classList.add('playing');
        if (musicStatus) musicStatus.textContent = 'PAUSE';
        if (trackStatus) trackStatus.textContent = 'PLAYING';
    });
    
    bgMusic.addEventListener('pause', () => {
        isPlaying = false;
        if (musicToggle) musicToggle.classList.remove('playing');
        if (musicStatus) musicStatus.textContent = 'PLAY';
        if (trackStatus) trackStatus.textContent = 'PAUSED';
    });
    
    bgMusic.addEventListener('loadeddata', () => {
        if (trackStatus) trackStatus.textContent = 'READY';
    });
    
    bgMusic.addEventListener('error', () => {
        if (trackStatus) trackStatus.textContent = 'ERROR - ADD MUSIC FILE';
        console.warn('Music file not found. Add bgmusic.mp3 to the root directory or update the audio source.');
    });
}

// Auto-play on first user interaction (to comply with browser autoplay policies)
let hasInteracted = false;
document.addEventListener('click', () => {
    if (!hasInteracted && bgMusic && !isPlaying) {
        hasInteracted = true;
        // Don't auto-play, let user control it
    }
}, { once: true });

// ============================================
// ADVANCED INTERACTIVE FEATURES
// ============================================

// Particle Emitter
function createParticle() {
    const container = document.getElementById('particleContainer');
    if (!container) return;
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 3 + 1;
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = startX + 'px';
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';
    
    // Random color variation
    const colors = ['#00FFFF', '#FF00FF', '#00FF00', '#FFFF00'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;
    particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
    
    container.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, (duration + delay) * 1000);
}

// Initialize particle emitter
function initParticleEmitter() {
    setInterval(createParticle, 300);
    // Create initial particles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createParticle(), i * 150);
    }
}

// Glitch Effect
function triggerGlitch() {
    const title = document.querySelector('.main-title');
    if (!title) return;
    
    title.classList.add('glitch');
    setTimeout(() => {
        title.classList.remove('glitch');
    }, 300);
}

// Random glitch trigger
function initGlitchEffect() {
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every interval
            triggerGlitch();
        }
    }, 5000);
}

// Debug Console
const debugConsole = document.getElementById('debugConsole');
const consoleInput = document.getElementById('consoleInput');
const consoleOutput = document.getElementById('consoleOutput');
const debugToggle = document.getElementById('debugToggle');
const consoleClose = document.getElementById('consoleClose');

function addConsoleLine(text, color = '#00FF00') {
    const line = document.createElement('div');
    line.className = 'console-line';
    line.textContent = text;
    line.style.color = color;
    consoleOutput.appendChild(line);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function executeCommand(command) {
    const cmd = command.trim().toUpperCase();
    addConsoleLine(`> ${command}`, '#00FFFF');
    
    switch(cmd) {
        case 'HELP':
            addConsoleLine('> AVAILABLE COMMANDS:');
            addConsoleLine('> HELP - Show this help');
            addConsoleLine('> ABOUT - Navigate to About section');
            addConsoleLine('> LOAD PLAYER - Navigate to Player Select');
            addConsoleLine('> QUEST - Navigate to Quest Log');
            addConsoleLine('> SCORES - Navigate to High Scores');
            addConsoleLine('> CONFIG - Navigate to Config');
            addConsoleLine('> MENU - Return to Main Menu');
            addConsoleLine('> CHEAT - Activate cheat mode');
            addConsoleLine('> CLEAR - Clear console');
            break;
        case 'ABOUT':
        case 'LOAD PLAYER':
            enhancedSwitchScreen('player-select');
            addConsoleLine('> Loading Player Select...', '#00FF00');
            break;
        case 'QUEST':
            enhancedSwitchScreen('quest-log');
            addConsoleLine('> Loading Quest Log...', '#00FF00');
            break;
        case 'SCORES':
            enhancedSwitchScreen('high-scores');
            addConsoleLine('> Loading High Scores...', '#00FF00');
            break;
        case 'CONFIG':
            enhancedSwitchScreen('config');
            addConsoleLine('> Loading Config...', '#00FF00');
            break;
        case 'MENU':
            enhancedSwitchScreen('main-menu');
            addConsoleLine('> Returning to Main Menu...', '#00FF00');
            break;
        case 'CHEAT':
            activateCheatMode();
            break;
        case 'CLEAR':
            consoleOutput.innerHTML = '';
            addConsoleLine('> Console cleared.', '#00FF00');
            break;
        default:
            addConsoleLine(`> Unknown command: ${command}`, '#FF0040');
            addConsoleLine('> Type HELP for available commands', '#FFFF00');
    }
}

function activateCheatMode() {
    addConsoleLine('> CHEAT MODE ACTIVATED!', '#FF00FF');
    addConsoleLine('> Color palette changing...', '#FF00FF');
    
    document.body.style.filter = 'hue-rotate(180deg)';
    document.body.style.transition = 'filter 0.5s';
    
    setTimeout(() => {
        document.body.style.filter = '';
        addConsoleLine('> Cheat mode deactivated.', '#00FF00');
    }, 5000);
}

if (debugToggle) {
    debugToggle.addEventListener('click', () => {
        if (debugConsole) {
            debugConsole.classList.toggle('active');
            if (debugConsole.classList.contains('active')) {
                consoleInput.focus();
            }
        }
    });
}

if (consoleClose) {
    consoleClose.addEventListener('click', () => {
        if (debugConsole) {
            debugConsole.classList.remove('active');
        }
    });
}

if (consoleInput) {
    consoleInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = consoleInput.value;
            if (command) {
                executeCommand(command);
                consoleInput.value = '';
            }
        }
    });
}

// Theme Switcher and Scanline Toggle - Initialize when DOM is ready
function initScreenSettings() {
    // Theme Switcher
    const themeButtons = document.querySelectorAll('.theme-button');
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            document.body.className = '';
            if (theme !== 'cyan') {
                document.body.classList.add(`theme-${theme}`);
            }
            themeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            console.log('Theme changed to:', theme);
        });
    });

    // Scanline Toggle
    const scanlineToggle = document.getElementById('scanlineToggle');
    const scanlineStatus = document.getElementById('scanlineStatus');
    let scanlinesEnabled = true;

    if (scanlineToggle) {
        scanlineToggle.addEventListener('click', () => {
            scanlinesEnabled = !scanlinesEnabled;
            if (scanlinesEnabled) {
                document.body.classList.remove('scanlines-off');
                if (scanlineStatus) scanlineStatus.textContent = 'ON';
            } else {
                document.body.classList.add('scanlines-off');
                if (scanlineStatus) scanlineStatus.textContent = 'OFF';
            }
            console.log('Scanlines:', scanlinesEnabled ? 'ON' : 'OFF');
        });
    }
}

// Initialize screen settings when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScreenSettings);
} else {
    initScreenSettings();
}


// Debug Console Toggle (keep only tilde key for console)
document.addEventListener('keydown', (e) => {
    // Tilde (~) for debug console
    if (e.key === '`' || e.key === '~') {
        if (debugConsole) {
            debugConsole.classList.toggle('active');
            if (debugConsole.classList.contains('active') && consoleInput) {
                consoleInput.focus();
            }
        }
    }
});

// Parallax Effect removed - keeping simple version

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initParticleEmitter();
    initGlitchEffect();
    
    // Add initial console message
    if (consoleOutput) {
        addConsoleLine('> System initialized.', '#00FF00');
        addConsoleLine('> Press ~ to toggle debug console', '#00FFFF');
    }
});

// Console log for debugging
console.log('%cCYBER-SYNTHESIZER PORTFOLIO', 'color: #00FFFF; font-size: 20px; font-weight: bold;');
console.log('%cSystems Ready. All modules loaded.', 'color: #00FF00; font-size: 12px;');
console.log('%cMusic Controls: Click the music button to start playback', 'color: #FF00FF; font-size: 12px;');
console.log('%cPress ~ to open debug console', 'color: #FFFF00; font-size: 12px;');

