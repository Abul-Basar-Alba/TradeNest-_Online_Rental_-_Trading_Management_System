import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Favorites = () => {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <FaHeart />
      </div>
      <h2 className="empty-title">কোন ফেভারিট বিজ্ঞাপন নেই</h2>
      <p className="empty-description">
        আপনি যখন কোন বিজ্ঞাপন ফেভারিট করবেন তখন এখানে দেখতে পারবেন।
      </p>
    </div>
  );
};

export default Favorites;
