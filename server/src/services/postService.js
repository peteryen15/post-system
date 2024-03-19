import { CustomError } from "../middleware/errors.js";
import * as postModel from "../models/postModel.js";
import { verifyJwt } from "../utils/jwt/jwt.js";

export const findPost = (token) => {
  const { _id: author } = verifyJwt(token);

  return postModel.findPost(author);
};

export const addPost = (token, title, content) => {
  const { _id: author } = verifyJwt(token);
  if (!title) {
    throw new CustomError(400, "無效的標題!");
  }

  if (!content) {
    throw new CustomError(400, "無效的內容!");
  }

  return postModel.addPost(author, title, content);
};

export const updatePost = async (token, postId, title, content) => {
  const { _id: author } = verifyJwt(token);
  if (!postId) {
    throw new CustomError(400, "無效的ID!");
  }

  if (!title) {
    throw new CustomError(400, "無效的標題!");
  }

  if (!content) {
    throw new CustomError(400, "無效的內容!");
  }

  const updatedPost = await postModel.updatePost(author, postId, {
    title,
    content,
  });

  if (!updatedPost) {
    throw new CustomError(404, "找不到要更新的post!");
  }

  return updatedPost;
};

export const deletePost = async (token, postId) => {
  const { _id: author } = verifyJwt(token);
  if (!postId) {
    throw new CustomError(400, "無效的ID!");
  }

  const { deletedCount } = await postModel.deletePost(author, postId);

  if (deletedCount == 0) {
    throw new CustomError(404, "找不到要刪除的post!");
  }
};
