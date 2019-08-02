require('../chai')();
const { request, expect } = require('chai');
const app = require('../request');

let userToken;

describe('Customer', () => {
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

  describe('PUT /customer', () => {
    it('returns a updated customer object', done => {
      request(app)
        .put('/customer')
        .set('Authorization', userToken)
        .send({
          name: 'Karlie Abshire',
          email: 'Eva_Pfeffer@yahoo.com',
          password: 'lN34c5YAElcHDx2',
          day_phone: '338-633-1760',
          eve_phone: '058-979-9247',
          mob_phone: '219-113-5933',
          credit_card: 7071123439818621,
          address_1: '458 Tavares Extensions',
          address_2: 'Apt. 026',
          city: 'Tromptown',
          region: 'ID',
          postal_code: '04707',
          country: 'Afghanistan',
          shipping_region_id: 1
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /customer', () => {
    it('returns a customer object by token', done => {
      request(app)
        .get('/customer')
        .set('Authorization', userToken)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('POST /customer', () => {
    before(() => {});
    context('when sent data is ok', () => {
      it('registers a customer', done => {
        request(app)
          .post('/customer')
          .send({
            email: 'wooky92@naver.com',
            password: '12345678qQ!'
          })
          .end((err, res) => {
            expect(err).to.be.null;
            // expect(res).to.have.status(200);
            expect(res).to.be.an('object');
            done();
          });
      });
    });
  });

  describe('POST /customer/login', () => {});
  describe('GET /customer/facebook', () => {});
  describe('GET /customer/facebook/callback', () => {});
  describe('PUT /customer/address', () => {});
  describe('PUT /customer/credit-card', () => {});
});
