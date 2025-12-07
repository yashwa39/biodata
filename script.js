// ============================================
// CYBER-SYNTHESIZER PORTFOLIO INTERACTIVITY
// ============================================

// Custom Cursor Movement
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorOutline.style.left = e.clientX + 'px';
        cursorOutline.style.top = e.clientY + 'px';
    }, 50);
});

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
    const currentScreen = document.querySelector('.screen.active');
    const targetScreen = document.getElementById(targetId);
    
    if (!targetScreen || currentScreen === targetScreen) return;
    
    // Trigger screen flicker
    screenFlicker.classList.add('active');
    setTimeout(() => {
        screenFlicker.classList.remove('active');
    }, 100);
    
    // Pixel dissolve transition
    currentScreen.classList.add('transitioning-out');
    
    setTimeout(() => {
        currentScreen.classList.remove('active', 'transitioning-out');
        targetScreen.classList.add('active');
        
        // Animate stat bars when entering player-select
        if (targetId === 'player-select') {
            animateStatBars();
        }
    }, 300);
}

// Button click handlers
document.querySelectorAll('[data-target]').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const target = button.getAttribute('data-target');
        
        // Button press animation
        button.style.transform = 'translateY(4px)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        // Play sound effect (optional - commented out)
        // playSound('click');
        
        switchScreen(target);
    });
});

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

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const currentScreen = document.querySelector('.screen.active');
    
    if (e.key === 'Escape') {
        switchScreen('main-menu');
    }
    
    // Arrow key navigation (optional)
    if (e.key === 'ArrowRight') {
        const screens = ['main-menu', 'player-select', 'quest-log', 'high-scores', 'config'];
        const currentIndex = screens.indexOf(currentScreen.id);
        if (currentIndex < screens.length - 1) {
            switchScreen(screens[currentIndex + 1]);
        }
    }
    
    if (e.key === 'ArrowLeft') {
        const screens = ['main-menu', 'player-select', 'quest-log', 'high-scores', 'config'];
        const currentIndex = screens.indexOf(currentScreen.id);
        if (currentIndex > 0) {
            switchScreen(screens[currentIndex - 1]);
        }
    }
});

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

// Console log for debugging
console.log('%cCYBER-SYNTHESIZER PORTFOLIO', 'color: #00FFFF; font-size: 20px; font-weight: bold;');
console.log('%cSystems Ready. All modules loaded.', 'color: #00FF00; font-size: 12px;');
console.log('%cMusic Controls: Click the music button to start playback', 'color: #FF00FF; font-size: 12px;');

