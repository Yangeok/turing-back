'use strict';
const { customer } = require('../seed-data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('customer', customer);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('customer', null, {});
  }
};
