import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaCamera } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './EditProfile.css';

const EditProfile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || '',
  });
  const [avatar, setAvatar] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('প্রোফাইল আপডেট হয়েছে!');
  };

  return (
    <div className="edit-profile-page">
      <h1>আমার প্রোফাইল</h1>

      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="avatar-section">
          <div className="avatar-preview">
            {avatar ? (
              <img src={avatar} alt="Avatar" />
            ) : (
              <div className="avatar-placeholder">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <label className="avatar-upload-btn">
            <FaCamera /> ছবি পরিবর্তন করুন
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        <div className="form-group">
          <label>নাম *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="আপনার নাম"
            required
          />
        </div>

        <div className="form-group">
          <label>বায়ো</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="নিজের সম্পর্কে কিছু লিখুন..."
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>ঠিকানা</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="আপনার ঠিকানা"
          />
        </div>

        <div className="form-group">
          <label>ওয়েবসাইট</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </div>

        <button type="submit" className="save-btn">
          প্রোফাইল সংরক্ষণ করুন
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
