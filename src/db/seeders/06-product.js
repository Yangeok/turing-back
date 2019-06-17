'use strict';
const { product } = require('../seed-data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('product', product);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product', null, {});
  }
};
