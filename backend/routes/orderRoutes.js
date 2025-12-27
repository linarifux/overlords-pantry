import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders, // <--- Import the new controller
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);

// ⚠️ IMPORTANT: Put this BEFORE the /:id route
// If you put it after, 'mine' will be treated as an ':id'
router.route('/mine').get(protect, getMyOrders); 

router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;