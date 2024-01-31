import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import mongoose from "mongoose";
import router from "./routes/index.js";
import { errorHandler } from "./middleware/errors.js";
import session from "express-session";
import flash from "connect-flash";

// 連結MongoBB
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("連結到MongoDB...");
  })
  .catch((e) => {
    console.log(e);
  });

// 設定排版引擎、middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// 設定routes
app.use("/", router);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`伺服器聆聽在port ${process.env.PORT}...`);
});
