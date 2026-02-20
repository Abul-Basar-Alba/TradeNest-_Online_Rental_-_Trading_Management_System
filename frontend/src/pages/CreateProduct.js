import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUpload, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { productAPI } from '../services/api';
import './CreateProduct.css';

const CreateProduct = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'electronics',
    type: 'sell',
    price: '',
    priceType: 'fixed',
    location: {
      city: 'ঢাকা',
      area: ''
    },
    images: []
  });

  const categories = [
    { value: 'vehicles', label: 'গাড়ি' },
    { value: 'property', label: 'প্রপার্টি' },
    { value: 'electronics', label: 'ইলেকট্রনিক্স' },
    { value: 'fashion', label: 'ফ্যাশন' },
    { value: 'furniture', label: 'ফার্নিচার' },
    { value: 'event-equipment', label: 'ইভেন্ট সরঞ্জাম' }
  ];

  const cities = [
    'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 
    'সিলেট', 'রংপুর', 'ময়মনসিংহ'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value
      }
    }));
  };

  const handleTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      type,
      priceType: type === 'rent' ? 'monthly' : 'fixed'
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // For now, just store file names (later integrate with Cloudinary)
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls].slice(0, 5) // Max 5 images
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast.error('শিরোনাম লিখুন');
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error('বিবরণ লিখুন');
      return;
    }
    
    if (!formData.price || formData.price <= 0) {
      toast.error('সঠিক মূল্য লিখুন');
      return;
    }
    
    if (!formData.location.area.trim()) {
      toast.error('এলাকা লিখুন');
      return;
    }

    setLoading(true);
    try {
      const response = await productAPI.create({
        ...formData,
        price: Number(formData.price)
      });
      
      if (response.data.success) {
        toast.success('✅ বিজ্ঞাপন সফলভাবে তৈরি হয়েছে!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Create product error:', error);
      toast.error(error.response?.data?.message || 'বিজ্ঞাপন তৈরি করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className="create-product-page">
      <div className="create-product-container">
        <motion.div
          className="create-product-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>নতুন বিজ্ঞাপন দিন</h1>
          <p>আপনার পণ্য বা সেবার বিবরণ দিন</p>
        </motion.div>

        <motion.form
          className="create-product-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Title */}
          <div className="form-group">
            <label>বিজ্ঞাপনের শিরোনাম *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="যেমন: iPhone 13 Pro - Excellent Condition"
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>বিস্তারিত বিবরণ *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="আপনার পণ্য সম্পর্কে বিস্তারিত লিখুন..."
              rows="5"
              required
            />
          </div>

          {/* Category & Type Row */}
          <div className="form-row">
            <div className="form-group">
              <label>ক্যাটাগরি *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>ধরন *</label>
              <div className="type-selector">
                <button
                  type="button"
                  className={`type-btn ${formData.type === 'sell' ? 'active' : ''}`}
                  onClick={() => handleTypeChange('sell')}
                >
                  বিক্রয়
                </button>
                <button
                  type="button"
                  className={`type-btn ${formData.type === 'rent' ? 'active' : ''}`}
                  onClick={() => handleTypeChange('rent')}
                >
                  ভাড়া
                </button>
              </div>
            </div>
          </div>

          {/* Price Row */}
          <div className="form-row">
            <div className="form-group">
              <label>মূল্য (টাকা) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="৫০০০"
                min="0"
                required
              />
            </div>

            {formData.type === 'rent' && (
              <div className="form-group">
                <label>মূল্যের ধরন</label>
                <select
                  name="priceType"
                  value={formData.priceType}
                  onChange={handleInputChange}
                >
                  <option value="daily">দৈনিক</option>
                  <option value="monthly">মাসিক</option>
                </select>
              </div>
            )}
          </div>

          {/* Location */}
          <div className="form-row">
            <div className="form-group">
              <label>শহর *</label>
              <select
                name="city"
                value={formData.location.city}
                onChange={handleLocationChange}
                required
              >
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>এলাকা *</label>
              <input
                type="text"
                name="area"
                value={formData.location.area}
                onChange={handleLocationChange}
                placeholder="যেমন: মিরপুর, ধানমন্ডি"
                required
              />
            </div>
          </div>

          {/* Images Upload */}
          <div className="form-group">
            <label>ছবি আপলোড করুন (সর্বোচ্চ ৫টি)</label>
            <div className="image-upload-area">
              {formData.images.length < 5 && (
                <label className="upload-box">
                  <FaUpload />
                  <span>ছবি নির্বাচন করুন</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              )}

              <div className="image-preview-grid">
                {formData.images.map((image, index) => (
                  <div key={index} className="image-preview">
                    <img src={image} alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => removeImage(index)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/dashboard')}
              disabled={loading}
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? 'তৈরি হচ্ছে...' : 'বিজ্ঞাপন প্রকাশ করুন'}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default CreateProduct;
