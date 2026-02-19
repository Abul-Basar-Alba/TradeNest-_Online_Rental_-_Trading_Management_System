import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CategorySidebar from '../components/CategorySidebar';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../services/api';
import './ProductsPage.css';

const ProductsPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Determine type based on URL path
  const getInitialType = () => {
    if (location.pathname === '/rent') return 'rent';
    if (location.pathname === '/sell') return 'sell';
    return 'all';
  };
  
  const [selectedType, setSelectedType] = useState(getInitialType());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productCounts, setProductCounts] = useState({});

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 12,
        sort: sortBy
      };

      if (selectedCategory !== 'all') {
        params.category = selectedCategory;
      }

      if (selectedType !== 'all') {
        params.type = selectedType;
      }

      if (searchQuery.trim()) {
        params.search = searchQuery;
      }

      const response = await productAPI.getAll(params);
      
      if (response.data.success) {
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages || 1);
        setProductCounts(response.data.categoryCounts || {});
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('পণ্য লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategory, selectedType, sortBy, searchQuery]);

  // Update type when route changes
  useEffect(() => {
    const newType = getInitialType();
    setSelectedType(newType);
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Fetch on mount and when filters change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Search with delay
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(delaySearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleProductClick = (product) => {
    // Navigate to product detail page
    window.location.href = `/products/${product._id}`;
  };

  return (
    <div className="products-page">
      {/* Top Filter Bar */}
      <div className="filter-bar">
        <div className="filter-container">
          {/* Search */}
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="আপনি কি খুঁজছেন?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Type Filter - Only show if on /products page */}
          {location.pathname === '/products' && (
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              <option value="all">সব ধরন</option>
              <option value="rent">ভাড়া</option>
              <option value="sell">বিক্রয়</option>
            </select>
          )}

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="newest">নতুন আগে</option>
            <option value="oldest">পুরাতন আগে</option>
            <option value="price-low">দাম কম থেকে বেশি</option>
            <option value="price-high">দাম বেশি থেকে কম</option>
            <option value="views">জনপ্রিয়</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="products-container">
        {/* Sidebar */}
        <CategorySidebar
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          productCounts={productCounts}
        />

        {/* Products Grid */}
        <div className="products-main">
          {/* Results Info */}
          <div className="results-info">
            <h2>
              {location.pathname === '/rent' && '🏠 ভাড়া '}
              {location.pathname === '/sell' && '🛒 বিক্রয় '}
              {selectedCategory === 'all' ? 'সব পণ্য' : getCategoryName(selectedCategory)}
            </h2>
            <p>{products.length} টি পণ্য পাওয়া গেছে</p>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>লোড হচ্ছে...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="no-products">
              <p>কোনো পণ্য পাওয়া যায়নি</p>
            </div>
          ) : (
            <>
              {/* Products Grid */}
              <div className="products-grid">
                {products.map((product, index) => (
                  <ProductCard
                    key={product._id || index}
                    product={product}
                    onClick={handleProductClick}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    পূর্ববর্তী
                  </button>
                  
                  <span className="page-info">
                    পৃষ্ঠা {currentPage} / {totalPages}
                  </span>
                  
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                  >
                    পরবর্তী
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function
const getCategoryName = (category) => {
  const names = {
    vehicles: 'গাড়ি',
    property: 'প্রপার্টি',
    electronics: 'ইলেকট্রনিক্স',
    fashion: 'ফ্যাশন',
    furniture: 'ফার্নিচার',
    'event-equipment': 'ইভেন্ট সরঞ্জাম'
  };
  return names[category] || category;
};

export default ProductsPage;
