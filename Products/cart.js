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

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItems = document.getElementById('cart-items');

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}

function renderCart() {
  if (!cartItems) return;
  cartItems.innerHTML = '';
  const isFrench = window.location.pathname.includes('-fr.html');
  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <span>${item.name[isFrench ? 'fr' : 'en']} x ${item.quantity}</span>
      <div class="quantity-controls">
        <button class="qty-btn" data-index="${index}" data-action="decrease">-</button>
        <span>${item.quantity}</span>
        <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
      </div>
      <button class="remove-item" data-index="${index}">${isFrench ? 'Supprimer' : 'Remove'}</button>
    `;
    cartItems.appendChild(div);
  });
  updateCartCount();
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('qty-btn')) {
    const index = parseInt(e.target.dataset.index);
    const action = e.target.dataset.action;
    if (action === 'increase') {
      cart[index].quantity += 1;
    } else if (action === 'decrease' && cart[index].quantity > cart[index].minimumOrder) {
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

document.getElementById('proceed-to-checkout').addEventListener('click', () => {
  const isFrench = window.location.pathname.includes('-fr.html');
  if (cart.length > 0) {
    window.location.href = isFrench ? 'checkout-fr.html' : 'checkout.html';
  } else {
    alert(isFrench ? 'Votre panier est vide !' : 'Your cart is empty!');
  }
});

// Cart icon to cart page
document.getElementById('cart-icon').addEventListener('click', () => {
  const isFrench = window.location.pathname.includes('-fr.html');
  window.location.href = isFrench ? 'cart-fr.html' : 'cart.html';
});

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined') {
    initCustomCursor();
  } else {
    console.error('GSAP library is not loaded. Please include GSAP in your project.');
  }
  renderCart();
});