'use strict';
const { order_detail } = require('../seed-data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('order_detail', order_detail);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('order_detail', null, {});
  }
};
