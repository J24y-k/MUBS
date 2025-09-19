document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('eft-form');
  const overlay = document.querySelector('.overlay');
  const isFrench = document.documentElement.lang === 'fr';
  let lastScroll = 0;

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const notes = document.getElementById('notes').value.trim();
      const statusMessage = document.getElementById('status-message');
      const popup = document.getElementById('success-popup');
      const popupMessage = document.getElementById('popup-message');

      // Validation messages
      const messages = {
        en: {
          required: 'Please fill in all required fields.',
          invalidEmail: 'Please enter a valid email address.',
          success: 'Quote request submitted successfully!',
          popupSuccess: `Hi ${name}, your query has been received, an agent will attend to your quote as soon as possible.`,
          error: 'Failed to submit quote request. Please try again later.'
        },
        fr: {
          required: 'Veuillez remplir tous les champs requis.',
          invalidEmail: 'Veuillez entrer une adresse email valide.',
          success: 'Demande de devis soumise avec succès !',
          popupSuccess: `Bonjour ${name}, votre demande a été reçue, un agent traitera votre devis dès que possible.`,
          error: 'Échec de la soumission de la demande de devis. Veuillez réessayer plus tard.'
        }
      };
      const msg = isFrench ? messages.fr : messages.en;

      // Basic client-side validation
      if (!name || !email || !phone) {
        statusMessage.textContent = msg.required;
        statusMessage.className = 'error';
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        statusMessage.textContent = msg.invalidEmail;
        statusMessage.className = 'error';
        return;
      }

      // Prepare form data for Formspree
      const formData = new FormData(form);

      // Send form data via AJAX
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          statusMessage.textContent = msg.success;
          statusMessage.className = 'success';
          popupMessage.textContent = msg.popupSuccess;
          popup.style.display = 'flex';
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        console.error('Formspree error:', error);
        statusMessage.textContent = msg.error;
        statusMessage.className = 'error';
      });

      // Close popup when clicking the close button
      document.getElementById('close-popup').addEventListener('click', () => {
        popup.style.display = 'none';
      });

      // Close popup when clicking outside the popup content
      popup.addEventListener('click', (event) => {
        if (event.target === popup) {
          popup.style.display = 'none';
        }
      });
    });
  }

  // Scroll Animation for Overlay
  if (overlay) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const scrollDirection = currentScroll > lastScroll ? 'down' : 'up';
      const scrollDistance = Math.abs(currentScroll - lastScroll);

      if (scrollDistance > 5) {
        overlay.style.transform = scrollDirection === 'down' ? 'translateY(-20px)' : 'translateY(0)';
      }

      lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    });
  }
});