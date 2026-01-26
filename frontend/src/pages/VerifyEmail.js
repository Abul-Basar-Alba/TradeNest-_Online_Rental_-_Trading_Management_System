import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import './VerifyEmail.css';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    verifyEmailToken();
  }, [token]);

  const verifyEmailToken = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/verify-email/${token}`);
      
      if (response.data.success) {
        setStatus('success');
        setMessage(response.data.message);
        
        // Auto login with JWT token
        login(response.data.user, response.data.token);
        
        toast.success('Email verified successfully! 🎉');
        
        // Redirect to home after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Email verification failed');
      toast.error('Email verification failed');
      
      // Redirect to home after 5 seconds
      setTimeout(() => {
        navigate('/');
      }, 5000);
    }
  };

  return (
    <div className="verify-email-page">
      <div className="verify-container">
        {status === 'verifying' && (
          <>
            <div className="spinner"></div>
            <h2>Verifying Your Email...</h2>
            <p>Please wait while we verify your email address</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="success-icon">✅</div>
            <h2>Email Verified Successfully!</h2>
            <p>{message}</p>
            <p className="redirect-msg">Redirecting to homepage...</p>
            <div className="user-info">
              <p>Welcome! You are now logged in.</p>
            </div>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="error-icon">❌</div>
            <h2>Verification Failed</h2>
            <p>{message}</p>
            <p className="redirect-msg">Redirecting to homepage...</p>
            <button 
              className="retry-btn"
              onClick={() => navigate('/')}
            >
              Go to Homepage
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
