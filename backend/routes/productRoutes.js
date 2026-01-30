const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts
} = require('../controllers/productController');
const { protect, requireVerified } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllProducts);

// Protected routes - Must come before :id route
router.get('/my/products', protect, getMyProducts);

// Public routes - :id route comes after specific paths
router.get('/:id', getProductById);

// Protected routes (requires authentication)
router.post('/', protect, requireVerified, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
