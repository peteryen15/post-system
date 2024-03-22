import express from "express";
const router = express.Router();
import * as accountController from "../controllers/accountController.js";

router.route("/login").post(accountController.loginAccount);

router.route("/account").post(accountController.addAccount);

router.route("/account/:name").get(accountController.getAccount);

export default router;
