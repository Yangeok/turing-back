require('../chai')();
const { request, expect } = require('chai');
const app = require('../request');

describe('Cart', () => {
  describe('GET /gen-id', () => {
    it('returns a created cart object', done => {
      request(app)
        .get('/cart/gen-id')
        .end((err, res) => {
          expect(err).to.be.a.null;
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('POST /cart/add', () => {
    it('returns a created carts object', done => {
      request(app)
        .post('/cart/add')
        .send({
          cart_id: '5e83b19fffcc412687',
          product_id: 1,
          attributes: 'lorem ipsum'
        })
        .end((err, res) => {
          expect(err).to.be.a.null;
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /cart/:id', () => {});
  describe('PUT /cart/update/:id', () => {});
  describe('DELETE /cart/delete/:id', () => {});
  describe('GET /cart/move-to-cart/:id', () => {});
  describe('GET /cart/total-amount/:id', () => {});
  describe('GET /cart/save-for-later/:id', () => {});
  describe('GET /cart/get-saved/:id', () => {});
  describe('DELETE /cart/remove-product/:id', () => {});
});
