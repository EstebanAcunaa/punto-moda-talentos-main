import {
    Cart,
    CartItem,
    ProductVariant,
    Product,
    VariantAttribute
} from '../models/asociaciones.js';

// GET /api/cart/:userId - Obtener carrito del usuario
export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        let cart = await Cart.findOne({
            where: { user_id: userId },
            include: [
                {
                    model: CartItem,
                    include: [
                        {
                            model: ProductVariant,
                            include: [
                                {
                                    model: Product,
                                    attributes: ['name', 'description', 'category']
                                },
                                {
                                    model: VariantAttribute,
                                    attributes: ['attribute_name', 'attribute_value']
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        // Si no existe carrito, crearlo
        if (!cart) {
            cart = await Cart.create({ user_id: userId });
        }

        // Calcular total
        const total = cart.CartItems?.reduce((sum, item) => {
            const price = parseFloat(item.ProductVariant?.price || 0);
            return sum + (price * item.quantity);
        }, 0) || 0;

        res.json({
            success: true,
            data: {
                ...cart.toJSON(),
                total: total.toFixed(2)
            }
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({
            success: false,
            error: 'Error al obtener el carrito'
        });
    }
};

// POST /api/cart/:userId/items - Agregar item al carrito
export const addToCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productVariantId, quantity = 1 } = req.body;

        if (!productVariantId) {
            return res.status(400).json({
                success: false,
                error: 'productVariantId es requerido'
            });
        }

        // Verificar que la variante existe y tiene stock
        const variant = await ProductVariant.findByPk(productVariantId);
        if (!variant) {
            return res.status(404).json({
                success: false,
                error: 'Variante de producto no encontrada'
            });
        }

        if (variant.stock_quantity < quantity) {
            return res.status(400).json({
                success: false,
                error: 'Stock insuficiente'
            });
        }

        // Obtener o crear carrito
        let cart = await Cart.findOne({ where: { user_id: userId } });
        if (!cart) {
            cart = await Cart.create({ user_id: userId });
        }

        // Verificar si el item ya existe en el carrito
        let cartItem = await CartItem.findOne({
            where: {
                cart_id: cart.id,
                product_variant_id: productVariantId
            }
        });

        if (cartItem) {
            // Actualizar cantidad
            const newQuantity = cartItem.quantity + quantity;
            if (variant.stock_quantity < newQuantity) {
                return res.status(400).json({
                    success: false,
                    error: 'Stock insuficiente para esta cantidad'
                });
            }
            await cartItem.update({ quantity: newQuantity });
        } else {
            // Crear nuevo item
            cartItem = await CartItem.create({
                cart_id: cart.id,
                product_variant_id: productVariantId,
                quantity
            });
        }

        res.status(201).json({
            success: true,
            data: cartItem
        });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({
            success: false,
            error: 'Error al agregar al carrito'
        });
    }
};

// PUT /api/cart/:userId/items/:itemId - Actualizar cantidad de item
export const updateCartItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                error: 'La cantidad debe ser mayor a 0'
            });
        }

        const cartItem = await CartItem.findByPk(itemId, {
            include: [ProductVariant]
        });

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                error: 'Item no encontrado en el carrito'
            });
        }

        if (cartItem.ProductVariant.stock_quantity < quantity) {
            return res.status(400).json({
                success: false,
                error: 'Stock insuficiente'
            });
        }

        await cartItem.update({ quantity });

        res.json({
            success: true,
            data: cartItem
        });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({
            success: false,
            error: 'Error al actualizar item del carrito'
        });
    }
};

// DELETE /api/cart/:userId/items/:itemId - Eliminar item del carrito
export const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params;

        const cartItem = await CartItem.findByPk(itemId);

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                error: 'Item no encontrado en el carrito'
            });
        }

        await cartItem.destroy();

        res.json({
            success: true,
            message: 'Item eliminado del carrito'
        });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({
            success: false,
            error: 'Error al eliminar item del carrito'
        });
    }
};

// DELETE /api/cart/:userId - Vaciar carrito
export const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ where: { user_id: userId } });

        if (!cart) {
            return res.status(404).json({
                success: false,
                error: 'Carrito no encontrado'
            });
        }

        await CartItem.destroy({ where: { cart_id: cart.id } });

        res.json({
            success: true,
            message: 'Carrito vaciado correctamente'
        });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({
            success: false,
            error: 'Error al vaciar el carrito'
        });
    }
};
