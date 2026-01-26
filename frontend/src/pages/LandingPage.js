import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaStore, FaCheckCircle, FaShieldAlt, FaStar } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import './LandingPage.css';

const LandingPage = () => {
  const { t } = useLanguage();

  return (
    <div className="landing-page">
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="hero-title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {t('heroTitle')}
        </motion.h1>
        
        <motion.p
          className="hero-subtitle"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {t('heroSubtitle')}
        </motion.p>

        <div className="choice-cards">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link to="/rent" className="choice-card rent-card">
              <div className="card-icon">
                <FaShoppingCart />
              </div>
              <h2>{t('rentTitle')}</h2>
              <p>{t('rentDesc')}</p>
              <button className="card-btn">{t('rentBtn')}</button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link to="/sell" className="choice-card sell-card">
              <div className="card-icon">
                <FaStore />
              </div>
              <h2>{t('sellTitle')}</h2>
              <p>{t('sellDesc')}</p>
              <button className="card-btn">{t('sellBtn')}</button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="features"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="feature">
            <FaCheckCircle className="feature-icon" />
            <p>{t('verifiedSellers')}</p>
          </div>
          <div className="feature">
            <FaShieldAlt className="feature-icon" />
            <p>{t('secureTransactions')}</p>
          </div>
          <div className="feature">
            <FaStar className="feature-icon" />
            <p>{t('trustedPlatform')}</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
