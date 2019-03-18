'use strict';
module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define(
    'review',
    {
      review_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      customer_id: {
        type: DataTypes.INTEGER
      },
      product_id: {
        type: DataTypes.INTEGER
      },
      review: {
        type: DataTypes.TEXT
      },
      rating: {
        type: DataTypes.SMALLINT
      },
      created_on: {
        type: DataTypes.DATE
      }
    },
    {}
  );
  review.associate = function(models) {
    review.belongsTo(models.customer, { foreignKey: 'customer_id' });
  };
  return review;
};
