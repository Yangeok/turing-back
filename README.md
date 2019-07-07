# Turing-Backend ![](https://api.travis-ci.org/Yangeok/turing-back.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/github/Yangeok/turing-back/badge.svg?branch=master)](https://coveralls.io/github/Yangeok/turing-back?branch=master)

## Contents

- [Installation](#Installation)
- [Running test](#Running-test)
- [Endpoints](#Endpoints)
- [References](#References)
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

  - Returns departments object.
  - No authentication required.
  - No parameters required.
  - Example response

  ```json

  ```

- `GET /department/:id`

  - Returns a department object by ID.
  - No authentication required.
  - Example response

  ```json

  ```

### Categories

- `GET /category`

  - Returns categories object.
  - No authentication required.
  - Query parameters
    - Sorting a field. Allowed fields are 'category_id', 'name' `?order=French`
    - Informing the page and starting with 1. (default: 1) `?page=1`
    - Limit per page. (default: 20) `?limit=20`
  - Example response

  ```json

  ```

- `GET /category/:id`

  - Returns a category object by ID.
  - No authentication required.
  - Example response

  ```json

  ```

- `GET /category/product/:id`

  - Returns categories object by product ID.
  - No authentication required.
  - Example response

  ```json

  ```

- `GET /category/department/:id`

  - Returns categories object by department ID.
  - No authentication required.
  - Example response

  ```json

  ```

### Attributes

- `GET /attribute`

  - Returns attributes object.
  - No authentication required.
  - Example response

  ```json

  ```

- `GET /attribute/:id`

  - Returns a attribute object by ID.
  - No authentication required.
  - Example response

  ```json

  ```

- `GET /attribute/value/:id`

  - Returns attribute values object by attribute ID.
  - No authentication required.
  - Example response

  ```json

  ```

- `GET /attribute/product/:id`

  - Returns attributes object by product ID.
  - No authentication required.
  - Example response

  ```json

  ```

### Products

- `GET /product`

  - Returns products object.
  - No authentication required.
  - Example response

  ```json

  ```

- `GET /product/search`

  - Returns the retrieved product object
  - No authentication required.
  - Query parameters
    - Query to search. `?query_string=French`
    - All words or no. (default: on) `?all_words=on`
    - Inform the page and starting with 1. (default: 1) `?page=1`
    - Limit per page. (default: 20) `?limit=20`
    - Limit of the description. (default: 200) `?description_length=200`
  - Example response

  ```json

  ```

- `GET /product/:id`

  - Returns product object by ID.
  - No authentication required.
  - Example response

  ```json

  ```

- `GET /product/category/:id`

  - Returns products object by category ID.
  - No authentication required.
  - Query parameters
    - Inform the page and starting with 1. (default: 1) `?page=1`
    - Limit per page. (default: 20) `?limit=20`
    - Limit of the description. (default: 200) `?description_length=200`
  - Example response

  ```json

  ```

- `GET /product/department/:id`

  - Returns products object by department ID.
  - No authentication required.
  - Query parameters
    - Inform the page and starting with 1. (default: 1) `?page=1`
    - Limit per page. (default: 20) `?limit=20`
    - Limit of the description. (default: 200) `?description_length=200`
  - Example response

  ```json

  ```

- `GET /product/:id/detail`

  - Returns product details object by product ID.
  - No authentication required.
  - Example response

  ```json

  ```

- `GET /product/:id/location`

  - Returns product locations object by product ID.
  - No authentication required.
  - Example response

  ```json

  ```

- `GET /product/:id/review`

  - Returns product reviews object by product ID.
  - No authentication required.
  - Example response

  ```json

  ```

- `POST /product/:id/review`

  - Returns a created product review object.
  - Authentication required.
  - Example request body

  ```json

  ```

  - Required fields: `comment`, `rating`
  - Authentication required.
  - Example response

  ```json

  ```

### Customers

- `PUT /customer`

  - Returns a updated customer object.
  - Required fields: `name`, `email`, `password`, `day_phone`, `eve_phone`, `mob_phone`, `credit_card`, `address_1`, `address_2`, `city`, `region`, `postal_code`, `country`, `shipping_region_id`
  - Authentication required.
  - Example response

  ```json

  ```

- `GET /customer`

  - Returns a customer object by ID.
  - Authentication required.
  - Example response

  ```json

  ```

- `POST /customer`

  - Returns a customer object by token.
  - Required fields: `name`, `email`, `password`
  - No authentication required.
  - Example response

  ```json

  ```

- `POST /customer/login`

  - Returns a token.
  - Required fields: `email`, `password`
  - No authentication required.
  - Example response

  ```json

  ```

- `POST /customer/facebook`

  - Returns
  - Required fields: `access_token`
  - No authentication required.
  - Example response

  ```json

  ```

- `GET /customer/facebook/callback`

  - No authentication required.
  - Example response

  ```json

  ```

- `PUT /customer/address`

  - Authentication required.
  - Example response

  ```json

  ```

- `PUT /customer/credit-card`

  - Authentication required.
  - Example response

  ```json

  ```

### Orders

- `POST /order`

  - Example request body

  ```json

  ```

  - Required fields:
  - Authentication required.
  - Example response

  ```json

  ```

- `GET /order/customer`

  - Authentication required.
  - Example response

  ```json

  ```

- `GET /order/detail/:id`

  - Authentication required.
  - Example response

  ```json

  ```

- `GET /order/:id`

  - Authentication required.
  - Example response

  ```json

  ```

### Shopping cart

- `GET /cart/gen-id`

  - No authentication required.
  - Example response

  ```json

  ```

- `POST /cart/add`

  - Example request body

  ```json

  ```

  - Required fields:
  - No authentication required.
  - Example response

  ```json

  ```

- `GET /cart/:id`

  - No authentication required.
  - Example response

  ```json

  ```

- `PUT /cart/update/:id`

  - No authentication required.
  - Example response

  ```json

  ```

- `DELETE /cart/delete/:id`

  - No authentication required.
  - Example response

  ```json

  ```

- `GET /cart/move-to-cart/:id`

  - No authentication required.
  - Example response

  ```json

  ```

- `GET /cart/save-for-later/:id`

  - No authentication required.
  - Example response

  ```json

  ```

- `GET /cart/get-saved/:id`

  - No authentication required.
  - Example response

  ```json

  ```

- `DELETE /cart/remove-product/:id`

  - No authentication required.
  - Example response

  ```json

  ```

### Tax

- `GET /tax`

  - No authentication required.
  - Example response

  ```json

  ```

- `GET /tax/:id`

  - No authentication required.
  - Example response

  ```json

  ```

### Shipping

- `GET /shipping/region`

  - No authentication required.
  - Example response

  ```json

  ```

- `GET /shipping/region/:id`

  - No authentication required.
  - Example response

  ```json

  ```

### Payment

- `POST /payment/charge`

  - Example request body

  ```json

  ```

  - Required fields:
  - Authentication required.
  - Example response

  ```json

  ```

- `POST /payment/webhook`

  - Example request body

  ```json

  ```

  - Required fields:
  - Authentication required.
  - Example response

  ```json

  ```

## References

- [koa-pagination](https://github.com/uphold/koa-pagination)
- [koa error-handling](https://github.com/koajs/koa/blob/master/docs/error-handling.md)

## Architecture

- 폴더나 파일구조 자세하게 작성하기 :)
- 미들웨어 구조도 여기다가 말해주자
- 적으면서 개똥코드도 같이 정돈해보기

## Database

[![](https://res.cloudinary.com/yangeok/image/upload/v1558406432/portfolio/turing-db.jpg)](https://res.cloudinary.com/yangeok/image/upload/v1558406432/portfolio/turing-db.jpg)
