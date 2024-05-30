const dbConfig = require('../config/dbConfig.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connection established.');
  })
  .catch((error) => {
    console.log('Error connecting to the database:', error);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Product = require('./productModel.js')(sequelize, DataTypes); // Ensure correct import
db.Order = require('./orderModel.js')(sequelize, DataTypes);     // Ensure correct import

db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synchronized.');
  });

module.exports = db;
