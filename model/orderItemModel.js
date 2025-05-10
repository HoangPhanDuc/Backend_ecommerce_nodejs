import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import orderModel from "./ordersModel.js";
import productsModel from "./productsModel.js";

const orderItemModel = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    orders_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: orderModel,
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

export default orderItemModel;
