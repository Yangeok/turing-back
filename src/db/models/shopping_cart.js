'use strict';
module.exports = (sequelize, DataTypes) => {
  const shopping_cart = sequelize.define(
    'shopping_cart',
    {
      item_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      cart_id: {
        type: DataTypes.STRING(64)
      },
      product_id: {
        type: DataTypes.INTEGER
      },
      attributes: {
        type: DataTypes.STRING(1000)
      },
      quantity: {
        type: DataTypes.INTEGER
      },
      buy_now: {
        type: DataTypes.BOOLEAN
      },
      add_on: {
        type: DataTypes.DATE
      },
      customer_id: {
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'shopping_cart',
      timestamps: false
    }
  );
  shopping_cart.associate = function(models) {
    shopping_cart.belongsTo(models.product, {
      foreignKey: 'product_id'
    });
    // shopping_cart.belongsToMany(models.product_cart, {
    //   through: 'product_cart',
    //   foreignKey: 'cart_id'
    // });
    shopping_cart.belongsTo(models.customer, {
      foreignKey: 'customer_id'
    });
  };
  return shopping_cart;
};
