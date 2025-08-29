function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) {
    console.error('Custom cursor element #custom-cursor not found.');
    return;
  }
  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: "power2.out"
    });
  });
}

function handleQuoteFormSubmission() {
  const form = document.getElementById('eft-form');
  const statusMessage = document.getElementById('status-message');
  const popup = document.getElementById('success-popup');
  const popupMessage = document.getElementById('popup-message');
  if (!form || !statusMessage || !popup || !popupMessage) {
    console.error('Form, status message, or popup elements not found.');
    return;
  }
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const notes = document.getElementById('notes').value.trim();
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Validate form and cart
    if (!name || !email || !phone) {
      statusMessage.textContent = 'Please fill in all required fields.';
      statusMessage.classList.add('error');
      return;
    }
    if (cart.length === 0) {
      statusMessage.textContent = 'Your cart is empty. Please add products before requesting a quote.';
      statusMessage.classList.add('error');
      return;
    }

    // Format cart details for email
    const cartDetails = cart.map(item => `${item.name}: ${item.quantity}`).join(', ');
    document.getElementById('cart-details').value = cartDetails;

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
        statusMessage.textContent = 'Quote request submitted successfully!';
        statusMessage.classList.add('success');
        // Show popup with personalized message (includes cart details)
        popupMessage.textContent = `Hi ${name}, your query for ${cartDetails} has been received, an agent will attend to your quote as soon as possible.`;
        popup.style.display = 'flex';
        form.reset();
        localStorage.removeItem('cart'); // Clear cart
        renderCart(); // Update cart display
        // Redirect to products.html after 6 seconds
        setTimeout(() => {
          window.location.href = 'products.html';
        }, 6000);
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(error => {
      console.error('Formspree error:', error);
      statusMessage.textContent = 'Failed to submit quote request. Please try again later.';
      statusMessage.classList.add('error');
    });

    // Close popup when clicking the close button
    document.getElementById('close-popup').addEventListener('click', function() {
      popup.style.display = 'none';
    });

    // Close popup when clicking outside the popup content
    popup.addEventListener('click', function(event) {
      if (event.target === popup) {
        popup.style.display = 'none';
      }
    });
  });
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItems = document.getElementById('cart-items');

function renderCart() {
  cartItems.innerHTML = '';
  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <span>${item.name} x ${item.quantity}</span>
      <div class="quantity-controls">
        <button class="qty-btn" data-index="${index}" data-action="decrease">-</button>
        <span>${item.quantity}</span>
        <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
      </div>
      <button class="remove-item" data-index="${index}">Remove</button>
    `;
    cartItems.appendChild(div);
  });
  // Update cart count in header
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('qty-btn')) {
    const index = parseInt(e.target.dataset.index);
    const action = e.target.dataset.action;
    if (action === 'increase') {
      cart[index].quantity += 1;
    } else if (action === 'decrease' && cart[index].quantity > 50) {
      cart[index].quantity -= 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  } else if (e.target.classList.contains('remove-item')) {
    const index = parseInt(e.target.dataset.index);
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  handleQuoteFormSubmission();
  if (typeof gsap !== 'undefined') {
    initCustomCursor();
  } else {
    console.error('GSAP library is not loaded. Please include GSAP in your project.');
  }
  renderCart();
});