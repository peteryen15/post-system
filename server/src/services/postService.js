import { CustomError } from "../middleware/errors.js";
import * as postModel from "../models/postModel.js";
import { verifyJwt } from "../utils/jwt/jwt.js";

export const getPosts = (author, title) => {
  if (!title) {
    if (!author) {
      return postModel.getAllPosts();
    } else {
      return postModel.getPostsByAuthor(author);
    }
  } else {
    if (!author) {
      return postModel.getPostsByTitle(title);
    } else {
      return postModel.getPostsByTitleAndAuthor(author, title);
    }
  }
};

export const addPost = (token, title, content) => {
  const { name: author } = verifyJwt(token);
  if (!title) {
    throw new CustomError(400, "無效的標題!");
  }

  if (!content) {
    throw new CustomError(400, "無效的內容!");
  }

  return postModel.addPost(author, title, content);
};

export const updatePost = async (token, postId, title, content, updatedAt) => {
  const { name: author } = verifyJwt(token);
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
    updatedAt,
  });

  if (!updatedPost) {
    throw new CustomError(404, "找不到要更新的post!");
  }

  return updatedPost;
};

export const deletePost = async (token, postId) => {
  const { name: author } = verifyJwt(token);
  if (!postId) {
    throw new CustomError(400, "無效的ID!");
  }

  const { deletedCount } = await postModel.deletePost(author, postId);

  if (deletedCount == 0) {
    throw new CustomError(404, "找不到要刪除的post!");
  }
};
