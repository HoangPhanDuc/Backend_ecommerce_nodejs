import {
  addToCartService,
  checkCartService,
  createCartService,
  getCartService,
  removeFromCartService,
  updateCartItemService,
} from "../service/cartService.js";

export const getCartController = async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await getCartService(user_id);
    return res
      .status(200)
      .json({ mess: "Get cart successful!", result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mess: "Error get cart!" });
  }
};

export const addToCartController = async (req, res) => {
  const { user_id, product_id, quantity, price } = req.body;
  try {
    let checkCart = await checkCartService(user_id);
    if (!checkCart) {
      await createCartService(user_id);
      checkCart = await checkCartService(user_id);
    }
    const getIdCart = checkCart.dataValues.id;
    const result = await addToCartService(
      getIdCart,
      product_id,
      quantity,
      price
    );
    return res
      .status(200)
      .json({ mess: "Add to cart successful!", result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mess: "Error add to cart!" });
  }
};

export const updateCartItemController = async (req, res) => {
  const { quantity } = req.body;
  const { id } = req.params;
  try {
    const result = await updateCartItemService(quantity, id);
    return res
      .status(200)
      .json({ mess: "Update cart successful!", result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mess: "Error update cart!" });
  }
};

export const removeFromCartController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await removeFromCartService(id);
    return res
      .status(200)
      .json({ mess: "Removed cart successful!", result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mess: "Error removed cart!" });
  }
};
