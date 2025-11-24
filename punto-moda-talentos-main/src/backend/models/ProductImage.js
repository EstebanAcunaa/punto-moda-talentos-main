import { DataTypes } from 'sequelize';
import sequelize from '../index.js';

const ProductImage = sequelize.define('ProductImage', {
    product_id: {
        type: DataTypes.BIGINT,
        allowNull: true // references products(id)
    },
    image_url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    color: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'product_images',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

export default ProductImage;
