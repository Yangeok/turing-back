'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    'product',
    {
      product_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING(1000)
      },
      price: {
        type: DataTypes.DECIMAL(10, 2)
      },
      discounted_price: {
        type: DataTypes.DECIMAL(10, 2)
      },
      image: {
        type: DataTypes.STRING
      },
      image_2: {
        type: DataTypes.STRING
      },
      thumbnail: {
        type: DataTypes.STRING
      },
      display: {
        type: DataTypes.SMALLINT
      }
    },
    {}
  );
  product.associate = function(models) {
    product.belongsToMany(models.category, {
      through: 'product_category',
      foreignKey: 'product_id'
    });
    product.belongsToMany(models.attribute_value, {
      through: 'product_attribute',
      foreignKey: 'product_id'
    });
  };
  return product;
};
