# Turing-Backend ![](https://api.travis-ci.org/Yangeok/turing-back.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/github/Yangeok/turing-back/badge.svg?branch=master)](https://coveralls.io/github/Yangeok/turing-back?branch=master)

## Core features

- 메모리 캐싱
- 온라인 배포하기
- 문서화하기

## Requirement

- 루트 페이지에 모든 아이템 보여주기 🗸
- 선택된 카테고리와 품목관에 대한 아이템 보여주기 🗸
- 검색박스를 이용해 아이템 검색하기 🗸
- 페이지네이션 구현하기 🗸
- 특정 아이템 선택하면 디테일 보여주기 🗸
- 소셜로그인/로컬폼으로 가입/로그인 추가하기 🗸
- 장바구니에 아이템 추가하기 🗸
- 유저 프로필 변경기능 추가하기 🗸
- 서드파티 페이 기능 추가하기 🗸
- 주문시 메일링 기능 추가하기
- 관리자 기능 추가하기
- 품목관 CRUD 🗸
- 카테고리 CRUD 🗸
- 상품 CRUD 🗸
- 상품 특징 CRUD 🗸
- 오래된 장바구니 비우는 기능 추가하기

## Installation

- Install Node.js, MySQL
- Clone this repository
- Navigate to the project directory `cd turing-back`
- Run `yarn` on the terminal to install dependencies
- Change the filename `.env.example` to `.env` in your root dirrectory
- Create MySQL database and run migrations `yarn db:create && yarn db:migrate`
- Generate mock data to seed to dabase `cd src/utils && node generator`
- Start server `yarn start` to connect to production mode or `yarn start:dev` to development

## Running test

- Run the command `yarn test` to run the test

## Endpoints

### Singup

`POST /customer/signup`

- Example request body

  ```json
  {
    "name": "Test User",
    "email": "example@example.com",
    "password": "12345678qQ!"
  }
  ```

- No authentication required, returns a user
- Required fields: `name`, `email`, `password`

### Login

`POST /customer/login`

- Example request body

  ```json
  {
    "email": "example@example.com",
    "password": "12345678qQ!"
  }
  ```

- No authentication required, returns a user
- Required fields: `email`, `password`

### Get all departments

`GET /department`

- No authentication required, returns departments object

`GET /department/:id`

- No authentication required, returns department object (by department id)

### Get all items

`GET /product`

- Query parameters

  - Filter by deparment  
     `?department_name=Regional`

  - Filter by department and category
    `?deparment_name=Regional&category_name=french`

  - Filter by page, limit and offset (default page=1, limit=10, offset=0)  
    `?page=1&limit=10&offset=10`

- No authentication required, returns a default of 10 items per page

### Search items

`Get /product/search`

- Query parameters

  `?term=love`

- No authentication required, returns specific items

### Get a single item

`GET /product/:id`

- No authentication required, returns a single item object

### Add item to shopping cart

`POST /cart`

- Example request body

  ```json

  ```

- Authentication required, returns shopping cart object

### Get customer's items in the shopping cart

`GET /cart`

- Authentication required, returns shopping cart object

### Update the quantity of an item in the shopping cart

`PUT /cart/:id`

- Example request body

  ```json

  ```

- Authentication required, returns updated shopping cart object

### Delete an item in the shopping cart

`DELETE /cart/:id`

- Authentication required, deletes an item from the shopping cart

### Get user profile

`GET /profile`

- Authentication required, returns an user object

### Update user profile

`PUT /profile`

- Example request body

  ```json

  ```

- Authentication required, returns an updated user object

## References

- [agatapouglof](https://github.com/Yangeok/turinb-back-ref-01)
- [cwizard2011](https://github.com/Yangeok/turinb-back-ref-02)
- [renancunha](https://github.com/Yangeok/turing-back-ref-03)
- [Onyedikachi](https://github.com/Yangeok/turing-back-ref-04)
- [kylejeske](https://github.com/Yangeok/turing-back-ref-06)
- [nirajgeorgian](https://github.com/Yangeok/turing-back-ref-07)

- [koa-pagination](https://github.com/uphold/koa-pagination)
- [koa error-handling](https://github.com/koajs/koa/blob/master/docs/error-handling.md)

## Database structure

[![](https://res.cloudinary.com/yangeok/image/upload/v1558406432/portfolio/turing-db.jpg)](https://res.cloudinary.com/yangeok/image/upload/v1558406432/portfolio/turing-db.jpg)
