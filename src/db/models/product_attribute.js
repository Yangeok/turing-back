'use strict';
module.exports = (sequelize, DataTypes) => {
  const product_attribute = sequelize.define('product_attribute', {
    product_id: DataTypes.INTEGER,
    attribute_value_id: DataTypes.INTEGER
  }, {});
  product_attribute.associate = function(models) {
    // associations can be defined here
  };
  return product_attribute;
};