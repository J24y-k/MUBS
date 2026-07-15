document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
            }
        });
    });

    // Language Switch
    function switchLanguage(lang, page) {
        if (page === 'about') {
            window.location.href = lang === 'fr' ? '/About/about-fr.html' : '/About/about.html';
        } else {
            window.location.href = lang === 'fr' ? '/index-fr.html' : '/index.html';
        }
    }

    // Add click handlers for language switch
    document.querySelectorAll('.lang-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = e.target.getAttribute('lang');
            const page = window.location.pathname.includes('about') ? 'about' : 'index';
            switchLanguage(lang, page);
        });
    });

    // Animation on scroll for navbar
    const animateElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${entry.target.dataset.animateDelay || 0}s`;
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Animation trigger on scroll for Offerings and Accreditations
    function checkVisibility() {
        const offeringsItems = document.querySelectorAll('.offering-item');
        const accreditationsItems = document.querySelectorAll('.accreditation-item');

        offeringsItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('animate');
            }
        });

        accreditationsItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('animate');
            }
        });
    }

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    // Run on scroll and initial load
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Check on page load
});