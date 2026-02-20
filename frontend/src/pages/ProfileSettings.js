import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './ProfileSettings.css';

const ProfileSettings = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('সেটিংস সংরক্ষিত হয়েছে!');
  };

  return (
    <div className="settings-page">
      <h1>সেটিংস</h1>
      
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-section">
          <h2>ব্যক্তিগত তথ্য</h2>
          
          <div className="form-group">
            <label>নাম</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="আপনার নাম"
            />
          </div>

          <div className="form-group">
            <label>ইমেইল</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="আপনার ইমেইল"
              disabled
            />
            <small>ইমেইল পরিবর্তন করা যাবে না</small>
          </div>

          <div className="form-group">
            <label>ফোন নাম্বার</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="আপনার ফোন নাম্বার"
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
        </div>

        <div className="form-section">
          <h2>নিরাপত্তা</h2>
          
          <div className="form-group">
            <label>বর্তমান পাসওয়ার্ড</label>
            <input
              type="password"
              placeholder="বর্তমান পাসওয়ার্ড"
            />
          </div>

          <div className="form-group">
            <label>নতুন পাসওয়ার্ড</label>
            <input
              type="password"
              placeholder="নতুন পাসওয়ার্ড"
            />
          </div>

          <div className="form-group">
            <label>পাসওয়ার্ড নিশ্চিত করুন</label>
            <input
              type="password"
              placeholder="পাসওয়ার্ড নিশ্চিত করুন"
            />
          </div>
        </div>

        <button type="submit" className="save-btn">
          পরিবর্তন সংরক্ষণ করুন
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
