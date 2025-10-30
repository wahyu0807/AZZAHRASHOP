# TODO List for AZZAHRASHOP E-commerce Website

## Phase 1: Project Setup
- [x] Create project directory "AZZAHRASHOP"
- [x] Initialize npm and create package.json
- [x] Install dependencies: express, ejs, body-parser, multer, express-session, bcryptjs, fs-extra, uuid
- [x] Create basic directory structure: data/, views/, routes/, public/css/, public/js/, public/images/

## Phase 2: Backend Setup
- [x] Create server.js with Express setup, middleware (session, static files, body-parser)
- [x] Create data JSON files: users.json, products.json, orders.json, notifications.json, chats.json, banners.json, categories.json
- [x] Create routes files: auth.js, products.js, cart.js, checkout.js, payment.js, cs.js, admin.js, seller.js, buyer.js
- [x] Implement authentication with sessions and bcrypt
- [x] Implement role-based access control (admin, seller, buyer)

## Phase 3: Frontend Views
- [x] Create EJS views: register.ejs, login.ejs, home.ejs, product-list.ejs, product-detail.ejs, cart.ejs, checkout.ejs, payment.ejs, cs-chat.ejs, admin-dashboard.ejs, seller-dashboard.ejs, buyer-dashboard.ejs
- [x] Add Indonesian language for all UI text
- [x] Style with CSS similar to Shopee (orange theme, responsive)

## Phase 4: Core Features Implementation
- [x] Implement user registration and login
- [x] Implement product upload for sellers (with image upload using multer)
- [x] Implement product listing and search
- [x] Implement cart functionality (add, remove, update quantity)
- [x] Implement checkout with shipping cost calculation (based on location)
- [x] Implement payment simulation
- [x] Implement customer service AI chatbot (predefined responses)
- [x] Implement product reviews
- [x] Implement notifications for sellers on sales

## Phase 5: Admin Dashboard Features
- [x] Admin can view and edit all users (change roles)
- [x] Admin can CRUD products (including sellers' products)
- [x] Admin can CRUD banners and categories
- [x] Admin can view and manage orders
- [x] Admin can manage notifications and chats

## Phase 6: Testing and Deployment Prep
- [x] Test all features locally
- [x] Initialize Git repository
- [x] Create README.md with setup and hosting instructions
- [x] Ensure code is clean, with error handling and basic security

## Phase 7: Final Touches
- [x] Add default images and sample data
- [x] Optimize for hosting (e.g., environment variables for secrets)
- [x] Push to GitHub for cloning
