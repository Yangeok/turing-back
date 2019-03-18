'use strict';
module.exports = (sequelize, DataTypes) => {
  const shipping = sequelize.define('shipping', {
    shipping_id: DataTypes.INTEGER,
    shipping_type: DataTypes.STRING,
    shipping_region_id: DataTypes.NUMERIC,
    shipping_region_id: DataTypes.INTEGER
  }, {});
  shipping.associate = function(models) {
    // associations can be defined here
  };
  return shipping;
};