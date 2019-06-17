'use strict';
const { product, attribute_value, product_attribute } = require('../models');

const data = product.findOne({
  include: { model: attribute_value }
});

console.log(data);
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('product_attribute', data);
    // return queryInterface.sequelize.query(
    //   `INSERT INTO "product_attribute" (product_id, attribute_value_id)
    //    SELECT p.product_id, av.attribute_value_id
    //    FROM product p, attribute_value av;
    //    `,
    //   { raw: true }
    // );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product_attribute', null, {});
  }
};
