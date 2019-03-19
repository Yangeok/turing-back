'use strict';
const bcrypt = require('bcrypt');

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
        type: DataTypes.STRING(50)
      },
      email: {
        unique: true,
        type: DataTypes.STRING(100)
      },
      password: {
        type: DataTypes.STRING
      },
      credit_cart: {
        type: DataTypes.TEXT
      },
      address_1: {
        type: DataTypes.STRING(100)
      },
      address_2: {
        type: DataTypes.STRING(100)
      },
      city: {
        type: DataTypes.STRING(100)
      },
      region: {
        type: DataTypes.STRING(100)
      },
      postal_code: {
        type: DataTypes.STRING(100)
      },
      country: {
        type: DataTypes.STRING(100)
      },
      shipping_region_id: {
        type: DataTypes.INTEGER,
        default: 1
      },
      day_phone: {
        type: DataTypes.STRING(100)
      },
      eve_phone: {
        type: DataTypes.STRING(100)
      },
      mob_phone: {
        type: DataTypes.STRING(100)
      }
    },
    {
      hooks: {
        beforeCreate: function(customer) {
          customer.password = bcrypt.hashSync(
            customer.password,
            bcrypt.genSaltSync(10),
            null
          );
        }
      }
    }
  );
  customer.associate = function(models) {
    customer.belongsTo(models.shipping_region, {
      foreignKey: 'shipping_region_id'
    });
    customer.hasMany(models.shopping_cart, {
      foreignKey: 'customer_id'
    });
  };

  customer.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return customer;
};
