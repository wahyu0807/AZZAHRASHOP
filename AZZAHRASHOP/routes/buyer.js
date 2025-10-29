const express = require('express');
const path = require('path');
const fs = require('fs-extra');

const router = express.Router();

const ORDERS_FILE = path.join(__dirname, '..', 'data', 'orders.json');

function readOrders() {
  if (!fs.existsSync(ORDERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
}

// Middleware to check buyer role
function requireBuyer(req, res, next) {
  if (req.session.user && req.session.user.role === 'buyer') {
    next();
  } else {
    res.status(403).send('Akses ditolak');
  }
}

router.use(requireBuyer);

// Dashboard
router.get('/', (req, res) => {
  const orders = readOrders().filter(o => o.userId === req.session.user.id);

  res.render('buyer-dashboard', { orders, user: req.session.user });
});

// Order history
router.get('/orders', (req, res) => {
  const orders = readOrders().filter(o => o.userId === req.session.user.id);

  res.render('order-history', { orders, user: req.session.user });
});

module.exports = router;
