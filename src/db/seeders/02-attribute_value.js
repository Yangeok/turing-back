'use strict';
const { attribute_value } = require('../seed-data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('attribute_value', attribute_value);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('attribute_value', null, {});
  }
};
