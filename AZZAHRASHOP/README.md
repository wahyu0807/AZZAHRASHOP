# AZZAHRASHOP - E-commerce Platform

Website e-commerce lengkap mirip Shopee dengan fitur dashboard admin, penjual, dan pembeli.

## Fitur Utama

### Admin Dashboard
- Kelola semua pengguna (ubah role)
- CRUD produk (termasuk milik penjual)
- CRUD banner dan kategori
- Kelola pesanan dan status
- Lihat statistik

### Seller Dashboard
- Upload dan kelola produk
- Lihat notifikasi penjualan
- Pantau performa produk

### Buyer Dashboard
- Riwayat pesanan
- Ulasan produk
- Manajemen akun

### Fitur Umum
- Registrasi dan login dengan role-based access
- Halaman depan dengan banner dan kategori
- Pencarian dan filter produk
- Keranjang belanja
- Checkout dengan ongkir otomatis
- Pembayaran simulasi (transfer, COD, e-wallet)
- Customer Service AI chatbot
- Responsive design

## Teknologi

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templates, Bootstrap 5
- **Database**: JSON file storage (untuk demo)
- **Authentication**: Session-based dengan bcrypt
- **File Upload**: Multer untuk gambar produk

## Instalasi dan Setup

### Persyaratan
- Node.js (versi 14+)
- npm

### Langkah Instalasi

1. **Clone repository**:
   ```bash
   git clone https://github.com/username/azzahrashop.git
   cd azzahrashop
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Jalankan server**:
   ```bash
   npm start
   ```

4. **Akses website**:
   Buka browser dan kunjungi `http://localhost:3000`

## Akun Default

### Admin
- Username: admin
- Password: admin123

### Seller
- Username: seller
- Password: seller123

### Buyer
- Username: buyer
- Password: buyer123

## Struktur Proyek

```
AZZAHRASHOP/
├── data/                 # JSON data files
│   ├── users.json
│   ├── products.json
│   ├── orders.json
│   ├── notifications.json
│   ├── chats.json
│   ├── banners.json
│   └── categories.json
├── public/               # Static files
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
├── routes/               # Route handlers
│   ├── auth.js
│   ├── products.js
│   ├── cart.js
│   ├── checkout.js
│   ├── payment.js
│   ├── cs.js
│   ├── admin.js
│   ├── seller.js
│   └── buyer.js
├── views/                # EJS templates
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── home.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── product-list.ejs
│   ├── product-detail.ejs
│   ├── cart.ejs
│   ├── checkout.ejs
│   ├── payment.ejs
│   ├── payment-success.ejs
│   ├── cs-chat.ejs
│   ├── admin-dashboard.ejs
│   ├── seller-dashboard.ejs
│   ├── seller-upload.ejs
│   └── buyer-dashboard.ejs
├── server.js            # Main application file
├── package.json
├── README.md
└── TODO.md
```

## Deployment

### Hosting VPS/Server
1. Upload semua file ke server
2. Install Node.js dan npm
3. Jalankan `npm install`
4. Gunakan PM2 untuk production: `pm2 start server.js --name azzahrashop`
5. Setup reverse proxy dengan Nginx

### Hosting Platform
- **Vercel**: Connect GitHub repo, deploy otomatis
- **Heroku**: Push ke Heroku Git, auto deploy
- **Railway**: Connect GitHub, deploy otomatis

## Pengembangan

### Menambah Fitur Baru
1. Tambahkan route di `routes/`
2. Buat view EJS di `views/`
3. Update data JSON jika perlu
4. Test secara lokal

### Migrasi ke Database
Untuk production, ganti JSON storage dengan:
- MongoDB dengan Mongoose
- PostgreSQL dengan Sequelize
- MySQL dengan mysql2

## Kontribusi

1. Fork repository
2. Buat branch fitur baru
3. Commit perubahan
4. Push ke branch
5. Buat Pull Request

## Lisensi

MIT License - bebas digunakan untuk keperluan komersial dan non-komersial.

## Support

Untuk pertanyaan atau dukungan:
- Email: support@azzahrashop.com
- GitHub Issues: https://github.com/username/azzahrashop/issues
