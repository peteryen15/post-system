import express from "express";
const router = express.Router();
import * as accountController from "../controllers/accountController.js";

router.route("/login").post(accountController.verifyAccount);

router.route("/register").post(accountController.addAccount);

export default router;
