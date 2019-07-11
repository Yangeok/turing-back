# Turing-Backend ![](https://api.travis-ci.org/Yangeok/turing-back.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/github/Yangeok/turing-back/badge.svg?branch=master)](https://coveralls.io/github/Yangeok/turing-back?branch=master)

## Contents

- [Installation](#Installation)
- [Running test](#Running-test)
- [Endpoints](#Endpoints)
- [Architecture](#Architecture)
- [Database](#Database)

## Installation

- Ensure [Node.js](https://nodejs.org/en/), [MySQL](https://www.mysql.com/downloads/) are installed.
- Clone this [repository](https://github.com/Yangeok/turing-back).
- Navigate to the project directory `cd turing-back`.
- Run `yarn` on the terminal to install dependencies.
- Change the filename `.env.example` to `.env` in your root directory and write variables with facebook app info and stripe.
- Create MySQL database `yarn db:create`.
- Run migrations `yarn migrate`.
- Generate mock data to seed to dabase `cd src/utils && node generator && yarn seed`.
- Start server `yarn start` to connect to production mode or `yarn start:dev` to development.

## Running test

- `yarn coveralls`
- Run the command `yarn test` to run the test

## Endpoints

### Departments

- `GET /department`

  - Returns a departments object.
  - No authentication required.
  - No parameters required.
  - Example response

  ```json
  [
    {
      "department_id": 1,
      "name": "Regional",
      "description": "Proud of your country? Wear a T-shirt with a national symbol stamp!"
    }
  ]
  ```

- `GET /department/:id`

  - Returns a department object by department ID.
  - No authentication required.
  - Example response

  ```json
  {
    "department_id": 1,
    "name": "Regional",
    "description": "Proud of your country? Wear a T-shirt with a national symbol stamp!"
  }
  ```

### Categories

- `GET /category`

  - Returns a categories object.
  - No authentication required.
  - Query parameters
    - Sorting a field. Allowed fields are 'category_id', 'name' `?order=French`
    - Informing the page and starting with 1. (default: 1) `?page=1`
    - Limit per page. (default: 20) `?limit=20`
  - Example response

  ```json
  {
    "count": 7,
    "rows": [
      {
        "category_id": 1,
        "name": "French",
        "description": "The French have always had an eye for beauty. One look at the T-shirts below and you'll see that same appreciation has been applied abundantly to their postage stamps. Below are some of our most beautiful and colorful T-shirts, so browse away! And don't forget to go all the way to the bottom - you don't want to miss any of them!",
        "department_id": 1
      }
    ]
  }
  ```

- `GET /category/:id`

  - Returns a category object by category ID.
  - No authentication required.
  - Example response

  ```json
  {
    "category_id": 1,
    "name": "French",
    "description": "The French have always had an eye for beauty. One look at the T-shirts below and you'll see that same appreciation has been applied abundantly to their postage stamps. Below are some of our most beautiful and colorful T-shirts, so browse away! And don't forget to go all the way to the bottom - you don't want to miss any of them!",
    "department_id": 1
  }
  ```

- `GET /category/product/:id`

  - Returns a categories object by product ID.
  - No authentication required.
  - Example response

  ```json
  [
    {
      "category_id": 1,
      "department_id": 1,
      "name": "French"
    }
  ]
  ```

- `GET /category/department/:id`

  - Returns a categories object by department ID.
  - No authentication required.
  - Example response

  ```json
  [
    {
      "category_id": 1,
      "name": "French",
      "description": "The French have always had an eye for beauty. One look at the T-shirts below and you'll see that same appreciation has been applied abundantly to their postage stamps. Below are some of our most beautiful and colorful T-shirts, so browse away! And don't forget to go all the way to the bottom - you don't want to miss any of them!",
      "department_id": 1
    }
  ]
  ```

### Attributes

- `GET /attribute`

  - Returns a attributes object.
  - No authentication required.
  - Example response

  ```json
  [
    {
      "attribute_id": 1,
      "name": "Size"
    }
  ]
  ```

- `GET /attribute/:id`

  - Returns a attributes object by attribute ID.
  - No authentication required.
  - Example response

  ```json
  [
    {
      "attribute_id": 1,
      "name": "Size"
    }
  ]
  ```

- `GET /attribute/value/:id`

  - Returns a attribute values object by attribute ID.
  - No authentication required.
  - Example response

  ```json
  [
    {
      "attribute_value_id": 1,
      "value": "S"
    }
  ]
  ```

- `GET /attribute/product/:id`

  - Returns a attributes object by product ID.
  - No authentication required.
  - Example response

  ```json
  [
    {
      "attribute_name": "Color",
      "attribute_value_id": 6,
      "attribute_value": "White"
    }
  ]
  ```

### Products

- `GET /product`

  - Returns a products object.
  - No authentication required.
  - Query parameters
    - Inform the page and starting with 1. (default: 1) `?page=1`
    - Limit per page. (default: 20) `?limit=20`
    - Limit of the description. (default: 200) `?description_length=200`
  - Example response

  ```json
  "count": 101,
  "rows": [
      {
          "product_id": 1,
          "name": "Arc d'Triomphe",
          "description": "This beautiful and iconic T-shirt will no doubt lead you to your own triumph.",
          "price": "14.99",
          "discounted_price": "0.00",
          "thumbnail": "arc-d-triomphe-thumbnail.gif"
      }
    ]
  ```

- `GET /product/search`

  - Returns a retrieved product object.
  - No authentication required.
  - Query parameters
    - Query to search. `?query_string=French`
    - Inform the page and starting with 1. (default: 1) `?page=1`
    - Limit per page. (default: 20) `?limit=20`
    - Limit of the description. (default: 200) `?description_length=200`
  - Example response

  ```json
  {
    "count": 101,
    "rows": [
      {
        "product_id": 2,
        "name": "Chartres Cathedral",
        "description": "\"The Fur Merchants\". Not all the beautiful stained glass in the great cathedrals depicts saints and angels! Lay aside your furs for the summer and wear this beautiful T-shirt!",
        "price": "16.95",
        "discounted_price": "15.95",
        "thumbnail": "chartres-cathedral-thumbnail.gif"
      }
    ]
  }
  ```

- `GET /product/:id`

  - Returns a product object by product ID.
  - No authentication required.
  - Example response

  ```json
  {
    "product_id": 2,
    "name": "Chartres Cathedral",
    "description": "\"The Fur Merchants\". Not all the beautiful stained glass in the great cathedrals depicts saints and angels! Lay aside your furs for the summer and wear this beautiful T-shirt!",
    "price": "16.95",
    "discounted_price": "15.95",
    "image": "chartres-cathedral.gif",
    "image_2": "chartres-cathedral-2.gif",
    "thumbnail": "chartres-cathedral-thumbnail.gif",
    "display": 2
  }
  ```

- `GET /product/category/:id`

  - Returns a products object by category ID.
  - No authentication required.
  - Query parameters
    - Inform the page and starting with 1. (default: 1) `?page=1`
    - Limit per page. (default: 20) `?limit=20`
    - Limit of the description. (default: 200) `?description_length=200`
  - Example response

  ```json
  {
    "count": 101,
    "rows": [
      {
        "product_id": 2,
        "name": "Chartres Cathedral",
        "description": "\"The Fur Merchants\". Not all the beautiful stained glass in the great cathedrals depicts saints and angels! Lay aside your furs for the summer and wear this beautiful T-shirt!",
        "price": "16.95",
        "discounted_price": "15.95",
        "thumbnail": "chartres-cathedral-thumbnail.gif"
      }
    ]
  }
  ```

- `GET /product/department/:id`

  - Returns a products object by department ID.
  - No authentication required.
  - Query parameters
    - Inform the page and starting with 1. (default: 1) `?page=1`
    - Limit per page. (default: 20) `?limit=20`
    - Limit of the description. (default: 200) `?description_length=200`
  - Example response

  ```json
  {
    "count": 101,
    "rows": [
      {
        "product_id": 2,
        "name": "Chartres Cathedral",
        "description": "\"The Fur Merchants\". Not all the beautiful stained glass in the great cathedrals depicts saints and angels! Lay aside your furs for the summer and wear this beautiful T-shirt!",
        "price": "16.95",
        "discounted_price": "15.95",
        "thumbnail": "chartres-cathedral-thumbnail.gif"
      }
    ]
  }
  ```

- `GET /product/:id/detail`

  - Returns a product details object by product ID.
  - No authentication required.
  - Example response

  ```json
  {
    "product_id": 2,
    "name": "Chartres Cathedral",
    "description": "\"The Fur Merchants\". Not all the beautiful stained glass in the great cathedrals depicts saints and angels! Lay aside your furs for the summer and wear this beautiful T-shirt!",
    "price": "16.95",
    "discounted_price": "15.95",
    "image": "chartres-cathedral.gif",
    "image2": "chartres-cathedral2.gif"
  }
  ```

- `GET /product/:id/location`

  - Returns a product locations object by product ID.
  - No authentication required.
  - Example response

  ```json
  {
    "category_id": 1,
    "category_name": "French",
    "department_id": 1,
    "department_name": "Regional"
  }
  ```

- `GET /product/:id/review`

  - Returns a product reviews object by product ID.
  - No authentication required.
  - Example response

  ```json
  [
    {
      "name": "Eder Taveira",
      "review": "That's a good product. The best for me.",
      "rating": 5,
      "created_on": "2019-02-17 13:57:29"
    }
  ]
  ```

- `POST /product/:id/review`

  - Returns a created product review object.
  - Authentication required.
  - Required fields: `comment`, `rating`
  - Authentication required.
  - Example response

  ```json
  {
    "name": "Eder Taveira",
    "review": "That's a good product. The best for me.",
    "rating": 5,
    "created_on": "2019-02-17 13:57:29"
  }
  ```

### Customers

- `PUT /customer`

  - Returns a updated customer object.
  - Required fields: `name`, `email`, `password`, `day_phone`, `eve_phone`, `mob_phone`, `credit_card`, `address_1`, `address_2`, `city`, `region`, `postal_code`, `country`, `shipping_region_id`
  - Authentication required.
  - Example response

  ```json
  {
    "customer_id": 1,
    "name": "Karlie Abshire",
    "email": "Eva_Pfeffer@yahoo.com",
    "address_1": "458 Tavares Extensions",
    "address_2": "Apt. 026",
    "city": "Tromptown",
    "region": "ID",
    "postal_code": "04707",
    "country": "Afghanistan",
    "shipping_region_id": 1,
    "day_phone": "338-633-1760",
    "eve_phone": "058-979-9247",
    "mob_phone": "219-113-5933",
    "credit_card": "7071123439818621"
  }
  ```

- `GET /customer`

  - Returns a customer object by token.
  - Authentication required.
  - Example response

  ```json
  {
    "customer_id": 1,
    "name": "Karlie Abshire",
    "email": "Eva_Pfeffer@yahoo.com",
    "address_1": "458 Tavares Extensions",
    "address_2": "Apt. 026",
    "city": "Tromptown",
    "region": "ID",
    "postal_code": "04707",
    "country": "Afghanistan",
    "shipping_region_id": 1,
    "day_phone": "338-633-1760",
    "eve_phone": "058-979-9247",
    "mob_phone": "219-113-5933",
    "credit_card": "7071123439818621"
  }
  ```

- `POST /customer`

  - Registers a customer.
  - Returns a created customer object.
  - Required fields: `name`, `email`, `password`
  - No authentication required.
  - Example response

  ```json
  {
    "customer_id": 1016,
    "name": "Administrator",
    "email": "admin@gmafil.com"
  }
  ```

- `POST /customer/login`

  - Returns a jwt token.
  - Required fields: `email`, `password`
  - No authentication required.
  - Example response

  ```json
  {
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTg4LCJlbWFpbCI6IkRhcGhuZS5TcG9yZXI0NkBob3RtYWlsLmNvbSIsImlhdCI6MTU2MjU1MDQzMSwiZXhwIjoxNTYyNjM2ODMxfQ.KGEDMbeu-z6HCwK_SoJmffz9AfSat5_wnLBw4gyyjdY"
  }
  ```

- `POST /customer/facebook`

  - Redirect to `/customer/facebook/callback/`.
  - Required fields: `access_token`
  - No authentication required.

- `GET /customer/facebook/callback`

  - Redirects to root on success or `/customer/login` on failure.
  - No authentication required.

- `PUT /customer/address`

  - Returns a updated customer object.
  - Required fields: `address_1`, `address_2`, `city`, `region`, `postal_code`, `country`, `shipping_region_id`
  - Authentication required.
  - Example response

  ```json
  {
    "address_1": "458 Tavares Extensions",
    "address_2": "Apt. 026",
    "city": "Tromptown",
    "region": "ID",
    "postal_code": "04707",
    "country": "Afghanistan",
    "shipping_region_id": 1
  }
  ```

- `PUT /customer/credit-card`

  - Returns a updated customer object.
  - Required field: `credit_card`
  - Authentication required.
  - Example response

  ```json
  {
    "credit_card": "7071123439818621"
  }
  ```

### Orders

- `POST /order`

  - Returns a created order object.
  - Required fields: `shipping_id`, `tax_id`
  - Authentication required.
  - Example response

  ```json
  {
    "order_id": 1026,
    "shipping_id": 1,
    "tax_id": 1
  }
  ```

- `GET /order/:id`

  - Returns a order object by order ID.
  - Authentication required.
  - Example response

  ```json
  {
    "order_id": 1,
    "product_id": 1,
    "attributes": "LG, Red",
    "product_name": "Arc d'Triomphe",
    "quantity": 1,
    "subtotal": "14.99"
  }
  ```

- `GET /order/customer`

  - Returns a orders object by token.
  - Authentication required.
  - Example response

  ```json
  {
    "order_id": 988,
    "total_amount": "692.82",
    "created_on": "2019-04-01T16:07:18.000Z",
    "shipped_on": "2018-09-30T10:50:33.000Z",
    "status": 5,
    "comments": "Quidem id ad suscipit at.",
    "customer_id": 734,
    "auth_code": "kEuIAUu_A4",
    "reference": "non laborum pariatur",
    "shipping_id": 1,
    "tax_id": 1
  }
  ```

- `GET /order/detail/:id`

  - Returns a order details object by order ID.
  - Authentication required.
  - Example response

  ```json
  {
    "order_id": 1,
    "total_amount": "79.89",
    "created_on": "2019-04-09T15:22:30.000Z",
    "shipped_on": "2019-01-21T00:32:41.000Z",
    "status": 5,
    "comments": "Similique in rem.",
    "customer_id": 120,
    "auth_code": "fYX4t5oj7A",
    "reference": "est delectus ea",
    "shipping_id": 2,
    "tax_id": 2
  }
  ```

### Shopping cart

- `GET /cart/gen-id`

  - Returns a created cart object.
  - No authentication required.
  - Example response

  ```json
  {
    "item_id": 1038,
    "cart_id": "49132550a18311e98b",
    "add_on": "2019-07-08T04:21:25.030Z"
  }
  ```

- `POST /cart/add`

  - Returns a created carts object.
  - Required fields: `cart_id`, `product_id`, `attributes`
  - No authentication required.
  - Example response

  ```json
  [
    {
      "price": "14.99",
      "subtotal": 14.99,
      "discounted_price": "0.00",
      "discounted_subtotal": 0,
      "name": "Arc d'Triomphe",
      "image": "arc-d-triomphe.gif",
      "item_id": 1039,
      "cart_id": "49132550a18311e98b",
      "product_id": 1,
      "attributes": "lorem ipsum",
      "quantity": 1,
      "add_on": "2019-07-08T04:26:04.000Z",
      "customer_id": 988
    }
  ]
  ```

- `GET /cart/:id`

  - Returns a carts object by cart ID.
  - No authentication required.
  - Example response

  ```json
  [
    {
      "price": "14.99",
      "subtotal": 14.99,
      "discounted_price": "0.00",
      "discounted_subtotal": 0,
      "name": "Arc d'Triomphe",
      "image": "arc-d-triomphe.gif",
      "item_id": 1039,
      "cart_id": "49132550a18311e98b",
      "product_id": 1,
      "attributes": "lorem ipsum",
      "quantity": 1,
      "add_on": "2019-07-08T04:26:04.000Z",
      "customer_id": 988
    }
  ]
  ```

- `PUT /cart/update/:id`

  - Returns a updated cart object by item ID.
  - Required field: `quantity`
  - No authentication required.
  - Example response

  ```json
  {
    "price": "19.99",
    "subtotal": 39.98,
    "discounted_price": "17.99",
    "discounted_subtotal": 35.98,
    "name": "Christmas Seal",
    "image": "christmas-seal.gif",
    "item_id": 1,
    "product_id": 82,
    "attributes": "Color",
    "quantity": 2,
    "add_on": "2019-04-12T02:09:19.000Z",
    "customer_id": 988
  }
  ```

- `DELETE /cart/delete/:id`

  - Deletes a cart object by cart ID.
  - Returns true on success or error on failure.
  - No authentication required.
  - Example response

  ```json
  "successfully deleted cart"
  ```

- `GET /cart/move-to-cart/:id`

  - Returns a moved cart object by item ID.
  - No authentication required.
  - Example response

  ```json
  {
    "item_id": 1,
    "cart_id": "9d201ac0a18511e994",
    "product_id": 82,
    "attributes": "Color",
    "quantity": 1,
    "buy_now": true,
    "add_on": "2019-07-08T04:38:05.000Z",
    "customer_id": 647
  }
  ```

- `GET /cart/total-amount/:id`

  - Returns a cart object by cart ID.
  - No authentication required.
  - Example response

  ```json
  {
    "subtotal": 19.99,
    "discounted_subtotal": 17.99
  }
  ```

- `GET /cart/save-for-later/:id`

  - Returns a cart object by item ID.
  - No authentication required.
  - Example response

  ```json
  {
    "item_id": 1,
    "cart_id": "bc750a20a18511e994",
    "product_id": 82,
    "attributes": "Color",
    "quantity": 1,
    "buy_now": false,
    "add_on": "2019-07-08T04:39:48.000Z",
    "customer_id": 647
  }
  ```

- `GET /cart/get-saved/:id`

  - Returns a carts object by cart ID.
  - No authentication required.
  - Example response

  ```json
  [
    {
      "price": "19.99",
      "discounted_price": "17.99",
      "name": "Christmas Seal",
      "item_id": 1,
      "attributes": "Color",
      "quantity": 1,
      "buy_now": false
    }
  ]
  ```

- `DELETE /cart/remove-product/:id`

  - Deletes a cart object by item ID.
  - Returns true on success or error on failure.
  - No authentication required.
  - Example response

  ```json
  "successfully deleted product"
  ```

### Tax

- `GET /tax`

  - Returns a taxes object
  - No authentication required.
  - Example response

  ```json
  [
    {
      "tax_id": 1,
      "tax_type": "Sales Tax at 8.5%",
      "tax_percentage": "8.50"
    }
  ]
  ```

- `GET /tax/:id`

  - Returns a tax object by tax ID.
  - No authentication required.
  - Example response

  ```json
  {
    "tax_id": 1,
    "tax_type": "Sales Tax at 8.5%",
    "tax_percentage": "8.50"
  }
  ```

### Shipping

- `GET /shipping/region`

  - Returns a shipping regions object.
  - No authentication required.
  - Example response

  ```json
  [
    {
      "shipping_region_id": 1,
      "shipping_region": "Please Select"
    }
  ]
  ```

- `GET /shipping/region/:id`

  - Returns a shipping region objec by shopping region ID.
  - No authentication required.
  - Example response

  ```json
  {
    "shipping_region_id": 1,
    "shipping_region": "Please Select"
  }
  ```

### Payment

- `POST /payment/charge`

  - Receives a front-end payment and create a charge.
  - To get a return value, `stripeToken` should be entered as`tok_visa`.
  - Required fields: `stripeToken`, `stripeEmail`, `shippingId`, `currency`
  - Authentication required.
  - Example response

  ```json
  "successfully completed payment"
  ```

- `POST /payment/webhook`

  - Returns the webhook endpoint object with the secret field populated.
  - Provides a synchronization with front-end.
  - Authentication required.
  - Example response

  ```json
  "successfully webhooks received"
  ```

## Architecture

### Directory structure

```sh
├─assets
├─db
├─middleware
├─routes
└─utils
```

### Utilities

- checkout
- env
- facebook
- generator
- helper
- jwt
- mailer
- response
- validation
- webhook

### Middlewares

- authentication
- cache
- image
- verify jwt
- others
  - cors
  - helmet
  - json
  - body parser
  - logger

### Routes

```js
// index.js
const attribute = require('./attribute');
router.use('/attribute', attribute.routes());

const rotuers = app => {
  app.use(router.routes());
  app.use(router.allowedMethods());
};

module.exports = rotuers;
```

```js
// attribute/index.js
const attributeCtrl = require('./attribute.controller');
attribute.get('/', attributeCtrl.getAttributes);

module.exports = attribute;
```

```js
// attribute/attribute.controller.js
exports.getAttributes = async ctx => {
  try {
    const data = await attribute.findAll();
    ctx.body = successMessage('attributes', data);
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};
```

### Servers

```js
// app.js
const middlewares = require('./middleware');
middlewares(app);

const routers = require('./routes');
routers(app);

const servers = require('./server');
servers(app);
```

### Database

- sequelizerc file
  - `db`디렉토리 외에서도 `sequelize-cli`를 이용하기 위한 세팅

```js
const path = require('path');

module.exports = {
  config: path.join(__dirname + '/src/db/config'),
  'migrations-path': path.join(__dirname, '/src/db/migrations'),
  'seeders-path': path.join(__dirname, '/src/db/seeders'),
  'models-path': path.join(__dirname, '/src/db/models')
};
```

- config

  - `.env`파일에서 정보를 읽어오기 위해 js파일로 변경

- models

```js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const attribute = sequelize.define('attribute', {
    attribute_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(100)
    }
  });
  attribute.associate = function(models) {
    attribute.hasMany(models.attribute_value, {
      foreignKey: 'attribute_id'
    });
  };
  return attribute;
};
```

- migrations
  - migrating data
- seed data
  - generated mock data in `generator.js` file
- seeders

  - populating data

[![](https://res.cloudinary.com/yangeok/image/upload/v1558406432/portfolio/turing-db.jpg)](https://res.cloudinary.com/yangeok/image/upload/v1558406432/portfolio/turing-db.jpg)
