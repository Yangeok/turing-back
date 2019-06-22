const faker = require('faker');
const fs = require('fs');
const { fsErrorMessage } = require('./response');

const writeReviewObj = () => {
  const reviewLength = 3030;
  const productLength = 30;

  const createDatetime = () => {
    const date = JSON.stringify(faker.date.past());
    return date
      .replace('"', '')
      .replace('"', '')
      .replace('T', ' ')
      .replace('Z', '');
  };

  const mappedReview = Array(reviewLength)
    .fill(0)
    .map((_, index) => ({
      review_id: index + 1,
      product_id: Math.ceil((index + 1) / productLength),
      customer_id: faker.random.number({ min: 1, max: 1000 }),
      review: faker.lorem.sentences(),
      rating: faker.random.number({ min: 1, max: 100 }),
      created_on: createDatetime()
    }));

  const stringifiedReview = JSON.stringify(mappedReview);
  fs.writeFile('./review.js', `exports.review = ${stringifiedReview}`, err =>
    fsErrorMessage(err)
  );
};

writeReviewObj();
