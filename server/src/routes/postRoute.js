import express from "express";
const router = express.Router();
import * as postController from "../controllers/postController.js";

router
  .route("/post")
  .get(postController.findPost)
  .post(postController.addPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

export default router;
