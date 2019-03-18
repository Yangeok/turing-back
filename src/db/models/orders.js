'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define(
    'orders',
    {
      order_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2)
      },
      created_on: {
        type: DataTypes.DATE
      },
      shipped_on: {
        type: DataTypes.DATE
      },
      status: {
        type: DataTypes.INTEGER
      },
      comments: {
        type: DataTypes.STRING
      },
      customer_id: {
        type: DataTypes.INTEGER
      },
      auth_code: {
        type: DataTypes.STRING
      },
      reference: {
        type: DataTypes.STRING
      },
      shipping_id: {
        type: DataTypes.INTEGER
      },
      tax_id: {
        type: DataTypes.INTEGER
      }
    },
    {}
  );
  orders.associate = function(models) {
    orders.belongsTo(models.shipping, { foreignKey: 'shipping_id' });
    orders.belongsTo(models.tax, { foreignKey: 'tax_id' });
    orders.belongsTo(models.customer, { foreignKey: 'customer_id' });
  };
  return orders;
};
