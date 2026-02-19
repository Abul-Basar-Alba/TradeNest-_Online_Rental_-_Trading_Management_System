const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Sample products
const sampleProducts = [
  {
    title: 'মডার্ন অফিস চেয়ার (Modern Boss Chair)',
    description: 'উচ্চমানের অফিস চেয়ার, আরামদায়ক এবং টেকসই। পিঠের জন্য বিশেষভাবে ডিজাইন করা।',
    category: 'furniture',
    type: 'sell',
    price: 3999,
    priceType: 'fixed',
    location: { city: 'ঢাকা', area: 'মিরপুর' },
    images: ['https://via.placeholder.com/300x200?text=Office+Chair'],
    ownerId: null, // Will be set to first user
    status: 'active',
    isAvailable: true,
    featured: true
  },
  {
    title: 'ভাড়ার জন্য শোরুম স্পেস 5500sqft',
    description: 'বাণিজ্যিক শোরুম, প্রতি তলায় 5500 বর্গফুট। প্রধান সড়কে অবস্থিত।',
    category: 'property',
    type: 'rent',
    price: 140000,
    priceType: 'monthly',
    location: { city: 'ঢাকা', area: 'গুলশান' },
    images: ['https://via.placeholder.com/300x200?text=Showroom'],
    ownerId: null,
    status: 'active',
    isAvailable: true,
    featured: true
  },
  {
    title: 'iPhone 13 Pro - Used',
    description: 'সম্পূর্ণ কার্যক্ষম iPhone 13 Pro, ভালো অবস্থায়।',
    category: 'electronics',
    type: 'sell',
    price: 85000,
    priceType: 'fixed',
    location: { city: 'ঢাকা', area: 'ধানমন্ডি' },
    images: ['https://via.placeholder.com/300x200?text=iPhone'],
    ownerId: null,
    status: 'active',
    isAvailable: true
  },
  {
    title: 'টয়োটা করোলা ২০১৮',
    description: 'সুন্দর অবস্থায় টয়োটা করোলা, কম চালিত।',
    category: 'vehicles',
    type: 'sell',
    price: 2500000,
    priceType: 'fixed',
    location: { city: 'ঢাকা', area: 'উত্তরা' },
    images: ['https://via.placeholder.com/300x200?text=Car'],
    ownerId: null,
    status: 'active',
    isAvailable: true
  },
  {
    title: 'ডবল বিছানা সেট',
    description: 'নতুন ডিজাইনের ডবল বিছানা, গদি সহ।',
    category: 'furniture',
    type: 'sell',
    price: 25000,
    priceType: 'fixed',
    location: { city: 'চট্টগ্রাম', area: 'আগ্রাবাদ' },
    images: ['https://via.placeholder.com/300x200?text=Bed'],
    ownerId: null,
    status: 'active',
    isAvailable: true
  },
  {
    title: 'ওয়েডিং স্টেজ ডেকোরেশন',
    description: 'বিয়ের স্টেজ ডেকোরেশন প্যাকেজ, সম্পূর্ণ সেটআপ সহ।',
    category: 'event-equipment',
    type: 'rent',
    price: 15000,
    priceType: 'daily',
    location: { city: 'ঢাকা', area: 'মগবাজার' },
    images: ['https://via.placeholder.com/300x200?text=Stage'],
    ownerId: null,
    status: 'active',
    isAvailable: true
  },
  {
    title: 'ডেল ল্যাপটপ i5',
    description: 'Dell Inspiron 15, Intel Core i5, 8GB RAM, 256GB SSD',
    category: 'electronics',
    type: 'sell',
    price: 38000,
    priceType: 'fixed',
    location: { city: 'ঢাকা', area: 'বনানী' },
    images: ['https://via.placeholder.com/300x200?text=Laptop'],
    ownerId: null,
    status: 'active',
    isAvailable: true
  },
  {
    title: 'মেয়েদের পার্টি ড্রেস',
    description: 'নতুন পার্টি ড্রেস, বিভিন্ন সাইজ পাওয়া যায়।',
    category: 'fashion',
    type: 'sell',
    price: 3500,
    priceType: 'fixed',
    location: { city: 'ঢাকা', area: 'নিউমার্কেট' },
    images: ['https://via.placeholder.com/300x200?text=Dress'],
    ownerId: null,
    status: 'active',
    isAvailable: true
  }
];

async function seedProducts() {
  try {
    // Get first user to assign as owner
    const User = require('./models/User');
    const firstUser = await User.findOne();
    
    if (!firstUser) {
      console.log('❌ No user found. Please create a user first.');
      process.exit(1);
    }

    console.log('✅ Found user:', firstUser.email);

    // Assign owner to all products
    sampleProducts.forEach(product => {
      product.ownerId = firstUser._id;
    });

    // Clear existing products (optional)
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    const result = await Product.insertMany(sampleProducts);
    console.log(`✅ Created ${result.length} sample products`);

    console.log('\n📦 Sample products created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedProducts();
