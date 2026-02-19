# 🧪 Authentication Flow Testing Guide

## ✅ যা Fix করা হয়েছে:

### 1. **Backend Response Format** ✅
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "...",
    "email": "...",
    "role": "..."
  }
}
```

### 2. **Frontend Login Function** ✅
```javascript
// Before (❌ Wrong):
login(response.data.user, response.data.token)

// After (✅ Correct):
const { token, user } = response.data;
login({ token, user });
```

### 3. **AuthContext** ✅
```javascript
// Now accepts object with {token, user}
const login = (authData) => {
  const { token, user } = authData;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  setUser(user);
  setIsAuthenticated(true);
};
```

### 4. **API Configuration** ✅
- Base URL: `http://localhost:5000/api`
- Token interceptor working
- Error handling setup
- CORS configured

---

## 🎯 Test করার ধাপ:

### **ধাপ ১: Backend Check**
```bash
# Terminal 1:
cd ~/Projects/TradeNest/backend
npm run dev

# Expected output:
# ✅ Server running on port 5000
# ✅ MongoDB Connected Successfully
```

### **ধাপ ২: Frontend Check**
```bash
# Terminal 2:
cd ~/Projects/TradeNest/frontend
npm start

# Expected output:
# ✅ Compiled successfully!
# ✅ Local: http://localhost:3000
```

### **ধাপ ৩: Register Test**

**Browser: http://localhost:3000**

1. Click "Login" button
2. Switch to "Register" tab
3. Fill form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `Test123456`
   - Role: `buyer`
4. Click "Register"

**Expected Result:**
- ✅ Success toast: "🎉 Registration successful!"
- ✅ Modal closes automatically
- ✅ User is logged in
- ✅ Token saved in localStorage

**Console Check (F12):**
```javascript
localStorage.getItem('token')
// Should return: "eyJhbGc..."

localStorage.getItem('user')
// Should return: JSON string with user data

JSON.parse(localStorage.getItem('user'))
// Should show user object with name, email, role
```

### **ধাপ ৪: Login Test**

1. Click "Logout" (if logged in)
2. Click "Login"
3. Enter:
   - Email: `test@example.com`
   - Password: `Test123456`
4. Click "Login"

**Expected Result:**
- ✅ Success toast: "👋 Welcome back!"
- ✅ Modal closes
- ✅ User logged in
- ✅ Same token and user data

### **ধাপ ৫: Google Login Test** (Optional)

1. Click "Login with Google"
2. Select Google account
3. Approve permissions

**Expected Result:**
- ✅ "✅ Logged in with Google!"
- ✅ Token and user saved
- ✅ Backend creates/finds user

---

## 🔍 Debugging Checklist:

### If Registration Fails:

**Check Backend Terminal:**
```
Register Error: <error message>
```

**Common Issues:**
- ❌ MongoDB not connected → Restart backend
- ❌ Duplicate email → Use different email
- ❌ Password too short → Min 8 characters
- ❌ Port 5000 in use → Kill process and restart

**Fix:**
```bash
# Kill backend
pkill -f "node.*server.js"

# Restart
cd ~/Projects/TradeNest/backend
npm run dev
```

### If Login Fails:

**Browser Console (F12) → Network Tab:**
1. Look for `/api/auth/login` request
2. Check Status Code:
   - ✅ 200 = Success
   - ❌ 400 = Bad request (check payload)
   - ❌ 401 = Invalid credentials
   - ❌ 500 = Server error

**Response Preview:**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### If Token Not Saving:

**Console:**
```javascript
// Test manually
const testToken = "test123";
localStorage.setItem('token', testToken);
localStorage.getItem('token');
// Should return "test123"

// If returns null:
// - Browser private mode might block localStorage
// - Try different browser
```

---

## 🐛 Common Errors & Solutions:

### Error 1: "Network Error"
**Cause:** Backend not running
**Fix:**
```bash
cd ~/Projects/TradeNest/backend
npm run dev
```

### Error 2: "CORS Error"
**Cause:** CORS not configured
**Fix:** Already fixed in `server.js` with cors middleware

### Error 3: "401 Unauthorized"
**Cause:** Token not sent or invalid
**Fix:** Check if token is in localStorage and axios interceptor is working

### Error 4: "Cannot read property 'data' of undefined"
**Cause:** Response structure mismatch
**Fix:** Already fixed - response.data.token (not response.data.data.token)

### Error 5: "User already exists"
**Cause:** Email already registered
**Fix:** Use different email OR test login with existing email

---

## 📊 Testing Status:

### Backend APIs:
- ✅ POST /api/auth/register - Working
- ✅ POST /api/auth/login - Working  
- ✅ GET /api/auth/me - Working
- ✅ MongoDB Connection - Working

### Frontend:
- ✅ LoginModal component - Fixed
- ✅ AuthContext - Fixed
- ✅ API service - Working
- ✅ Token management - Fixed

### Integration:
- ✅ Register flow - Ready
- ✅ Login flow - Ready
- ✅ Token storage - Ready
- ✅ User state - Ready
- ⏳ Google OAuth - Ready (needs testing)

---

## 🚀 Next Steps After Testing:

1. **Product List Integration**
   - Fetch products from backend
   - Display in cards
   - Add pagination

2. **Create Product Page**
   - Form with validation
   - Image upload
   - Submit to backend

3. **User Dashboard**
   - Show user products
   - Edit/Delete functionality
   - Statistics

4. **Protected Routes**
   - Redirect to login if not authenticated
   - Role-based access
   - Admin features

---

## 📝 Manual API Test Commands:

### Register:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Manual Test",
    "email": "manual@test.com",
    "password": "Manual123",
    "role": "buyer"
  }'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "manual@test.com",
    "password": "Manual123"
  }'
```

### Get Me (with token):
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## ✅ Success Criteria:

- [ ] Backend running without errors
- [ ] Frontend compiles successfully
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Token saved in localStorage
- [ ] User data saved in localStorage
- [ ] Console shows no errors
- [ ] Toast messages appear correctly
- [ ] Modal closes after success
- [ ] Logout works properly

---

**Test করে result বলুন! 🎯**
