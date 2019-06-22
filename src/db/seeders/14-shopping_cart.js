'use strict';
const { shopping_cart } = require('../seed-data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('shopping_cart', shopping_cart);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('shopping_cart', null, {});
  }
};
