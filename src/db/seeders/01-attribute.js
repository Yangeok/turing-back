'use strict';
const { attribute } = require('../seed-data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('attribute', attribute);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('attribute', null, {});
  }
};
