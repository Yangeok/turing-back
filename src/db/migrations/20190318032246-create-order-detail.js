'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('order_detail', {
      item_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'orders',
          key: 'order_id'
        }
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'product',
          key: 'product_id'
        }
      },
      attributes: {
        type: Sequelize.STRING(1000)
      },
      product_name: {
        type: Sequelize.STRING(100)
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      unit_cost: {
        type: Sequelize.DECIMAL(10, 2)
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('order_detail');
  }
};
