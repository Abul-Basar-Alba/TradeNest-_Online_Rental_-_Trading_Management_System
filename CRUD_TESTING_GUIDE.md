# 🧪 Complete CRUD Testing Guide (Video 2:04:00 - 2:26:00)

## Tutorial Implementation: Full CRUD Operations

Following the video tutorial pattern, all CRUD operations are now implemented with:
- ✅ Step-by-step validation
- ✅ Detailed error handling
- ✅ Proper status codes
- ✅ Console logging for debugging
- ✅ Owner authorization checks

---

## 📋 Testing Flow (Thunder Client / Postman)

### Prerequisites
1. Register a user and get token
2. Use token in Authorization header for protected routes

---

## 1️⃣ CREATE Product (POST)

**Tutorial Equivalent:** Create Post API (2:04:00)

**Endpoint:** `POST http://localhost:5000/api/products`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "MacBook Pro 2023",
  "description": "Brand new MacBook Pro with M2 chip, 16GB RAM, 512GB SSD",
  "category": "electronics",
  "type": "sell",
  "price": 150000,
  "location": {
    "city": "Dhaka",
    "area": "Dhanmondi"
  },
  "images": ["https://example.com/image1.jpg"],
  "priceType": "fixed"
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "product": {
    "_id": "697...",
    "title": "MacBook Pro 2023",
    "price": 150000,
    "ownerId": "...",
    "status": "active",
    "createdAt": "2026-01-30T...",
    "updatedAt": "2026-01-30T..."
  }
}
```

**Copy the product `_id` for next tests!**

---

## 2️⃣ READ All Products (GET)

**Tutorial Equivalent:** Read All Posts API (2:03:09-2:05:54)

**Endpoint:** `GET http://localhost:5000/api/products`

**Headers:** None needed (Public route)

**Query Parameters (Optional):**
```
?page=1
&limit=10
&category=electronics
&minPrice=50000
&maxPrice=200000
&search=macbook
&sort=price_asc
```

**Example:**
```
GET http://localhost:5000/api/products?category=electronics&page=1&limit=5
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "count": 5,
  "total": 12,
  "totalPages": 3,
  "currentPage": 1,
  "products": [
    {
      "_id": "697...",
      "title": "MacBook Pro 2023",
      "price": 150000,
      "category": "electronics",
      "ownerId": {
        "name": "Test User",
        "rating": 0,
        "isVerified": false
      },
      "createdAt": "2026-01-30T..."
    }
  ]
}
```

---

## 3️⃣ READ Single Product (GET)

**Tutorial Equivalent:** Get Post by ID (implied in tutorial)

**Endpoint:** `GET http://localhost:5000/api/products/:id`

**Example:**
```
GET http://localhost:5000/api/products/697caaa7c2c45fd3e6751642
```

**Headers:** None needed (Public route)

**Expected Response (200 OK):**
```json
{
  "success": true,
  "product": {
    "_id": "697...",
    "title": "MacBook Pro 2023",
    "description": "Brand new MacBook Pro...",
    "price": 150000,
    "views": 1,
    "ownerId": {
      "name": "Test User",
      "phone": "01712345678",
      "email": "test@example.com",
      "rating": 0,
      "isVerified": false
    },
    "createdAt": "2026-01-30T...",
    "updatedAt": "2026-01-30T..."
  }
}
```

**Note:** View count increments on each request!

---

## 4️⃣ UPDATE Product (PUT)

**Tutorial Equivalent:** Update Post API (2:08:30-2:17:08)

**Endpoint:** `PUT http://localhost:5000/api/products/:id`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request Body (Partial Update):**
```json
{
  "title": "MacBook Pro 2023 - Updated",
  "price": 140000,
  "description": "Price reduced! Brand new MacBook Pro with M2 chip"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "product": {
    "_id": "697...",
    "title": "MacBook Pro 2023 - Updated",
    "price": 140000,
    "description": "Price reduced!...",
    "ownerId": {
      "name": "Test User",
      "email": "test@example.com"
    },
    "updatedAt": "2026-01-30T..." // Updated timestamp
  }
}
```

**Error Cases:**
```json
// Not the owner (403 Forbidden):
{
  "success": false,
  "message": "Not authorized to update this product"
}

// Product not found (404):
{
  "success": false,
  "message": "Product not found"
}

// Invalid price (400):
{
  "success": false,
  "message": "Price cannot be negative"
}
```

---

## 5️⃣ DELETE Product (DELETE)

**Tutorial Equivalent:** Delete Post API (2:19:36-2:23:47)

**Endpoint:** `DELETE http://localhost:5000/api/products/:id`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**No Request Body**

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "deletedProduct": {
    "id": "697...",
    "title": "MacBook Pro 2023 - Updated"
  }
}
```

**Error Cases:**
```json
// Not the owner (403):
{
  "success": false,
  "message": "Not authorized to delete this product"
}

// Product not found (404):
{
  "success": false,
  "message": "Product not found"
}

// Product is rented (400):
{
  "success": false,
  "message": "Cannot delete a product that is currently rented"
}
```

---

## 6️⃣ GET My Products (GET)

**Tutorial Equivalent:** Custom endpoint for user's own posts

**Endpoint:** `GET http://localhost:5000/api/products/my/products`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Query Parameters (Optional):**
```
?status=active
&type=sell
&sort=newest
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "stats": {
    "total": 3,
    "active": 2,
    "rented": 0,
    "sold": 1,
    "inactive": 0
  },
  "products": [
    {
      "_id": "697...",
      "title": "Product 1",
      "price": 50000,
      "status": "active",
      "views": 15,
      "createdAt": "2026-01-30T..."
    },
    {
      "_id": "698...",
      "title": "Product 2",
      "price": 30000,
      "status": "sold",
      "views": 25,
      "createdAt": "2026-01-29T..."
    }
  ]
}
```

---

## 🎯 Complete Testing Flow

### Step-by-Step Test Sequence:

**1. Setup:**
```bash
POST /api/auth/register
# Get token from response
```

**2. Create Product:**
```bash
POST /api/products
# Copy product ID from response
```

**3. Get All Products:**
```bash
GET /api/products
# Verify your product appears in list
```

**4. Get Single Product:**
```bash
GET /api/products/{product_id}
# Verify details are correct
```

**5. Update Product:**
```bash
PUT /api/products/{product_id}
# Change title and price
```

**6. Verify Update:**
```bash
GET /api/products/{product_id}
# Confirm changes are saved
```

**7. Get My Products:**
```bash
GET /api/products/my/products
# See all your products
```

**8. Delete Product:**
```bash
DELETE /api/products/{product_id}
# Remove the product
```

**9. Verify Deletion:**
```bash
GET /api/products/{product_id}
# Should return 404
```

---

## 🔍 Error Testing

### Test Invalid ID:
```bash
GET http://localhost:5000/api/products/invalid_id
# Response: "Invalid product ID"
```

### Test Negative Price:
```bash
PUT http://localhost:5000/api/products/{id}
Body: {"price": -5000}
# Response: "Price cannot be negative"
```

### Test Unauthorized Update:
```bash
# Login as User A, create product
# Login as User B, try to update User A's product
PUT http://localhost:5000/api/products/{user_a_product_id}
# Response: "Not authorized to update this product"
```

### Test Delete Rented Product:
```bash
# Mark product as rented, then try to delete
DELETE http://localhost:5000/api/products/{rented_product_id}
# Response: "Cannot delete a product that is currently rented"
```

---

## 📊 HTTP Status Codes Used

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | OK | GET, PUT, DELETE successful |
| 201 | Created | POST product created |
| 400 | Bad Request | Invalid data, negative price |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Not owner of product |
| 404 | Not Found | Product doesn't exist |
| 500 | Server Error | Database/server issue |

---

## ✅ Tutorial Implementation Checklist

Following video (2:04:00-2:26:00):

- ✅ **Create Post/Product API** - POST with validation
- ✅ **Read All Posts/Products API** - GET with pagination & filters
- ✅ **Read Single Post/Product API** - GET by ID
- ✅ **Update Post/Product API** - PUT with ownership check
- ✅ **Delete Post/Product API** - DELETE with validation
- ✅ **Testing in Postman** - All endpoints tested
- ✅ **Error Handling** - Proper status codes and messages
- ✅ **Authorization** - Owner-only updates/deletes
- ✅ **Validation** - Required fields, data types
- ✅ **Logging** - Console logs for debugging

---

## 🚀 Quick Test Commands (curl)

```bash
# Health Check
curl http://localhost:5000/api/health

# Get All Products
curl http://localhost:5000/api/products

# Get Single Product
curl http://localhost:5000/api/products/PRODUCT_ID

# Create Product (with token)
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Product","description":"Test","category":"electronics","type":"sell","price":5000,"location":{"city":"Dhaka","area":"Mirpur"}}'

# Update Product
curl -X PUT http://localhost:5000/api/products/PRODUCT_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"price":4500}'

# Delete Product
curl -X DELETE http://localhost:5000/api/products/PRODUCT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get My Products
curl http://localhost:5000/api/products/my/products \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

**✅ All CRUD operations implemented following tutorial pattern!**  
**📺 Video Reference: 2:04:00 - 2:26:00**  
**🎯 Ready for Production Testing!**
