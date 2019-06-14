'use strict';
const { category } = require('../seed-data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('category', category);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('category', null, {});
  }
};
