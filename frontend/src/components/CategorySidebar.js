import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCar, 
  FaHome, 
  FaLaptop, 
  FaTshirt, 
  FaCouch, 
  FaMusic 
} from 'react-icons/fa';
import './CategorySidebar.css';

const CategorySidebar = ({ selectedCategory, onCategorySelect, productCounts = {} }) => {
  const categories = [
    { id: 'all', name: 'সব বিজ্ঞাপন', icon: FaHome, count: productCounts.total || 0 },
    { id: 'vehicles', name: 'গাড়ি', icon: FaCar, count: productCounts.vehicles || 0 },
    { id: 'property', name: 'প্রপার্টি', icon: FaHome, count: productCounts.property || 0 },
    { id: 'electronics', name: 'ইলেকট্রনিক্স', icon: FaLaptop, count: productCounts.electronics || 0 },
    { id: 'fashion', name: 'ফ্যাশন', icon: FaTshirt, count: productCounts.fashion || 0 },
    { id: 'furniture', name: 'ফার্নিচার', icon: FaCouch, count: productCounts.furniture || 0 },
    { id: 'event-equipment', name: 'ইভেন্ট সরঞ্জাম', icon: FaMusic, count: productCounts['event-equipment'] || 0 }
  ];

  return (
    <motion.div 
      className="category-sidebar"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="sidebar-title">সকল ক্যাটাগরি</h3>
      
      <div className="category-list">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <motion.div
              key={category.id}
              className={`category-item ${isSelected ? 'active' : ''}`}
              onClick={() => onCategorySelect(category.id)}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="category-info">
                <Icon className="category-icon" />
                <span className="category-name">{category.name}</span>
              </div>
              <span className="category-count">({category.count})</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CategorySidebar;
