import React from 'react';
import { FaEnvelope } from 'react-icons/fa';

const Messages = () => {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <FaEnvelope />
      </div>
      <h2 className="empty-title">কোন মেসেজ নেই</h2>
      <p className="empty-description">
        আপনার কোন মেসেজ এখনও আসেনি। যখন কেউ আপনার বিজ্ঞাপনে আগ্রহ প্রকাশ করবে তখন এখানে মেসেজ দেখতে পারবেন।
      </p>
    </div>
  );
};

export default Messages;
