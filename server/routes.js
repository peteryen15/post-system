import express from "express";
const router = express.Router();
import accountRoute from "./src/routes/accountRoute.js";
import postRoute from "./src/routes/postRoute.js";

router.use("/", accountRoute);
router.use("/", postRoute);

export default router;
