import { DataTypes } from 'sequelize';
import sequelize from '../index.js';

const Order = sequelize.define('Order', {
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: true // references users(id)
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

export default Order;
