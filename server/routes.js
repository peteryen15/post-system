import express from "express";
const router = express.Router();
import accountRoute from "./src/routes/accountRoute.js";

router.use("/", accountRoute);

export default router;
