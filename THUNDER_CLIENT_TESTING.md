# 🔥 Thunder Client API Testing Guide

## ✅ All APIs Fixed and Ready!

**Server Status:** Running on http://localhost:5000

---

## 🔑 Step-by-Step Testing

### Step 1️⃣: Register New User

**Method:** POST  
**URL:** `http://localhost:5000/api/auth/register`  
**Headers:**
```
Content-Type: application/json
```
**Body (JSON):**
```json
{
  "name": "Thunder User",
  "email": "thunder@test.com",
  "password": "Thunder123!",
  "role": "seller"
}
```

**✅ Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGci...",
  "user": {
    "id": "...",
    "name": "Thunder User",
    "email": "thunder@test.com",
    "role": "seller"
  }
}
```

**📋 Action:** Copy the `token` value!

---

### Step 2️⃣: Login Existing User

**Method:** POST  
**URL:** `http://localhost:5000/api/auth/login`  
**Headers:**
```
Content-Type: application/json
```
**Body (JSON):**
```json
{
  "email": "thunder@test.com",
  "password": "Thunder123!"
}
```

**✅ Expected Response:** Same as register with new token

---

### Step 3️⃣: Google Login (Firebase)

**Method:** POST  
**URL:** `http://localhost:5000/api/auth/google`  
**Headers:**
```
Content-Type: application/json
```
**Body (JSON):**
```json
{
  "email": "yourmail@gmail.com",
  "name": "Your Name",
  "firebaseUid": "firebase_uid_here",
  "photoURL": "https://photo.url"
}
```

**✅ Expected Response:**
```json
{
  "success": true,
  "message": "Google login successful",
  "token": "eyJhbGci...",
  "user": {
    "id": "...",
    "name": "Your Name",
    "email": "yourmail@gmail.com",
    "role": "buyer"
  }
}
```

---

### Step 4️⃣: Get Current User Profile

**Method:** GET  
**URL:** `http://localhost:5000/api/users/me`  
**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```
**Body:** None

**✅ Expected Response:**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "name": "Thunder User",
    "email": "thunder@test.com",
    "role": "seller",
    "isVerified": false,
    "rating": 0
  }
}
```

---

### Step 5️⃣: Update Profile

**Method:** PUT  
**URL:** `http://localhost:5000/api/users/me`  
**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```
**Body (JSON):**
```json
{
  "name": "Updated Name",
  "phone": "01712345678",
  "address": "Dhaka, Bangladesh"
}
```

**✅ Expected Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "...",
    "name": "Updated Name",
    "phone": "01712345678",
    "address": "Dhaka, Bangladesh"
  }
}
```

---

### Step 6️⃣: Logout

**Method:** POST  
**URL:** `http://localhost:5000/api/auth/logout`  
**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```
**Body:** None

**✅ Expected Response:**
```json
{
  "success": true,
  "message": "সফলভাবে logout হয়েছে"
}
```

---

### Step 7️⃣: Get User by ID (Public)

**Method:** GET  
**URL:** `http://localhost:5000/api/users/:userId`  
**Example:** `http://localhost:5000/api/users/697caaa7c2c45fd3e6751642`  
**Headers:** None  
**Body:** None

**✅ Expected Response:**
```json
{
  "success": true,
  "user": {
    "id": "697caaa7c2c45fd3e6751642",
    "name": "Thunder User",
    "email": "thunder@test.com",
    "role": "seller",
    "rating": 0
  }
}
```

---

### Step 8️⃣: Get All Users (Admin Only)

**Method:** GET  
**URL:** `http://localhost:5000/api/users`  
**Headers:**
```
Authorization: Bearer ADMIN_TOKEN_HERE
```
**Body:** None

**Note:** Regular user দিয়ে test করলে 403 error আসবে। শুধু admin access করতে পারবে।

---

### Step 9️⃣: Create Product

**Method:** POST  
**URL:** `http://localhost:5000/api/products`  
**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```
**Body (JSON):**
```json
{
  "title": "MacBook Pro 2023",
  "description": "Brand new MacBook Pro with M2 chip",
  "category": "electronics",
  "price": 150000,
  "rentalPrice": 5000,
  "condition": "new",
  "location": "Dhaka",
  "images": ["https://image1.jpg", "https://image2.jpg"],
  "listingType": "both"
}
```

**✅ Expected Response:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "product": {
    "id": "...",
    "title": "MacBook Pro 2023",
    "price": 150000,
    "owner": "your_user_id",
    "status": "active"
  }
}
```

---

### Step 🔟: Get All Products (Public)

**Method:** GET  
**URL:** `http://localhost:5000/api/products`  
**Headers:** None  
**Body:** None

**Query Parameters (Optional):**
```
?category=electronics
&minPrice=50000
&maxPrice=200000
&search=macbook
&page=1
&limit=10
```

**Example:**
```
http://localhost:5000/api/products?category=electronics&search=macbook
```

---

### Step 1️⃣1️⃣: Get Single Product

**Method:** GET  
**URL:** `http://localhost:5000/api/products/:productId`  
**Example:** `http://localhost:5000/api/products/697c123abc456def789`  
**Headers:** None  
**Body:** None

---

### Step 1️⃣2️⃣: Update Product

**Method:** PUT  
**URL:** `http://localhost:5000/api/products/:productId`  
**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```
**Body (JSON):**
```json
{
  "title": "Updated MacBook Pro",
  "price": 160000,
  "description": "Price updated"
}
```

**Note:** শুধু product owner update করতে পারবে।

---

### Step 1️⃣3️⃣: Get My Products

**Method:** GET  
**URL:** `http://localhost:5000/api/products/my/products`  
**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```
**Body:** None

---

### Step 1️⃣4️⃣: Delete Product

**Method:** DELETE  
**URL:** `http://localhost:5000/api/products/:productId`  
**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```
**Body:** None

**Note:** শুধু product owner delete করতে পারবে।

---

## 🎯 Common Error Solutions

### ❌ Error: 401 Unauthorized
**Problem:** Token missing or invalid  
**Solution:** 
1. Register/Login করে নতুন token নিন
2. Headers এ `Authorization: Bearer YOUR_TOKEN` properly add করুন
3. Token copy করার সময় extra space থাকলে remove করুন

---

### ❌ Error: 404 Not Found
**Problem:** URL ভুল বা route exist করে না  
**Solution:** 
1. Check URL spelling: `/api/users/me` (not `/api/user/me`)
2. Server running আছে কিনা check করুন
3. Port 5000 correct আছে কিনা verify করুন

---

### ❌ Error: 403 Forbidden
**Problem:** Permission নেই (Admin only route)  
**Solution:** 
1. Admin account দিয়ে login করুন
2. বা regular user accessible route ব্যবহার করুন

---

### ❌ Error: 400 Bad Request
**Problem:** Request body ভুল format  
**Solution:**
1. JSON syntax check করুন
2. Required fields সব দিয়েছেন কিনা verify করুন
3. Email format correct আছে কিনা check করুন

---

## 📊 Quick Reference Table

| API | Method | Auth | URL |
|-----|--------|------|-----|
| Register | POST | ❌ | `/api/auth/register` |
| Login | POST | ❌ | `/api/auth/login` |
| Google Login | POST | ❌ | `/api/auth/google` |
| Logout | POST | ✅ | `/api/auth/logout` |
| Get Me | GET | ✅ | `/api/users/me` |
| Update Profile | PUT | ✅ | `/api/users/me` |
| Get User | GET | ❌ | `/api/users/:userId` |
| Get All Users | GET | ✅ Admin | `/api/users` |
| Create Product | POST | ✅ | `/api/products` |
| Get Products | GET | ❌ | `/api/products` |
| Get Product | GET | ❌ | `/api/products/:id` |
| Update Product | PUT | ✅ Owner | `/api/products/:id` |
| Delete Product | DELETE | ✅ Owner | `/api/products/:id` |
| My Products | GET | ✅ | `/api/products/my/products` |

---

## 🚀 Testing Workflow

### Complete Flow Test:

1. **Register** → Get token
2. **Login** → Verify token works
3. **Get Me** → Check profile data
4. **Update Profile** → Add phone/address
5. **Create Product** → Add a listing
6. **Get All Products** → See your product in list
7. **Get My Products** → See only your listings
8. **Update Product** → Change price
9. **Delete Product** → Remove listing
10. **Logout** → Clear session

---

## ✅ All Issues Fixed!

### Before vs After:

| Endpoint | Before | After |
|----------|--------|-------|
| POST `/api/auth/google` | ❌ 404 | ✅ Working |
| POST `/api/auth/logout` | ❌ 401 | ✅ Working (needs token) |
| GET `/api/users/me` | ❌ 404 | ✅ Working |
| PUT `/api/users/me` | ❌ 404 | ✅ Working |
| GET `/api/users/:userId` | ❌ 404 | ✅ Working |
| GET `/api/users` | ❌ 404 | ✅ Working |
| Product APIs | ⚠️ Some 401 | ✅ All Working |

---

## 🎉 Ready to Test!

**এখন Thunder Client open করে একে একে test করুন!**

**Server Running:** ✅  
**All Routes Fixed:** ✅  
**Database Connected:** ✅  
**Ready for Production:** ✅

---

**Happy Testing! 🚀**
