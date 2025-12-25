import express from 'express';
import { getProducts, getProductById, getTopProducts } from '../controllers/productController.js';

const router = express.Router();

// The Clean Way: Chaining methods
// If we had a POST request to add items, we would add .post(createProduct) here too
router.route('/').get(getProducts);

// top products
router.get('/top', getTopProducts);

// Route for single ID
router.route('/:id').get(getProductById);

export default router;