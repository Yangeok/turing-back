'use strict';
const { department } = require('../seed-data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('department', department);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('department', null, {});
  }
};
