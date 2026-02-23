import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { authAPI } from '../services/api';
import { toast } from 'react-toastify';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call API to login
      const response = await authAPI.login(formData);
      
      console.log('Login response:', response.data);
      
      // Extract token and user from response
      const { token, user } = response.data;
      
      // Save to context and localStorage
      login({ token, user });
      
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{t('welcomeBack')}</h2>
        <p className="auth-subtitle">{t('loginSubtitle')}</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>{t('email')}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder={t('email')}
            />
          </div>

          <div className="form-group">
            <label>{t('password')}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder={t('password')}
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? t('loggingIn') : t('loginBtn')}
          </button>
        </form>

        <p className="auth-footer">
          {t('noAccount')} <Link to="/register">{t('registerHere')}</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
