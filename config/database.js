import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected db successfully!");
    await sequelize.sync();
    console.log("Table is checked and created!");
  } catch (error) {
    console.error("Error connected: ", error);
  }
})();

export default sequelize;
