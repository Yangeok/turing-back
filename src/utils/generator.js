const faker = require('faker');
const fs = require('fs');
const { fsErrorMessage } = require('./response');
const { createDatetime, getRandomIndex } = require('./helper');
const {
  unrefinedAttribute,
  unrefinedAttributeValue,
  unrefinedCategory,
  unrefinedDepartment,
  unrefinedProduct,
  unrefinedProductAttribute,
  unrefinedProductCategory,
  unrefinedShippingRegion,
  unrefinedShipping,
  unrefinedTax
} = require('../assets/mock-data');

const writeAttributeObj = () => {
  const mappedAttribute = unrefinedAttribute.map(([attribute_id, name]) => ({
    attribute_id,
    name
  }));
  const stringifiedAttribute = JSON.stringify(mappedAttribute);
  fs.writeFile(
    '../db/seed-data/attribute.js',
    `exports.attribute = ${stringifiedAttribute}`,
    err => fsErrorMessage(err)
  );
};
const writeAttributeValueObj = () => {
  const mappedAttributeValue = unrefinedAttributeValue.map(
    ([attribute_value_id, attribute_id, value]) => ({
      attribute_value_id,
      attribute_id,
      value
    })
  );
  const stringifiedAttributeValue = JSON.stringify(mappedAttributeValue);
  fs.writeFile(
    '../db/seed-data/attribute_value.js',
    `exports.attribute_value = ${stringifiedAttributeValue}`,
    err => fsErrorMessage(err)
  );
};
const wrtieCategoryObj = () => {
  const mappedCategory = unrefinedCategory.map(
    ([category_id, department_id, name, description]) => ({
      category_id,
      department_id,
      name,
      description
    })
  );
  const stringifiedCategory = JSON.stringify(mappedCategory);
  fs.writeFile(
    '../db/seed-data/category.js',
    `exports.category = ${stringifiedCategory}`,
    err => fsErrorMessage(err)
  );
};
const writeCustomerObj = () => {
  const customerLength = 1000;
  const mappedCustomer = Array(customerLength)
    .fill(0)
    .map((_, idx) => ({
      customer_id: idx + 1,
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      credit_card: faker.random.number({
        min: 10 ^ 8,
        max: 9999999999999999
      }),
      address_1: faker.address.streetAddress(),
      address_2: faker.address.secondaryAddress(),
      city: faker.address.city(),
      region: faker.address.stateAbbr(),
      postal_code: faker.address.zipCode(),
      country: faker.address.country(),
      shipping_region_id: 1,
      day_phone: faker.phone.phoneNumberFormat(0),
      eve_phone: faker.phone.phoneNumberFormat(0),
      mob_phone: faker.phone.phoneNumberFormat(0)
    }));

  const stringifiedCustomer = JSON.stringify(mappedCustomer);
  fs.writeFile(
    '../db/seed-data/customer.js',
    `exports.customer = ${stringifiedCustomer}`,
    err => fsErrorMessage(err)
  );
};
const writeDepartmentObj = () => {
  const mappedDepartment = unrefinedDepartment.map(
    ([department_id, name, description]) => ({
      department_id,
      name,
      description
    })
  );
  const stringifiedDepartment = JSON.stringify(mappedDepartment);
  fs.writeFile(
    '../db/seed-data/department.js',
    `exports.department = ${stringifiedDepartment}`,
    err => fsErrorMessage(err)
  );
};
const writeOrderObj = () => {
  const orderLength = 1000;
  const mappedOrder = Array(orderLength)
    .fill(0)
    .map((_, idx) => ({
      order_id: idx + 1,
      total_amount: faker.finance.amount(0, 1000, 2),
      created_on: createDatetime(),
      shipped_on: createDatetime(),
      status: faker.random.number({ min: 0, max: 5 }),
      comments: faker.lorem.sentence(),
      customer_id: faker.random.number({ min: 1, max: orderLength }),
      auth_code: faker.internet.password(10),
      reference: faker.lorem.words(),
      shipping_id: faker.random.number({ min: 1, max: 7 }),
      tax_id: faker.random.number({ min: 1, max: 2 })
    }));

  const stringifiedOrder = JSON.stringify(mappedOrder);
  fs.writeFile(
    '../db/seed-data/order.js',
    `exports.order = ${stringifiedOrder}`,
    err => fsErrorMessage(err)
  );
};
const writeOrderDetailObj = () => {
  const orderDetailLength = 1000;
  const attributes = ['Size', 'Color'];

  const mappedOrderDetail = Array(orderDetailLength)
    .fill(0)
    .map((_, idx) => {
      const getProducts = unrefinedProduct.map(([product_id, name]) => ({
        product_id,
        name
      }));

      return {
        item_id: idx + 1,
        order_id: faker.random.number({ min: 1, max: orderDetailLength }),
        product_id: getProducts.product_id,
        attributes: getRandomIndex(attributes),
        product_name: getProducts.name,
        quantity: faker.random.number({ min: 1, max: 10 }),
        unit_cost: faker.finance.amount(0, 1000, 2)
      };
    });

  const stringifiedOrderDetail = JSON.stringify(mappedOrderDetail);
  fs.writeFile(
    '../db/seed-data/order_detail.js',
    `exports.order_detail = ${stringifiedOrderDetail}`,
    err => fsErrorMessage(err)
  );
};
const writeProductObj = () => {
  const mappedProduct = unrefinedProduct.map(
    ([
      product_id,
      name,
      description,
      price,
      discounted_price,
      image,
      image_2,
      thumbnail,
      display
    ]) => ({
      product_id,
      name,
      description,
      price,
      discounted_price,
      image,
      image_2,
      thumbnail,
      display
    })
  );
  const stringifiedProduct = JSON.stringify(mappedProduct);
  fs.writeFile(
    '../db/seed-data/product.js',
    `exports.product = ${stringifiedProduct}`,
    err => fsErrorMessage(err)
  );
};
const writeProductAttributeObj = () => {
  const flatMap = require('./helper');
  // // flatMap
  // const concat = (x, y) => x.concat(y);
  // const flatMap = (f, xs) => xs.map(f).reduce(concat, []);
  // Array.prototype.flatMap = function(f) {
  //   return flatMap(f, this);
  // };

  const mappedProductAttribute = unrefinedProductAttribute.flatMap(
    ({ product_id, attribute_values }) =>
      attribute_values.map(o => ({ product_id, ...o }))
  );
  const stringifiedProductAttribute = JSON.stringify(mappedProductAttribute);
  fs.writeFile(
    '../db/seed-data/product_attribute.js',
    `exports.product_attribute = ${stringifiedProductAttribute}`,
    err => fsErrorMessage(err)
  );
};
const writeProductCategoryObj = () => {
  const mappedProductCategory = unrefinedProductCategory.map(
    ([product_id, category_id]) => ({
      product_id,
      category_id
    })
  );
  const stringifiedProductCategory = JSON.stringify(mappedProductCategory);
  fs.writeFile(
    '../db/seed-data/product_category.js',
    `exports.product_category = ${stringifiedProductCategory}`,
    err => fsErrorMessage(err)
  );
};
const writeReviewObj = () => {
  const reviewLength = 3030;
  const productLength = 30;

  const mappedReview = Array(reviewLength)
    .fill(0)
    .map((_, idx) => ({
      review_id: idx + 1,
      product_id: Math.ceil((idx + 1) / productLength),
      customer_id: faker.random.number({ min: 1, max: 1000 }),
      review: faker.lorem.sentences(),
      rating: faker.random.number({ min: 1, max: 100 }),
      created_on: createDatetime()
    }));

  const stringifiedReview = JSON.stringify(mappedReview);
  fs.writeFile(
    '../db/seed-data/review.js',
    `exports.review = ${stringifiedReview}`,
    err => fsErrorMessage(err)
  );
};
const writeShippingObj = () => {
  const mappedShipping = unrefinedShipping.map(
    ([shipping_id, shipping_type, shipping_cost, shipping_region_id]) => ({
      shipping_id,
      shipping_type,
      shipping_cost,
      shipping_region_id
    })
  );
  const stringifiedShipping = JSON.stringify(mappedShipping);
  fs.writeFile(
    '../db/seed-data/shipping.js',
    `exports.shipping = ${stringifiedShipping}`,
    err => fsErrorMessage(err)
  );
};
const writeShoppingCartObj = () => {
  const shoppingCartLength = 1000;
  const attributes = ['Size', 'Color'];
  const buyNow = [0, 1];

  const mappedShoppingCart = Array(shoppingCartLength)
    .fill(0)
    .map((_, idx) => ({
      item_id: idx + 1,
      cart_id: faker.random
        .uuid()
        .replace(/-/g, '')
        .substring(0, 18),
      product_id: faker.random.number({ min: 1, max: 101 }),
      attributes: getRandomIndex(attributes),
      quantity: faker.random.number({ min: 1, max: 100 }),
      buy_now: getRandomIndex(buyNow),
      add_on: createDatetime(),
      customer_id: faker.random.number({ min: 1, max: shoppingCartLength })
    }));

  const stringifiedShoppingCart = JSON.stringify(mappedShoppingCart);
  fs.writeFile(
    '../db/seed-data/shopping_cart.js',
    `exports.shopping_cart = ${stringifiedShoppingCart}`,
    err => fsErrorMessage(err)
  );
};
const writeShippingRegionObj = () => {
  const mappedShippingRegion = unrefinedShippingRegion.map(
    ([shipping_region_id, shipping_region]) => ({
      shipping_region_id,
      shipping_region
    })
  );
  const stringifiedShippingRegion = JSON.stringify(mappedShippingRegion);
  fs.writeFile(
    '../db/seed-data/shipping_region.js',
    `exports.shipping_region = ${stringifiedShippingRegion}`,
    err => fsErrorMessage(err)
  );
};
const writeTaxObj = () => {
  const mappedTax = unrefinedTax.map(
    ({ tax_id, tax_type, tax_percentage }) => ({
      tax_id,
      tax_type,
      tax_percentage
    })
  );
  const stringifiedTax = JSON.stringify(mappedTax);
  fs.writeFile(
    '../db/seed-data/tax.js',
    `exports.tax = ${stringifiedTax}`,
    err => fsErrorMessage(err)
  );
};

writeAttributeObj();
writeAttributeValueObj();
wrtieCategoryObj();
writeCustomerObj();
writeDepartmentObj();
writeOrderObj();
writeOrderDetailObj();
writeProductObj();
writeProductAttributeObj();
writeProductCategoryObj();
writeReviewObj();
writeShippingObj();
writeShoppingCartObj();
writeShippingRegionObj();
writeTaxObj();
