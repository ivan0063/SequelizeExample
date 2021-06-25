const DataTypes = require('sequelize');
const { connection } = require('./../../DbConfig');

const User = connection.define('user', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    user: DataTypes.STRING,
    pass: DataTypes.STRING
}, {
    tableName: 'USER',
    createdAt: false,
    updatedAt: false,
});

module.exports = User;

