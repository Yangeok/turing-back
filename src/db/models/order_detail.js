'use strict';
module.exports = (sequelize, DataTypes) => {
  const order_detail = sequelize.define('order_detail', {
    item_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    attributes: DataTypes.STRING,
    product_name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    unit_cost: DataTypes.DECIMAL
  }, {});
  order_detail.associate = function(models) {
    // associations can be defined here
  };
  return order_detail;
};