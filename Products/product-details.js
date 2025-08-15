const params = new URLSearchParams(window.location.search);
const category = params.get('category');
const id = parseInt(params.get('id'));
const product = products[category] ? products[category].find(p => p.id === id) : null;

if (product) {
  const info = document.getElementById('product-info');
  info.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="product-image" style="max-width: 400px;">
    <h2 class="product-name">${product.name}</h2>
    <p class="product-description">${product.description}</p>
    <p class="product-price">R${product.price}</p>
  `;
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];
function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}
updateCartCount();

document.getElementById('add-to-cart').addEventListener('click', () => {
  const existing = cart.find(item => item.id === product.id && item.category === category);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1, category });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  if (confirm('Go to cart?')) {
    window.location.href = 'cart.html';
  }
});
