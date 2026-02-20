import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SavedSearches = () => {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <FaSearch />
      </div>
      <h2 className="empty-title">কোন সেভ করা সার্চ নেই</h2>
      <p className="empty-description">
        আপনি যখন কোন সার্চ সেভ করবেন তখন এখানে দেখতে পারবেন।
      </p>
    </div>
  );
};

export default SavedSearches;
