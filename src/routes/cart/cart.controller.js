const {
  shopping_cart,
  product,
  Sequelize,
  sequelize
} = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');
const uuidv1 = require('uuid/v1');
const Op = Sequelize.Op;

exports.genereateUniqueCartId = async ctx => {
  const id = uuidv1()
    .replace(/-/g, '')
    .substring(0, 18);
  const add_on = JSON.stringify(new Date(Date.now()))
    .replace(/"/g, '')
    .replace('T', ' ')
    .replace('Z', '');

  try {
    const data = await shopping_cart.create({ cart_id: id, add_on });
    ctx.body = successMessage('cart', data);
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};

exports.addProductInCart = async ctx => {
  // flatMap
  const concat = (x, y) => x.concat(y);
  const flatMap = (f, xs) => xs.map(f).reduce(concat, []);
  Array.prototype.flatMap = function(f) {
    return flatMap(f, this);
  };

  const { cart_id, product_id, attributes } = ctx.request.body;
  const customer_id = ctx.request.user.id;
  console.log(customer_id);
  const add_on = JSON.stringify(new Date(Date.now()))
    .replace(/"/g, '')
    .replace('T', ' ')
    .replace('Z', '');

  try {
    const getEmptyCartQuery = await shopping_cart.findOne({
      where: {
        [Op.and]: [{ cart_id }, { product_id: null }, { attributes: null }]
      }
    });
    const getEmptyCart = getEmptyCartQuery.get({ plain: true });
    if (getEmptyCart) {
      await shopping_cart.update(
        {
          product_id,
          attributes,
          add_on,
          quantity: 1,
          customer_id
        },
        { where: { cart_id } }
      );
    }

    const query = await product
      .findAll({
        attributes: ['price', 'discounted_price', 'name', 'image'],
        include: {
          model: shopping_cart,
          where: { cart_id },
          attributes: { exclude: ['buy_now'] }
        }
      })
      .map(el => el.get({ plain: true }));
    const data = query.flatMap(
      ({ price, discounted_price, name, image, shopping_carts }) =>
        shopping_carts.map(o => ({
          price,
          subtotal: price * o.quantity,
          discounted_price,
          discounted_subtotal: discounted_price * o.quantity,
          name,
          image,
          ...o
        }))
    );
    ctx.body = successMessage('cart', data);
  } catch (e) {
    try {
      const needsUpdatedQuantityQuery = await shopping_cart.findOne({
        where: {
          [Op.and]: [{ cart_id }, { product_id }, { attributes }]
        }
      });
      const needsUpdatedQuantity = needsUpdatedQuantityQuery.get({
        plain: true
      });
      if (needsUpdatedQuantity) {
        await shopping_cart.update(
          {
            quantity: sequelize.literal('quantity + 1'),
            add_on,
            customer_id
          },
          { where: { [Op.and]: [{ cart_id }, { product_id }, { attributes }] } }
        );
      }

      const query = await product
        .findAll({
          attributes: ['price', 'discounted_price', 'name', 'image'],
          include: {
            model: shopping_cart,
            where: { cart_id },
            attributes: { exclude: ['buy_now'] }
          }
        })
        .map(el => el.get({ plain: true }));
      const data = query.flatMap(
        ({ price, discounted_price, name, image, shopping_carts }) =>
          shopping_carts.map(o => ({
            price,
            subtotal: price * o.quantity,
            discounted_price,
            discounted_subtotal: discounted_price * o.quantity,
            name,
            image,
            ...o
          }))
      );
      ctx.body = successMessage('cart', data);
    } catch (e) {
      try {
        const needsNewCartQuery = await shopping_cart.findOne({
          where: {
            [Op.and]: [{ cart_id }],
            [Op.or]: [
              { product_id: { [Op.ne]: product_id } },
              { attributes: { [Op.ne]: attributes } }
            ]
          }
        });
        const needsNewCart = needsNewCartQuery.get({ plain: true });
        if (needsNewCart) {
          await shopping_cart.create({
            cart_id,
            product_id,
            attributes,
            quantity: 1,
            add_on,
            customer_id
          });
        }

        const query = await product
          .findAll({
            attributes: ['price', 'discounted_price', 'name', 'image'],
            include: {
              model: shopping_cart,
              where: { cart_id },
              attributes: { exclude: ['buy_now'] }
            }
          })
          .map(el => el.get({ plain: true }));
        const data = query.flatMap(
          ({ price, discounted_price, name, image, shopping_carts }) =>
            shopping_carts.map(o => ({
              price,
              subtotal: price * o.quantity,
              discounted_price,
              discounted_subtotal: discounted_price * o.quantity,
              name,
              image,
              ...o
            }))
        );
        ctx.body = successMessage('cart', data);
      } catch (e) {
        ctx.status = 400;
        ctx.body = errorMessage(e.message);
      }
    }
  }
};

exports.getProductsInCart = async ctx => {
  // flatMap
  const concat = (x, y) => x.concat(y);
  const flatMap = (f, xs) => xs.map(f).reduce(concat, []);
  Array.prototype.flatMap = function(f) {
    return flatMap(f, this);
  };

  const { id } = ctx.params;
  try {
    const query = await product
      .findAll({
        attributes: ['price', 'discounted_price', 'name', 'image'],
        include: {
          model: shopping_cart,
          where: { cart_id: id },
          attributes: { exclude: ['buy_now'] }
        }
      })
      .map(el => el.get({ plain: true }));
    const data = query.flatMap(
      ({ price, discounted_price, name, image, shopping_carts }) =>
        shopping_carts.map(o => ({
          price,
          subtotal: price * o.quantity,
          discounted_price,
          discounted_subtotal: discounted_price * o.quantity,
          name,
          image,
          ...o
        }))
    );
    ctx.body = successMessage('cart', data);
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};

exports.updateCartByItem = async ctx => {
  // flatMap
  const concat = (x, y) => x.concat(y);
  const flatMap = (f, xs) => xs.map(f).reduce(concat, []);
  Array.prototype.flatMap = function(f) {
    return flatMap(f, this);
  };

  const { id } = ctx.params;
  const { quantity } = ctx.request.body;

  try {
    const updateQuery = await shopping_cart.update(
      {
        quantity
      },
      { where: { item_id: id } }
    );
    const query = await product
      .findAll({
        attributes: ['price', 'discounted_price', 'name', 'image'],
        include: {
          model: shopping_cart,
          where: { item_id: id },
          attributes: { exclude: ['cart_id', 'buy_now'] }
        }
      })
      .map(el => el.get({ plain: true }));

    const data = query.flatMap(
      ({ price, discounted_price, name, image, shopping_carts }) =>
        shopping_carts.map(o => ({
          price,
          subtotal: price * o.quantity,
          discounted_price,
          discounted_subtotal: discounted_price * o.quantity,
          name,
          image,
          ...o
        }))
    )[0];
    ctx.body = successMessage('cart', data);
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};

exports.deleteCart = async ctx => {
  const { id } = ctx.params;

  try {
    const data = await shopping_cart.destroy({
      where: { cart_id: id }
    });
    ctx.body = successMessage('cart', 'is deleted');
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};

exports.moveProductToCart = async ctx => {
  const { id } = ctx.params;
  const cart_id = uuidv1()
    .replace(/-/g, '')
    .substring(0, 18);
  const add_on = JSON.stringify(new Date(Date.now()))
    .replace(/"/g, '')
    .replace('T', ' ')
    .replace('Z', '');

  try {
    const query = await shopping_cart.update(
      { cart_id, add_on, quantity: 1 },
      { where: { item_id: id } }
    );
    const data = await shopping_cart.findOne({
      where: { item_id: id }
    });
    ctx.body = successMessage('cart', data);
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};

exports.returnTotalAmountFromCart = async ctx => {
  // flatMap
  const concat = (x, y) => x.concat(y);
  const flatMap = (f, xs) => xs.map(f).reduce(concat, []);
  Array.prototype.flatMap = function(f) {
    return flatMap(f, this);
  };
  const { id } = ctx.params;

  try {
    const query = await product
      .findAll({
        attributes: ['price', 'discounted_price'],
        include: {
          model: shopping_cart,
          where: { cart_id: id },
          attributes: ['quantity']
        }
      })
      .map(el => el.get({ plain: true }));
    const data = query.flatMap(({ price, discounted_price, shopping_carts }) =>
      shopping_carts.map(o => ({
        subtotal: price * o.quantity,
        discounted_subtotal: discounted_price * o.quantity
      }))
    )[0];
    ctx.body = successMessage('cart', data);
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};

exports.saveProductForLater = async ctx => {
  const { id } = ctx.params;
  const add_on = JSON.stringify(new Date(Date.now()))
    .replace(/"/g, '')
    .replace('T', ' ')
    .replace('Z', '');

  try {
    const query = await shopping_cart.update(
      { buy_now: 0, add_on },
      { where: { item_id: id } }
    );
    const data = await shopping_cart.findOne({
      where: { item_id: id }
    });
    ctx.body = successMessage('cart', data);
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};

exports.getProductsForLater = async ctx => {
  // flatMap
  const concat = (x, y) => x.concat(y);
  const flatMap = (f, xs) => xs.map(f).reduce(concat, []);
  Array.prototype.flatMap = function(f) {
    return flatMap(f, this);
  };
  const { id } = ctx.params;

  try {
    const query = await product
      .findAll({
        attributes: ['price', 'discounted_price', 'name'],
        include: {
          model: shopping_cart,
          where: { cart_id: id },
          attributes: ['item_id', 'attributes', 'quantity', 'buy_now']
        }
      })
      .map(el => el.get({ plain: true }));
    const data = query.flatMap(
      ({ price, discounted_price, name, shopping_carts }) =>
        shopping_carts.map(o => ({
          price,
          discounted_price,
          name,
          ...o
        }))
    );
    ctx.body = successMessage('cart', data);
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};
exports.deleteProductInCart = async ctx => {
  const { id } = ctx.params;

  try {
    const data = await shopping_cart.destroy({
      where: { item_id: id }
    });
    ctx.body = successMessage('cart', 'successfully deleted product');
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};
