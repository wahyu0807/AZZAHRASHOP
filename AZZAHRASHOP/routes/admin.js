const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');
const PRODUCTS_FILE = path.join(__dirname, '..', 'data', 'products.json');
const ORDERS_FILE = path.join(__dirname, '..', 'data', 'orders.json');
const NOTIFICATIONS_FILE = path.join(__dirname, '..', 'data', 'notifications.json');
const BANNERS_FILE = path.join(__dirname, '..', 'data', 'banners.json');
const CATEGORIES_FILE = path.join(__dirname, '..', 'data', 'categories.json');

function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
}

function writeUsers(users) {
  fs.ensureDirSync(path.dirname(USERS_FILE));
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

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

function readBanners() {
  if (!fs.existsSync(BANNERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(BANNERS_FILE, 'utf8'));
}

function writeBanners(banners) {
  fs.ensureDirSync(path.dirname(BANNERS_FILE));
  fs.writeFileSync(BANNERS_FILE, JSON.stringify(banners, null, 2));
}

function readCategories() {
  if (!fs.existsSync(CATEGORIES_FILE)) return [];
  return JSON.parse(fs.readFileSync(CATEGORIES_FILE, 'utf8'));
}

function writeCategories(categories) {
  fs.ensureDirSync(path.dirname(CATEGORIES_FILE));
  fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(categories, null, 2));
}

// Middleware to check admin role
function requireAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.status(403).send('Akses ditolak');
  }
}

router.use(requireAdmin);

// Dashboard
router.get('/', (req, res) => {
  const users = readUsers();
  const products = readProducts();
  const orders = readOrders();
  const banners = readBanners();
  const categories = readCategories();

  res.render('admin-dashboard', {
    users,
    products,
    orders,
    banners,
    categories,
    user: req.session.user
  });
});

// Manage Users
router.post('/users/:id/role', (req, res) => {
  const { role } = req.body;
  const users = readUsers();
  const user = users.find(u => u.id === req.params.id);

  if (user) {
    user.role = role;
    writeUsers(users);
  }

  res.redirect('/admin');
});

router.delete('/users/:id', (req, res) => {
  let users = readUsers();
  users = users.filter(u => u.id !== req.params.id);
  writeUsers(users);
  res.json({ success: true });
});

// Manage Products
router.post('/products', (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const products = readProducts();

  const newProduct = {
    id: uuidv4(),
    sellerId: 'admin',
    name,
    description,
    price: parseInt(price),
    category,
    image: '/images/default.jpg',
    stock: parseInt(stock),
    reviews: [],
    createdAt: new Date().toISOString()
  };

  products.push(newProduct);
  writeProducts(products);

  res.redirect('/admin');
});

router.put('/products/:id', (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const products = readProducts();
  const product = products.find(p => p.id === req.params.id);

  if (product) {
    product.name = name;
    product.description = description;
    product.price = parseInt(price);
    product.category = category;
    product.stock = parseInt(stock);
    writeProducts(products);
  }

  res.json({ success: true });
});

router.delete('/products/:id', (req, res) => {
  let products = readProducts();
  products = products.filter(p => p.id !== req.params.id);
  writeProducts(products);
  res.json({ success: true });
});

// Manage Banners
router.post('/banners', (req, res) => {
  const { title, image, link } = req.body;
  const banners = readBanners();

  const newBanner = {
    id: uuidv4(),
    title,
    image,
    link,
    active: true
  };

  banners.push(newBanner);
  writeBanners(banners);

  res.redirect('/admin');
});

router.put('/banners/:id', (req, res) => {
  const { title, image, link, active } = req.body;
  const banners = readBanners();
  const banner = banners.find(b => b.id === req.params.id);

  if (banner) {
    banner.title = title;
    banner.image = image;
    banner.link = link;
    banner.active = active === 'true';
    writeBanners(banners);
  }

  res.json({ success: true });
});

router.delete('/banners/:id', (req, res) => {
  let banners = readBanners();
  banners = banners.filter(b => b.id !== req.params.id);
  writeBanners(banners);
  res.json({ success: true });
});

// Manage Categories
router.post('/categories', (req, res) => {
  const { name, image } = req.body;
  const categories = readCategories();

  const newCategory = {
    id: uuidv4(),
    name,
    image
  };

  categories.push(newCategory);
  writeCategories(categories);

  res.redirect('/admin');
});

router.put('/categories/:id', (req, res) => {
  const { name, image } = req.body;
  const categories = readCategories();
  const category = categories.find(c => c.id === req.params.id);

  if (category) {
    category.name = name;
    category.image = image;
    writeCategories(categories);
  }

  res.json({ success: true });
});

router.delete('/categories/:id', (req, res) => {
  let categories = readCategories();
  categories = categories.filter(c => c.id !== req.params.id);
  writeCategories(categories);
  res.json({ success: true });
});

// Manage Orders
router.put('/orders/:id/status', (req, res) => {
  const { status } = req.body;
  const orders = readOrders();
  const order = orders.find(o => o.id === req.params.id);

  if (order) {
    order.status = status;
    writeOrders(orders);
  }

  res.json({ success: true });
});

module.exports = router;
