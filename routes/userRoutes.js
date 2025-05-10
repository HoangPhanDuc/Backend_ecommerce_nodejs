import express from "express";
import {
  userLoginController,
  userRegController,
  verifyEmailController,
} from "../controller/usersController.js";
import {
  handleValidation,
  validateFileExistence,
} from "../middleware/handleValidation.js";
import {
  addCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  updateCategoryController,
} from "../controller/categoryController.js";
import {
  validatorCategory,
  validatorDeleteCategory,
} from "../validation/validatorCategory.js";
import {
  validatorProducts,
  validatorIdProduct,
} from "../validation/validatorProducts.js";
import {
  addProductController,
  deleteProductController,
  getAllProductController,
  updateProductController,
} from "../controller/productsController.js";
import { saveImage } from "../utils/handleFiles.js";
import {
  addToCartController,
  getCartController,
  removeFromCartController,
  updateCartItemController,
} from "../controller/cartController.js";
import { authenticate } from "../middleware/authentication.js";
import { validatorCart } from "../validation/validatorCart.js";

const user = express.Router();

//user
user.post("/login-user", userLoginController);
user.post("/sign-up-user", userRegController);
user.post("/verify-email-user", verifyEmailController);

//category
user.post(
  "/add-category",
  authenticate,
  validatorCategory(),
  handleValidation,
  addCategoryController
);
user.get("/categories", userLoginController, getAllCategoryController);
user.put(
  "/update-category/:id",
  authenticate,
  validatorCategory(),
  handleValidation,
  updateCategoryController
);
user.delete(
  "/delete-category/:id",
  authenticate,
  validatorDeleteCategory(),
  handleValidation,
  deleteCategoryController
);

// product
user.post(
  "/add-product",
  authenticate,
  saveImage.single("imageUrl"),
  validateFileExistence,
  validatorProducts(),
  handleValidation,
  addProductController
);
user.get("/products", getAllProductController);
user.put(
  "/update-product/:id",
  authenticate,
  saveImage.single("image"),
  validateFileExistence,
  validatorProducts(),
  handleValidation,
  updateProductController
);
user.delete(
  "/delete-product/:id",
  authenticate,
  validatorIdProduct(),
  handleValidation,
  deleteProductController
);

//cart
user.get("/get-cart/:user_id", authenticate, getCartController);
user.post(
  "/add-to-cart",
  authenticate,
  validatorCart(),
  handleValidation,
  addToCartController
);
user.put("/update-cart", authenticate, updateCartItemController);
user.delete("/remove-from-cart", authenticate, removeFromCartController);

export default user;
