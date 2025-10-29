const express = require('express');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs-extra');

const router = express.Router();

const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');

function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
}

function writeUsers(users) {
  fs.ensureDirSync(path.dirname(USERS_FILE));
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Register
router.get('/register', (req, res) => {
  res.render('register', { error: null });
});

router.post('/register', async (req, res) => {
  const { username, email, password, name, address, phone, role } = req.body;
  const users = readUsers();

  if (users.find(u => u.username === username || u.email === email)) {
    return res.render('register', { error: 'Username atau email sudah terdaftar' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: uuidv4(),
    username,
    email,
    password: hashedPassword,
    role: role || 'buyer',
    name,
    address,
    phone,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  writeUsers(users);

  req.session.user = { id: newUser.id, username: newUser.username, role: newUser.role };
  res.redirect('/');
});

// Login
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.render('login', { error: 'Username atau password salah' });
  }

  req.session.user = { id: user.id, username: user.username, role: user.role };
  res.redirect('/');
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
