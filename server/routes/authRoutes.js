const express = require('express');
const router = express.Router();
const passport = require('passport');
const { register, login, getMe, updateProfile } = require('../controllers/authController');
const { sendOTP, verifyOTP, googleCallback, facebookCallback, logout, sendEmailVerification, verifyEmail } = require('../controllers/authOAuth');
const { protect } = require('../middleware/authMiddleware');

// Traditional auth
router.post('/register', register);
router.post('/login', login);

// Phone OTP auth
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

// Email verification
router.post('/send-email-verification', sendEmailVerification);
router.get('/verify-email/:token', verifyEmail);

// Google OAuth
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'] 
}));
router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login',
    session: false 
  }), 
  googleCallback
);

// Facebook OAuth
router.get('/facebook', passport.authenticate('facebook', { 
  scope: ['email', 'public_profile'] 
}));
router.get('/facebook/callback', 
  passport.authenticate('facebook', { 
    failureRedirect: '/login',
    session: false 
  }), 
  facebookCallback
);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/logout', protect, logout);

module.exports = router;
