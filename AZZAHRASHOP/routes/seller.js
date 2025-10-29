const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const router = express.Router();

const PRODUCTS_FILE = path.join(__dirname, '..', 'data', 'products.json');
const NOTIFICATIONS_FILE = path.join(__dirname, '..', 'data', 'notifications.json');

const upload = multer({ dest: 'public/images/' });

function readProducts() {
  if (!fs.existsSync(PRODUCTS_FILE)) return [];
  return JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
}

function writeProducts(products) {
  fs.ensureDirSync(path.dirname(PRODUCTS_FILE));
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
}

function readNotifications() {
  if (!fs.existsSync(NOTIFICATIONS_FILE)) return [];
  return JSON.parse(fs.readFileSync(NOTIFICATIONS_FILE, 'utf8'));
}

function writeNotifications(notifications) {
  fs.ensureDirSync(path.dirname(NOTIFICATIONS_FILE));
  fs.writeFileSync(NOTIFICATIONS_FILE, JSON.stringify(notifications, null, 2));
}

// Middleware to check seller role
function requireSeller(req, res, next) {
  if (req.session.user && req.session.user.role === 'seller') {
    next();
  } else {
    res.status(403).send('Akses ditolak');
  }
}

router.use(requireSeller);

// Dashboard
router.get('/', (req, res) => {
  const products = readProducts().filter(p => p.sellerId === req.session.user.id);
  const notifications = readNotifications().filter(n => n.sellerId === req.session.user.id && !n.read);

  res.render('seller-dashboard', { products, notifications, user: req.session.user });
});

// Upload Product
router.get('/upload', (req, res) => {
  res.render('upload-product', { user: req.session.user });
});

router.post('/upload', upload.single('image'), (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const products = readProducts();

  const newProduct = {
    id: uuidv4(),
    sellerId: req.session.user.id,
    name,
    description,
    price: parseInt(price),
    category,
    image: req.file ? `/images/${req.file.filename}` : '/images/default.jpg',
    stock: parseInt(stock),
    reviews: [],
    createdAt: new Date().toISOString()
  };

  products.push(newProduct);
  writeProducts(products);

  res.redirect('/seller');
});

// Edit Product
router.get('/products/:id/edit', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === req.params.id && p.sellerId === req.session.user.id);

  if (!product) {
    return res.status(404).send('Produk tidak ditemukan');
  }

  res.render('edit-product', { product, user: req.session.user });
});

router.post('/products/:id/edit', upload.single('image'), (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const products = readProducts();
  const product = products.find(p => p.id === req.params.id && p.sellerId === req.session.user.id);

  if (!product) {
    return res.status(404).send('Produk tidak ditemukan');
  }

  product.name = name;
  product.description = description;
  product.price = parseInt(price);
  product.category = category;
  if (req.file) {
    product.image = `/images/${req.file.filename}`;
  }
  product.stock = parseInt(stock);

  writeProducts(products);

  res.redirect('/seller');
});

// Delete Product
router.post('/products/:id/delete', (req, res) => {
  let products = readProducts();
  products = products.filter(p => p.id !== req.params.id || p.sellerId !== req.session.user.id);
  writeProducts(products);

  res.redirect('/seller');
});

// Mark notification as read
router.post('/notifications/:id/read', (req, res) => {
  const notifications = readNotifications();
  const notification = notifications.find(n => n.id === req.params.id && n.sellerId === req.session.user.id);

  if (notification) {
    notification.read = true;
    writeNotifications(notifications);
  }

  res.json({ success: true });
});

module.exports = router;
