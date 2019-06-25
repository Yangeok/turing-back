'use strict';
const { review } = require('../seed-data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('review', review);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('review', null, {});
  }
};
