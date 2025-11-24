import {
    Order,
    OrderItem,
    Cart,
    CartItem,
    ProductVariant,
    Product
} from '../models/asociaciones.js';
import sequelize from '../index.js';

// POST /api/orders - Crear una nueva orden desde el carrito
export const createOrder = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { userId } = req.body;

        if (!userId) {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                error: 'userId es requerido'
            });
        }

        // Obtener carrito con items
        const cart = await Cart.findOne({
            where: { user_id: userId },
            include: [
                {
                    model: CartItem,
                    include: [ProductVariant]
                }
            ]
        });

        if (!cart || !cart.CartItems || cart.CartItems.length === 0) {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                error: 'El carrito está vacío'
            });
        }

        // Calcular total y verificar stock
        let total = 0;
        for (const item of cart.CartItems) {
            const variant = item.ProductVariant;

            if (variant.stock_quantity < item.quantity) {
                await transaction.rollback();
                return res.status(400).json({
                    success: false,
                    error: `Stock insuficiente para el producto ${variant.sku}`
                });
            }

            total += parseFloat(variant.price) * item.quantity;
        }

        // Crear orden
        const order = await Order.create({
            user_id: userId,
            total_amount: total.toFixed(2)
        }, { transaction });

        // Crear order items y actualizar stock
        for (const item of cart.CartItems) {
            const variant = item.ProductVariant;

            await OrderItem.create({
                order_id: order.id,
                product_variant_id: variant.id,
                quantity: item.quantity,
                price_at_purchase: variant.price
            }, { transaction });

            // Reducir stock
            await variant.update({
                stock_quantity: variant.stock_quantity - item.quantity
            }, { transaction });
        }

        // Vaciar carrito
        await CartItem.destroy({
            where: { cart_id: cart.id },
            transaction
        });

        await transaction.commit();

        // Obtener orden completa
        const fullOrder = await Order.findByPk(order.id, {
            include: [
                {
                    model: OrderItem,
                    include: [
                        {
                            model: ProductVariant,
                            include: [Product]
                        }
                    ]
                }
            ]
        });

        res.status(201).json({
            success: true,
            data: fullOrder
        });
    } catch (error) {
        await transaction.rollback();
        console.error('Error creating order:', error);
        res.status(500).json({
            success: false,
            error: 'Error al crear la orden'
        });
    }
};

// GET /api/orders/user/:userId - Obtener órdenes de un usuario
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: OrderItem,
                    include: [
                        {
                            model: ProductVariant,
                            include: [Product]
                        }
                    ]
                }
            ],
            order: [['created_at', 'DESC']]
        });

        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            error: 'Error al obtener órdenes'
        });
    }
};

// GET /api/orders/:id - Obtener una orden específica
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findByPk(id, {
            include: [
                {
                    model: OrderItem,
                    include: [
                        {
                            model: ProductVariant,
                            include: [Product]
                        }
                    ]
                }
            ]
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Orden no encontrada'
            });
        }

        res.json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({
            success: false,
            error: 'Error al obtener la orden'
        });
    }
};
