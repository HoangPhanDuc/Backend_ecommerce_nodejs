import cartItemModel from "../model/cartItemModel.js";
import cartModel from "../model/cartModel.js";
import productsModel from "../model/productsModel.js";

export const getCartService = async (userId) => {
  try {
    const getCart = await cartModel.findOne({
      where: { user_id: userId },
      include: {
        model: cartItemModel,
        include: {
          model: productsModel,
        },
      },
    });
    return getCart;
  } catch (error) {
    throw error;
  }
};

export const addToCartService = async (cartId, productId, quantity, price) => {
  try {
    const addToCartItem = await cartItemModel.create({
      cart_id: cartId,
      product_id: productId,
      quantity: quantity,
      price: price,
    });
    return addToCartItem;
  } catch (error) {
    throw error;
  }
};

export const createCartService = async (userId) => {
  try {
    const createCart = await cartModel.create({
      user_id: userId,
    });
    return createCart;
  } catch (error) {
    throw error;
  }
};

export const checkCartService = async (userId) => {
  try {
    const findCartByUserId = await cartModel.findOne({
      where: { user_id: userId },
    });
    return findCartByUserId;
  } catch (error) {
    throw error;
  }
};

export const updateCartItemService = async (quantity, id) => {
  try {
    const updateCartById = await cartItemModel.update(
      { quantity: quantity },
      { where: { id: id } }
    );
    return updateCartById;
  } catch (error) {
    throw error;
  }
};

export const removeFromCartService = async (id) => {
  try {
    const removeCart = await cartItemModel.destroy({
      where: { id: id },
    });
    return removeCart;
  } catch (error) {
    throw error;
  }
};

export const removeFromCartAfterOrdersService = async (cartId) => {
  try {
    const removeAfterOrder = await cartItemModel.destroy({
      where: { cart_id: cartId },
    });
    return removeAfterOrder;
  } catch (error) {
    throw error;
  }
};
