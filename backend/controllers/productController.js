const Product = require('../models/Product');

// @desc    Get all products (with filters and pagination)
// @route   GET /api/products
// @access  Public
exports.getAllProducts = async (req, res) => {
  try {
    const {
      category,
      type,
      city,
      minPrice,
      maxPrice,
      search,
      sort,
      page = 1,
      limit = 12
    } = req.query;

    // Build query
    let query = { status: 'active', isAvailable: true };

    if (category) query.category = category;
    if (type) query.type = type;
    if (city) query['location.city'] = city;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Sort options
    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (sort === 'views') sortOption = { views: -1 };
    if (sort === 'oldest') sortOption = { createdAt: 1 };

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Execute query with pagination
    const products = await Product.find(query)
      .populate('ownerId', 'name rating reviewCount isVerified')
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      products
    });
  } catch (error) {
    console.error('Get Products Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    // 1. Find product by ID and populate owner details
    const product = await Product.findById(req.params.id)
      .populate('ownerId', 'name phone email rating reviewCount isVerified createdAt');

    // 2. Check if product exists
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // 3. Increment view count
    await product.incrementViews();

    // 4. Send success response
    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Get Product Error:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Verified Seller only)
exports.createProduct = async (req, res) => {
  try {
    const { title, description, category, price, location } = req.body;

    // Validate required fields
    if (!title || !description || !category || !price || !location) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (title, description, category, price, location)'
      });
    }

    // Validate price
    if (price < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price cannot be negative'
      });
    }

    const productData = {
      ...req.body,
      ownerId: req.user.id
    };

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Create Product Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Owner only)
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // 1. Find the product by ID
    let product = await Product.findById(id);

    // 2. Check if product exists
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // 3. Check ownership (owner or admin can update)
    if (product.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }

    // 4. Validate price if being updated
    if (updateData.price !== undefined && updateData.price < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price cannot be negative'
      });
    }

    // 5. Update the product
    product = await Product.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,           // Return updated document
        runValidators: true  // Run model validators
      }
    ).populate('ownerId', 'name email');

    // 6. Send success response
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Update Product Error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors).map(e => e.message).join(', ')
      });
    }
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Owner only)
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find the product by ID
    const product = await Product.findById(id);

    // 2. Check if product exists
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // 3. Check ownership (owner or admin can delete)
    if (product.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this product'
      });
    }

    // 4. Check if product is currently rented
    if (product.status === 'rented') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete a product that is currently rented'
      });
    }

    // 5. Delete the product
    await Product.findByIdAndDelete(id);

    // 6. Send success response
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      deletedProduct: {
        id: product._id,
        title: product.title
      }
    });
  } catch (error) {
    console.error('Delete Product Error:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message
    });
  }
};

// @desc    Get my products
// @route   GET /api/products/my/products
// @access  Private
exports.getMyProducts = async (req, res) => {
  try {
    // 1. Query filter options
    const { status, type, sort = 'newest' } = req.query;
    
    // 2. Build query
    const query = { ownerId: req.user.id };
    if (status) query.status = status;
    if (type) query.type = type;

    // 3. Sort options
    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sort === 'oldest') sortOption = { createdAt: 1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (sort === 'views') sortOption = { views: -1 };

    // 4. Fetch products
    const products = await Product.find(query).sort(sortOption);

    // 5. Calculate statistics
    const stats = {
      total: products.length,
      active: products.filter(p => p.status === 'active').length,
      rented: products.filter(p => p.status === 'rented').length,
      sold: products.filter(p => p.status === 'sold').length,
      inactive: products.filter(p => p.status === 'inactive').length
    };

    // 6. Send response
    res.status(200).json({
      success: true,
      count: products.length,
      stats,
      products
    });
  } catch (error) {
    console.error('Get My Products Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your products',
      error: error.message
    });
  }
};
