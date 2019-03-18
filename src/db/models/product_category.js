'use strict';
module.exports = (sequelize, DataTypes) => {
  const product_category = sequelize.define('product_category', {
    product_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {});
  product_category.associate = function(models) {
    // associations can be defined here
  };
  return product_category;
};