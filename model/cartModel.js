import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const cartModel = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "NON-ACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  { timestamps: true }
);

export default cartModel;
