document.addEventListener('DOMContentLoaded', () => {
    // Add hover effect for action buttons
    const buttons = document.querySelectorAll('.action-button');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.1)';
        });
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Simple mobile menu toggle (optional enhancement)
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');
    if (window.innerWidth <= 768) {
        const toggleButton = document.createElement('button');
        toggleButton.innerHTML = '☰';
        toggleButton.style.fontSize = '24px';
        toggleButton.style.border = 'none';
        toggleButton.style.background = 'none';
        toggleButton.style.cursor = 'pointer';
        toggleButton.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '60px';
            nav.style.right = '15px';
            nav.style.background = '#fff';
            nav.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        });
        header.appendChild(toggleButton);
    }

    // Overlay scroll effect
    window.addEventListener('scroll', function() {
        const overlay = document.querySelector('.overlay');
        if (overlay) {
            const scrollY = window.scrollY;
            const offset = Math.min(scrollY / 10, 30); // max 30px
            overlay.style.transform = `translateY(-${offset}px)`;
        }
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