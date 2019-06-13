const fs = require('fs');
const { fsErrorMessage } = require('./response');

const writeProductsObj = () => {
  const { unrefinedProducts } = require('./mock/mockData');
  const mappedProducts = unrefinedProducts.map(
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
  const stringifiedProducts = JSON.stringify(mappedProducts);
  fs.writeFile(
    './mock/products.js',
    `exports.products = ${stringifiedProducts}`,
    err => fsErrorMessage(err)
  );
};
writeProductsObj();
