import { DataTypes } from 'sequelize';
import sequelize from '../index.js';

const ProductVariant = sequelize.define('ProductVariant', {
    product_id: {
        type: DataTypes.BIGINT,
        allowNull: true // references products(id)
    },
    sku: {
        type: DataTypes.TEXT,
        unique: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: 'product_variants',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

export default ProductVariant;
