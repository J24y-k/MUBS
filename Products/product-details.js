const params = new URLSearchParams(window.location.search);
const category = params.get('category');
const id = parseInt(params.get('id'));
const product = products[category] ? products[category].find(p => p.id === id) : null;
const isFrench = window.location.pathname.includes('-fr.html');

if (product) {
  const info = document.getElementById('product-info');
  info.innerHTML = `
    <img src="${product.image}" alt="${product.alt[isFrench ? 'fr' : 'en']}" class="product-image" style="max-width: 400px;">
    <h2 class="product-name">${product.name[isFrench ? 'fr' : 'en']}</h2>
    <p class="product-description">${product.description[isFrench ? 'fr' : 'en']}</p>
  `;
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}

updateCartCount();

document.getElementById('add-to-cart').innerText = isFrench ? 'Ajouter au Panier' : 'Add to Cart';

document.getElementById('add-to-cart').addEventListener('click', () => {
  if (!product) {
    alert(isFrench ? 'Produit non trouvé.' : 'Product not found.');
    return;
  }
  const existing = cart.find(item => item.id === product.id && item.category === category);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: product.minimumOrder, category });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  const confirmMessage = isFrench 
    ? `Voulez-vous aller au panier ? ${product.name.fr} ajouté (minimum ${product.minimumOrder} unités).` 
    : `Go to cart? ${product.name.en} added (minimum ${product.minimumOrder} units).`;
  if (confirm(confirmMessage)) {
    window.location.href = isFrench ? 'cart-fr.html' : 'cart.html';
  }
});

document.getElementById('back-button').addEventListener('click', () => {
  window.location.href = isFrench ? 'products-fr.html' : 'products.html';
});

document.getElementById('cart-icon').addEventListener('click', () => {
  window.location.href = isFrench ? 'cart-fr.html' : 'cart.html';
});