'use strict';
const { product_category } = require('../seed-data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('product_category', product_category);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product_category', null, {});
  }
};
