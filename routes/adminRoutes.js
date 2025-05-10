import express from "express";
import {
  authController,
  deleteUserController,
  getAllUserController,
  getByIdUserController,
  regController,
} from "../controller/adminController.js";
import {
  validatorLogin,
  validatorRegister,
} from "../validation/validatorAuth.js";
import { handleValidation } from "../middleware/handleValidation.js";
import { authenticate } from "../middleware/authentication.js";

const admin = express.Router();

admin.post("/login-admin", validatorLogin, handleValidation, authController);
admin.post("/sign-up-admin", validatorRegister, handleValidation, regController);
admin.get("/users", authenticate, getAllUserController);
admin.get("/users/:id", authenticate, getByIdUserController);
admin.delete("/users-delete/:id", authenticate, deleteUserController);

export default admin;
