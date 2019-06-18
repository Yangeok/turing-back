const _ = require('lodash');
const data = [
  {
    product_id: 1,
    attribute_values: [
      { attribute_value_id: 1 },
      { attribute_value_id: 2 },
      { attribute_value_id: 3 }
    ]
  },
  {
    product_id: 2,
    attribute_values: [
      {
        attribute_value_id: 1
      },
      {
        attribute_value_id: 2
      },
      {
        attribute_value_id: 3
      }
    ]
  },
  {
    product_id: 3,
    attribute_values: [
      {
        attribute_value_id: 1
      },
      {
        attribute_value_id: 2
      },
      {
        attribute_value_id: 3
      }
    ]
  }
];

const getAttributeValueId = _.chain(data[0].attribute_values)
  .flatten()
  .value();

const getProductId = () => {
  const arrOne = [];
  data.forEach((val, idx) => {
    arrOne[idx] = { product_id: val.product_id };
  });

  const arrTwo = [];
  _.forEach(arrOne, (val, idx) => {
    for (let i = 0; i < getAttributeValueId.length; i++) {
      arrTwo.push(arrOne[idx]);
    }
  });
  return arrTwo;
};

console.log(getProductId());

// const attributeValueId = [
//   { attribute_value_id: 1 },
//   { attribute_value_id: 2 },
//   { attribute_value_id: 3 },
//   { attribute_value_id: 4 },
//   { attribute_value_id: 5 }
// ];
// const productId = [{ product_id: 1 }, { product_id: 2 }, { product_id: 3 }];

// const a = [];
// for (let i = 0; i < productId.length; i++) {
//   a[i] = {
//     product_id: productId[i].product_id
//   };
// }
// for (let j = 0; j < attributeValueId.length; j++) {}

// const b = a.concat(a, a, a);
// console.log(b);

// // productId[0].attribute_value_id = getAttributeValueId[0].attribute_value_id;
// // productId[1].attribute_value_id = getAttributeValueId[0].attribute_value_id;
// // productId[2].attribute_value_id = getAttributeValueId[0].attribute_value_id;
// // productId[3].attribute_value_id = getAttributeValueId[1].attribute_value_id;
// // productId[4].attribute_value_id = getAttributeValueId[1].attribute_value_id;
// // productId[5].attribute_value_id = getAttributeValueId[1].attribute_value_id;
// // productId[6].attribute_value_id = getAttributeValueId[2].attribute_value_id;
// // productId[7].attribute_value_id = getAttributeValueId[2].attribute_value_id;
// // productId[8].attribute_value_id = getAttributeValueId[2].attribute_value_id;
