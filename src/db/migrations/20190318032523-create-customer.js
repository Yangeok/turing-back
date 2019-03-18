'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customer', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50)
      },
      email: {
        type: Sequelize.STRING(100)
      },
      password: {
        type: Sequelize.STRING
      },
      credit_cart: {
        type: Sequelize.TEXT
      },
      address_1: {
        type: Sequelize.STRING(100)
      },
      address_2: {
        type: Sequelize.STRING(100)
      },
      city: {
        type: Sequelize.STRING(100)
      },
      region: {
        type: Sequelize.STRING(100)
      },
      postal_code: {
        type: Sequelize.STRING(100)
      },
      country: {
        type: Sequelize.STRING(100)
      },
      shipping_region_id: {
        type: Sequelize.INTEGER,
        default: 1,
        references: {
          model: 'shipping_region',
          key: 'shipping_region_id'
        }
      },
      day_phone: {
        type: Sequelize.STRING(100)
      },
      eve_phone: {
        type: Sequelize.STRING(100)
      },
      mob_phone: {
        type: Sequelize.STRING(100)
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('customer');
  }
};
