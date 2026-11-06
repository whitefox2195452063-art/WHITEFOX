const products = [
  {
    id: 1,
    name: 'Velocity Runner',
    type: 'Running',
    category: 'men',
    price: 148,
    color: 'linear-gradient(135deg, #d9f5ff 0%, #b6d8ff 48%, #bad7ff 100%)',
  },
  {
    id: 2,
    name: 'Drift Form',
    type: 'Training',
    category: 'women',
    price: 126,
    color: 'linear-gradient(135deg, #f4d8f7 0%, #d8c4ff 42%, #f0c4d8 100%)',
  },
  {
    id: 3,
    name: 'Summit Sling',
    type: 'Accessories',
    category: 'accessories',
    price: 68,
    color: 'linear-gradient(135deg, #d6f7c4 0%, #b5e2d6 48%, #d1f9ff 100%)',
  },
  {
    id: 4,
    name: 'Coast Tote',
    type: 'Travel',
    category: 'women',
    price: 92,
    color: 'linear-gradient(135deg, #ffe9b8 0%, #ffcf8a 40%, #ffd7d0 100%)',
  },
  {
    id: 5,
    name: 'North Pack',
    type: 'Essentials',
    category: 'men',
    price: 132,
    color: 'linear-gradient(135deg, #cedcff 0%, #9eb8ff 46%, #d4d4ff 100%)',
  },
  {
    id: 6,
    name: 'Apex Cap',
    type: 'Accessories',
    category: 'accessories',
    price: 38,
    color: 'linear-gradient(135deg, #dadde5 0%, #9bb0c8 40%, #d8e3ee 100%)',
  },
  {
    id: 7,
    name: 'Core Zip',
    type: 'Layering',
    category: 'men',
    price: 114,
    color: 'linear-gradient(135deg, #e5d4ff 0%, #cab8ff 40%, #b9d3ff 100%)',
  },
  {
    id: 8,
    name: 'Harbor Set',
    type: 'Essentials',
    category: 'women',
    price: 154,
    color: 'linear-gradient(135deg, #ffd9d9 0%, #ffc0ae 32%, #f7e2d7 100%)',
  },
];

const productGrid = document.querySelector('#product-grid');
const cartItems = document.querySelector('#cart-items');
const cartCount = document.querySelector('#cart-count');
const subtotalEl = document.querySelector('#subtotal');
const filterButtons = document.querySelectorAll('.filter');

let currentFilter = 'all';
const cart = [];

function formatPrice(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function renderProducts() {
  const items = currentFilter === 'all'
    ? products
    : products.filter((product) => product.category === currentFilter);

  productGrid.innerHTML = items
    .map(
      (product) => `
        <article class="product-item" data-category="${product.category}">
          <div class="product-art" style="background: ${product.color};"></div>
          <div class="product-details">
            <div class="product-row">
              <h3 class="product-name">${product.name}</h3>
              <strong class="price-tag">${formatPrice(product.price)}</strong>
            </div>
            <p class="product-type">${product.type}</p>
            <div class="product-bottom">
              <span>New drop</span>
              <button class="add-btn" data-id="${product.id}" type="button">Add</button>
            </div>
          </div>
        </article>
      `
    )
    .join('');
}

function updateCart() {
  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty-state">Your cart is empty.</p>';
    cartCount.textContent = '0';
    subtotalEl.textContent = '$0.00';
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  cartCount.textContent = String(cart.length);
  subtotalEl.textContent = formatPrice(subtotal);

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <div class="cart-thumb" style="background: ${item.color};"></div>
          <div>
            <h4>${item.name}</h4>
            <p>1 item</p>
          </div>
          <strong>${formatPrice(item.price)}</strong>
        </div>
      `
    )
    .join('');
}

function addToCart(id) {
  const product = products.find((item) => item.id === Number(id));
  if (!product) return;
  cart.push(product);
  updateCart();
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    renderProducts();
  });
});

productGrid.addEventListener('click', (event) => {
  const addButton = event.target.closest('.add-btn');
  if (!addButton) return;
  addToCart(addButton.dataset.id);
});

renderProducts();
updateCart();
