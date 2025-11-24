import express from 'express';
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
} from '../controllers/cartController.js';

const router = express.Router();

router.get('/:userId', getCart);
router.post('/:userId/items', addToCart);
router.put('/:userId/items/:itemId', updateCartItem);
router.delete('/:userId/items/:itemId', removeFromCart);
router.delete('/:userId', clearCart);

export default router;
