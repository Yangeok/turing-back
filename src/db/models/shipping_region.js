'use strict';
module.exports = (sequelize, DataTypes) => {
  const shipping_region = sequelize.define('shipping_region', {
    shipping_region_id: DataTypes.INTEGER,
    shipping_region: DataTypes.STRING
  }, {});
  shipping_region.associate = function(models) {
    // associations can be defined here
  };
  return shipping_region;
};