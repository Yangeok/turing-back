'use strict';
const { shipping_region } = require('../seed-data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('shipping_region', shipping_region);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('shipping_region', null, {});
  }
};
