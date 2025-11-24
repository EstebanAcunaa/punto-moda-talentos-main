import express from 'express';
import {
    createOrder,
    getUserOrders,
    getOrderById
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/user/:userId', getUserOrders);
router.get('/:id', getOrderById);

export default router;
