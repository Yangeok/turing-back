'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('attribute_value', {
      attribute_value_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      attribute_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'attribute',
          key: 'attribute_id'
        }
      },
      value: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('attribute_value');
  }
};
