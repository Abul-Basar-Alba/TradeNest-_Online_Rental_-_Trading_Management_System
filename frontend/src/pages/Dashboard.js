import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaEye, FaBox } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    sold: 0,
    rented: 0
  });
  const [filter, setFilter] = useState('all'); // all, active, sold, rented

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('অনুগ্রহ করে লগইন করুন');
      navigate('/login');
      return;
    }
    fetchMyProducts();
  }, [isAuthenticated, navigate]);

  const fetchMyProducts = async () => {
    setLoading(true);
    try {
      const response = await productAPI.getMyProducts();
      
      if (response.data.success) {
        setProducts(response.data.products);
        setStats(response.data.stats || {
          total: response.data.products.length,
          active: response.data.products.filter(p => p.status === 'active').length,
          sold: response.data.products.filter(p => p.status === 'sold').length,
          rented: response.data.products.filter(p => p.status === 'rented').length
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('পণ্য লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('আপনি কি এই বিজ্ঞাপনটি মুছে ফেলতে চান?')) {
      return;
    }

    try {
      const response = await productAPI.delete(productId);
      
      if (response.data.success) {
        toast.success('বিজ্ঞাপন মুছে ফেলা হয়েছে');
        fetchMyProducts(); // Refresh list
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.response?.data?.message || 'মুছে ফেলতে সমস্যা হয়েছে');
    }
  };

  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true;
    return product.status === filter;
  });

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="user-info">
            <h1>স্বাগতম, {user?.name}!</h1>
            <p>আপনার বিজ্ঞাপন ব্যবস্থাপনা</p>
          </div>
          
          <Link to="/dashboard/create" className="create-ad-btn">
            <FaPlus /> নতুন বিজ্ঞাপন দিন
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
        <motion.div 
          className="stat-card total"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-icon">
            <FaBox />
          </div>
          <div className="stat-info">
            <h3>{stats.total}</h3>
            <p>মোট বিজ্ঞাপন</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card active"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-icon">
            <FaEye />
          </div>
          <div className="stat-info">
            <h3>{stats.active}</h3>
            <p>চালু আছে</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card sold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-icon">
            <FaBox />
          </div>
          <div className="stat-info">
            <h3>{stats.sold}</h3>
            <p>বিক্রয় হয়েছে</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card rented"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-icon">
            <FaBox />
          </div>
          <div className="stat-info">
            <h3>{stats.rented}</h3>
            <p>ভাড়া দেওয়া হয়েছে</p>
          </div>
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          সব ({stats.total})
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          চালু ({stats.active})
        </button>
        <button 
          className={filter === 'sold' ? 'active' : ''}
          onClick={() => setFilter('sold')}
        >
          বিক্রিত ({stats.sold})
        </button>
        <button 
          className={filter === 'rented' ? 'active' : ''}
          onClick={() => setFilter('rented')}
        >
          ভাড়া দেওয়া ({stats.rented})
        </button>
      </div>

      {/* Products List */}
      <div className="dashboard-products">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>লোড হচ্ছে...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="no-products">
            <FaBox className="empty-icon" />
            <h3>কোনো বিজ্ঞাপন নেই</h3>
            <p>আপনার প্রথম বিজ্ঞাপন দিন</p>
            <Link to="/dashboard/create" className="create-first-btn">
              বিজ্ঞাপন দিন
            </Link>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product._id} className="dashboard-product-card">
                <ProductCard product={product} />
                
                <div className="product-actions">
                  <Link 
                    to={`/dashboard/edit/${product._id}`}
                    className="action-btn edit"
                  >
                    <FaEdit /> সম্পাদনা
                  </Link>
                  
                  <button 
                    onClick={() => handleDelete(product._id)}
                    className="action-btn delete"
                    disabled={product.status === 'rented'}
                  >
                    <FaTrash /> মুছুন
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
