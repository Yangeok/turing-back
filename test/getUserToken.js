const { request, expect } = require('chai');
const app = require('./request');

module.exports = () => {
  before(done => {
    request(app)
      .post('/customer/login')
      .send({
        email: 'Eva_Pfeffer@yahoo.com',
        password: 'lN34c5Y``AElcHDx2'
      })
      .end((err, res) => {
        userToken = res.body.customer.token;
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        done();
      });
  });
};
