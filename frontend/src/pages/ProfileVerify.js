import React from 'react';
import { FaCheckCircle, FaIdCard, FaCamera } from 'react-icons/fa';

const ProfileVerify = () => {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <FaCheckCircle />
      </div>
      <h2 className="empty-title">প্রোফাইল ভ্যালিডেশন</h2>
      <p className="empty-description">
        আপনার প্রোফাইল ভেরিফাই করুন এবং ক্রেতাদের কাছে আরো বিশ্বাসযোগ্য হন।
      </p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
        <button className="empty-cta" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaIdCard /> NID ভেরিফাই করুন
        </button>
        <button className="empty-cta" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaCamera /> ছবি ভেরিফাই করুন
        </button>
      </div>
    </div>
  );
};

export default ProfileVerify;
