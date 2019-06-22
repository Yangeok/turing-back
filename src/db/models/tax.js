'use strict';
module.exports = (sequelize, DataTypes) => {
  const tax = sequelize.define('tax', {
    tax_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    tax_type: {
      type: DataTypes.STRING(100)
    },
    tax_percentage: {
      type: DataTypes.DECIMAL(10, 2)
    }
  });
  tax.associate = function(models) {
    tax.hasMany(models.order, {
      foreignKey: 'tax_id'
    });
  };
  return tax;
};
