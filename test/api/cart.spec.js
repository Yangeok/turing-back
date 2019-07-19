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
      request(app).post('/cart/add');
    });
  });
});
