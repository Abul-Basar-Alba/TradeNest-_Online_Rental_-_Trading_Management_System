import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaAd, 
  FaEnvelope, 
  FaSearch, 
  FaHeart, 
  FaCog, 
  FaPhone, 
  FaUser,
  FaCheckCircle,
  FaComments,
  FaSignOutAlt
} from 'react-icons/fa';
import './UserProfile.css';

const UserProfile = () => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="user-profile-page">
        <div className="loading-container">
          <div className="loading-spinner">লোড হচ্ছে...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { path: '/profile/my-ads', icon: <FaAd />, label: 'আমার বিজ্ঞাপনসমূহ' },
    { path: '/profile/messages', icon: <FaEnvelope />, label: 'আমার মেসেজিং' },
    { path: '/profile/saved-searches', icon: <FaSearch />, label: 'সেভ করা সার্চ' },
    { path: '/profile/favorites', icon: <FaHeart />, label: 'ফেভারিট' },
    { path: '/profile/settings', icon: <FaCog />, label: 'সেটিংস' },
    { path: '/profile/phone', icon: <FaPhone />, label: 'ফোন নাম্বার' },
    { path: '/profile/edit', icon: <FaUser />, label: 'আমার প্রোফাইল' },
    { path: '/profile/verify', icon: <FaCheckCircle />, label: 'প্রোফাইল ভ্যালিডেট' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="user-profile-page">
      <div className="profile-container">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="profile-header">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <h2 className="profile-name">{user?.name || 'User'}</h2>
          </div>

          <nav className="profile-nav">
            <div className="nav-section">
              <h3 className="section-title">অ্যাকাউন্ট</h3>
              {menuItems.slice(0, 4).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  <span className="nav-arrow">›</span>
                </Link>
              ))}
            </div>

            <div className="nav-section">
              <h3 className="section-title">চ্যাসবাস</h3>
              {menuItems.slice(4).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  <span className="nav-arrow">›</span>
                </Link>
              ))}
            </div>

            <div className="nav-section">
              <button onClick={handleLogout} className="nav-item logout-btn">
                <span className="nav-icon"><FaSignOutAlt /></span>
                <span className="nav-label">লগআউট</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="profile-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
