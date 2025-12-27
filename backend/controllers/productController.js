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


// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  // Destructure the incoming data
  const { name, price, image, brand, category, countInStock, description } = req.body;

  // If data exists, use it. If not, fallback to sample data (optional safety)
  const product = new Product({
    name: name || 'Sample name',
    price: price || 0,
    user: req.user._id,
    image: image || '/images/sample.jpg',
    brand: brand || 'Sample brand',
    category: category || 'Sample category',
    countInStock: countInStock || 0,
    numReviews: 0,
    description: description || 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});


// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  const { id } = req.params;
  
  // Make sure this query is correct
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

  if (!product) {
    return res.status(404).json({ error: 'Product not found' }); 
  }
  
  res.status(200).json(product);
};

export { getProducts, getProductById, getTopProducts, createProduct, deleteProduct, updateProduct };