const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const PRODUCTS_FILE = path.join(__dirname, '..', 'data', 'products.json');
const ORDERS_FILE = path.join(__dirname, '..', 'data', 'orders.json');
const NOTIFICATIONS_FILE = path.join(__dirname, '..', 'data', 'notifications.json');

function readProducts() {
  if (!fs.existsSync(PRODUCTS_FILE)) return [];
  return JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
}

function writeProducts(products) {
  fs.ensureDirSync(path.dirname(PRODUCTS_FILE));
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
}

function readOrders() {
  if (!fs.existsSync(ORDERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
}

function writeOrders(orders) {
  fs.ensureDirSync(path.dirname(ORDERS_FILE));
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

function readNotifications() {
  if (!fs.existsSync(NOTIFICATIONS_FILE)) return [];
  return JSON.parse(fs.readFileSync(NOTIFICATIONS_FILE, 'utf8'));
}

function writeNotifications(notifications) {
  fs.ensureDirSync(path.dirname(NOTIFICATIONS_FILE));
  fs.writeFileSync(NOTIFICATIONS_FILE, JSON.stringify(notifications, null, 2));
}

// Shipping cost calculation (simplified)
function calculateShipping(address) {
  const baseCost = 10000;
  const cityCosts = {
    'Jakarta': 0,
    'Bandung': 5000,
    'Surabaya': 10000,
    'Medan': 15000,
    'Makassar': 20000
  };
  return baseCost + (cityCosts[address] || 10000);
}

router.get('/', (req, res) => {
  if (!req.session.user || !req.session.cart || req.session.cart.length === 0) {
    return res.redirect('/cart');
  }

  const cart = req.session.cart;
  const products = readProducts();

  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return { ...product, quantity: item.quantity };
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = calculateShipping(req.session.user.address || 'Jakarta');
  const total = subtotal + shipping;

  res.render('checkout', { cartItems, subtotal, shipping, total, user: req.session.user });
});

router.post('/', (req, res) => {
  if (!req.session.user || !req.session.cart || req.session.cart.length === 0) {
    return res.redirect('/cart');
  }

  const { address, paymentMethod } = req.body;
  const cart = req.session.cart;
  const products = readProducts();
  const orders = readOrders();
  const notifications = readNotifications();

  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return { ...product, quantity: item.quantity };
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = calculateShipping(address);
  const total = subtotal + shipping;

  const order = {
    id: uuidv4(),
    userId: req.session.user.id,
    items: cartItems,
    subtotal,
    shipping,
    total,
    address,
    paymentMethod,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  writeOrders(orders);

  // Create notifications for sellers
  cartItems.forEach(item => {
    const notification = {
      id: uuidv4(),
      sellerId: item.sellerId,
      message: `Pesanan baru untuk produk ${item.name}`,
      orderId: order.id,
      read: false,
      createdAt: new Date().toISOString()
    };
    notifications.push(notification);
  });
  writeNotifications(notifications);

  // Update product stock
  cartItems.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (product) {
      product.stock -= item.quantity;
    }
  });
  writeProducts(products);

  // Clear cart
  req.session.cart = [];

  res.redirect(`/payment/${order.id}`);
});

module.exports = router;
