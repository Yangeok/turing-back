const { attribute_value } = require('./attribute_value');
const { attribute } = require('./attribute');
const { category } = require('./category');
const { customer } = require('./customer');
const { department } = require('./department');
const { order_detail } = require('./order_detail');
const { order } = require('./order');
const { product_attribute } = require('./product_attribute');
const { product_category } = require('./product_category');
const { product } = require('./product');
const { review } = require('./review');
const { shipping_region } = require('./shipping_region');
const { shipping } = require('./shipping');
const { shopping_cart } = require('./shopping_cart');
const { tax } = require('./tax');

module.exports = {
  attribute_value,
  attribute,
  category,
  customer,
  department,
  order_detail,
  order,
  product_attribute,
  product_category,
  product,
  review,
  shipping_region,
  shipping,
  shopping_cart,
  tax
};
