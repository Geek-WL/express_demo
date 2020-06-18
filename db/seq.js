const Sequelize = require('sequelize')
const {MYSQL_CONFIG} = require('../config/db')
const seq = new Sequelize(
    MYSQL_CONFIG.databaseName,
    MYSQL_CONFIG.databaseUserName,
    MYSQL_CONFIG.databasePassword,
    MYSQL_CONFIG.config);

module.exports = seq
