import express from "express";
const router = express.Router();
import accountRoute from "./accountRoute.js";

router.use("/", accountRoute);

export default router;
