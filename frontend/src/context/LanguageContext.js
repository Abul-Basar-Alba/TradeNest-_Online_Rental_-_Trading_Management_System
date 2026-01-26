import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navbar
    categories: 'All Categories',
    search: 'What are you looking for?',
    chat: 'Chat',
    login: 'Login',
    postAd: 'POST YOUR AD',
    
    // Landing
    heroTitle: 'Find What You Need, Rent What You Want',
    heroSubtitle: 'The most trusted platform for buying, selling, and renting in Bangladesh',
    rentTitle: 'Rent Products',
    rentDesc: 'Browse items available for rent',
    rentBtn: 'Explore Rentals',
    sellTitle: 'Buy & Sell',
    sellDesc: 'Find products to buy or sell',
    sellBtn: 'Browse Market',
    verifiedSellers: 'Verified Sellers',
    secureTransactions: 'Secure Transactions',
    trustedPlatform: 'Trusted Platform',
    
    // Auth
    welcomeBack: 'Welcome Back',
    loginSubtitle: 'Login to your TradeNest account',
    createAccount: 'Create Account',
    registerSubtitle: 'Join TradeNest today',
    email: 'Email',
    password: 'Password',
    phone: 'Phone Number',
    fullName: 'Full Name',
    confirmPassword: 'Confirm Password',
    iWantTo: 'I want to',
    buyRent: 'Buy/Rent Products',
    sellRentOut: 'Sell/Rent Products',
    loginBtn: 'Login',
    registerBtn: 'Register',
    loggingIn: 'Logging in...',
    creatingAccount: 'Creating account...',
    noAccount: "Don't have an account?",
    registerHere: 'Register here',
    haveAccount: 'Already have an account?',
    loginHere: 'Login here'
  },
  bn: {
    // Navbar
    categories: 'সকল বিভাগ',
    search: 'আপনি কী খুঁজছেন?',
    chat: 'চ্যাট',
    login: 'লগ ইন',
    postAd: 'বিজ্ঞাপন দিন',
    
    // Landing
    heroTitle: 'আপনার প্রয়োজনীয় খুঁজুন, ভাড়া নিন সহজে',
    heroSubtitle: 'বাংলাদেশের সবচেয়ে বিশ্বস্ত কেনাবেচা ও ভাড়া প্ল্যাটফর্ম',
    rentTitle: 'ভাড়া পণ্য',
    rentDesc: 'ভাড়া নেওয়ার জন্য পণ্য দেখুন',
    rentBtn: 'ভাড়া পণ্য দেখুন',
    sellTitle: 'কিনুন ও বিক্রি করুন',
    sellDesc: 'পণ্য কিনুন বা বিক্রি করুন',
    sellBtn: 'মার্কেট দেখুন',
    verifiedSellers: 'যাচাইকৃত বিক্রেতা',
    secureTransactions: 'নিরাপদ লেনদেন',
    trustedPlatform: 'বিশ্বস্ত প্ল্যাটফর্ম',
    
    // Auth
    welcomeBack: 'স্বাগতম',
    loginSubtitle: 'আপনার একাউন্টে লগ ইন করুন',
    createAccount: 'একাউন্ট তৈরি করুন',
    registerSubtitle: 'TradeNest এ যোগ দিন',
    email: 'ইমেইল',
    password: 'পাসওয়ার্ড',
    phone: 'ফোন নম্বর',
    fullName: 'পূর্ণ নাম',
    confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
    iWantTo: 'আমি চাই',
    buyRent: 'পণ্য কিনতে/ভাড়া নিতে',
    sellRentOut: 'পণ্য বিক্রি/ভাড়া দিতে',
    loginBtn: 'লগ ইন',
    registerBtn: 'রেজিস্টার',
    loggingIn: 'লগ ইন করা হচ্ছে...',
    creatingAccount: 'একাউন্ট তৈরি হচ্ছে...',
    noAccount: 'একাউন্ট নেই?',
    registerHere: 'এখানে রেজিস্টার করুন',
    haveAccount: 'একাউন্ট আছে?',
    loginHere: 'এখানে লগ ইন করুন'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('bn'); // Default Bangla

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'bn' : 'en');
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
