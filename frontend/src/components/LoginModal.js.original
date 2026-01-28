import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGoogle, FaFacebook, FaMobileAlt, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const { language } = useLanguage();
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' or 'email'
  const [step, setStep] = useState('input'); // 'input', 'otp', or 'verify-email'
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const isEnglish = language === 'en';

  const resetModal = () => {
    setLoginMethod('phone');
    setStep('input');
    setPhone('');
    setEmail('');
    setName('');
    setOtp('');
    setLoading(false);
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

  // Handle Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (!validatePhone(phone)) {
      toast.error(
        isEnglish 
          ? 'Please enter a valid Bangladesh phone number (01XXXXXXXXX)' 
          : 'অনুগ্রহ করে সঠিক বাংলাদেশী মোবাইল নাম্বার দিন (01XXXXXXXXX)'
      );
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/send-otp', {
        phone
      });

      if (response.data.success) {
        toast.success(
          isEnglish 
            ? 'OTP sent to your phone' 
            : 'OTP আপনার মোবাইলে পাঠানো হয়েছে'
        );
        
        // Development mode এ OTP console এ দেখাবে
        if (response.data.devOTP) {
          console.log('🔐 Dev OTP:', response.data.devOTP);
          toast.info(`Dev OTP: ${response.data.devOTP}`, { autoClose: 10000 });
        }
        
        setStep('otp');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 
        (isEnglish ? 'Failed to send OTP' : 'OTP পাঠাতে সমস্যা হয়েছে')
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Send Email Verification
  const handleSendEmailVerification = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast.error(
        isEnglish 
          ? 'Please enter a valid email address' 
          : 'অনুগ্রহ করে সঠিক email address দিন'
      );
      return;
    }

    if (!name || name.trim().length < 2) {
      toast.error(
        isEnglish 
          ? 'Please enter your name' 
          : 'অনুগ্রহ করে আপনার নাম দিন'
      );
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/send-email-verification', {
        email,
        name: name.trim()
      });

      if (response.data.success) {
        toast.success(
          isEnglish 
            ? 'Verification email sent! Check your inbox' 
            : 'Verification email পাঠানো হয়েছে! আপনার inbox চেক করুন'
        );
        
        // Development mode এ verification link console এ দেখাবে
        if (response.data.devVerificationUrl) {
          console.log('🔗 Verification Link:', response.data.devVerificationUrl);
          toast.info('Check console for verification link (Dev Mode)', { autoClose: 10000 });
        }
        
        setStep('verify-email');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 
        (isEnglish ? 'Failed to send verification email' : 'Verification email পাঠাতে সমস্যা হয়েছে')
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast.error(
        isEnglish 
          ? 'Please enter 6-digit OTP' 
          : 'অনুগ্রহ করে 6 digit এর OTP দিন'
      );
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        phone,
        otp
      });

      if (response.data.success) {
        login(response.data.user, response.data.token);
        toast.success(
          isEnglish 
            ? 'Login successful!' 
            : 'সফলভাবে লগইন হয়েছে!'
        );
        handleClose();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 
        (isEnglish ? 'Invalid OTP' : 'ভুল OTP দিয়েছেন')
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  // Handle Facebook Login
  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/facebook';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="login-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="login-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Close Button */}
            <button className="login-modal-close" onClick={handleClose}>
              <FaTimes />
            </button>

            {/* Header */}
            <div className="login-modal-header">
              {(step === 'otp' || step === 'verify-email') && (
                <button className="login-back-btn" onClick={() => setStep('input')}>
                  <FaArrowLeft />
                </button>
              )}
              <h2>
                {step === 'input' 
                  ? (isEnglish ? 'Welcome to TradeNest!' : 'TradeNest এ স্বাগতম!')
                  : step === 'otp'
                  ? (isEnglish ? 'Enter OTP' : 'OTP দিন')
                  : (isEnglish ? 'Check Your Email' : 'আপনার Email চেক করুন')
                }
              </h2>
              {step === 'input' ? (
                <div className="welcome-info">
                  <p className="welcome-subtitle">
                    {isEnglish 
                      ? 'Bangladesh\'s most trusted online rental & trading platform' 
                      : 'বাংলাদেশের সবচেয়ে বিশ্বস্ত অনলাইন ভাড়া ও বেচাকেনা প্ল্যাটফর্ম'}
                  </p>
                  <div className="welcome-benefits">
                    <div className="benefit-item">
                      <span className="benefit-icon">✓</span>
                      <span>{isEnglish ? 'Verified Listings' : 'যাচাইকৃত বিজ্ঞাপন'}</span>
                    </div>
                    <div className="benefit-item">
                      <span className="benefit-icon">✓</span>
                      <span>{isEnglish ? 'Secure Transactions' : 'নিরাপদ লেনদেন'}</span>
                    </div>
                    <div className="benefit-item">
                      <span className="benefit-icon">✓</span>
                      <span>{isEnglish ? 'Rent & Sell Easily' : 'সহজে ভাড়া ও বিক্রি'}</span>
                    </div>
                  </div>
                </div>
              ) : step === 'otp' ? (
                <p>
                  {isEnglish 
                    ? `OTP sent to ${phone}` 
                    : `${phone} নাম্বারে OTP পাঠানো হয়েছে`}
                </p>
              ) : (
                <p>
                  {isEnglish 
                    ? `Verification link sent to ${email}` 
                    : `${email} এ verification link পাঠানো হয়েছে`}
                </p>
              )}
            </div>

            {/* Content */}
            <div className="login-modal-content">
              {step === 'input' ? (
                <>
                  {/* Login Method Toggle */}
                  <div className="login-method-toggle">
                    <button
                      type="button"
                      className={`toggle-btn ${loginMethod === 'phone' ? 'active' : ''}`}
                      onClick={() => setLoginMethod('phone')}
                    >
                      <FaMobileAlt /> {isEnglish ? 'Phone' : 'ফোন'}
                    </button>
                    <button
                      type="button"
                      className={`toggle-btn ${loginMethod === 'email' ? 'active' : ''}`}
                      onClick={() => setLoginMethod('email')}
                    >
                      ✉️ {isEnglish ? 'Email' : 'ইমেইল'}
                    </button>
                  </div>

                  {loginMethod === 'phone' ? (
                    /* Phone Input */
                    <form onSubmit={handleSendOTP} className="login-form">
                      <div className="login-input-group">
                        <label>
                          <FaMobileAlt className="input-icon" />
                          {isEnglish ? 'Mobile Number' : 'মোবাইল নাম্বার'}
                        </label>
                        <input
                          type="tel"
                          placeholder={isEnglish ? '01XXXXXXXXX' : '01XXXXXXXXX'}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          maxLength={11}
                          required
                          className="login-input"
                        />
                        <small className="input-hint">
                          {isEnglish 
                            ? 'Enter your 11-digit Bangladesh mobile number' 
                            : 'আপনার 11 সংখ্যার বাংলাদেশী মোবাইল নাম্বার দিন'}
                        </small>
                      </div>
                      <button 
                        type="submit" 
                        className="login-btn login-btn-primary"
                        disabled={loading}
                      >
                        {loading 
                          ? (isEnglish ? 'Sending...' : 'পাঠানো হচ্ছে...') 
                          : (isEnglish ? 'Send OTP' : 'OTP পাঠান')
                        }
                      </button>
                    </form>
                  ) : (
                    /* Email Input */
                    <form onSubmit={handleSendEmailVerification} className="login-form">
                      <div className="login-input-group">
                        <label>
                          ✉️ {isEnglish ? 'Email Address' : 'ইমেইল ঠিকানা'}
                        </label>
                        <input
                          type="email"
                          placeholder={isEnglish ? 'your-email@example.com' : 'আপনার-ইমেইল@example.com'}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="login-input"
                        />
                      </div>
                      <div className="login-input-group">
                        <label>
                          👤 {isEnglish ? 'Your Name' : 'আপনার নাম'}
                        </label>
                        <input
                          type="text"
                          placeholder={isEnglish ? 'Enter your name' : 'আপনার নাম লিখুন'}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          minLength={2}
                          className="login-input"
                        />
                        <small className="input-hint">
                          {isEnglish 
                            ? 'We\'ll send a verification link to your email' 
                            : 'আমরা আপনার ইমেইলে verification link পাঠাব'}
                        </small>
                      </div>
                      <button 
                        type="submit" 
                        className="login-btn login-btn-primary"
                        disabled={loading}
                      >
                        {loading 
                          ? (isEnglish ? 'Sending...' : 'পাঠানো হচ্ছে...') 
                          : (isEnglish ? 'Send Verification Email' : 'Verification Email পাঠান')
                        }
                      </button>
                    </form>
                  )}

                  {/* Divider */}
                  <div className="login-divider">
                    <span>{isEnglish ? 'OR' : 'অথবা'}</span>
                  </div>

                  {/* Social Login */}
                  <div className="social-login-buttons">
                    <button 
                      className="login-btn login-btn-google"
                      onClick={handleGoogleLogin}
                    >
                      <FaGoogle />
                      {isEnglish ? 'Continue with Google' : 'Google দিয়ে Login করুন'}
                    </button>
                    <button 
                      className="login-btn login-btn-facebook"
                      onClick={handleFacebookLogin}
                    >
                      <FaFacebook />
                      {isEnglish ? 'Continue with Facebook' : 'Facebook দিয়ে Login করুন'}
                    </button>
                  </div>
                </>
              ) : step === 'otp' ? (
                /* OTP Input */
                <form onSubmit={handleVerifyOTP} className="login-form">
                  <div className="login-input-group">
                    <label>{isEnglish ? 'Enter 6-digit OTP' : '6 digit এর OTP দিন'}</label>
                    <input
                      type="text"
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      maxLength={6}
                      required
                      className="login-input otp-input"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="login-btn login-btn-primary"
                    disabled={loading}
                  >
                    {loading 
                      ? (isEnglish ? 'Verifying...' : 'যাচাই করা হচ্ছে...') 
                      : (isEnglish ? 'Verify & Login' : 'Verify করুন ও Login হন')
                    }
                  </button>
                  <button 
                    type="button" 
                    className="login-btn login-btn-secondary"
                    onClick={handleSendOTP}
                    disabled={loading}
                  >
                    {isEnglish ? 'Resend OTP' : 'পুনরায় OTP পাঠান'}
                  </button>
                </form>
              ) : (
                /* Email Verification Waiting */
                <div className="email-verification-waiting">
                  <div className="email-icon">📧</div>
                  <h3>{isEnglish ? 'Check Your Email' : 'আপনার Email চেক করুন'}</h3>
                  <p>
                    {isEnglish 
                      ? `We've sent a verification link to ${email}` 
                      : `আমরা ${email} এ একটি verification link পাঠিয়েছি`}
                  </p>
                  <div className="verification-steps">
                    <p>📌 {isEnglish ? 'Steps to verify:' : 'Verify করার ধাপ:'}</p>
                    <ol>
                      <li>{isEnglish ? 'Check your email inbox' : 'আপনার email inbox চেক করুন'}</li>
                      <li>{isEnglish ? 'Click the verification link' : 'Verification link এ click করুন'}</li>
                      <li>{isEnglish ? 'You\'ll be automatically logged in!' : 'আপনি automatically login হয়ে যাবেন!'}</li>
                    </ol>
                  </div>
                  <button 
                    type="button" 
                    className="login-btn login-btn-secondary"
                    onClick={handleSendEmailVerification}
                    disabled={loading}
                  >
                    {isEnglish ? 'Resend Email' : 'পুনরায় Email পাঠান'}
                  </button>
                  <button 
                    type="button" 
                    className="login-btn login-btn-text"
                    onClick={() => setStep('input')}
                  >
                    {isEnglish ? 'Try Different Method' : 'অন্য পদ্ধতি চেষ্টা করুন'}
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="login-modal-footer">
              <p>
                {isEnglish 
                  ? 'By continuing, you agree to our Terms & Privacy Policy' 
                  : 'চালিয়ে যাওয়ার মাধ্যমে, আপনি আমাদের শর্তাবলী ও গোপনীয়তা নীতিতে সম্মত হন'}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
