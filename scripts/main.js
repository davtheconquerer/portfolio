// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileMenu.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
});

// Close menu when a link is clicked
navLinks.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-expanded', 'false');
    }
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    const isClickInsideNav = navLinks.contains(event.target);
    const isClickOnMenu = mobileMenu.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnMenu && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-expanded', 'false');
    }
});

// Scroll Progress Bar
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    header.style.setProperty('--scroll-progress', scrollPercentage + '%');
});

// Update the CSS to use the property
const style = document.createElement('style');
style.textContent = `
    header::after {
        width: var(--scroll-progress, 0%);
    }
`;
document.head.appendChild(style);

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add active nav link indicator
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.card').forEach((card, index) => {
    card.classList.add(`delayed-${index % 3}`);
    observer.observe(card);
});

// Observe skill tags
document.querySelectorAll('.skill-tag').forEach((tag, index) => {
    tag.classList.add(`delayed-${index % 3}`);
    observer.observe(tag);
});

// Observe experience items
document.querySelectorAll('.experience-item').forEach((item, index) => {
    item.classList.add(`delayed-${index % 3}`);
    observer.observe(item);
});
