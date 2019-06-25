'use strict';
const { order } = require('../seed-data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('order', order);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('order', null, {});
  }
};
