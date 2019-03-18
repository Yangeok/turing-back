'use strict';
module.exports = (sequelize, DataTypes) => {
  const shopping_cart = sequelize.define('shopping_cart', {
    item_id: DataTypes.INTEGER,
    cart_id: DataTypes.STRING,
    product_id: DataTypes.INTEGER,
    attributes: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    buy_now: DataTypes.BOOLEAN,
    add_on: DataTypes.DATE
  }, {});
  shopping_cart.associate = function(models) {
    // associations can be defined here
  };
  return shopping_cart;
};