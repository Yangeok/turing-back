require('../chai')();
const { request, expect } = require('chai');
const app = require('../request');

describe('Attribute', () => {
  describe('GET /attribute', () => {
    it('returns a attributes object', done => {
      request(app)
        .get('/attribute')
        .end((err, res) => {
          expect(err).to.be.a.null;
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /attribute/:id', () => {
    it('returns a attributes object by attribute ID', done => {
      request(app)
        .get('/attribute/1')
        .end((err, res) => {
          expect(err).to.be.a.null;
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /attribute/value/:id', () => {
    it('returns a attribute values object by attribute ID', done => {
      request(app)
        .get('/attribute/value/1')
        .end((err, res) => {
          expect(err).to.be.a.null;
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /attribute/product/:id', () => {
    it('returns a attributes object by product ID', done => {
      request(app)
        .get('/attribute/product/1')
        .end((err, res) => {
          expect(err).to.be.a.null;
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });
});
