const nodemailer = require('nodemailer');

// Email transporter configuration
const createTransporter = () => {
  // Gmail configuration (You need to enable "Less secure app access" or use App Password)
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD // Use App Password, not regular password
      }
    });
  }

  // SMTP configuration (for other email providers)
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send email verification
const sendVerificationEmail = async (userEmail, userName, verificationToken) => {
  const transporter = createTransporter();
  
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
  
  const mailOptions = {
    from: `"TradeNest" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: 'Verify Your Email - TradeNest',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #16a085 0%, #1abc9c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; }
          .button { display: inline-block; background: linear-gradient(135deg, #16a085 0%, #1abc9c 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .info-box { background: white; border-left: 4px solid #16a085; padding: 15px; margin: 20px 0; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏪 TradeNest</h1>
            <p>Welcome to Bangladesh's Trusted Marketplace</p>
          </div>
          <div class="content">
            <h2>Hi ${userName}!</h2>
            <p>Welcome to <strong>TradeNest</strong> - বাংলাদেশের সবচেয়ে বিশ্বস্ত অনলাইন মার্কেটপ্লেস!</p>
            
            <p>Please verify your email address to activate your account and start:</p>
            <ul>
              <li>✓ Posting ads for rent or sell</li>
              <li>✓ Contacting sellers directly</li>
              <li>✓ Managing your listings</li>
              <li>✓ Building your profile</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
            </div>
            
            <div class="info-box">
              <p><strong>⚠️ Important:</strong></p>
              <p>• This link will expire in 24 hours</p>
              <p>• If you didn't create this account, please ignore this email</p>
              <p>• For security, never share this link with anyone</p>
            </div>
            
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; color: #16a085;">${verificationUrl}</p>
            
            <p>Need help? Contact us at <a href="mailto:support@tradenest.com">support@tradenest.com</a></p>
          </div>
          <div class="footer">
            <p>© 2026 TradeNest. All rights reserved.</p>
            <p>This email was sent to ${userEmail}</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('\n📧 EMAIL VERIFICATION (DEV MODE)');
      console.log('To:', userEmail);
      console.log('Verification Link:', verificationUrl);
      console.log('Token:', verificationToken);
      console.log('---\n');
      
      // In development, don't actually send email if credentials not configured
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        return {
          success: true,
          message: 'Development mode: Email not sent, check console for verification link',
          verificationUrl // Return URL for testing
        };
      }
    }
    
    await transporter.sendMail(mailOptions);
    return {
      success: true,
      message: 'Verification email sent successfully'
    };
  } catch (error) {
    console.error('Email Error:', error);
    throw new Error('Failed to send verification email');
  }
};

// Send welcome email after verification
const sendWelcomeEmail = async (userEmail, userName) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: `"TradeNest" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: 'Welcome to TradeNest! 🎉',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #16a085 0%, #1abc9c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; }
          .button { display: inline-block; background: linear-gradient(135deg, #16a085 0%, #1abc9c 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome to TradeNest!</h1>
          </div>
          <div class="content">
            <h2>Hi ${userName}!</h2>
            <p>Your email has been successfully verified! 🎊</p>
            
            <p>You can now enjoy all TradeNest features:</p>
            <ul>
              <li>✓ Post unlimited ads</li>
              <li>✓ Rent or sell your products</li>
              <li>✓ Connect with buyers & sellers</li>
              <li>✓ Build your reputation</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="${process.env.FRONTEND_URL}" class="button">Start Exploring</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    if (process.env.NODE_ENV === 'development' && (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD)) {
      console.log('\n✅ WELCOME EMAIL (DEV MODE)');
      console.log('To:', userEmail);
      console.log('User verified successfully!');
      return { success: true };
    }
    
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Welcome Email Error:', error);
    // Don't throw error for welcome email
    return { success: false };
  }
};

module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail
};
