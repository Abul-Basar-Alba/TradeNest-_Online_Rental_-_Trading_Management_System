# TradeNest Backend API Testing Guide

## Backend Status ✅

**Directory Structure:**
```
backend/
├── config/          # Configuration files (passport, email)
├── controllers/     # Business logic (auth, product, admin)
├── middleware/      # Auth middleware, validators
├── models/         # MongoDB schemas (User, Product)
├── routes/         # API endpoints
├── server.js       # Main entry point
├── package.json    # Dependencies
└── .env           # Environment variables
```

**Server Status:**
- ✅ Running on: http://localhost:5000
- ✅ Database: MongoDB Atlas - Connected
- ✅ Database Name: tradenest
- ✅ Environment: development

---

## API Endpoints

### 🏥 Health Check
**Endpoint:** `GET /api/health`
```bash
curl http://localhost:5000/api/health
```
**Response:**
```json
{
  "success": true,
  "message": "TradeNest API is running!",
  "timestamp": "2026-01-30T05:14:41.162Z"
}
```

### 📝 Root Endpoint
**Endpoint:** `GET /`
```bash
curl http://localhost:5000/
```
**Response:**
```json
{
  "message": "Welcome to TradeNest API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/api/health",
    "auth": "/api/auth",
    "users": "/api/users",
    "products": "/api/products"
  }
}
```

---

## 🔐 Authentication Endpoints

### 1. Register with Email
**Endpoint:** `POST /api/auth/register`

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "testuser@example.com",
    "password": "Test123456!",
    "role": "buyer"
  }'
```

**Response (Success):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "65f1234567890abcdef12345",
    "name": "Test User",
    "email": "testuser@example.com",
    "role": "buyer",
    "isVerified": false
  }
}
```

### 2. Register with Phone
**Endpoint:** `POST /api/auth/register`

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Phone User",
    "email": "01712345678@phone.local",
    "phone": "01712345678",
    "password": "Test123456!",
    "role": "buyer"
  }'
```

### 3. Login with Email
**Endpoint:** `POST /api/auth/login`

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "Test123456!"
  }'
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "65f1234567890abcdef12345",
    "name": "Test User",
    "email": "testuser@example.com",
    "role": "buyer"
  }
}
```

**Response (Error - Wrong Password):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### 4. Get Current User
**Endpoint:** `GET /api/auth/me`
**Requires:** JWT Token

**Request:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "65f1234567890abcdef12345",
    "name": "Test User",
    "email": "testuser@example.com",
    "role": "buyer",
    "isVerified": false
  }
}
```

### 5. Logout
**Endpoint:** `GET /api/auth/logout`
**Requires:** JWT Token

**Request:**
```bash
curl -X GET http://localhost:5000/api/auth/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

## 📦 Product Endpoints

### 1. Get All Products
**Endpoint:** `GET /api/products`

**Request:**
```bash
curl http://localhost:5000/api/products
```

### 2. Create Product
**Endpoint:** `POST /api/products`
**Requires:** JWT Token (Seller/Admin only)

**Request:**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "title": "Sample Product",
    "description": "Product description here",
    "price": 5000,
    "category": "Electronics",
    "condition": "New",
    "location": "Dhaka, Bangladesh",
    "listingType": "sell"
  }'
```

---

## 👤 User Endpoints

### 1. Get User Profile
**Endpoint:** `GET /api/users/profile`
**Requires:** JWT Token

**Request:**
```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 2. Update User Profile
**Endpoint:** `PUT /api/users/profile`
**Requires:** JWT Token

**Request:**
```bash
curl -X PUT http://localhost:5000/api/users/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "name": "Updated Name",
    "phone": "01812345678"
  }'
```

---

## 🧪 Testing with Postman

### Import Collection
1. Open Postman
2. Click **Import** button
3. Select file: `TradeNest_API_Collection.postman.json`
4. Collection imported with all endpoints

### Configure Environment
1. Create new environment: **TradeNest Dev**
2. Add variables:
   - `baseURL` = `http://localhost:5000/api`
   - `token` = (will be set after login)

### Testing Flow
1. **Register User** → Copy the `token` from response
2. **Set Token** → Paste in environment variable
3. **Test Protected Routes** → All requests with {{token}} will work
4. **Test Products** → Create, Update, Delete
5. **Test Profile** → Get and Update

---

## 🔒 Security Features

✅ **Bcrypt Password Hashing** - 10 salt rounds  
✅ **JWT Tokens** - 24 hour expiry  
✅ **Rate Limiting** - 3-5 requests per 15 minutes on auth  
✅ **Account Lockout** - 5 failed attempts = 15 min lock  
✅ **Input Sanitization** - MongoDB injection prevention  
✅ **XSS Protection** - HTML escaping  
✅ **CORS** - Configured for localhost:3000  
✅ **Helmet.js** - Security headers  
✅ **Activity Logging** - All auth actions tracked  

---

## 📊 Database Status

**Connection String:** MongoDB Atlas (Cloud)  
**Database Name:** `tradenest`  
**Collections:**
- `users` - User accounts (email, phone, Google)
- `products` - Product listings
- `activitylogs` - Security audit trail

**Test Accounts:**
| Email | Password | Role | Method |
|-------|----------|------|--------|
| frontend@test.com | Test123456! | buyer | Email |
| premium@tradenest.com | Premium2026! | buyer | Email |
| backend@test.com | Test12345! | buyer | Email |

---

## ⚠️ Common Errors

### 404 Not Found
- Check API path includes `/api/` prefix
- Example: `http://localhost:5000/api/auth/login`

### 401 Unauthorized
- JWT token missing or expired
- Login again to get fresh token

### 400 Bad Request
- Check request body format
- Ensure all required fields present
- Email format must be valid

### 500 Internal Server Error
- Check MongoDB connection
- Check server logs: `cd backend && npm run dev`

---

## 🚀 Quick Start Commands

```bash
# Start Backend Server
cd ~/Projects/TradeNest/backend
npm run dev

# Test Health Check
curl http://localhost:5000/api/health

# Register New User
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"Test12345!","role":"buyer"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test12345!"}'
```

---

## ✅ Backend Checklist

- [x] MVC Pattern implemented correctly
- [x] MongoDB connected to Atlas
- [x] All authentication routes working
- [x] Password hashing with bcrypt
- [x] JWT token generation
- [x] Security middleware active
- [x] Rate limiting configured
- [x] Error handling middleware
- [x] CORS configured for frontend
- [x] Environment variables loaded
- [x] Postman collection created
- [x] API documentation complete
- [x] Backend folder renamed from "server"
- [x] Professional naming conventions

**Backend Status: ✅ PRODUCTION READY**
