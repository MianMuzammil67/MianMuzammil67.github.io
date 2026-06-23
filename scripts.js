// ==========================================
// Navigation Toggle
// ==========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// ==========================================
// Navbar Scroll Effect
// ==========================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// Active Navigation Link Based on Scroll
// ==========================================
const sections = document.querySelectorAll('section[id]');

const observerOptions = {
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// ==========================================
// Smooth Scroll
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// Intersection Observer for Animations
// ==========================================
const animateElements = document.querySelectorAll('[data-animate]');

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 100);
            animationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

animateElements.forEach(element => {
    animationObserver.observe(element);
});

// ==========================================
// Skill Bars Animation
// ==========================================
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target;
            const width = progress.style.width;
            progress.style.width = '0%';
            setTimeout(() => {
                progress.style.width = width;
            }, 200);
            skillObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ==========================================
// Timeline Animation
// ==========================================
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 150);
            timelineObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// ==========================================
// Skill Categories Animation
// ==========================================
const skillCategories = document.querySelectorAll('.skill-category');

const categoryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 100);
            categoryObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

skillCategories.forEach(category => {
    categoryObserver.observe(category);
});

// ==========================================
// Additional Skills Animation
// ==========================================
const additionalSkills = document.querySelector('.additional-skills');

if (additionalSkills) {
    const additionalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                additionalObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    additionalObserver.observe(additionalSkills);
}

// ==========================================
// Education Cards Animation
// ==========================================
const educationCards = document.querySelectorAll('.education-card');

const educationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 150);
            educationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

educationCards.forEach(card => {
    educationObserver.observe(card);
});

// ==========================================
// Contact Items Animation
// ==========================================
const contactItems = document.querySelectorAll('.contact-item');

const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 100);
            contactObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

contactItems.forEach(item => {
    contactObserver.observe(item);
});

// ==========================================
// Contact CTA Animation
// ==========================================
const contactCTA = document.querySelector('.contact-cta');

if (contactCTA) {
    const ctaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                ctaObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    ctaObserver.observe(contactCTA);
}

// ==========================================
// Open Source Section Animations
// ==========================================
const publishedCards = document.querySelectorAll('.published-card');

const publishedObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 100);
            publishedObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

publishedCards.forEach(card => {
    publishedObserver.observe(card);
});

const publishedSummary = document.querySelector('.published-summary');

if (publishedSummary) {
    const summaryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                summaryObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    summaryObserver.observe(publishedSummary);
}

const statCards = document.querySelectorAll('.stat-card');

const statCardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 100);
            statCardObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

statCards.forEach(card => {
    statCardObserver.observe(card);
});

const contributionCards = document.querySelectorAll('.contribution-card');

const contributionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 100);
            contributionObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

contributionCards.forEach(card => {
    contributionObserver.observe(card);
});

const notableContributions = document.querySelector('.notable-contributions');

if (notableContributions) {
    const notableObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                notableObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    notableObserver.observe(notableContributions);
}

const opensourceCTA = document.querySelector('.opensource-cta');

if (opensourceCTA) {
    const opensourceCTAObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                opensourceCTAObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    opensourceCTAObserver.observe(opensourceCTA);
}

// ==========================================
// Cursor Animation (Optional Enhancement)
// ==========================================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const diffX = mouseX - cursorX;
    const diffY = mouseY - cursorY;
    
    cursorX += diffX * 0.1;
    cursorY += diffY * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

// Only enable custom cursor on desktop
if (window.innerWidth > 768) {
    animateCursor();
} else {
    cursor.style.display = 'none';
}

// ==========================================
// Scroll to Top Button
// ==========================================
const createScrollToTopBtn = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.className = 'scroll-to-top';
    btn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

createScrollToTopBtn();

// Add styles for scroll to top button and cursor
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--accent-color);
        color: var(--primary-bg);
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 20px rgba(0, 255, 136, 0.3);
    }
    
    .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 30px rgba(0, 255, 136, 0.5);
    }
    
    .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--accent-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        mix-blend-mode: difference;
    }
    
    @media (max-width: 768px) {
        .scroll-to-top {
            width: 45px;
            height: 45px;
            bottom: 20px;
            right: 20px;
        }
        
        .custom-cursor {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// Performance Optimization: Lazy Loading Images
// ==========================================
const images = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ==========================================
// Console Easter Egg
// ==========================================
console.log(`
                                   
%c Android Developer Portfolio
%c Built with HTML, CSS, and JavaScript
%c GitHub: https://github.com/MianMuzammil67
`,
'color: #00ff88; font-weight: bold;',
'color: #00ff88; font-size: 16px; font-weight: bold;',
'color: #a8b2d1; font-size: 12px;',
'color: #00d4ff; font-size: 14px;'
);

// ==========================================
// Print Statistics on Page Load
// ==========================================
window.addEventListener('load', () => {
    console.log('%c✓ Portfolio loaded successfully', 'color: #00ff88; font-weight: bold;');
    console.log(`%c📊 Page Statistics:`, 'color: #00d4ff; font-weight: bold;');
    console.log(`   - Sections: ${sections.length}`);
    console.log(`   - Skills: ${skillBars.length}`);
    console.log(`   - Timeline Items: ${timelineItems.length}`);
    console.log(`   - Loading projects from GitHub...`);
});
