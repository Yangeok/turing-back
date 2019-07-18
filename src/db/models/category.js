'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    'category',
    {
      category_id: {
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
      department_id: {
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'category',
      timestamps: false
    }
  );
  category.associate = function(models) {
    category.belongsToMany(models.product, {
      through: 'product_category',
      foreignKey: 'category_id'
    });
    category.belongsTo(models.department, {
      foreignKey: 'department_id'
    });
  };
  return category;
};
