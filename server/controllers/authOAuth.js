const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendVerificationEmail, sendWelcomeEmail } = require('../config/email');

// Twilio configuration (Development mode এ skip করবে)
let client = null;
const twilioPhone = process.env.TWILIO_PHONE || 'YOUR_TWILIO_PHONE';

if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_ACCOUNT_SID.startsWith('AC')) {
  const twilio = require('twilio');
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  client = twilio(accountSid, authToken);
}

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '30d'
  });
};

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @desc    Send OTP to phone
// @route   POST /api/auth/send-otp
// @access  Public
exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    // Validate Bangladesh phone number
    const phoneRegex = /^01[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'অনুগ্রহ করে সঠিক বাংলাদেশী মোবাইল নাম্বার দিন (01XXXXXXXXX)'
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Find or create user
    let user = await User.findOne({ phone });
    
    if (!user) {
      user = await User.create({
        phone,
        authProvider: 'phone',
        otp,
        otpExpiry,
        name: `User_${phone.slice(-4)}`
      });
    } else {
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
    }

    // Send OTP via SMS (Twilio)
    try {
      // Development এ console এ print করব, production এ SMS পাঠাবে
      if (!client || process.env.NODE_ENV === 'development') {
        console.log(`\n🔐 OTP for ${phone}: ${otp}\n`);
        return res.status(200).json({
          success: true,
          message: 'OTP পাঠানো হয়েছে',
          devOTP: otp // শুধু development এ
        });
      }

      await client.messages.create({
        body: `আপনার TradeNest verification code: ${otp}. এই code 10 মিনিটের জন্য valid।`,
        from: twilioPhone,
        to: `+880${phone.slice(1)}`
      });

      res.status(200).json({
        success: true,
        message: 'OTP আপনার মোবাইলে পাঠানো হয়েছে'
      });
    } catch (error) {
      console.error('SMS Error:', error);
      // Development এ OTP console এ দেখাবো
      console.log(`\n🔐 OTP for ${phone}: ${otp}\n`);
      res.status(200).json({
        success: true,
        message: 'OTP generated (check console in dev mode)',
        devOTP: process.env.NODE_ENV === 'development' ? otp : undefined
      });
    }
  } catch (error) {
    console.error('Send OTP Error:', error);
    res.status(500).json({
      success: false,
      message: 'OTP পাঠাতে সমস্যা হয়েছে',
      error: error.message
    });
  }
};

// @desc    Verify OTP and login
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    // Find user with OTP
    const user = await User.findOne({ phone }).select('+otp +otpExpiry');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'ব্যবহারকারী পাওয়া যায়নি'
      });
    }

    // Check OTP expiry
    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'OTP এর মেয়াদ শেষ। নতুন OTP request করুন'
      });
    }

    // Verify OTP
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'ভুল OTP দিয়েছেন'
      });
    }

    // Mark phone as verified
    user.phoneVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'সফলভাবে login হয়েছে',
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        phoneVerified: user.phoneVerified
      }
    });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({
      success: false,
      message: 'OTP verify করতে সমস্যা হয়েছে',
      error: error.message
    });
  }
};

// @desc    Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
exports.googleCallback = async (req, res) => {
  try {
    // User already authenticated by Passport
    const token = generateToken(req.user._id);
    
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/success?token=${token}`);
  } catch (error) {
    console.error('Google Callback Error:', error);
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=google_auth_failed`);
  }
};

// @desc    Facebook OAuth callback
// @route   GET /api/auth/facebook/callback
// @access  Public
exports.facebookCallback = async (req, res) => {
  try {
    // User already authenticated by Passport
    const token = generateToken(req.user._id);
    
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/success?token=${token}`);
  } catch (error) {
    console.error('Facebook Callback Error:', error);
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=facebook_auth_failed`);
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get Me Error:', error);
    res.status(500).json({
      success: false,
      message: 'ব্যবহারকারী তথ্য পেতে সমস্যা হয়েছে',
      error: error.message
    });
  }
};

// @desc    Logout
// @route   POST /api/auth/logout
// @access  Private
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Logout করতে সমস্যা হয়েছে'
      });
    }
    res.status(200).json({
      success: true,
      message: 'সফলভাবে logout হয়েছে'
    });
  });
};

// @desc    Send email verification
// @route   POST /api/auth/send-email-verification
// @access  Public
exports.sendEmailVerification = async (req, res) => {
  try {
    const { email, name } = req.body;

    // Validate email
    if (!email || !email.match(/^\S+@\S+\.\S+$/)) {
      return res.status(400).json({
        success: false,
        message: 'অনুগ্রহ করে সঠিক email address দিন'
      });
    }

    // Check if user exists with this email
    let user = await User.findOne({ email });

    if (user && user.emailVerified) {
      return res.status(400).json({
        success: false,
        message: 'এই email already verified করা আছে'
      });
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

    if (!user) {
      // Create new user if doesn't exist
      user = await User.create({
        email,
        name: name || `User_${Date.now()}`,
        emailVerificationToken: hashedToken,
        emailVerificationExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        authProvider: 'local'
      });
    } else {
      // Update existing user
      user.emailVerificationToken = hashedToken;
      user.emailVerificationExpiry = Date.now() + 24 * 60 * 60 * 1000;
      await user.save();
    }

    // Send verification email
    const emailResult = await sendVerificationEmail(email, user.name, verificationToken);

    res.status(200).json({
      success: true,
      message: 'Verification email পাঠানো হয়েছে',
      ...(process.env.NODE_ENV === 'development' && emailResult.verificationUrl ? {
        devVerificationUrl: emailResult.verificationUrl
      } : {})
    });
  } catch (error) {
    console.error('Send Email Verification Error:', error);
    res.status(500).json({
      success: false,
      message: 'Email verification পাঠাতে সমস্যা হয়েছে',
      error: error.message
    });
  }
};

// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
// @access  Public
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Hash the token to compare with database
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with this token and check expiry
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpiry: { $gt: Date.now() }
    }).select('+emailVerificationToken +emailVerificationExpiry');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token'
      });
    }

    // Mark email as verified
    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;
    await user.save();

    // Send welcome email
    await sendWelcomeEmail(user.email, user.name);

    // Generate JWT token
    const jwtToken = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Email সফলভাবে verified হয়েছে!',
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Verify Email Error:', error);
    res.status(500).json({
      success: false,
      message: 'Email verify করতে সমস্যা হয়েছে',
      error: error.message
    });
  }
};
