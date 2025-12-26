import express from 'express';
import { getProducts, getProductById, getTopProducts, createProduct, deleteProduct, updateProduct } from '../controllers/productController.js';
import { admin, protect } from '../middlewares/authMiddleware.js'

const router = express.Router();

// The Clean Way: Chaining methods
// If we had a POST request to add items, we would add .post(createProduct) here too
router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct);

// top products
router.get('/top', getTopProducts);

// Route for single ID
router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)

export default router;