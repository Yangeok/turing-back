'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shipping', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shipping_id: {
        type: Sequelize.INTEGER
      },
      shipping_type: {
        type: Sequelize.STRING
      },
      shipping_region_id: {
        type: Sequelize.NUMERIC
      },
      shipping_region_id: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('shipping');
  }
};
