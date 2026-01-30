# JWT Token পাওয়ার সম্পূর্ণ গাইড (ফ্রি)

## ধাপ ১: Token পান (Register বা Login করে)

### Thunder Client এ Register:

1. **নতুন Request তৈরি করুন**
2. **Method**: POST
3. **URL**: `http://localhost:5000/api/auth/register`
4. **Body ট্যাবে যান** → JSON সিলেক্ট করুন
5. **এই JSON paste করুন:**

```json
{
  "name": "Basar Ahmed",
  "email": "basar@example.com",
  "password": "Basar123!",
  "phone": "01712345678",
  "role": "seller"
}
```

6. **Send বাটনে ক্লিক করুন**

### আপনি এরকম Response পাবেন:

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWYxMjM0NTY3ODkwYWJjZGVmIiwiaWF0IjoxNzM4MzQ1Njc4LCJleHAiOjE3Mzg0MzIwNzh9.xyz123abc456",
  "user": {
    "id": "679f1234567890abcdef",
    "name": "Basar Ahmed",
    "email": "basar@example.com",
    "role": "seller"
  }
}
```

**এই `token` এর value টা কপি করুন!**

---

## ধাপ ২: Token দিয়ে Protected API Call করুন

### উদাহরণ: Product তৈরি করা

1. **নতুন Request তৈরি করুন**
2. **Method**: POST
3. **URL**: `http://localhost:5000/api/products`

4. **Headers ট্যাবে যান** এবং Add করুন:
   - **Header Name**: `Authorization`
   - **Header Value**: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWYxMjM0...`
   
   > **গুরুত্বপূর্ণ**: `Bearer` শব্দটি আগে লিখতে হবে, তারপর একটা স্পেস, তারপর token

5. **Body ট্যাবে যান** → JSON সিলেক্ট করুন

```json
{
  "title": "iPhone 13 Pro",
  "description": "Used iPhone in excellent condition",
  "category": "electronics",
  "type": "sell",
  "price": 85000,
  "location": {
    "city": "Dhaka",
    "area": "Mirpur"
  }
}
```

6. **Send করুন** → সফল হবে! ✅

---

## Thunder Client এ Headers যোগ করার Screenshot Guide:

```
┌─────────────────────────────────────────┐
│ POST http://localhost:5000/api/products │
├─────────────────────────────────────────┤
│ Tabs:                                   │
│  Body  │ Headers │ Query │ Auth         │
│         ^^^^^^^^                         │
├─────────────────────────────────────────┤
│ Headers:                                │
│                                         │
│ Key              │ Value                │
│──────────────────┼──────────────────────│
│ Authorization    │ Bearer eyJhbGc...    │
│ Content-Type     │ application/json     │
└─────────────────────────────────────────┘
```

---

## সাধারণ ভুল এবং সমাধান

### ❌ ভুল ১: Bearer শব্দ ছাড়া
```
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
**ফলাফল**: 401 Unauthorized

### ✅ সঠিক:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### ❌ ভুল ২: Token expire হয়ে গেছে
Token 24 ঘন্টা পর expire হয়ে যায়।

**সমাধান**: আবার Login করুন:
```
POST http://localhost:5000/api/auth/login
Body: {"email": "basar@example.com", "password": "Basar123!"}
```

নতুন token পাবেন!

---

### ❌ ভুল ৩: Server চালু নেই
```
Error: connect ECONNREFUSED 127.0.0.1:5000
```

**সমাধান**:
```bash
cd ~/Projects/TradeNest/backend
npm run dev
```

---

## কোন External Service লাগে না!

- ❌ কোনো Third-party API key লাগবে না
- ❌ কোনো Payment করতে হবে না
- ❌ কোনো Registration করতে হবে না
- ✅ আপনার নিজের Backend থেকেই token পাবেন
- ✅ সম্পূর্ণ **ফ্রি এবং লোকাল**

---

## সব Protected Endpoints এ একই Token ব্যবহার করুন

একবার token পেলে, সব protected routes এ use করতে পারবেন:

- ✅ POST /api/products (Create Product)
- ✅ PUT /api/products/:id (Update Product)
- ✅ DELETE /api/products/:id (Delete Product)
- ✅ GET /api/products/my/products (My Products)
- ✅ GET /api/users/me (My Profile)
- ✅ PUT /api/users/me (Update Profile)

---

## Quick Start Commands (Terminal থেকে Test করার জন্য)

### 1. Register করুন:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test123!",
    "phone": "01712345678",
    "role": "seller"
  }'
```

### 2. Token কপি করুন, তারপর Product তৈরি করুন:
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Test Product",
    "description": "Testing",
    "category": "electronics",
    "type": "sell",
    "price": 1000,
    "location": {"city": "Dhaka", "area": "Mirpur"}
  }'
```

---

## Summary

1. **Register** করুন → **token** পাবেন
2. Token **কপি** করুন
3. নতুন request এ **Headers** ট্যাবে:
   - Key: `Authorization`
   - Value: `Bearer YOUR_TOKEN`
4. **Send** করুন → কাজ করবে! ✅

**কোনো টাকা লাগবে না, সব ফ্রি!** 🎉
