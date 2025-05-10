import { check } from "express-validator";

export const validatorCategory = () => {
  return [
    check("name").notEmpty().withMessage("name is required"),
    check("status")
      .isIn(["ACTIVE", "NON-ACTIVE"])
      .withMessage("status must be a enum!"),
  ];
};

export const validatorDeleteCategory = () => {
  return [
    check("id")
      .notEmpty()
      .withMessage("ID is required")
      .isInt()
      .withMessage("ID must be an integer"),
  ];
};
