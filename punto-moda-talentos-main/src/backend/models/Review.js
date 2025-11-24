import { DataTypes } from 'sequelize';
import sequelize from '../index.js';

const Review = sequelize.define('Review', {
    rating: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5
        }
    },
    comment: {
        type: DataTypes.TEXT,
    }
}, {
    tableName: 'reviews',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

export default Review;