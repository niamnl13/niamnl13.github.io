// HAMBURGER MENU TOGGLE
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Tutup menu setelah klik link (mobile UX)
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});


// NAVBAR SHADOW ON SCROLL
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll(
    'section, .project-card, .timeline-item, .skill-item, .contact-item'
);

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();

        if (rect.top < triggerBottom) {
            el.classList.add('show');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


// ACTIVE MENU SCROLLSPY
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(sec => {
        const offset = sec.offsetTop - 100;
        const height = sec.offsetHeight;

        if (pageYOffset >= offset && pageYOffset < offset + height) {
            current = sec.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

