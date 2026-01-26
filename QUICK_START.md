# 🚀 Quick Start Guide - TradeNest

## ⚡ Fast Setup (5 Minutes)

### Step 1: Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend (Open new terminal)
```bash
cd frontend
npm install
```

---

### Step 2: Setup Environment

#### Backend - Create `.env` file
```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tradenest
JWT_SECRET=change_this_secret_key_123456
FRONTEND_URL=http://localhost:3000
```

#### Frontend - Create `.env` file
```bash
cd frontend
cp .env.example .env
```

Edit `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

### Step 3: Start MongoDB

```bash
# Start MongoDB service
sudo systemctl start mongodb

# Verify it's running
sudo systemctl status mongodb
```

---

### Step 4: Run the Application

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

✅ You should see:
```
🚀 TradeNest Backend running on port 5000
🌍 Environment: development
✅ MongoDB Connected: localhost
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

✅ Browser will open at: `http://localhost:3000`

---

## 🧪 Test Your Setup

### 1. Open Browser
Visit: `http://localhost:3000`

You should see the animated landing page with two cards:
- **Rent Products**
- **Buy & Sell**

### 2. Test Registration
1. Click any card (it will redirect to login)
2. Click "Register here"
3. Fill the form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 01712345678
   - Role: Buyer
   - Password: test123
4. Click Register

✅ Success! You should be redirected to homepage

### 3. Test API Directly

```bash
# Health check
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "TradeNest API is running!",
  "timestamp": "2026-01-26T..."
}
```

---

## 🎯 Next Steps

### Add Your First Product (as Seller)

1. **Register as Seller**
   - Go to Register page
   - Select "Sell/Rent Products" option

2. **Manual Verification** (For now - Admin panel coming soon)
   Open MongoDB:
   ```bash
   mongo
   use tradenest
   db.users.updateOne(
     { email: "test@example.com" },
     { $set: { isVerified: true, verificationStatus: "approved" } }
   )
   ```

3. **Create Product via API**
   ```bash
   # Get your token from browser localStorage or login response
   curl -X POST http://localhost:5000/api/products \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Test Car",
       "description": "A nice car for rent",
       "category": "vehicles",
       "subcategory": "car",
       "type": "rent",
       "price": 5000,
       "priceUnit": "day",
       "condition": "good",
       "location": {
         "city": "Dhaka",
         "area": "Gulshan"
       }
     }'
   ```

---

## 🛠 Common Issues

### MongoDB Not Starting
```bash
# Check logs
sudo journalctl -u mongodb

# Reinstall if needed
sudo apt install mongodb
```

### Port 3000 Already in Use
```bash
# Frontend will ask to use port 3001
# Just type 'y' and press Enter
```

### Backend Not Connecting to MongoDB
Check your `.env` file:
- For local: `mongodb://localhost:27017/tradenest`
- For Atlas: `mongodb+srv://username:password@cluster.mongodb.net/tradenest`

---

## 📋 Development Workflow

### Daily Workflow:
```bash
# 1. Start MongoDB (once)
sudo systemctl start mongodb

# 2. Start Backend (Terminal 1)
cd backend && npm run dev

# 3. Start Frontend (Terminal 2)
cd frontend && npm start

# 4. Code and test!
```

### Stop Services:
- Press `Ctrl+C` in both terminals
- MongoDB keeps running (optional to stop)

---

## 🎨 What You Have Now

✅ **Backend**
- User registration & login (JWT auth)
- Product CRUD operations
- MongoDB database
- Role-based access control
- Secure API endpoints

✅ **Frontend**
- Beautiful animated landing page
- Login & Register pages
- Auth context (state management)
- API service setup
- Toast notifications

---

## 🔜 Next Feature to Build

**Choice 1: Admin Panel**
- Verify sellers
- Approve products
- View statistics

**Choice 2: Product Listing Pages**
- Rent marketplace
- Sell marketplace
- Product cards with images

**Choice 3: Image Upload**
- Cloudinary integration
- Product image upload
- Avatar upload

👉 **Tell me which feature you want to build next!**

---

## 📞 Need Help?

Common commands:
```bash
# Check Node version
node -v

# Check npm version
npm -v

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

**You're all set! Start coding! 🎉**
