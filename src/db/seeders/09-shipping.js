'use strict';
const { shipping } = require('../seed-data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('shipping', shipping);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('shipping', null, {});
  }
};
