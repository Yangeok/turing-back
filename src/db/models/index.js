'use strict';
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config')[process.env.NODE_ENV];

let sequelize;
sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};
fs.readdirSync(__dirname)
  .filter(file => {
    const basename = path.basename(__filename);
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
