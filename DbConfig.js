const { Sequelize } = require('sequelize');

// Setting up orm
module.exports.connection = new Sequelize('test_node', 'root', 'mypass', {
    host: 'localhost',
    dialect: 'mariadb',
    pool: 3306,
    logging: false
});