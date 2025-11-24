import { DataTypes } from 'sequelize';
import sequelize from '../index.js';

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    category: {
        type: DataTypes.TEXT,
    }
}, {
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

export default Product;