import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { FaSearch, FaComments, FaUser, FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa';
import LoginModal from './LoginModal';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState('সমগ্র বাংলাদেশ');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [expandedDivision, setExpandedDivision] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Bangladesh All 8 Divisions with All 64 Districts
  const locations = {
    'সমগ্র বাংলাদেশ': [],
    'ঢাকা': ['ঢাকা', 'গাজীপুর', 'নারায়ণগঞ্জ', 'টাঙ্গাইল', 'কিশোরগঞ্জ', 'মানিকগঞ্জ', 'মুন্সীগঞ্জ', 'নরসিংদী', 'রাজবাড়ী', 'ফরিদপুর', 'গোপালগঞ্জ', 'মাদারীপুর', 'শরীয়তপুর'],
    'চট্টগ্রাম': ['চট্টগ্রাম', 'কক্সবাজার', 'কুমিল্লা', 'ফেনী', 'ব্রাহ্মণবাড়িয়া', 'নোয়াখালী', 'রাঙ্গামাটি', 'খাগড়াছড়ি', 'বান্দরবান', 'লক্ষ্মীপুর', 'চাঁদপুর'],
    'রাজশাহী': ['রাজশাহী', 'নাটোর', 'নওগাঁ', 'পাবনা', 'সিরাজগঞ্জ', 'বগুড়া', 'জয়পুরহাট', 'চাঁপাইনবাবগঞ্জ'],
    'খুলনা': ['খুলনা', 'যশোর', 'সাতক্ষীরা', 'বাগেরহাট', 'ঝিনাইদহ', 'কুষ্টিয়া', 'চুয়াডাঙ্গা', 'মাগুরা', 'মেহেরপুর', 'নড়াইল'],
    'বরিশাল': ['বরিশাল', 'পটুয়াখালী', 'ভোলা', 'পিরোজপুর', 'বরগুনা', 'ঝালকাঠি'],
    'সিলেট': ['সিলেট', 'মৌলভীবাজার', 'হবিগঞ্জ', 'সুনামগঞ্জ'],
    'রংপুর': ['রংপুর', 'দিনাজপুর', 'ঠাকুরগাঁও', 'পঞ্চগড়', 'নীলফামারী', 'লালমনিরহাট', 'কুড়িগ্রাম', 'গাইবান্ধা'],
    'ময়মনসিংহ': ['ময়মনসিংহ', 'জামালপুর', 'নেত্রকোনা', 'শেরপুর']
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🏪</span>
          <span className="logo-text">TradeNest</span>
        </Link>

        {/* Location Dropdown */}
        <div className="navbar-location">
          <button 
            className="location-btn"
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
          >
            <FaMapMarkerAlt />
            <span>{selectedLocation}</span>
            <FaChevronDown className="dropdown-icon" />
          </button>
          {showLocationDropdown && (
            <div className="location-dropdown">
              {Object.keys(locations).map((division) => (
                <div key={division} className="location-group">
                  <div 
                    className={`location-division ${division === 'সমগ্র বাংলাদেশ' ? 'all-bangladesh' : ''}`}
                    onClick={() => {
                      if (division === 'সমগ্র বাংলাদেশ') {
                        setSelectedLocation(division);
                        setShowLocationDropdown(false);
                      } else {
                        if (expandedDivision === division) {
                          setExpandedDivision(null);
                        } else {
                          setExpandedDivision(division);
                        }
                      }
                    }}
                  >
                    <span>{division}</span>
                    {division !== 'সমগ্র বাংলাদেশ' && locations[division].length > 0 && (
                      <FaChevronDown className={`expand-icon ${expandedDivision === division ? 'expanded' : ''}`} />
                    )}
                  </div>
                  {expandedDivision === division && locations[division].length > 0 && (
                    <div className="location-districts">
                      {locations[division].map((district) => (
                        <div
                          key={district}
                          className="location-district"
                          onClick={() => {
                            setSelectedLocation(district);
                            setShowLocationDropdown(false);
                            setExpandedDivision(null);
                          }}
                        >
                          {district}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="navbar-search">
          <input
            type="text"
            placeholder={t('search')}
            className="search-input"
          />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>

        {/* Right Side Actions */}
        <div className="navbar-actions">
          {/* Language Switcher */}
          <button className="lang-switcher" onClick={toggleLanguage}>
            {language === 'en' ? 'বাংলা' : 'English'}
          </button>

          {/* Chat */}
          <button className="action-btn">
            <FaComments />
            <span>{t('chat')}</span>
          </button>

          {/* Login/User */}
          {isAuthenticated ? (
            <button className="action-btn" onClick={() => navigate('/profile/my-ads')}>
              <FaUser />
              <span>{user?.name || 'User'}</span>
            </button>
          ) : (
            <button className="action-btn" onClick={() => setShowLoginModal(true)}>
              <FaUser />
              <span>{t('login')}</span>
            </button>
          )}

          {/* Post Ad Button */}
          <button
            className="post-ad-btn"
            onClick={() => isAuthenticated ? navigate('/dashboard/create') : setShowLoginModal(true)}
          >
            {t('postAd')}
          </button>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </nav>
  );
};

export default Navbar;
