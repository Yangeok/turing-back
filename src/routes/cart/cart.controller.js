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
  const { cart_id, product_id, attributes } = ctx.request.body;
  const add_on = JSON.stringify(new Date(Date.now()))
    .replace(/"/g, '')
    .replace('T', ' ')
    .replace('Z', '');

  try {
    const row = await shopping_cart.findOne({ where: { cart_id } });
    const plainRow = row.get({ plain: true });
    const condition = 'condition';
    const isEmptyCart = !plainRow.product_id || !plainRow.attributes;
    const hasSameProductId = plainRow.product_id == product_id;
    const hasSameAttributes = plainRow.attributes == attributes;
    const isSame =
      plainRow.product_id == product_id && plainRow.attributes == attributes;

    switch (condition) {
      case isEmptyCart:
        await shopping_cart.update(
          {
            product_id,
            attributes,
            add_on,
            quantity: 1
          },
          { where: { cart_id } }
        );
        break;

      case hasSameProductId:
        await shopping_cart.update(
          {
            attributes,
            add_on,
            quantity: sequelize.literal('quantity + 1')
          },
          { where: { [Op.and]: [{ cart_id }, { product_id }] } }
        );
        break;
    }
    // if (isEmptyCart) {

    // }
    // else if (hasSameProductId) {
    //   query = await shopping_cart.create({
    //     cart_id,
    //     product_id,
    //     attributes,
    //     add_on,

    //   });
    // } else if (isSameProductIdAndAttributes) {
    //   query = await shopping_cart.update(
    //     { quantity: sequelize.literal('quantity + 1'), add_on },
    //     {
    //       where: {
    //         [Op.and]: { cart_id },
    //         [Op.or]: [{ product_id }, { attributes }]
    //       }
    //     }
    //   );
    // }

    const data = await product.findOne({
      include: { model: shopping_cart, where: { cart_id } }
    });
    ctx.body = successMessage('cart', data);
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};
exports.getProductsInCart = async ctx => {
  try {
    ctx.body = successMessage('cart', '');
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};
exports.updateCartByItem = async ctx => {
  try {
    ctx.body = successMessage('cart', '');
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};
exports.deleteCart = async ctx => {
  try {
    ctx.body = successMessage('cart', '');
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};
exports.moveProductToCart = async ctx => {
  try {
    ctx.body = successMessage('cart', '');
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};
exports.returnTotalAmountFromCart = async ctx => {
  try {
    ctx.body = successMessage('cart', '');
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};
exports.saveProductForLater = async ctx => {
  try {
    ctx.body = successMessage('cart', '');
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};
exports.getProductsForLater = async ctx => {
  try {
    ctx.body = successMessage('cart', '');
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};
exports.deleteProductInCart = async ctx => {
  try {
    ctx.body = successMessage('cart', '');
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};
