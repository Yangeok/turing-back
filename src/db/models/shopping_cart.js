'use strict';
module.exports = (sequelize, DataTypes) => {
  const shopping_cart = sequelize.define('shopping_cart', {
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
  });
  shopping_cart.associate = function(models) {
    shopping_cart.belongsTo(models.product, {
      foreignKey: 'product_id'
      // as: 'product'
    });
    shopping_cart.belongsTo(models.customer, {
      foreignKey: 'customer_id'
      // as: 'customer'
    });
  };
  return shopping_cart;
};
