// Form Validation and Submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const overlay = document.querySelector('.overlay');
  let lastScroll = 0;

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (name === '' || email === '' || message === '') {
        alert('Please fill in all fields.');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      alert('Thank you for your message! We will get back to you soon.');
      form.reset();
    });
  }

  // Scroll Animation for Overlay
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDirection = currentScroll > lastScroll ? 'down' : 'up';
    const scrollDistance = Math.abs(currentScroll - lastScroll);

    if (scrollDistance > 5) { // Only trigger on noticeable scroll
      if (scrollDirection === 'down') {
        overlay.style.transform = 'translateY(-20px)'; // Slide up 20px
      } else {
        overlay.style.transform = 'translateY(0)'; // Slide back down to original position
      }
    }

    lastScroll = currentScroll <= 0 ? 0 : currentScroll; // Reset if at top
  });
});