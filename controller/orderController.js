import {
  addOrdersService,
  checkOrdersService,
  createOrdersService,
} from "../service/orderService.js";

export const addOrdersController = async (req, res) => {
  const { user_id, orders_id, product_id, quantity, price } = req.body;
  try {
    const checkOrders = await checkOrdersService(user_id);
    if (!checkOrders) {
      await createOrdersService(user_id);
      checkOrders = await checkOrdersService(user_id);
    }
    const getIdOrders = checkOrders[0].id;
    const results = await addOrdersService(
      getIdOrders,
      product_id,
      quantity,
      price
    );
    res
      .status(200)
      .json({ mess: "Add to orders successful!", results: results });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mess: "Error added to orders!" });
  }
};
