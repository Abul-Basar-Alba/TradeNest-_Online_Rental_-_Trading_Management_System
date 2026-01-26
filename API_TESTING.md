# TradeNest API Test Collection

## Base URL
```
http://localhost:5000/api
```

---

## 🔐 Authentication Tests

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Register User (Buyer)
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "01712345678",
    "password": "john123",
    "role": "buyer"
  }'
```

### 3. Register User (Seller)
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Seller User",
    "email": "seller@example.com",
    "phone": "01798765432",
    "password": "seller123",
    "role": "seller"
  }'
```

### 4. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "john123"
  }'
```

**Save the token from response!**

### 5. Get Current User
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 6. Logout
```bash
curl -X GET http://localhost:5000/api/auth/logout \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📦 Product Tests

### 1. Get All Products
```bash
curl http://localhost:5000/api/products
```

### 2. Get Products with Filters
```bash
# Rent products only
curl "http://localhost:5000/api/products?type=rent"

# By category
curl "http://localhost:5000/api/products?category=vehicles"

# By city
curl "http://localhost:5000/api/products?city=Dhaka"

# Price range
curl "http://localhost:5000/api/products?minPrice=1000&maxPrice=10000"

# Combined filters
curl "http://localhost:5000/api/products?type=rent&category=vehicles&city=Dhaka"
```

### 3. Create Product (Seller Only - Need Verification)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_SELLER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Toyota Corolla 2020",
    "description": "Excellent condition car available for rent",
    "category": "vehicles",
    "subcategory": "car",
    "type": "rent",
    "price": 5000,
    "priceUnit": "day",
    "condition": "good",
    "location": {
      "city": "Dhaka",
      "area": "Gulshan"
    },
    "features": ["AC", "Automatic", "GPS"]
  }'
```

### 4. Get Single Product
```bash
curl http://localhost:5000/api/products/PRODUCT_ID_HERE
```

### 5. Update Product
```bash
curl -X PUT http://localhost:5000/api/products/PRODUCT_ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 4500,
    "isAvailable": true
  }'
```

### 6. Delete Product
```bash
curl -X DELETE http://localhost:5000/api/products/PRODUCT_ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🛠 MongoDB Manual Commands

### Verify a Seller (Manual - Until Admin Panel Ready)
```bash
mongo
use tradenest

# Find user
db.users.find({ email: "seller@example.com" })

# Verify user
db.users.updateOne(
  { email: "seller@example.com" },
  { 
    $set: { 
      isVerified: true, 
      verificationStatus: "approved" 
    } 
  }
)

# Verify update
db.users.find({ email: "seller@example.com" }, { isVerified: 1, verificationStatus: 1 })
```

### Approve a Product (Manual)
```bash
# Find product
db.products.find({ title: /Toyota/ })

# Approve product
db.products.updateOne(
  { _id: ObjectId("PRODUCT_ID") },
  { 
    $set: { 
      isApproved: true, 
      approvalStatus: "approved" 
    } 
  }
)
```

### View All Users
```bash
db.users.find({}, { name: 1, email: 1, role: 1, isVerified: 1 })
```

### View All Products
```bash
db.products.find({}, { title: 1, type: 1, price: 1, owner: 1 })
```

---

## 🔍 Testing Workflow

### Scenario 1: New Buyer Registration & Browse
1. Register as buyer
2. Login
3. Get auth token
4. Browse products (no auth needed)
5. View single product details

### Scenario 2: Seller Posts Product
1. Register as seller
2. Login
3. **Manually verify seller in MongoDB**
4. Create product with seller token
5. Product goes to pending approval
6. **Manually approve in MongoDB**
7. Product visible to all users

### Scenario 3: Update & Delete
1. Login as seller
2. Get product ID
3. Update product price
4. Delete product

---

## ❌ Expected Errors

### 1. Unverified Seller Tries to Post
```json
{
  "success": false,
  "message": "Your account is not verified. Please complete verification to post products."
}
```

### 2. Buyer Tries to Post Product
```json
{
  "success": false,
  "message": "User role 'buyer' is not authorized to access this route"
}
```

### 3. Invalid Token
```json
{
  "success": false,
  "message": "Token is invalid or has expired"
}
```

### 4. Duplicate Email
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

---

## 📊 Sample Data for Testing

### Test Users
```
Buyer:
Email: buyer@test.com
Password: buyer123

Seller (Need to verify manually):
Email: seller@test.com
Password: seller123

Admin:
Email: admin@test.com
Password: admin123
```

### Test Products
```json
{
  "title": "Honda Civic 2021",
  "description": "Brand new car for rent",
  "category": "vehicles",
  "subcategory": "car",
  "type": "rent",
  "price": 6000,
  "priceUnit": "day",
  "location": { "city": "Dhaka", "area": "Banani" }
}

{
  "title": "3 Bedroom Apartment",
  "description": "Spacious apartment for rent",
  "category": "property",
  "subcategory": "apartment",
  "type": "rent",
  "price": 30000,
  "priceUnit": "month",
  "location": { "city": "Dhaka", "area": "Dhanmondi" }
}

{
  "title": "iPhone 14 Pro",
  "description": "Used phone in excellent condition",
  "category": "electronics",
  "subcategory": "phone",
  "type": "sell",
  "price": 95000,
  "priceUnit": "fixed",
  "location": { "city": "Dhaka", "area": "Mirpur" }
}
```

---

**Use Thunder Client in VS Code or Postman for easier testing!**
