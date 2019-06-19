'use strict';
module.exports = (sequelize, DataTypes) => {
  const shipping_region = sequelize.define('shipping_region', {
    shipping_region_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    shipping_region: {
      type: DataTypes.STRING
    }
  });
  shipping_region.associate = function(models) {
    shipping_region.hasMany(models.shipping, {
      foreignKey: 'shipping_region_id'
    });
  };
  return shipping_region;
};
