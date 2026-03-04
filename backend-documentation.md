# 🏢 Vanca Interiors - Backend Architecture & Authentication System

This document outlines the complete Node.js/Express backend authentication and cart structure required to replicate an Amazon-style, frictionless shopping experience. 

## ⚙️ Tech Stack
* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB (via Mongoose)
* **Auth**: JSON Web Tokens (JWT) + HTTP-Only Cookies
* **Security**: bcrypt (hashing), helmet (headers), cors

---

## 🗂️ Folder Structure
```text
server/
├── config/
│   └── db.js            # MongoDB connection
├── controllers/
│   ├── authController.js # Login, Register, Logout
│   ├── cartController.js # Add/Remove/Merge Cart Items
│   └── orderController.js
├── middleware/
│   ├── verifyToken.js   # JWT verification
│   └── errorHandler.js
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js          
│   └── Order.js
├── routes/
│   ├── authRoutes.js
│   ├── cartRoutes.js
│   └── orderRoutes.js
├── .env                 # JWT_SECRET, MONGO_URI
└── server.js            # Entry point
```

---

## 💾 Database Schema (MongoDB / Mongoose)

### 1. `User` Model
```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // BCrypt hashed
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  savedAddresses: [{
    street: String, city: String, zip: String, country: String
  }]
}, { timestamps: true });
```

### 2. `Cart` Model
```javascript
const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true, min: 1 },
  price: Number // Snapshot of price at time of adding
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema],
}, { timestamps: true });
```

---

## 🔐 3. Amazon-Style Cart Merge Logic (Backend Implementation)
When the user logs in, the React frontend must send the `localStorage` guest cart array to the backend along with the login payload. The backend merges it immediately.

### Login Controller (`authController.js`)
```javascript
const login = async (req, res) => {
  try {
    const { email, password, guestCart } = req.body;
    
    // 1. Verify User
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 2. JWT Configuration (HTTP-Only Secure Cookie)
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 Days
    });

    // 3. CART MERGE LOGIC 🛒
    let userCart = await Cart.findOne({ userId: user._id });
    if (!userCart) {
      userCart = new Cart({ userId: user._id, items: [] });
    }

    if (guestCart && guestCart.length > 0) {
      guestCart.forEach(guestItem => {
        const existingItemIndex = userCart.items.findIndex(i => i.productId.toString() === guestItem.productId);
        
        if (existingItemIndex > -1) {
          userCart.items[existingItemIndex].quantity += guestItem.quantity; // Update Quantity
        } else {
          userCart.items.push(guestItem); // Add new item
        }
      });
      await userCart.save();
    }

    res.status(200).json({ 
      message: "Login successful", 
      user: { id: user._id, name: user.name, email: user.email },
      cart: userCart 
    });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
```

---

## 🛡️ Middleware: `verifyToken.js`
This ensures routes like `/api/checkout` are physically blocked at the server level.

```javascript
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Read HTTP-Only Cookie
  
  if (!token) {
    return res.status(403).json({ error: "Access Denied. Please login to continue." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid Token" });
  }
};

module.exports = verifyToken;
```

---

## 🌐 Example API Routes
```javascript
const express = require('express');
const router = express.Router();
const { login, register, logout } = require('../controllers/authController');
const { getCart, syncCart, checkout } = require('../controllers/cartController');
const verifyToken = require('../middleware/verifyToken');

// Auth
router.post('/api/auth/login', login);
router.post('/api/auth/register', register);
router.post('/api/auth/logout', logout);

// Cart & Checkout
router.get('/api/cart', verifyToken, getCart);
router.post('/api/cart/sync', verifyToken, syncCart);

// 🚨 Protected Checkout requires Token Verification
router.post('/api/checkout', verifyToken, checkout);

module.exports = router;
```
