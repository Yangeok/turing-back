'use strict';
module.exports = (sequelize, DataTypes) => {
  const product_attribute = sequelize.define('product_attribute', {
    product_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    attribute_value_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    }
  });
  product_attribute.associate = function(models) {
    product_attribute.belongsTo(models.product, {
      foreignKey: 'product_id'
    });
    product_attribute.belongsTo(models.attribute_value, {
      foreignKey: 'attribute_value_id'
    });
  };
  return product_attribute;
};
