'use strict';
module.exports = (sequelize, DataTypes) => {
  const department = sequelize.define('department', {
    department_id: {
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
    }
  });
  department.associate = function(models) {
    department.hasMany(models.category, {
      foreignKey: 'department_id'
    });
  };
  return department;
};
