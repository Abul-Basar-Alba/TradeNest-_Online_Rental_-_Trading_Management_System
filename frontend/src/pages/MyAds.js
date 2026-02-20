import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './MyAds.css';

const MyAds = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    setLoading(true);
    try {
      const response = await productAPI.getMyProducts();
      
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('পণ্য লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('আপনি কি নিশ্চিত এই বিজ্ঞাপন মুছে ফেলতে চান?')) {
      try {
        await productAPI.delete(id);
        toast.success('বিজ্ঞাপন মুছে ফেলা হয়েছে');
        fetchMyProducts();
      } catch (error) {
        toast.error(error.response?.data?.message || 'মুছে ফেলতে সমস্যা হয়েছে');
      }
    }
  };

  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true;
    return product.status === filter;
  });

  const stats = {
    total: products.length,
    active: products.filter(p => p.status === 'active').length,
    sold: products.filter(p => p.status === 'sold').length,
    rented: products.filter(p => p.status === 'rented').length,
  };

  if (loading) {
    return <div className="loading">লোড হচ্ছে...</div>;
  }

  return (
    <div className="my-ads-page">
      <div className="page-header">
        <h1>আমার বিজ্ঞাপনসমূহ</h1>
        <Link to="/dashboard/create" className="create-btn">
          <FaPlus /> নতুন বিজ্ঞাপন দিন
        </Link>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">মোট বিজ্ঞাপন</div>
        </div>
        <div className="stat-card active">
          <div className="stat-value">{stats.active}</div>
          <div className="stat-label">সক্রিয়</div>
        </div>
        <div className="stat-card sold">
          <div className="stat-value">{stats.sold}</div>
          <div className="stat-label">বিক্রিত</div>
        </div>
        <div className="stat-card rented">
          <div className="stat-value">{stats.rented}</div>
          <div className="stat-label">ভাড়া দেয়া</div>
        </div>
      </div>

      <div className="filter-tabs">
        <button
          className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          সব ({stats.total})
        </button>
        <button
          className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          সক্রিয় ({stats.active})
        </button>
        <button
          className={`filter-tab ${filter === 'sold' ? 'active' : ''}`}
          onClick={() => setFilter('sold')}
        >
          বিক্রিত ({stats.sold})
        </button>
        <button
          className={`filter-tab ${filter === 'rented' ? 'active' : ''}`}
          onClick={() => setFilter('rented')}
        >
          ভাড়া দেয়া ({stats.rented})
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h2 className="empty-title">এখনও আপনার কোনো বিজ্ঞাপন নেই।</h2>
          <p className="empty-description">
            বিজ্ঞাপন পোস্ট করতে আপনার বিজ্ঞাপন দিন বাটনে ক্লিক করুন।
          </p>
          <Link to="/dashboard/create" className="empty-cta">
            আপনার বিজ্ঞাপন দিন
          </Link>
        </div>
      ) : (
        <div className="ads-grid">
          {filteredProducts.map((product) => (
            <div key={product._id} className="ad-card">
              <div className="ad-image">
                <img 
                  src={product.images?.[0] || 'https://via.placeholder.com/300x200'} 
                  alt={product.title} 
                />
                {product.status !== 'active' && (
                  <div className="status-overlay">
                    {product.status === 'sold' ? 'বিক্রিত' : 'ভাড়া দেয়া'}
                  </div>
                )}
              </div>
              <div className="ad-info">
                <h3 className="ad-title">{product.title}</h3>
                <div className="ad-price">৳{product.price.toLocaleString()}</div>
                <div className="ad-meta">
                  <span><FaEye /> {product.views || 0} বার দেখা হয়েছে</span>
                </div>
                <div className="ad-actions">
                  <button 
                    className="action-btn edit"
                    onClick={() => navigate(`/dashboard/edit/${product._id}`)}
                  >
                    <FaEdit /> সম্পাদনা
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDelete(product._id)}
                  >
                    <FaTrash /> মুছুন
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAds;
