'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define(
    'customer',
    {
      customer_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      credit_cart: {
        type: DataTypes.TEXT
      },
      address_1: {
        type: DataTypes.STRING
      },
      address_2: {
        type: DataTypes.STRING
      },
      city: {
        type: DataTypes.STRING
      },
      region: {
        type: DataTypes.STRING
      },
      postal_code: {
        type: DataTypes.STRING
      },
      country: {
        type: DataTypes.STRING
      },
      shipping_region_id: {
        type: DataTypes.INTEGER
      },
      day_phone: {
        type: DataTypes.STRING
      },
      eve_phone: {
        type: DataTypes.STRING
      },
      mob_phone: {
        type: DataTypes.STRING
      }
    },
    {}
  );
  customer.associate = function(models) {
    // associations can be defined here
  };
  return customer;
};
