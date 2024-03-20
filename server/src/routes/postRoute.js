import express from "express";
const router = express.Router();
import * as postController from "../controllers/postController.js";

router
  .route("/posts")
  .get(postController.getPosts)
  .post(postController.addPost);

router.route("/posts/:name").get(postController.getPosts);

router
  .route("/posts/:postId")
  .patch(postController.updatePost)
  .delete(postController.deletePost);

export default router;
