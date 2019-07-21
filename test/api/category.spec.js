require('../chai')();
const { request, expect } = require('chai');
const app = require('../request');

describe('Category', () => {
  describe('GET /category', () => {
    it('returns a categories object', done => {
      request(app)
        .get('/category')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /category/:id', () => {
    it('returns a category object by category ID', done => {
      request(app)
        .get('/category/1')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /category/product/:id', () => {
    it('returns a categories object by product ID', done => {
      request(app)
        .get('/category/product/1')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });
  describe('GET /category/department/:id', () => {
    it('returns a categories object by department ID', done => {
      request(app)
        .get('/category/department/1')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });
});
