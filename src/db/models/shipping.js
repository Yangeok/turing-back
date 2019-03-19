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
        type: DataTypes.STRING(100)
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
  shipping.associate = function(models) {
    shipping.belongsTo(models.shipping_region, {
      foreignKey: 'shipping_region_id'
    });
    shipping.hasMany(models.orders, {
      foreignKey: 'shipping_id'
    });
  };
  return shipping;
};
