import { DataTypes } from 'sequelize';
import sequelize from '../index.js';

const Cart = sequelize.define('Cart', {
    // id is automatically created by Sequelize
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: true // references users(id)
    }
}, {
    tableName: 'carts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

export default Cart;
