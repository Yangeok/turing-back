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
        type: DataTypes.STRING(100)
      },
      description: {
        type: DataTypes.STRING(1000)
      },
      price: {
        type: DataTypes.DECIMAL(10, 2)
      },
      discounted_price: {
        type: DataTypes.DECIMAL(10, 2),
        default: 0.0
      },
      image: {
        type: DataTypes.STRING(150)
      },
      image_2: {
        type: DataTypes.STRING(150)
      },
      thumbnail: {
        type: DataTypes.STRING(150)
      },
      display: {
        type: DataTypes.SMALLINT(6),
        default: 0
      }
    },
    {
      indexes: [
        {
          type: 'FULLTEXT',
          fields: ['name', 'description']
        }
      ]
    }
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
    product.hasMany(models.shopping_cart, {
      foreignKey: 'product_id'
    });
    product.hasMany(models.order_detail, {
      foreignKey: 'product_id'
    });
    product.hasMany(models.review, {
      foreignKey: 'product_id'
    });
  };
  return product;
};
