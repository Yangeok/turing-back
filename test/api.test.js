const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { request, expect } = require('chai');

const url = 'http://localhost:80';
const app = require('../src/app');
const db = require('../src/db/models/index');

let email = 'test1@example.com';
let password = '12345678qQ!';
let name = 'Test User';
let token =
  ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ0ZXN0NUBleGFtcGxlLmNvbSIsImlhdCI6MTU1MzE2ODM4NSwiZXhwIjoxNTU1NzYwMzg1fQ.O0UdnBtSM0JJkLrRUb64s12QZn_-BZXtPGJfB4oFcVw';

describe('Root', () => {
  before(() => {
    app.listen(80, 'localhost');
  });
  it('returns http request headers', done => {
    request(url)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Attribute', () => {
  it('returns all attribute', done => {
    request(url)
      .get('/attribute')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Cart', () => {
  it('returns all cart', done => {
    request(url)
      .get('/cart')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Category', () => {
  it('returns all category', done => {
    request(url)
      .get('/category')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Customer', () => {
  before(() => {
    db.customer.destroy({
      where: { email: email }
    });
  });

  it('returns signup', done => {
    request(url)
      .post('/customer/signup')
      .set('Authorization', token)
      .send({
        email: email,
        password: password,
        name: name
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('returns login', done => {
    request(url)
      .post('/customer/login')
      .set('Authorization', token)
      .send({
        email: email,
        password: password
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  after(() => {
    db.customer.destroy({
      where: { email: email }
    });
  });
});

describe('Department', () => {
  it('returns all department', done => {
    request(url)
      .get('/department')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Order', () => {
  it('returns all order', done => {
    request(url)
      .get('/order')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Payment', () => {
  it('returns all payment', done => {
    request(url)
      .get('/payment')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Product', () => {
  it('returns all product', done => {
    request(url)
      .get('/product')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Profile', () => {
  before(async () => {
    await db.customer.destroy({
      where: { email: email }
    });
    await db.customer.create({ email: email, password: password, name: name });
  });

  it('returns all profile', done => {
    request(url)
      .get('/profile')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  after(done => {
    db.customer.destroy({
      where: { email: email }
    });
    done();
  });
});

describe('Shipping', () => {
  it('returns all shipping', done => {
    request(url)
      .get('/shipping')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Tax', () => {
  it('returns all tax', done => {
    request(url)
      .get('/tax')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
