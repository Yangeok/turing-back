'use strict';
module.exports = (sequelize, DataTypes) => {
  const shipping = sequelize.define(
    'shipping',
    {
      shipping_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      shipping_type: {
        type: DataTypes.STRING
      },
      shipping_cost: {
        type: DataTypes.FLOAT(10, 2)
      },
      shipping_region_id: {
        type: DataTypes.INTEGER
      }
    },
    {}
  );
  shipping.associate = function(models) {};
  return shipping;
};
