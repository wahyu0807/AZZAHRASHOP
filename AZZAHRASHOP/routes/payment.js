const express = require('express');
const path = require('path');
const fs = require('fs-extra');

const router = express.Router();

const ORDERS_FILE = path.join(__dirname, '..', 'data', 'orders.json');

function readOrders() {
  if (!fs.existsSync(ORDERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
}

function writeOrders(orders) {
  fs.ensureDirSync(path.dirname(ORDERS_FILE));
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

router.get('/:orderId', (req, res) => {
  const orders = readOrders();
  const order = orders.find(o => o.id === req.params.orderId);

  if (!order || order.userId !== req.session.user.id) {
    return res.status(404).send('Pesanan tidak ditemukan');
  }

  res.render('payment', { order, user: req.session.user });
});

router.post('/:orderId', (req, res) => {
  const orders = readOrders();
  const order = orders.find(o => o.id === req.params.orderId);

  if (!order || order.userId !== req.session.user.id) {
    return res.status(404).send('Pesanan tidak ditemukan');
  }

  // Simulate payment processing
  order.status = 'paid';
  order.paidAt = new Date().toISOString();

  writeOrders(orders);

  res.render('payment-success', { order, user: req.session.user });
});

module.exports = router;
