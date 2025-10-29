const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const CHATS_FILE = path.join(__dirname, '..', 'data', 'chats.json');

function readChats() {
  if (!fs.existsSync(CHATS_FILE)) return [];
  return JSON.parse(fs.readFileSync(CHATS_FILE, 'utf8'));
}

function writeChats(chats) {
  fs.ensureDirSync(path.dirname(CHATS_FILE));
  fs.writeFileSync(CHATS_FILE, JSON.stringify(chats, null, 2));
}

// Simple AI responses
const aiResponses = [
  "Halo! Ada yang bisa saya bantu?",
  "Terima kasih atas pertanyaannya. Kami akan segera merespons.",
  "Maaf atas ketidaknyamanannya. Tim kami akan menghubungi Anda.",
  "Produk kami berkualitas tinggi dan tahan lama.",
  "Untuk informasi lebih lanjut, silakan hubungi customer service kami."
];

router.get('/', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const chats = readChats().filter(c => c.userId === req.session.user.id);
  res.render('cs-chat', { chats, user: req.session.user });
});

router.post('/send', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const { message } = req.body;
  const chats = readChats();

  const userMessage = {
    id: uuidv4(),
    userId: req.session.user.id,
    message,
    sender: 'user',
    timestamp: new Date().toISOString()
  };

  chats.push(userMessage);

  // Simulate AI response
  const aiMessage = {
    id: uuidv4(),
    userId: req.session.user.id,
    message: aiResponses[Math.floor(Math.random() * aiResponses.length)],
    sender: 'ai',
    timestamp: new Date().toISOString()
  };

  chats.push(aiMessage);

  writeChats(chats);

  res.redirect('/cs');
});

module.exports = router;
