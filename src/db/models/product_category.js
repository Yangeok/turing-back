'use strict';
module.exports = (sequelize, DataTypes) => {
  const product_category = sequelize.define(
    'product_category',
    {
      product_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      category_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'product_category',
      timestamps: false
    }
  );
  product_category.associate = function(models) {
    product_category.belongsTo(models.product, {
      foreignKey: 'product_id'
    });
    product_category.belongsTo(models.category, {
      foreignKey: 'category_id'
    });
  };
  return product_category;
};
