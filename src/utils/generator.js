const fs = require('fs');
const { fsErrorMessage } = require('./response');
const {
  unrefinedDepartment,
  unrefinedCategory,
  unrefinedProduct,
  unrefinedProductAttribute,
  unrefinedProductCategory,
  unrefinedAttribute,
  unrefinedAttributeValue,
  unrefinedShippingRegion,
  unrefinedShipping
} = require('../assets/mock-data');

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
writeDepartmentObj();

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
wrtieCategoryObj();

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
writeProductObj();

const writeProductAttributeObj = () => {
  // flatMap
  const concat = (x, y) => x.concat(y);
  const flatMap = (f, xs) => xs.map(f).reduce(concat, []);
  Array.prototype.flatMap = function(f) {
    return flatMap(f, this);
  };

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
writeProductAttributeObj();

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
writeProductCategoryObj();

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
writeAttributeObj();

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
writeAttributeValueObj();

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
writeShippingRegionObj();

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
writeShippingObj();
