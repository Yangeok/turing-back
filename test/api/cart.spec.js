require('../chai')();
const { request, expect } = require('chai');
const app = require('../request');

let userToken;

describe('Cart', () => {
  before(done => {
    request(app)
      .post('/customer/login')
      .send({
        email: 'Eva_Pfeffer@yahoo.com',
        password: 'lN34c5YAElcHDx2'
      })
      .end((err, res) => {
        userToken = res.body.customer.token;
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        done();
      });
  });

  describe('GET /gen-id', () => {
    it('returns a created cart object', done => {
      request(app)
        .get('/cart/gen-id')
        .end((err, res) => {
          expect(err).to.be.null;
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
        .set('Authorization', userToken)
        .send({
          cart_id: '5e83b19fffcc412687',
          product_id: 1,
          attributes: 'lorem ipsum'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /cart/:id', () => {
    it('returns a carts object by cart ID', done => {
      request(app)
        .get('/cart/5e83b19fffcc412687')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('PUT /cart/update/:id', () => {
    it('returns a updated cart object by item ID', done => {
      request(app)
        .put('/cart/update/1')
        .send({
          quantity: 1
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('DELETE /cart/delete/:id', () => {
    // it('deletes a cart by cart ID', done => {
    //     request(app)
    //       .delete('cart/delete/5e83b19fffcc412687')
    //       .end((err, res) => {
    //         expect(err).to.be.null;
    //         expect(res).to.have.status(200);
    //         expect(res).to.be.an('string');
    //         done();
    //       });
    // });
  });

  describe('GET /cart/move-to-cart/:id', () => {
    it('returns a moved cart object by item ID', done => {
      request(app)
        .get('/cart/move-to-cart/1')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /cart/total-amount/:id', () => {
    it('returns a cart object by cart ID', done => {
      request(app)
        .get('/cart/total-amount/5e83b19fffcc412687')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /cart/save-for-later/:id', () => {
    it('returns a cart object by item ID', done => {
      request(app)
        .get('/cart/save-for-later/1')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /cart/get-saved/:id', () => {
    it('returns a carts object by cart ID', done => {
      request(app)
        .get('/cart/get-saved/5e83b19fffcc412687')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('DELETE /cart/remove-product/:id', () => {
    // it('deletes a cart by item ID', done => {
    //     request(app)
    //       .delete('cart/remove-product/1')
    //       .end((err, res) => {
    //         expect(err).to.be.null;
    //         expect(res).to.have.status(200);
    //         expect(res).to.be.an('string');
    //         done();
    //       });
    // });
  });
});
