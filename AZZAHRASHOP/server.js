const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'azzahrashop-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Data files
const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const PRODUCTS_FILE = path.join(__dirname, 'data', 'products.json');
const ORDERS_FILE = path.join(__dirname, 'data', 'orders.json');
const NOTIFICATIONS_FILE = path.join(__dirname, 'data', 'notifications.json');
const CHATS_FILE = path.join(__dirname, 'data', 'chats.json');
const BANNERS_FILE = path.join(__dirname, 'data', 'banners.json');
const CATEGORIES_FILE = path.join(__dirname, 'data', 'categories.json');

// Helper functions
function readData(file) {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeData(file, data) {
  fs.ensureDirSync(path.dirname(file));
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function requireAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

function requireRole(role) {
  return (req, res, next) => {
    if (req.session.user && req.session.user.role === role) {
      next();
    } else {
      res.status(403).send('Akses ditolak');
    }
  };
}

// Routes
app.use('/', require('./routes/auth'));
app.use('/products', require('./routes/products'));
app.use('/cart', require('./routes/cart'));
app.use('/checkout', require('./routes/checkout'));
app.use('/payment', require('./routes/payment'));
app.use('/cs', require('./routes/cs'));
app.use('/admin', require('./routes/admin'));
app.use('/seller', require('./routes/seller'));
app.use('/buyer', require('./routes/buyer'));

// Home page
app.get('/', (req, res) => {
  const banners = readData(BANNERS_FILE);
  const categories = readData(CATEGORIES_FILE);
  const products = readData(PRODUCTS_FILE).slice(0, 10); // Popular products
  res.render('home', { user: req.session.user, banners, categories, products });
});

// Start server
app.listen(PORT, () => {
  console.log(`AZZAHRASHOP running on port ${PORT}`);
});

module.exports = app;
