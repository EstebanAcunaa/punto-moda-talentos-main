import { DataTypes } from 'sequelize';
import sequelize from '../index.js';

const CartItem = sequelize.define('CartItem', {
    cart_id: {
        type: DataTypes.BIGINT,
        allowNull: true // references carts(id)
    },
    product_variant_id: {
        type: DataTypes.BIGINT,
        allowNull: true // references product_variants(id)
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    }
}, { tableName: 'cart_items', timestamps: false });

export default CartItem;