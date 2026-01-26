const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [5000, 'Description cannot exceed 5000 characters']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['vehicles', 'property', 'electronics', 'fashion', 'furniture', 'event-equipment']
    },
    subcategory: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: [true, 'Product type is required'],
      enum: ['rent', 'sell']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    priceType: {
      type: String,
      enum: ['daily', 'monthly', 'fixed'],
      default: 'fixed'
    },
    location: {
      city: {
        type: String,
        required: [true, 'City is required']
      },
      area: {
        type: String,
        required: [true, 'Area is required']
      }
    },
    images: {
      type: [String],
      validate: {
        validator: function (v) {
          return v && v.length > 0 && v.length <= 5;
        },
        message: 'Product must have 1-5 images'
      }
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    rentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    status: {
      type: String,
      enum: ['active', 'rented', 'sold', 'inactive'],
      default: 'active'
    },
    views: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
productSchema.index({ category: 1, type: 1 });
productSchema.index({ 'location.city': 1 });
productSchema.index({ ownerId: 1 });
productSchema.index({ createdAt: -1 });

// Method to increment views
productSchema.methods.incrementViews = function () {
  this.views += 1;
  return this.save();
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
