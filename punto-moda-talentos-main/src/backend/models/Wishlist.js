import { DataTypes } from 'sequelize';
import sequelize from '../index.js';

const Wishlist = sequelize.define('Wishlist', {
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: true // references users(id)
    },
    product_id: {
        type: DataTypes.BIGINT,
        allowNull: true // references products(id)
    }
}, {
    tableName: 'wishlist',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

export default Wishlist;
