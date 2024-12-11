// Initialize AOS with enhanced settings
AOS.init({
    duration: 1000,
    once: false,
    offset: 50,
    easing: 'ease-out-cubic',
    mirror: true
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const words = ['BCA Student', 'Java Developer', 'Problem Solver', 'Tech Enthusiast'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Add blinking cursor effect
    typingText.style.borderRight = isDeleting ? 'none' : '2px solid var(--secondary-color)';

    const typingSpeed = isDeleting ? 50 : 100;
    const delay = isDeleting && charIndex === 0 ? 1000 : 
                 !isDeleting && charIndex === currentWord.length ? 2000 : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => {
            typingText.style.borderRight = 'none';
            isDeleting = true;
        }, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(type, delay);
}

// Start typing animation
type();

// Smooth scroll for internal links
const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${id}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Smooth parallax effect for hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Form submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Progress bar animation on scroll
const skillCards = document.querySelectorAll('.skill-card');
const progressBars = document.querySelectorAll('.progress');

const animateProgress = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress');
            if (progressBar) {
                progressBar.style.width = progressBar.getAttribute('aria-valuenow') + '%';
            }
        }
    });
};

const progressObserver = new IntersectionObserver(animateProgress, {
    threshold: 0.5
});

skillCards.forEach(card => {
    progressObserver.observe(card);
});
