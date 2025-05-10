import { check } from "express-validator";

export const validatorCart = () => {
  return [
    check("user_id")
      .notEmpty()
      .withMessage("User ID is required!")
      .isInt()
      .withMessage("User ID must be an integer!"),
    check("product_id")
      .notEmpty()
      .withMessage("Product ID is required!")
      .isInt()
      .withMessage("Product ID must be an integer!"),
    check("quantity")
      .notEmpty()
      .withMessage("Quantity is required!")
      .isInt({ min: 0 })
      .withMessage("Quantity must be an integer and greater or equal than 0!"),
    check("price")
      .notEmpty()
      .withMessage("Price is required!")
      .isFloat({ min: 0 })
      .withMessage("Price must be a float and greater or equal than 0!"),
  ];
};
