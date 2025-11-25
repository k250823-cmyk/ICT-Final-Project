
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Check if these elements exist before using them
const cartList = document.getElementById('cart-list');
const totalEl = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');

// Function to render cart
function renderCart() {
  if (!cartList || !totalEl) return; // exit if cart elements not on page

  cartList.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - Rs. ${item.price} x ${item.quantity}`;

    // Remove button only on shop page
    if (!window.location.href.includes('checkout.html')) {
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'x';
      removeBtn.addEventListener('click', () => {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
      li.appendChild(removeBtn);
    }

    cartList.appendChild(li);
    total += item.price * item.quantity;
  });

  totalEl.textContent = total;
}

// Add to Cart buttons (only if on shop page)
if (document.querySelectorAll('.product-grid button').length > 0) {
  document.querySelectorAll('.product-grid button').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('div');
      const name = parent.querySelector('h3').innerText;
      const priceText = parent.querySelector('p strong').innerText;
      const price = parseInt(priceText.replace(/[^\d]/g, ''));

      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    });
  });
}

// Checkout button redirect
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    window.location.href = 'checkout.html';
  });
}

// Initial render
renderCart();
