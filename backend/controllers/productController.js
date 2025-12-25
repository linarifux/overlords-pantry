import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public (Servants can look, but not touch)
const getProducts = asyncHandler(async (req, res) => {
  // later we will add pagination here ?keyword=catnip&page=2
  const products = await Product.find({}); 
  
  // Simulate a delay (optional) to show off our skeleton loaders on frontend later
  // await new Promise(resolve => setTimeout(resolve, 1000));
  
  res.json(products);
});

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    // This triggers our custom Error Middleware
    res.status(404);
    throw new Error('Product not found. The Cat has hidden it.');
  }
});


// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  // Find all, sort by rating descending (-1), limit to 3
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

export { getProducts, getProductById, getTopProducts };