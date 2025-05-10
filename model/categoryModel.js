import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const categoryModel = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "NON-ACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  { timestamps: true }
);

export default categoryModel;
