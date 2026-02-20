import React from 'react';
import { FaPhone, FaCheckCircle } from 'react-icons/fa';

const PhoneVerification = () => {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <FaPhone />
      </div>
      <h2 className="empty-title">ফোন নাম্বার ভেরিফিকেশন</h2>
      <p className="empty-description">
        আপনার ফোন নাম্বার ভেরিফাই করুন এবং আরো বিশ্বাসযোগ্যতা অর্জন করুন।
      </p>
      <button className="empty-cta">
        <FaCheckCircle /> ফোন নাম্বার যাচাই করুন
      </button>
    </div>
  );
};

export default PhoneVerification;
