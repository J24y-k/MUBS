function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;
  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
  });
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
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
  updateCartCount();
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('qty-btn')) {
    const index = parseInt(e.target.dataset.index);
    const action = e.target.dataset.action;
    if (action === 'increase') cart[index].quantity += 1;
    else if (action === 'decrease' && cart[index].quantity > 50) cart[index].quantity -= 1;
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
  if (cart.length > 0) window.location.href = 'checkout.html';
  else alert('Your cart is empty!');
});

// Cart icon to cart page
document.getElementById('cart-icon').addEventListener('click', () => {
  window.location.href = 'cart.html';
});

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined') initCustomCursor();
  renderCart();
});