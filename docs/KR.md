# 튜링-백엔드 ![](https://api.travis-ci.org/Yangeok/turing-back.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/github/Yangeok/turing-back/badge.svg?branch=master)](https://coveralls.io/github/Yangeok/turing-back?branch=master)

## 목차

- 언어
  - [영어(English)](../README.md)
  - [한국어](/KR.md)
- [설치](#설치)
- [테스트](#테스트)
- [엔드포인트](#엔드포인트)
  - [부문](#부문)
  - [카테고리](#카테고리)
  - [상품 옵션](#상품-옵션)
  - [상품](#상품)
  - [사용자](#사용자)
  - [주문](#주문)
  - [세금](#세금)
  - [배송](#배송)
  - [결제](#결제)
  - [카트](#카트)
- [아키텍쳐](#아키텍쳐)
  - [디렉토리 구조](#디렉토리-구조)
  - [유틸리티](#유틸리티)
  - [미들웨어](#미들웨어)
  - [라우터](#라우터)
  - [서버](#서버)
  - [데이터베이스](#데이터베이스)

## 설치

- [Node.js](https://nodejs.org/en/), [MySQL](https://www.mysql.com/downloads/)가 설치되어 있어야합니다.
- [저장소](https://github.com/Yangeok/turing-back)를 클론하세요.
- `cd turing-back`를 통해 프로젝트 디렉토리로 이동하세요.
- 터미널에서 의존성 모듈을 `yarn`을 통해 설치하세요.
- 루트 디렉토리에 있는 `.env.example`을 `.env`으로 파일명을 변경하고 페이스북 앱과 스트라이프에 관한 변수를 입력하세요.
- `yarn db:create`을 통해 MySQL 데이터베이스를 만드세요.
- `yarn migrate`을 통해 테이블 마이그레이션을 하세요.
- `cd src/utils && node generator && yarn seed`을 통해 페이크데이터를 생성하고 데이터 마이그레이션을 하세요.
- `yarn start`을 통해 배포모드로 서버를 실행하거나 `yarn start:dev`로 개발모드로 실행하세요.

## 테스트

- `yarn coveralls`
- `yarn test`을 통해 테스트를 하세요.

## 엔드포인트

### 부문

- `GET /department`

  - departments 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 파라미터가 필요하지 않습니다.
  - 예제 응답

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

  - department ID별 department 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 예제 응답

  ```json
  {
    "department_id": 1,
    "name": "Regional",
    "description": "Proud of your country? Wear a T-shirt with a national symbol stamp!"
  }
  ```

### 카테고리

- `GET /category`

  - categories 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 쿼리 파라미터
    - 'category_id', 'name' 필드로 객체를 정렬합니다 `?order=French`
    - 페이지를 알려주고 1로 시작합니다. (기본값: 1) `?page=1`
    - 페이지당 리미트. (기본값: 20) `?limit=20`
  - 예제 응답

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

  - category ID별 category 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 예제 응답

  ```json
  {
    "category_id": 1,
    "name": "French",
    "description": "The French have always had an eye for beauty. One look at the T-shirts below and you'll see that same appreciation has been applied abundantly to their postage stamps. Below are some of our most beautiful and colorful T-shirts, so browse away! And don't forget to go all the way to the bottom - you don't want to miss any of them!",
    "department_id": 1
  }
  ```

- `GET /category/product/:id`

  - product ID별 categories 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 예제 응답

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

  - department ID별 categories 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 예제 응답

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

### 상품 옵션

- `GET /attribute`

  - attributes 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 파라미터가 필요하지 않습니다.
  - 예제 응답

  ```json
  [
    {
      "attribute_id": 1,
      "name": "Size"
    }
  ]
  ```

- `GET /attribute/:id`

  - attribute ID별 attributes 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 예제 응답

  ```json
  [
    {
      "attribute_id": 1,
      "name": "Size"
    }
  ]
  ```

- `GET /attribute/value/:id`

  - attribute ID별 attribute values 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 예제 응답

  ```json
  [
    {
      "attribute_value_id": 1,
      "value": "S"
    }
  ]
  ```

- `GET /attribute/product/:id`

  - product ID별 attributes 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 예제 응답

  ```json
  [
    {
      "attribute_name": "Color",
      "attribute_value_id": 6,
      "attribute_value": "White"
    }
  ]
  ```

### 상품

- `GET /product`

  - products 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 파라미터가 필요하지 않습니다.
  - 쿼리 파라미터
    - 페이지를 알려주고 1로 시작합니다. (기본값: 1) `?page=1`
    - 페이지당 리미트. (기본값: 20) `?limit=20`
    - 설명 글자 리미트. (기본값: 200) `?description_length=200`
  - 예제 응답

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

  - 검색된 product 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 쿼리 파라미터
    - 검색 쿼리. `?query_string=French`
    - 페이지를 알려주고 1로 시작합니다. (기본값: 1) `?page=1`
    - 페이지당 리미트. (기본값: 20) `?limit=20`
    - 설명 글자 리미트. (기본값: 200) `?description_length=200`
  - 예제 응답

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

  - product ID별 product 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 예제 응답

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

  - category ID별 products 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 쿼리 파라미터
    - 페이지를 알려주고 1로 시작합니다. (기본값: 1) `?page=1`
    - 페이지당 리미트. (기본값: 20) `?limit=20`
    - 설명 글자 리미트. (기본값: 200) `?description_length=200`
  - 예제 응답

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

  - department ID별 products 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 쿼리 파라미터
    - 페이지를 알려주고 1로 시작합니다. (기본값: 1) `?page=1`
    - 페이지당 리미트. (기본값: 20) `?limit=20`
    - 설명 글자 리미트. (기본값: 200) `?description_length=200`
  - 예제 응답

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

  - product ID별 product details 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 예제 응답

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

  - product ID별 product locations 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 예제 응답

  ```json
  {
    "category_id": 1,
    "category_name": "French",
    "department_id": 1,
    "department_name": "Regional"
  }
  ```

- `GET /product/:id/review`

  - product ID별 product reviews 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 예제 응답

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

  - 생성된 product review 객체를 반환합니다.
  - 필수 입력사항: `comment`, `rating`
  - 인증이 필요합니다.
  - 예제 응답

  ```json
  {
    "name": "Eder Taveira",
    "review": "That's a good product. The best for me.",
    "rating": 5,
    "created_on": "2019-02-17 13:57:29"
  }
  ```

### 사용자

- `PUT /customer`

  - 업데이트된 customer 객체를 반환합니다.
  - 필수 입력사항: `name`, `email`, `password`, `day_phone`, `eve_phone`, `mob_phone`, `credit_card`, `address_1`, `address_2`, `city`, `region`, `postal_code`, `country`, `shipping_region_id`
  - 인증이 필요합니다.
  - 예제 응답

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

  - 토큰별 customer 객체를 반환합니다.
  - 인증이 필요합니다.
  - 예제 응답

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

  - 사용자를 등록합니다.
  - 생성된 customer 객체를 반환합니다.
  - 필수 입력사항: `name`, `email`, `password`
  - 인증이 필요하지 않습니다.
  - 예제 응답

  ```json
  {
    "customer_id": 1016,
    "name": "Administrator",
    "email": "admin@gmafil.com"
  }
  ```

- `POST /customer/login`

  - jwt 토큰을 반환합니다.
  - 필수 입력사항: `email`, `password`
  - 인증이 필요하지 않습니다.
  - 예제 응답

  ```json
  {
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTg4LCJlbWFpbCI6IkRhcGhuZS5TcG9yZXI0NkBob3RtYWlsLmNvbSIsImlhdCI6MTU2MjU1MDQzMSwiZXhwIjoxNTYyNjM2ODMxfQ.KGEDMbeu-z6HCwK_SoJmffz9AfSat5_wnLBw4gyyjdY"
  }
  ```

- `POST /customer/facebook`

  - `/customer/facebook/callback/`로 리디렉트합니다.
  - 필수 입력사항: `access_token`
  - 인증이 필요하지 않습니다.

- `GET /customer/facebook/callback`

  - 성공시 루트페이지로 실패시 `/customer/login`로 리디렉트합니다.
  - 인증이 필요하지 않습니다.
  - 파라미터가 필요하지 않습니다.

- `PUT /customer/address`

  - 업데이트된 customer 객체를 반환합니다.
  - 필수 입력사항: `address_1`, `address_2`, `city`, `region`, `postal_code`, `country`, `shipping_region_id`
  - 인증이 필요합니다.
  - 예제 응답

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

  - 업데이트된 customer 객체를 반환합니다.
  - Required field: `credit_card`
  - 인증이 필요합니다.
  - 예제 응답

  ```json
  {
    "credit_card": "7071123439818621"
  }
  ```

### 주문

- `POST /order`

  - 생성된 order 객체를 반환합니다.
  - 필수 입력사항: `shipping_id`, `tax_id`
  - 인증이 필요합니다.
  - 예제 응답

  ```json
  {
    "order_id": 1026,
    "shipping_id": 1,
    "tax_id": 1
  }
  ```

- `GET /order/:id`

  - order ID별 a order 객체를 반환합니다.
  - 인증이 필요합니다.
  - 예제 응답

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

  - 토큰별 orders 객체를 반환합니다.
  - 인증이 필요합니다.
  - 예제 응답

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

  - order ID별 order details 객체를 반환합니다.
  - 인증이 필요합니다.
  - 예제 응답

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

### 카트

- `GET /cart/gen-id`

  - 생성된 cart 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 파라미터가 필요하지 않습니다.
  - 예제 응답

  ```json
  {
    "item_id": 1038,
    "cart_id": "49132550a18311e98b",
    "add_on": "2019-07-08T04:21:25.030Z"
  }
  ```

- `POST /cart/add`

  - 생성된 carts 객체를 반환합니다.
  - 필수 입력사항: `cart_id`, `product_id`, `attributes`
  - 인증이 필요하지 않습니다.
  - 예제 응답

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

  - cart ID별 carts 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 예제 응답

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

  - item ID별 업데이트된 cart 객체를 반환합니다.
  - Required field: `quantity`
  - 인증이 필요하지 않습니다.
  - 예제 응답

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

  - cart ID별 cart를 삭제합니다.
  - 성공시 true를 실패시 error를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 예제 응답

  ```json
  "successfully deleted cart"
  ```

- `GET /cart/move-to-cart/:id`

  - item ID별 옮겨진 cart 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 예제 응답

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

  - cart ID별 cart 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 예제 응답

  ```json
  {
    "subtotal": 19.99,
    "discounted_subtotal": 17.99
  }
  ```

- `GET /cart/save-for-later/:id`

  - item ID별 cart 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 예제 응답

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

  - cart ID별 carts 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 예제 응답

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

  - item ID별 cart를 삭제합니다.
  - 성공시 true를 실패시 error를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 예제 응답

  ```json
  "successfully deleted product"
  ```

### 세금

- `GET /tax`

  - taxes 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 파라미터가 필요하지 않습니다.
  - 예제 응답

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

  - tax ID별 tax 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 예제 응답

  ```json
  {
    "tax_id": 1,
    "tax_type": "Sales Tax at 8.5%",
    "tax_percentage": "8.50"
  }
  ```

### 배송

- `GET /shipping/region`

  - shipping regions 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 파라미터가 필요하지 않습니다.
  - 예제 응답

  ```json
  [
    {
      "shipping_region_id": 1,
      "shipping_region": "Please Select"
    }
  ]
  ```

- `GET /shipping/region/:id`

  - shopping region ID별 shipping region 객체를 반환합니다.
  - 인증이 필요하지 않습니다.
  - 예제 응답

  ```json
  {
    "shipping_region_id": 1,
    "shipping_region": "Please Select"
  }
  ```

### 결제

- `POST /payment/charge`

  - 프론트엔드에서 결제를 받고 처리합니다.
  - Stripe 테스트 모드에서 리턴값을 받기 위해서는 `stripeToken` 값은 `tok_visa`로 입력해주어야 합니다.
  - 필수 입력사항: `stripeToken`, `stripeEmail`, `shippingId`, `currency`
  - 인증이 필요합니다.
  - 예제 응답

  ```json
  "successfully completed payment"
  ```

- `POST /payment/webhook`

  - 비밀 객체로 된 웹훅 엔드포인트 객체를 반환합니다.
  - 프론트엔드와의 동기화를 제공합니다.
  - 인증이 필요합니다.
  - 예제 응답

  ```json
  "successfully webhooks received"
  ```

## 아키텍쳐

### 디렉토리 구조

- assets
  - 가공되지 않은 데이터들과 이미지 파일이 있는 디렉토리입니다.
- db
  - mysql을 바인딩시켜주는 orm sequelize 설정과 모델 및 페이크 데이터가 있는 디렉토리입니다.
- middleware
  - koa서버에서 사용하는 미들웨어가 있는 디렉토리입니다.
- routes
  - 라우터가 있는 디렉토리입니다.
- utils
  - 헬퍼 함수들이 있는 디렉토리입니다.

### 유틸리티

- checkout
  - 스트라이프 결제를 하는 함수가 있습니다.
- env
  - 포트, 호스트명을 관리하는 파일입니다.
- facebook
  - 페이스북 로그인을 하기위한 설정이 있습니다.
- generator
  - 페이크 데이터를 만들기 위한 함수가 있습니다.
  - 파일을 실행하면 함수가 자동으로 실행되 mock-data가 `db/seed-data/`에 생성됩니다.
- helper
  - `generator.js`에서 데이터를 생성할때 사용하는 함수가 있습니다.
- jwt
  - jwt를 생성, 검증하기 위해 필요한 함수가 있습니다.
- mailer
  - 스트라이프 결제가 끝나면 메일링을 하기 위한 함수가 있습니다.
- response
  - 에러 처리를 하기 위한 함수가 있습니다.
- validation
  - 사용자 정보를 검증하기 위한 함수가 있습니다.
- webhook
  - 스트라이프 계정에 일어난 이벤트를 알려주는 웹훅 함수가 있습니다.
    - 결제청구나 환불같은 스트라이프 요청 결과를 동기적으로 만들어낼 수 있습니다.
    - 별도의 검증과정은 요청하지 않습니다.

### 미들웨어

- authentication
  - [session](https://www.npmjs.com/package/koa-session)과 [passport](https://www.npmjs.com/package/koa-passport)를 사용한 타사 로그인을 사용하기 위한 기능들이 있습니다.
- cache
  - [etag](https://www.npmjs.com/package/koa-etag)를 사용한 http캐싱을 사용하기 위한 기능들이 있습니다.
- verify jwt
  - [jwt](https://www.npmjs.com/package/jsonwebtoken)를 사용한 로컬 로그인을 사용하기 위한 기능들이 있습니다.
- others
  - [cors](https://www.npmjs.com/package/koa2-cors)
    - 본 서버와 프론트엔드 서버가 통신하기 위해 크로스사이트 http 요청에 응답할 수 있게 하기위한 설정이 있습니다.
  - [helmet](https://www.npmjs.com/package/koa-helmet)
    - 본 서버를 보호하기 위한 http 헤더 설정이 있습니다.
  - [json](https://www.npmjs.com/package/koa-json)
    - response body를 예쁘게 출력하는 설정이 있습니다.
  - [body parser](https://www.npmjs.com/package/koa-body)
    - request body의 파라미터를 편하게 추출하는 설정이 있습니다.
  - [logger](https://www.npmjs.com/package/koa-logger)
    - 개발용 로거 설정이 있습니다.

### 라우터

- [라우트 모듈화](https://backend-intro.vlpt.us/1/04.html#%EB%9D%BC%EC%9A%B0%ED%8A%B8-%EB%AA%A8%EB%93%88%ED%99%94)에서 영감을 받아 객체로 상속하는 라우터구조를 만들었습니다. 라우터 안에 컨트롤러를 같이 작성했습니다.

- index.js

  ```js
  const attribute = require('./attribute');
  router.use('/attribute', attribute.routes());

  const rotuers = app => {
    app.use(router.routes());
    app.use(router.allowedMethods());
  };

  module.exports = rotuers;
  ```

- attribute/index.js

  ```js
  const attributeCtrl = require('./attribute.controller');
  attribute.get('/', attributeCtrl.getAttributes);

  module.exports = attribute;
  ```

- attribute/attribute.controller.js

  ```js
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

### 서버

- app.js

  ```js
  const middlewares = require('./middleware');
  middlewares(app);

  const routers = require('./routes');
  routers(app);

  const servers = require('./server');
  servers(app);
  ```

### 데이터베이스

[![](https://res.cloudinary.com/yangeok/image/upload/v1562823903/turing/turing_model-1.jpg)](https://res.cloudinary.com/yangeok/image/upload/v1562823903/turing/turing_model-1.jpg)

- sequelizerc file

  - `db`디렉토리 외에서도 `sequelize-cli`를 이용한 명령어를 사용하기 위한 세팅입니다.

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

  - `.env` 파일에서 환경 변수를 읽을 수 있도록 js 파일로 변경했습니다.

- models

  ```js
  'use strict';
  module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('model', {
      (...)
    });
    model.associate = function(models) {
      (...)
    };
    return model;
  };
  ```

- migrations

  ```js
  'use strict';
  module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('model', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        (...)
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('model');
    }
  };
  ```

- seed data
  - [raw sql](https://github.com/zandoan/turing-backend/blob/master/database/tshirtshop.sql)에 있는 데이터는 복사해서 `assets/mock-data.js`에 모았으며, 나머지 데이터는 [faker](https://www.npmjs.com/package/faker)를 통해 생성했습니다. 이 데이터를 모아서 `utils/generator.js`에서 실행하면 seeders에서 바로 사용가능한 중첩된 배열을 `db/seed-data/`에 파일단위로 생성합니다. 각각의 파일들을 `db/seeders/`에서 require해서 사용할 수 있습니다.
- seeders

  ```js
  'use strict';
  const { model } = require('../seed-data');

  module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('model', model);
    },

    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('model', null, {});
    }
  };
  ```
