# TradeNest - Online Rental & Trading Management System (ORTMS)

![TradeNest Logo](https://via.placeholder.com/800x200/667eea/ffffff?text=TradeNest+-+Smart+Rental+%26+Trading+Platform)

## 🎯 Project Overview

**TradeNest** is a modern, secure, and scalable online marketplace platform that enables users to buy, sell, and rent products with a trust-based verification system. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), this platform provides a seamless experience for buyers, sellers, and administrators.

### Key Features
- ✅ **Verified Marketplace**: Authority-based seller verification system
- 🔒 **Secure Authentication**: JWT-based auth with bcrypt password hashing
- 🏪 **Dual Purpose**: Support for both rental and selling transactions
- 📱 **Responsive Design**: Mobile-first approach with beautiful UI
- ⚡ **Real-time Updates**: Socket.io integration for messaging (coming soon)
- 💳 **Payment Integration**: bKash & SSL Commerz support (coming soon)
- ⭐ **Rating System**: User reviews and trust scores

---

## 🛠 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **React Toastify** - Notifications
- **React Icons** - Icon library

---

## 📂 Project Structure

```
TradeNest/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── productController.js # Product CRUD operations
│   ├── middleware/
│   │   └── auth.js              # JWT verification & role check
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Product.js           # Product schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── productRoutes.js     # Product endpoints
│   │   └── userRoutes.js        # User management
│   ├── .env.example             # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   └── server.js                # Entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── context/
    │   │   └── AuthContext.js   # Auth state management
    │   ├── pages/
    │   │   ├── LandingPage.js   # Homepage
    │   │   ├── Login.js         # Login page
    │   │   ├── Register.js      # Registration
    │   │   └── Auth.css         # Auth styles
    │   ├── services/
    │   │   └── api.js           # API calls
    │   ├── App.js               # Main component
    │   ├── index.js             # Entry point
    │   └── index.css            # Global styles
    ├── .env.example
    ├── .gitignore
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Linux OS (recommended)

### Installation

#### 1️⃣ Clone or Navigate to Project
```bash
cd /mnt/AE587D7D587D44DD/6Th_Semester/Software_Development_2/Product_RentAndSell/TradeNest
```

#### 2️⃣ Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file and add your MongoDB URI
nano .env
```

**Configure `.env` file:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/tradenest
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

**Start MongoDB (if local):**
```bash
sudo systemctl start mongodb
```

**Run Backend:**
```bash
# Development mode (with nodemon)
npm run dev

# OR Production mode
npm start
```

✅ Backend should be running on `http://localhost:5000`

#### 3️⃣ Frontend Setup

Open a **new terminal**:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Configure `.env` file:**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NAME=TradeNest
```

**Run Frontend:**
```bash
npm start
```

✅ Frontend should open at `http://localhost:3000`

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "01712345678",
  "password": "password123",
  "role": "buyer" // or "seller"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

#### Logout
```http
GET /auth/logout
Authorization: Bearer <token>
```

### Product Endpoints

#### Get All Products
```http
GET /products?type=rent&category=vehicles&city=Dhaka
```

Query Parameters:
- `type`: rent | sell
- `category`: vehicles | property | fashion | electronics | furniture | services
- `city`: City name
- `minPrice`: Minimum price
- `maxPrice`: Maximum price
- `search`: Search keyword

#### Get Single Product
```http
GET /products/:id
```

#### Create Product (Verified Sellers Only)
```http
POST /products
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Toyota Corolla 2020",
  "description": "Excellent condition car for rent",
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
}
```

#### Update Product
```http
PUT /products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "price": 4500,
  "isAvailable": true
}
```

#### Delete Product
```http
DELETE /products/:id
Authorization: Bearer <token>
```

---

## 🔐 Security Features

### Implemented
✅ **Password Hashing** - bcrypt with salt rounds
✅ **JWT Authentication** - Secure token-based auth
✅ **HTTP-Only Cookies** - XSS protection
✅ **CORS Configuration** - Controlled access
✅ **Helmet.js** - Security headers
✅ **Input Validation** - express-validator
✅ **Role-Based Access** - Admin/Seller/Buyer roles
✅ **Verification System** - Seller verification required

### Coming Soon
⏳ **Rate Limiting** - Prevent abuse
⏳ **2FA Authentication** - Two-factor auth
⏳ **File Upload Validation** - Secure image handling
⏳ **Audit Logs** - Track all actions

---

## 👥 User Roles

### 1️⃣ Buyer
- Browse products (rent/sell)
- Search and filter
- Contact sellers
- Rate and review
- **No verification required**

### 2️⃣ Seller
- Post products (rent/sell)
- Manage listings
- Accept/reject requests
- View analytics
- **Verification required to post**

### 3️⃣ Admin/Authority
- Verify sellers
- Approve/reject products
- Manage users
- View system analytics
- Block fraudulent users

---

## 🎨 UI Features

- ✨ **Animated Landing Page** - Smooth transitions with Framer Motion
- 🎭 **Responsive Design** - Mobile, tablet, desktop optimized
- 🌈 **Modern Gradient Design** - Beautiful color schemes
- 🔔 **Toast Notifications** - Real-time feedback
- 📱 **Progressive Enhancement** - Works on all devices

---

## 🗺 Development Roadmap

### Phase 1: Core Features (Current - Week 1-2)
- [x] Project structure
- [x] Backend API (Auth + Products)
- [x] Frontend UI (Landing + Auth)
- [x] MongoDB integration
- [ ] Image upload (Cloudinary)

### Phase 2: Advanced Features (Week 3-4)
- [ ] Admin panel
- [ ] Seller verification workflow
- [ ] Product approval system
- [ ] Search and filters
- [ ] User profiles

### Phase 3: Real-time Features (Week 5-6)
- [ ] Socket.io chat
- [ ] Real-time notifications
- [ ] Payment gateway (bKash/SSL Commerz)
- [ ] Rating and review system

### Phase 4: Mobile App (Week 7-8)
- [ ] Flutter app setup
- [ ] API integration
- [ ] Core screens (Browse, Search, Post)
- [ ] Payment integration

### Phase 5: Testing & Documentation (Week 9-10)
- [ ] Unit tests
- [ ] Integration tests
- [ ] Security audit
- [ ] Final report
- [ ] Presentation

---

## 🧪 Testing

### Test Backend API

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "01712345678",
    "password": "test123",
    "role": "buyer"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

### Using Thunder Client / Postman
1. Install Thunder Client extension in VS Code
2. Import API collection (coming soon)
3. Test all endpoints

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check MongoDB status
sudo systemctl status mongodb

# Start MongoDB
sudo systemctl start mongodb

# Enable on boot
sudo systemctl enable mongodb
```

### Port Already in Use
```bash
# Find process using port 5000
sudo lsof -i :5000

# Kill process
kill -9 <PID>

# Or change PORT in .env file
```

### CORS Error
- Make sure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check CORS configuration in `server.js`

### JWT Token Error
- Make sure `JWT_SECRET` is set in `.env`
- Check token expiration time
- Clear browser cookies and localStorage

---

## 📚 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [Framer Motion](https://www.framer.com/motion/)

---

## 🤝 Contributing

This is an academic project, but suggestions are welcome!

---

## 👨‍💻 Author

**Your Name**  
Student ID: XXXXX  
Course: Software Development-2  
Semester: 6th  
University: [Your University Name]

---

## 📄 License

This project is for academic purposes only.

---

## 📞 Support

For questions or issues:
- Email: your.email@example.com
- GitHub Issues: (if public)

---

## 🎉 Acknowledgments

- Bikroy.com for UX inspiration
- MERN Stack community
- Course instructor and mentors

---

**Happy Coding! 🚀**
