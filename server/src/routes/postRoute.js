import express from "express";
const router = express.Router();
import * as postController from "../controllers/postController.js";

router.route("/post").get(postController.findPost).post(postController.addPost);

export default router;
