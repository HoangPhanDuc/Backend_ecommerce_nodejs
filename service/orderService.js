import orderModel from "../model/ordersModel.js";
import orderItemModel from "../model/orderItemModel.js";

export const checkOrdersService = async (userId) => {
  try {
    const [result] = await orderModel.findOne({
      where: { user_id: userId },
    });
    return result.length > 0 ? result : null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createOrdersService = async (orders_id) => {
  try {
    const createOrder = await orderModel.create({ orders_id: orders_id });
    return createOrder;
  } catch (error) {
    throw error;
  }
};

export const addOrdersService = async (
  ordersId,
  productId,
  quantity,
  price
) => {
  try {
    const addOrder = await orderItemModel.create({
      orders_id: ordersId,
      product_id: productId,
      quantity: quantity,
      price: price,
    });
    return addOrder;
  } catch (error) {
    throw error;
  }
};
