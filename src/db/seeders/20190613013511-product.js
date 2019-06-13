'use strict';
const { products } = require('../../utils/mock/products');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('product', products);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
