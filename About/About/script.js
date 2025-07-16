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
});