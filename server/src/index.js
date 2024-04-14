import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import mongoose from "mongoose";
import router from "../routes.js";
import { errorHandler } from "./middleware/errors.js";
import { startWebSocketServer } from "./utils/ws/ws.js";
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
  app.use("/api", router);
  app.use(errorHandler);

  const server = app.listen(process.env.PORT, () => {
    console.log(`伺服器聆聽在port ${process.env.PORT}...`);
  });

  startWebSocketServer(server);
})();
