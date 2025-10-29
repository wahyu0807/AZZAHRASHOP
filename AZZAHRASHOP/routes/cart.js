const express = require('express');
const path = require('path');
const fs = require('fs-extra');

const router = express.Router();

const PRODUCTS_FILE = path.join(__dirname, '..', 'data', 'products.json');

function readProducts() {
  if (!fs.existsSync(PRODUCTS_FILE)) return [];
  return JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
}

// Cart is stored in session
router.get('/', (req, res) => {
  const cart = req.session.cart || [];
  const products = readProducts();

  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return { ...product, quantity: item.quantity };
  });

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  res.render('cart', { cartItems, total, user: req.session.user });
});

// Add to cart
router.post('/add/:id', (req, res) => {
  const productId = req.params.id;
  const quantity = parseInt(req.body.quantity) || 1;

  if (!req.session.cart) {
    req.session.cart = [];
  }

  const existingItem = req.session.cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    req.session.cart.push({ id: productId, quantity });
  }

  res.redirect('/cart');
});

// Update cart
router.post('/update/:id', (req, res) => {
  const productId = req.params.id;
  const quantity = parseInt(req.body.quantity);

  if (req.session.cart) {
    const item = req.session.cart.find(item => item.id === productId);
    if (item) {
      if (quantity > 0) {
        item.quantity = quantity;
      } else {
        req.session.cart = req.session.cart.filter(item => item.id !== productId);
      }
    }
  }

  res.redirect('/cart');
});

// Remove from cart
router.post('/remove/:id', (req, res) => {
  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(item => item.id !== req.params.id);
  }

  res.redirect('/cart');
});

module.exports = router;
