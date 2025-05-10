import { check } from "express-validator";

export const validatorProducts = () => {
  return [
    check("name").notEmpty().withMessage("required!"),
    check("quantity")
      .notEmpty()
      .withMessage("required!")
      .isInt()
      .withMessage("Quantity is invalid!"),
    check("old_price")
      .notEmpty()
      .withMessage("required!")
      .isFloat()
      .withMessage("Quantity is invalid!"),
    check("new_price")
      .notEmpty()
      .withMessage("required!")
      .isFloat()
      .withMessage("Quantity is invalid!"),
    check("description")
      .optional()
      .isString()
      .withMessage("Description must be exist!"),
    check("category_id")
      .notEmpty()
      .withMessage("Category ID is required!")
      .isInt()
      .withMessage("Category ID must be an integer!"),
  ];
};

export const validatorIdProduct = () => {
  return [
    check("id")
      .notEmpty()
      .withMessage("ID is required")
      .isInt()
      .withMessage("ID must be an integer"),
  ];
};
