import { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/api';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de CartProvider');
    }
    return context;
};

export const CartProvider = ({ children, userId }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Cargar carrito al montar o cuando cambie el userId
    useEffect(() => {
        if (userId) {
            loadCart();
        }
    }, [userId]);

    const loadCart = async () => {
        if (!userId) return;

        setLoading(true);
        setError(null);

        try {
            const response = await cartAPI.get(userId);
            setCart(response.data);
        } catch (err) {
            setError(err.message);
            console.error('Error loading cart:', err);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productVariantId, quantity = 1) => {
        if (!userId) {
            setError('Debes iniciar sesión para agregar al carrito');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await cartAPI.addItem(userId, { productVariantId, quantity });
            await loadCart(); // Recargar carrito
            return true;
        } catch (err) {
            setError(err.message);
            console.error('Error adding to cart:', err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateCartItem = async (itemId, quantity) => {
        if (!userId) return;

        setLoading(true);
        setError(null);

        try {
            await cartAPI.updateItem(userId, itemId, quantity);
            await loadCart();
            return true;
        } catch (err) {
            setError(err.message);
            console.error('Error updating cart item:', err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (itemId) => {
        if (!userId) return;

        setLoading(true);
        setError(null);

        try {
            await cartAPI.removeItem(userId, itemId);
            await loadCart();
            return true;
        } catch (err) {
            setError(err.message);
            console.error('Error removing from cart:', err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        if (!userId) return;

        setLoading(true);
        setError(null);

        try {
            await cartAPI.clear(userId);
            await loadCart();
            return true;
        } catch (err) {
            setError(err.message);
            console.error('Error clearing cart:', err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const getCartItemCount = () => {
        if (!cart || !cart.CartItems) return 0;
        return cart.CartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getCartTotal = () => {
        return cart?.total || '0.00';
    };

    const value = {
        cart,
        loading,
        error,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        loadCart,
        getCartItemCount,
        getCartTotal
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
