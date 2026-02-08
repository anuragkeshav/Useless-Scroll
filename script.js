// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initParallaxEffects();
    initHoverInteractions();
    initRestartButton();
});

// ===================================
// SCROLL-DRIVEN ANIMATIONS
// ===================================
function initScrollAnimations() {
    // Intersection Observer for section-based animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');

                // Trigger specific animations based on section
                const sectionId = entry.target.id;
                switch (sectionId) {
                    case 'float':
                        animateFloatSection();
                        break;
                    case 'tension':
                        animateTensionSection();
                        break;
                    case 'memory':
                        animateMemorySection();
                        break;
                    case 'cosmic':
                        animateCosmicSection();
                        break;
                    case 'ending':
                        animateEndingSection();
                        break;
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });
}

// ===================================
// PARALLAX EFFECTS
// ===================================
function initParallaxEffects() {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function updateParallax() {
    const scrolled = window.scrollY;

    // Parallax for tension section background
    const parallaxBg = document.getElementById('parallaxBg');
    if (parallaxBg) {
        const tensionSection = document.getElementById('tension');
        const rect = tensionSection.getBoundingClientRect();
        const offset = (rect.top + window.scrollY - window.scrollY) * 0.5;
        parallaxBg.style.transform = `translateY(${offset * 0.3}px)`;
    }

    // Parallax for cosmic section stars
    const starsBg = document.getElementById('starsBg');
    if (starsBg) {
        const cosmicSection = document.getElementById('cosmic');
        const rect = cosmicSection.getBoundingClientRect();
        const scrollProgress = -rect.top / window.innerHeight;
        starsBg.style.backgroundPosition = `${scrollProgress * 50}% ${scrollProgress * 50}%`;
    }

    // Scale effect on dinosaur chase based on scroll
    const dinoChase = document.getElementById('dinoChase');
    if (dinoChase) {
        const tensionSection = document.getElementById('tension');
        const rect = tensionSection.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const progress = 1 - (rect.top / window.innerHeight);
            const scale = 1 + (progress * 0.15);
            const translateX = progress * 30 - 15;

            dinoChase.style.transform = `translate(calc(-50% + ${translateX}px), -50%) scale(${scale})`;
        }
    }

    // Rotation effect on pizza cat
    const pizzaCat = document.getElementById('pizzaCat');
    if (pizzaCat && !pizzaCat.matches(':hover')) {
        const cosmicSection = document.getElementById('cosmic');
        const rect = cosmicSection.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const progress = -rect.top / window.innerHeight;
            const rotation = progress * 360;

            pizzaCat.style.transform = `rotate(${rotation}deg)`;
        }
    }
}

// ===================================
// SECTION-SPECIFIC ANIMATIONS
// ===================================
function animateFloatSection() {
    const caption = document.querySelector('.caption-punchline');
    if (caption) {
        caption.style.animation = 'fadeIn 1s ease-in-out 0.8s forwards';
    }
}

function animateTensionSection() {
    const title = document.querySelector('.tension-title');
    const subtitle = document.querySelector('.tension-subtitle');

    if (title) {
        title.style.animation = 'glitch 2s ease-in-out';
    }
    if (subtitle) {
        subtitle.style.opacity = '0';
        setTimeout(() => {
            subtitle.style.animation = 'fadeIn 1s ease-in-out forwards';
        }, 500);
    }
}

function animateMemorySection() {
    const memoryImage = document.getElementById('catXP');
    if (memoryImage) {
        memoryImage.style.filter = 'blur(2px) saturate(0.7)';
        setTimeout(() => {
            memoryImage.style.transition = 'filter 2s ease-out';
            memoryImage.style.filter = 'blur(0.5px) saturate(0.9)';
        }, 600);
    }
}

function animateCosmicSection() {
    const cosmicTitle = document.querySelector('.cosmic-title');
    if (cosmicTitle) {
        cosmicTitle.style.opacity = '0';
        cosmicTitle.style.transform = 'translateY(20px)';
        setTimeout(() => {
            cosmicTitle.style.transition = 'all 1s ease-out';
            cosmicTitle.style.opacity = '1';
            cosmicTitle.style.transform = 'translateY(0)';
        }, 300);
    }
}

function animateEndingSection() {
    const endingTitle = document.querySelector('.ending-title');
    const endingSubtitle = document.querySelector('.ending-subtitle');
    const restartBtn = document.querySelector('.restart-button');

    if (endingTitle) {
        endingTitle.style.opacity = '0';
        endingTitle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            endingTitle.style.transition = 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
            endingTitle.style.opacity = '1';
            endingTitle.style.transform = 'scale(1)';
        }, 200);
    }

    if (endingSubtitle) {
        endingSubtitle.style.opacity = '0';
        setTimeout(() => {
            endingSubtitle.style.transition = 'opacity 1s ease-in-out';
            endingSubtitle.style.opacity = '0.8';
        }, 800);
    }

    if (restartBtn) {
        restartBtn.style.opacity = '0';
        restartBtn.style.transform = 'translateY(20px)';
        setTimeout(() => {
            restartBtn.style.transition = 'all 1s ease-out';
            restartBtn.style.opacity = '1';
            restartBtn.style.transform = 'translateY(0)';
        }, 1400);
    }
}

// ===================================
// HOVER INTERACTIONS
// ===================================
function initHoverInteractions() {
    // Floating cat zoom with awkward intimacy
    const catWater = document.getElementById('catWater');
    if (catWater) {
        catWater.addEventListener('mouseenter', () => {
            catWater.style.transform = 'scale(1.08)';
            catWater.style.filter = 'brightness(1.1)';
        });
        catWater.addEventListener('mouseleave', () => {
            catWater.style.transform = 'scale(1)';
            catWater.style.filter = 'brightness(1)';
        });
    }

    // Dinosaur chase subtle zoom
    const dinoChase = document.getElementById('dinoChase');
    if (dinoChase) {
        let baseTransform = '';

        dinoChase.addEventListener('mouseenter', function (e) {
            baseTransform = this.style.transform || 'translate(-50%, -50%)';
            this.style.transform = baseTransform.replace('scale(', 'scale(1.03 * ');
            if (!this.style.transform.includes('scale')) {
                this.style.transform += ' scale(1.03)';
            }
        });

        dinoChase.addEventListener('mouseleave', function () {
            this.style.transform = baseTransform;
        });
    }

    // Memory image sharpening on hover
    const catXP = document.getElementById('catXP');
    if (catXP) {
        catXP.addEventListener('mouseenter', () => {
            catXP.style.filter = 'blur(0px) saturate(1.1)';
            catXP.style.opacity = '1';
            catXP.style.transform = 'scale(1.02)';
        });
        catXP.addEventListener('mouseleave', () => {
            catXP.style.filter = 'blur(0.5px) saturate(0.9)';
            catXP.style.opacity = '0.9';
            catXP.style.transform = 'scale(1)';
        });
    }

    // Pizza cat dramatic rotation on hover
    const pizzaCat = document.getElementById('pizzaCat');
    if (pizzaCat) {
        pizzaCat.addEventListener('mouseenter', () => {
            pizzaCat.style.transform = 'scale(1.1) rotate(5deg)';
        });
        pizzaCat.addEventListener('mouseleave', () => {
            // Return to scroll-driven rotation
            updateParallax();
        });
    }
}

// ===================================
// RESTART BUTTON
// ===================================
function initRestartButton() {
    const restartBtn = document.getElementById('restartBtn');

    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            // Add glitch effect to button
            restartBtn.style.animation = 'glitch 0.5s ease-in-out';

            // Small delay for dramatic effect
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 300);

            // Reset button animation
            setTimeout(() => {
                restartBtn.style.animation = '';
            }, 800);
        });
    }
}

// ===================================
// ADDITIONAL SMOOTH INTERACTIONS
// ===================================

// Add smooth scroll behavior to the entire document
document.documentElement.style.scrollBehavior = 'smooth';

// Performance optimization: throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(() => {
        updateParallax();
    });
});

// Add 'loaded' class to body for potential CSS animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
