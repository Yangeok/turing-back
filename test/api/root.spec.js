require('../chai')();
const { request, expect } = require('chai');
const app = require('../request');

describe('Root', () => {
  describe('GET /', () => {
    it('returns root page', done => {
      request(app)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.a.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
