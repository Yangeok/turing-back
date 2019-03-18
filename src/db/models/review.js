'use strict';
module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define('review', {
    review_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    rating: DataTypes.SMALLINT,
    created_on: DataTypes.DATE
  }, {});
  review.associate = function(models) {
    // associations can be defined here
  };
  return review;
};