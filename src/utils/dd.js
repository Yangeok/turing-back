const { customer } = require('../db/models');

const data = customer.findOne({
  where: { customer_id: 988 },
  plain: true
});

console.log(data);
