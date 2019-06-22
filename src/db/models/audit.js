'use strict';
module.exports = (sequelize, DataTypes) => {
  const audit = sequelize.define('audit', {
    audit_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    order_id: {
      type: DataTypes.INTEGER
    },
    created_on: {
      type: DataTypes.DATE
    },
    message: {
      type: DataTypes.TEXT
    },
    code: {
      type: DataTypes.INTEGER
    }
  });
  audit.associate = function(models) {
    audit.belongsTo(models.order, {
      foreignKey: 'order_id'
    });
  };
  return audit;
};
