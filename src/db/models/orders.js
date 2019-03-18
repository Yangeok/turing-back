'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    order_id: DataTypes.INTEGER,
    total_amount: DataTypes.DECIMAL,
    created_on: DataTypes.DATE,
    shipped_on: DataTypes.DATE,
    status: DataTypes.INTEGER,
    comments: DataTypes.STRING,
    customer_id: DataTypes.INTEGER,
    auth_code: DataTypes.STRING,
    reference: DataTypes.STRING,
    shipping_id: DataTypes.INTEGER,
    tax_id: DataTypes.INTEGER
  }, {});
  orders.associate = function(models) {
    // associations can be defined here
  };
  return orders;
};