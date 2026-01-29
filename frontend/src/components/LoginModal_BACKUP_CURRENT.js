import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGoogle, FaFacebook, FaPhone } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { authAPI } from '../services/api';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const { language } = useLanguage();
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const isEnglish = language === 'en';

  const resetModal = () => {
    setEmail('');
    setPhone('');
    setName('');
    setPassword('');
    setLoading(false);
    setIsRegister(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  // Validate email
  const validateEmail = (emailAddress) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(emailAddress);
  };

  // Validate Bangladesh phone number
  const validatePhone = (phoneNumber) => {
    const regex = /^01[0-9]{9}$/;
    return regex.test(phoneNumber);
  };

  // Handle email/phone-based registration/login
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (loginMethod === 'email') {
      if (!validateEmail(email)) {
        toast.error(
          isEnglish 
            ? 'Please enter a valid email address' 
            : 'সঠিক email address দিন'
        );
        return;
      }
    } else {
      if (!validatePhone(phone)) {
        toast.error(
          isEnglish 
            ? 'Please enter valid phone number (01XXXXXXXXX)' 
            : 'সঠিক phone number দিন (01XXXXXXXXX)'
        );
        return;
      }
    }

    if (password.length < 8) {
      toast.error(
        isEnglish 
          ? 'Password must be at least 8 characters' 
          : 'Password কমপক্ষে 8 অক্ষরের হতে হবে'
      );
      return;
    }

    if (isRegister && !name.trim()) {
      toast.error(
        isEnglish 
          ? 'Please enter your name' 
          : 'আপনার নাম দিন'
      );
      return;
    }

    setLoading(true);
    try {
      const payload = isRegister 
        ? { 
            name, 
            email: loginMethod === 'email' ? email : `${phone}@tradenest.local`,
            phone: loginMethod === 'phone' ? phone : null,
            password, 
            role: 'buyer' 
          }
        : { 
            email: loginMethod === 'email' ? email : `${phone}@tradenest.local`,
            phone: loginMethod === 'phone' ? phone : null,
            password 
          };

      const response = isRegister 
        ? await authAPI.register(payload)
        : await authAPI.login(payload);

      if (response.data.success) {
        login(response.data.user, response.data.token);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        toast.success(
          isEnglish 
            ? (isRegister ? '🎉 Registration successful!' : '👋 Welcome back!') 
            : (isRegister ? '🎉 সফলভাবে রেজিস্ট্রেশন হয়েছে!' : '👋 স্বাগতম!')
        );
        handleClose();
      }
    } catch (error) {
      console.error('Auth error:', error);
      const errorMsg = error.response?.data?.message;
      toast.error(
        errorMsg ||
        (isEnglish ? '❌ Authentication failed. Please try again.' : '❌ ব্যর্থ হয়েছে।')
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login (disabled for now)
  const handleGoogleLogin = () => {
    toast.info(
      isEnglish 
        ? 'Google login will be available soon. Please use email/phone for now.' 
        : 'Google লগইন শীঘ্রই আসবে। এখন email/phone ব্যবহার করুন।'
    );
  };

  // Handle Facebook login (disabled for now)
  const handleFacebookLogin = () => {
    toast.info(
      isEnglish 
        ? 'Facebook login will be available soon. Please use email/phone for now.' 
        : 'Facebook লগইন শীঘ্রই আসবে। এখন email/phone ব্যবহার করুন।'
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="login-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="login-modal-content"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="login-modal-close" onClick={handleClose}>
            <FaTimes />
          </button>

          <motion.div
            className="login-modal-header"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="login-modal-title">
              {isEnglish ? 'Welcome to TradeNest' : 'TradeNest এ স্বাগতম'}
            </h2>
            <p className="login-modal-subtitle">
              {isEnglish 
                ? 'Bangladesh\'s premier trading and rental platform' 
                : 'বাংলাদেশের সেরা ট্রেডিং ও ভাড়া প্ল্যাটফর্ম'
              }
            </p>
          </motion.div>

          <motion.div
            className="login-features"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <span>{isEnglish ? 'Secure & Fast' : 'নিরাপদ ও দ্রুত'}</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <span>{isEnglish ? 'Verified Sellers' : 'যাচাইকৃত বিক্রেতা'}</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <span>{isEnglish ? 'Safe Transactions' : 'নিরাপদ লেনদেন'}</span>
            </div>
          </motion.div>

          {/* Login Method Tabs */}
          <motion.div
            className="login-method-tabs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <button
              className={`method-tab ${loginMethod === 'email' ? 'active' : ''}`}
              onClick={() => setLoginMethod('email')}
              disabled={loading}
            >
              📧 {isEnglish ? 'Email' : 'ইমেইল'}
            </button>
            <button
              className={`method-tab ${loginMethod === 'phone' ? 'active' : ''}`}
              onClick={() => setLoginMethod('phone')}
              disabled={loading}
            >
              📱 {isEnglish ? 'Phone' : 'ফোন'}
            </button>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="login-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {isRegister && (
              <motion.div
                className="login-input-group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
              >
                <label>{isEnglish ? 'Full Name' : 'পূর্ণ নাম'}</label>
                <input
                  type="text"
                  placeholder={isEnglish ? 'Enter your name' : 'আপনার নাম লিখুন'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isRegister}
                  disabled={loading}
                />
              </motion.div>
            )}

            {loginMethod === 'email' ? (
              <motion.div
                className="login-input-group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: isRegister ? 0.4 : 0.35 }}
              >
                <label>{isEnglish ? 'Email Address' : 'ইমেইল ঠিকানা'}</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </motion.div>
            ) : (
              <motion.div
                className="login-input-group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: isRegister ? 0.4 : 0.35 }}
              >
                <label>{isEnglish ? 'Phone Number' : 'ফোন নাম্বার'}</label>
                <input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  disabled={loading}
                  maxLength={11}
                />
                <small style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                  {isEnglish ? 'Enter Bangladesh phone number' : 'বাংলাদেশী ফোন নাম্বার দিন'}
                </small>
              </motion.div>
            )}

            <motion.div
              className="login-input-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: isRegister ? 0.45 : 0.4 }}
            >
              <label>{isEnglish ? 'Password' : 'পাসওয়ার্ড'}</label>
              <input
                type="password"
                placeholder={isEnglish ? 'Minimum 8 characters' : 'কমপক্ষে 8 অক্ষর'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                disabled={loading}
              />
            </motion.div>

            <motion.button
              type="submit"
              className="login-submit-btn"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isRegister ? 0.5 : 0.45 }}
            >
              {loading ? (
                <span className="loading-spinner">
                  {isEnglish ? '⏳ Please wait...' : '⏳ অপেক্ষা করুন...'}
                </span>
              ) : isRegister ? (
                isEnglish ? '🚀 Create Account' : '🚀 একাউন্ট তৈরি করুন'
              ) : (
                isEnglish ? '🔓 Login' : '🔓 লগইন করুন'
              )}
            </motion.button>

            <motion.div
              className="login-toggle-mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="toggle-mode-btn"
                disabled={loading}
              >
                {isRegister ? (
                  isEnglish ? 'Already have an account? Login' : 'একাউন্ট আছে? লগইন করুন'
                ) : (
                  isEnglish ? 'New user? Create Account' : 'নতুন ব্যবহারকারী? একাউন্ট তৈরি করুন'
                )}
              </button>
            </motion.div>
          </motion.form>

          <motion.div
            className="login-divider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span>{isEnglish ? 'Or continue with' : 'অথবা'}</span>
          </motion.div>

          <motion.div
            className="social-login-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <motion.button
              className="social-login-btn google-btn"
              onClick={handleGoogleLogin}
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
            >
              <FaGoogle />
              <span>{isEnglish ? 'Google' : 'Google দিয়ে'}</span>
            </motion.button>

            <motion.button
              className="social-login-btn facebook-btn"
              onClick={handleFacebookLogin}
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
            >
              <FaFacebook />
              <span>{isEnglish ? 'Facebook' : 'Facebook দিয়ে'}</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginModal;
