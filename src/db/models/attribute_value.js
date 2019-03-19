'use strict';
module.exports = (sequelize, DataTypes) => {
  const attribute_value = sequelize.define(
    'attribute_value',
    {
      attribute_value_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      attribute_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      value: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {}
  );
  attribute_value.associate = function(models) {
    attribute_value.belongsToMany(models.product, {
      through: 'product_attribute',
      foreignKey: 'attribute_value_id'
    });
    attribute_value.belongsTo(models.attribute, {
      foreignKey: 'attribute_id'
    });
  };
  return attribute_value;
};
