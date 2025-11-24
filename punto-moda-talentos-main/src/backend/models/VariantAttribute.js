import { DataTypes } from 'sequelize';
import sequelize from '../index.js';

const VariantAttribute = sequelize.define('VariantAttribute', {
    product_variant_id: {
        type: DataTypes.BIGINT,
        allowNull: true // references product_variants(id)
    },
    attribute_name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    attribute_value: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'variant_attributes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

export default VariantAttribute;
