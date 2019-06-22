'use strict';
module.exports = (sequelize, DataTypes) => {
  const order_detail = sequelize.define('order_detail', {
    item_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    order_id: {
      type: DataTypes.INTEGER
    },
    product_id: {
      type: DataTypes.INTEGER
    },
    attributes: {
      type: DataTypes.STRING(1000)
    },
    product_name: {
      type: DataTypes.STRING(100)
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    unit_cost: {
      type: DataTypes.DECIMAL(10, 2)
    }
  });
  order_detail.associate = function(models) {
    order_detail.belongsTo(models.order, {
      foreignKey: 'order_id'
    });
    order_detail.belongsTo(models.product, {
      foreignKey: 'product_id'
    });
  };
  return order_detail;
};
