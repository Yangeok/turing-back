'use strict';
module.exports = (sequelize, DataTypes) => {
  const attribute = sequelize.define(
    'attribute',
    {
      attribute_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING(100)
      }
    },
    {
      tableName: 'attribute',
      timestamps: false
    }
  );
  attribute.associate = function(models) {
    attribute.hasMany(models.attribute_value, {
      foreignKey: 'attribute_id'
    });
  };
  return attribute;
};
