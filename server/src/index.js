import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import mongoose from "mongoose";
import router from "../routes.js";
import { errorHandler } from "./middleware/errors.js";
import cors from "cors";

(() => {
  // 連結MongoDB
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("連結到MongoDB...");
    })
    .catch((e) => {
      console.log(e);
    });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use("/api/account", router);
  app.use(errorHandler);

  app.listen(process.env.PORT, () => {
    console.log(`伺服器聆聽在port ${process.env.PORT}...`);
  });
})();
