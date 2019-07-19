const chai = require('chai');
const chaiHttp = require('chai-http');

module.exports = () => {
  chai.use(chaiHttp);
};
