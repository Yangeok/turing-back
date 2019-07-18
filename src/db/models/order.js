'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define(
    'orders',
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
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  orders.associate = function(models) {
    orders.belongsTo(models.shipping, {
      foreignKey: 'shipping_id'
    });
    orders.belongsTo(models.tax, {
      foreignKey: 'tax_id'
    });
    orders.belongsTo(models.customer, {
      foreignKey: 'customer_id'
    });
  };
  return orders;
};
