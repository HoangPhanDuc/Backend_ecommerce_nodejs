import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import userModel from "./usersModel.js";

const orderModel = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: userModel,
        key: "id",
      },
    },
    stautus: {
      type: DataTypes.ENUM("PENDING", "COMPLETED", "CANCELED"),
      defaultValue: "PENDING",
    },
  },
  { timestamps: true }
);

export default orderModel;
