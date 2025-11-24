import { DataTypes } from 'sequelize';
import sequelize from '../index.js';

const User = sequelize.define('User', {
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

export default User;