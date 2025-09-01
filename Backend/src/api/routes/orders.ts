import { Router } from 'express';
import { checkout, getOrderHistory, getOrderById, trackOrder, updateOrderStatus } from '../controllers/orderController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/checkout', authMiddleware, checkout);
router.get('/', authMiddleware, getOrderHistory);
router.get('/:id', authMiddleware, getOrderById);
router.patch('/:id/status', authMiddleware, updateOrderStatus);
router.get('/track/:trackingNumber', trackOrder);

export default router;
