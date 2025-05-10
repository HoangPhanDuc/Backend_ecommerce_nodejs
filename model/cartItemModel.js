import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import cartModel from "./cartModel.js";
import productsModel from "./productsModel.js";

const cartItemModel = sequelize.define(
  "CartItem",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    cart_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: cartModel,
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: productsModel,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default cartItemModel;
