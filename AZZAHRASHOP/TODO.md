# TODO List for AZZAHRASHOP E-commerce Website

## Phase 1: Project Setup
- [ ] Create project directory "AZZAHRASHOP"
- [ ] Initialize npm and create package.json
- [ ] Install dependencies: express, ejs, body-parser, multer, express-session, bcryptjs, fs-extra, uuid
- [ ] Create basic directory structure: data/, views/, routes/, public/css/, public/js/, public/images/

## Phase 2: Backend Setup
- [ ] Create server.js with Express setup, middleware (session, static files, body-parser)
- [ ] Create data JSON files: users.json, products.json, orders.json, notifications.json, chats.json, banners.json, categories.json
- [ ] Create routes files: auth.js, products.js, cart.js, checkout.js, payment.js, cs.js, admin.js, seller.js, buyer.js
- [ ] Implement authentication with sessions and bcrypt
- [ ] Implement role-based access control (admin, seller, buyer)

## Phase 3: Frontend Views
- [ ] Create EJS views: register.ejs, login.ejs, home.ejs, product-list.ejs, product-detail.ejs, cart.ejs, checkout.ejs, payment.ejs, cs-chat.ejs, admin-dashboard.ejs, seller-dashboard.ejs, buyer-dashboard.ejs
- [ ] Add Indonesian language for all UI text
- [ ] Style with CSS similar to Shopee (orange theme, responsive)

## Phase 4: Core Features Implementation
- [ ] Implement user registration and login
- [ ] Implement product upload for sellers (with image upload using multer)
- [ ] Implement product listing and search
- [ ] Implement cart functionality (add, remove, update quantity)
- [ ] Implement checkout with shipping cost calculation (based on location)
- [ ] Implement payment simulation
- [ ] Implement customer service AI chatbot (predefined responses)
- [ ] Implement product reviews
- [ ] Implement notifications for sellers on sales

## Phase 5: Admin Dashboard Features
- [ ] Admin can view and edit all users (change roles)
- [ ] Admin can CRUD products (including sellers' products)
- [ ] Admin can CRUD banners and categories
- [ ] Admin can view and manage orders
- [ ] Admin can manage notifications and chats

## Phase 6: Testing and Deployment Prep
- [ ] Test all features locally
- [ ] Initialize Git repository
- [ ] Create README.md with setup and hosting instructions
- [ ] Ensure code is clean, with error handling and basic security

## Phase 7: Final Touches
- [ ] Add default images and sample data
- [ ] Optimize for hosting (e.g., environment variables for secrets)
- [ ] Push to GitHub for cloning
