import cartItemModel from "./cartItemModel.js";
import cartModel from "./cartModel.js";
import categoryModel from "./categoryModel.js";
import orderItemModel from "./orderItemModel.js";
import orderModel from "./ordersModel.js";
import productsModel from "./productsModel.js";
import userModel from "./usersModel.js";

categoryModel.hasMany(productsModel, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
  hooks: true,
});
productsModel.belongsTo(categoryModel, {
  foreignKey: "category_id",
});

productsModel.hasMany(cartItemModel, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
  hooks: true,
});
cartItemModel.belongsTo(productsModel, {
  foreignKey: "product_id",
});

cartModel.hasMany(cartItemModel, {
  foreignKey: "cart_id",
  onDelete: "CASCADE",
  hooks: true,
});
cartItemModel.belongsTo(cartModel, {
  foreignKey: "cart_id",
});

userModel.hasMany(orderModel, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  hooks: true,
});
orderModel.belongsTo(userModel, {
  foreignKey: "user_id",
});

orderModel.hasMany(orderItemModel, {
  foreignKey: "orders_id",
  onDelete: "CASCADE",
  hooks: true,
});
orderItemModel.belongsTo(orderModel, {
  foreignKey: "orders_id",
});

productsModel.hasMany(orderItemModel, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
  hooks: true,
});
orderItemModel.belongsTo(productsModel, {
  foreignKey: "product_id",
});
