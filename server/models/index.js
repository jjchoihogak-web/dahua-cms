const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.url, {
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
  pool: dbConfig.pool,
  dialectOptions: dbConfig.dialectOptions
});

const Camera = require('./Camera')(sequelize, Sequelize.DataTypes);

const db = {
  sequelize,
  Sequelize,
  Camera
};

module.exports = db;

