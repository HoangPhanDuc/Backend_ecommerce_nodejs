import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import path from "path";
import "./model/associateModel.js";

import admin from "./routes/adminRoutes.js";
import user from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/v1", user);
app.use("/api/v1", admin);

// alow access to images path on server
const __dirname = path.resolve();
app.use("/", express.static(path.join(__dirname, "assets/images")));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
