import { DataTypes } from 'sequelize';
import sequelize from '../index.js';

const OrderItem = sequelize.define('OrderItem', {
    order_id: {
        type: DataTypes.BIGINT,
        allowNull: true // references orders(id)
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
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'order_items',
    timestamps: false
});

export default OrderItem;
