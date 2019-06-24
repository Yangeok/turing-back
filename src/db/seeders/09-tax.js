'use strict';
const { tax } = require('../seed-data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tax', tax);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tax', null, {});
  }
};
