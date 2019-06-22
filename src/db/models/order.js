'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    'order',
    {
      order_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        default: 0.0
      },
      created_on: {
        type: DataTypes.DATE
      },
      shipped_on: {
        type: DataTypes.DATE
      },
      status: {
        type: DataTypes.INTEGER,
        default: 0
      },
      comments: {
        type: DataTypes.STRING(255)
      },
      customer_id: {
        type: DataTypes.INTEGER
      },
      auth_code: {
        type: DataTypes.STRING(50)
      },
      reference: {
        type: DataTypes.STRING(50)
      },
      shipping_id: {
        type: DataTypes.INTEGER
      },
      tax_id: {
        type: DataTypes.INTEGER
      }
    },
    { freezeTableName: true }
  );
  order.associate = function(models) {
    order.belongsTo(models.shipping, {
      foreignKey: 'shipping_id'
    });
    order.belongsTo(models.tax, {
      foreignKey: 'tax_id'
    });
    order.belongsTo(models.customer, {
      foreignKey: 'customer_id'
    });
    order.hasMany(models.audit, {
      foreignKey: 'order_id'
    });
  };
  return order;
};
