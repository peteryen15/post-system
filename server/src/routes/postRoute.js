import express from "express";
const router = express.Router();
import * as postController from "../controllers/postController.js";

router
  .route("/posts")
  .get(postController.findPost)
  .post(postController.addPost);

router
  .route("/posts/:postId")
  .patch(postController.updatePost)
  .delete(postController.deletePost);

export default router;
