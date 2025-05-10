import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import categoryModel from "./categoryModel.js";

const productsModel = sequelize.define(
  "Product",
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    old_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    new_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: categoryModel,
        key: "id",
      },
    },
  },
  { timestamps: true }
);

export default productsModel;
