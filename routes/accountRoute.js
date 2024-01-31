import express from "express";
const router = express.Router();
import * as accountController from "../controllers/accountController.js";

router.get("/", accountController.indexView);

router
  .route("/login")
  .get(accountController.loginView)
  .post(accountController.verifyAccount);

router
  .route("/register")
  .get(accountController.registerView)
  .post(accountController.addAccount);

export default router;
