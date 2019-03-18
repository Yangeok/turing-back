'use strict';
module.exports = (sequelize, DataTypes) => {
  const department = sequelize.define('department', {
    department_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  department.associate = function(models) {
    // associations can be defined here
  };
  return department;
};