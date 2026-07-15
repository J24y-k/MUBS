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

function renderProducts(category) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  grid.innerHTML = '';
  let prods = [];
  const isFrench = window.location.pathname.includes('-fr.html');

  if (category === 'all') {
    Object.entries(products).forEach(([catName, catItems]) => {
      prods = prods.concat(catItems.map(p => ({ ...p, category: catName })));
    });
  } else {
    prods = (products[category] || []).map(p => ({ ...p, category }));
  }

  prods.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-item';
    card.dataset.category = product.category;
    card.dataset.id = product.id;
    card.innerHTML = `
      <img src="${product.image}" alt="${product.alt[isFrench ? 'fr' : 'en']}" class="product-image" 
        onerror="this.src='https://via.placeholder.com/150x150?text=No+Image'">
      <div class="overlay"><p>${product.name[isFrench ? 'fr' : 'en']}</p></div>
      <div class="product-description">${product.description[isFrench ? 'fr' : 'en']}</div>
      <button class="add-to-cart">${isFrench ? 'Ajouter au Panier' : 'Add to Cart'}</button>
    `;
    grid.appendChild(card);
  });
}

// Initial render for default category
renderProducts('all');

// Tab switching logic
document.querySelectorAll('.tab-button').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    renderProducts(this.getAttribute('data-category'));
  });
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}

updateCartCount();

// Add to cart from product grid
document.getElementById('product-grid').addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart')) {
    e.stopPropagation();
    const card = e.target.closest('.product-item');
    const category = card.dataset.category;
    const id = parseInt(card.dataset.id);
    const product = products[category].find(p => p.id === id);
    const isFrench = window.location.pathname.includes('-fr.html');

    const existing = cart.find(item => item.id === id && item.category === category);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: product.minimumOrder, category });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(isFrench 
      ? `${product.name.fr} ajouté au panier (minimum ${product.minimumOrder} unités) !` 
      : `${product.name.en} added to cart (minimum ${product.minimumOrder} units)!`);
  }
});

// Make cards clickable to details
document.getElementById('product-grid').addEventListener('click', (e) => {
  const card = e.target.closest('.product-item');
  if (card && !e.target.classList.contains('add-to-cart')) {
    const isFrench = window.location.pathname.includes('-fr.html');
    window.location.href = `product-details${isFrench ? '-fr' : ''}.html?category=${card.dataset.category}&id=${card.dataset.id}`;
  }
});

// Cart icon to cart page
document.getElementById('cart-icon').addEventListener('click', () => {
  const isFrench = window.location.pathname.includes('-fr.html');
  window.location.href = isFrench ? 'cart-fr.html' : 'cart.html';
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined') {
    initCustomCursor();
    gsap.from('.product-item', { duration: 1, y: 50, opacity: 0, stagger: 0.2, ease: 'power3.out' });
  } else {
    console.error('GSAP library is not loaded. Please include GSAP in your project.');
  }
});