const express = require('express');
const path = require('path');
const fs = require('fs-extra');

const router = express.Router();

const PRODUCTS_FILE = path.join(__dirname, '..', 'data', 'products.json');
const CATEGORIES_FILE = path.join(__dirname, '..', 'data', 'categories.json');

function readProducts() {
  if (!fs.existsSync(PRODUCTS_FILE)) return [];
  return JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
}

function writeProducts(products) {
  fs.ensureDirSync(path.dirname(PRODUCTS_FILE));
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
}

function readCategories() {
  if (!fs.existsSync(CATEGORIES_FILE)) return [];
  return JSON.parse(fs.readFileSync(CATEGORIES_FILE, 'utf8'));
}

// Product list
router.get('/', (req, res) => {
  const products = readProducts();
  const categories = readCategories();
  const { category, search } = req.query;

  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  if (search) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.render('product-list', { products: filteredProducts, categories, user: req.session.user });
});

// Product detail
router.get('/:id', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === req.params.id);

  if (!product) {
    return res.status(404).send('Produk tidak ditemukan');
  }

  res.render('product-detail', { product, user: req.session.user });
});

// Add review
router.post('/:id/review', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const products = readProducts();
  const product = products.find(p => p.id === req.params.id);

  if (!product) {
    return res.status(404).send('Produk tidak ditemukan');
  }

  const { rating, comment } = req.body;
  const review = {
    userId: req.session.user.id,
    rating: parseInt(rating),
    comment,
    date: new Date().toISOString()
  };

  product.reviews.push(review);
  writeProducts(products);

  res.redirect(`/products/${req.params.id}`);
});

module.exports = router;
