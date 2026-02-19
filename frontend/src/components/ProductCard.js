import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ product, onClick }) => {
  const {
    title,
    price,
    priceType,
    category,
    type,
    location,
    images,
    status,
    views,
    featured
  } = product;

  // Format price
  const formatPrice = (price) => {
    if (price >= 100000) {
      return `৳${(price / 100000).toFixed(1)} লক্ষ`;
    } else if (price >= 1000) {
      return `৳${(price / 1000).toFixed(0)}k`;
    }
    return `৳${price}`;
  };

  // Get price label
  const getPriceLabel = () => {
    if (priceType === 'daily') return '/দিন';
    if (priceType === 'monthly') return '/মাস';
    return '';
  };

  // Category Bengali names
  const categoryNames = {
    vehicles: 'গাড়ি',
    property: 'প্রপার্টি',
    electronics: 'ইলেকট্রনিক্স',
    fashion: 'ফ্যাশন',
    furniture: 'ফার্নিচার',
    'event-equipment': 'ইভেন্ট সরঞ্জাম'
  };

  return (
    <motion.div
      className="product-card"
      onClick={() => onClick && onClick(product)}
      whileHover={{ y: -5, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="product-image-container">
        <img
          src={images && images[0] ? images[0] : '/placeholder-product.jpg'}
          alt={title}
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
        
        {/* Badges */}
        <div className="product-badges">
          {featured && (
            <span className="badge badge-featured">
              <FaStar /> ফিচারড
            </span>
          )}
          {type === 'rent' && (
            <span className="badge badge-rent">ভাড়া</span>
          )}
          {type === 'sell' && (
            <span className="badge badge-sell">বিক্রয়</span>
          )}
        </div>

        {/* Status Badge */}
        {status === 'rented' && (
          <div className="status-overlay">ভাড়া হয়ে গেছে</div>
        )}
        {status === 'sold' && (
          <div className="status-overlay">বিক্রয় হয়ে গেছে</div>
        )}
      </div>

      {/* Content */}
      <div className="product-content">
        {/* Category */}
        <span className="product-category">{categoryNames[category] || category}</span>

        {/* Title */}
        <h3 className="product-title" title={title}>
          {title.length > 50 ? title.substring(0, 50) + '...' : title}
        </h3>

        {/* Location */}
        <div className="product-location">
          <FaMapMarkerAlt className="location-icon" />
          <span>{location.area}, {location.city}</span>
        </div>

        {/* Price */}
        <div className="product-price">
          <span className="price-amount">{formatPrice(price)}</span>
          <span className="price-type">{getPriceLabel()}</span>
        </div>

        {/* Meta */}
        <div className="product-meta">
          <span className="views">{views || 0} বার দেখা হয়েছে</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
