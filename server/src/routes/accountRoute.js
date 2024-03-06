import express from "express";
const router = express.Router();
import * as accountController from "../controllers/accountController.js";

router.route("/login").post(accountController.loginAccount);

router.route("/account").post(accountController.addAccount);

export default router;
