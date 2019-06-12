'use strict';
module.exports = (sequelize, DataTypes) => {
  const category_department = sequelize.define(
    'category_department',
    {
      category_id: { type: DataTypes.INTEGER },
      department_id: { type: DataTypes.INTEGER },
      name: { type: DataTypes.STRING }
    },
    {}
  );
  category_department.associate = function(models) {
    // associations can be defined here
  };
  return category_department;
};
