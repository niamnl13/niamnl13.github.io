// ====================================
// HAMBURGER MENU TOGGLE
// ====================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu after clicking link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ====================================
// NAVBAR SCROLL EFFECT
// ====================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        navbar.style.background = 'rgba(15, 15, 15, 0.98)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    }

    lastScroll = currentScroll;
});

// ====================================
// SMOOTH SCROLL & ACTIVE MENU
// ====================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');
const sideNavItems = document.querySelectorAll('.side-nav li');

// Function to update active states
function updateActiveSection() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    // Update nav menu
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Update side nav
    sideNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === current) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveSection);

// Side nav click handlers
sideNavItems.forEach(item => {
    item.addEventListener('click', () => {
        const section = item.getAttribute('data-section');
        document.getElementById(section)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Smooth scroll for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ====================================
// INTERSECTION OBSERVER - SCROLL ANIMATIONS
// ====================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) translateX(0)';
        }
    });
}, observerOptions);

// Elements to animate
const animateElements = document.querySelectorAll(`
    .section-content,
    .section-image,
    .project-card,
    .timeline-item,
    .stat-card,
    .skill-category,
    .contact-item,
    .achievement-item
`);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// ====================================
// PROJECT CARDS TILT EFFECT
// ====================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ====================================
// PARALLAX EFFECT FOR IMAGES
// ====================================
window.addEventListener('scroll', () => {
    const images = document.querySelectorAll('.image-container, .image-wrapper');
    
    images.forEach(img => {
        const rect = img.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
        
        if (scrollPercent > 0 && scrollPercent < 1) {
            const translateY = (scrollPercent - 0.5) * 50;
            img.style.transform = `translateY(${translateY}px)`;
        }
    });
});

// ====================================
// TYPING EFFECT (Optional)
// ====================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply to subtitle on page load
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        setTimeout(() => {
            typeWriter(subtitle, text, 80);
        }, 500);
    }
});

// ====================================
// CURSOR FOLLOW EFFECT (Desktop Only)
// ====================================
if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursorFollower);

    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            width: 8px;
            height: 8px;
            background: var(--accent);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.15s;
            mix-blend-mode: difference;
        }
        
        .cursor-follower {
            width: 40px;
            height: 40px;
            border: 1px solid var(--accent);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9998;
            opacity: 0.5;
            transition: transform 0.3s;
            mix-blend-mode: difference;
        }
    `;
    document.head.appendChild(style);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const delay = 0.1;
        
        cursorX += (mouseX - cursorX) * delay;
        cursorY += (mouseY - cursorY) * delay;

        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        cursorFollower.style.left = cursorX - 20 + 'px';
        cursorFollower.style.top = cursorY - 20 + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(0.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// ====================================
// PERFORMANCE: Debounce Function
// ====================================
function debounce(func, wait = 10) {
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

// ====================================
// PAGE LOAD ANIMATION
// ====================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Trigger initial animation check
    setTimeout(() => {
        updateActiveSection();
    }, 100);
});

// Set initial body opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// ====================================
// SCROLL TO TOP ON REFRESH
// ====================================
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});
