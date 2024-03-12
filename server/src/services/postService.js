import { CustomError } from "../middleware/errors.js";
import * as postModel from "../models/postModel.js";
import { verifyJwt } from "../utils/jwt/jwt.js";

export const findPost = (token) => {
  const { _id } = verifyJwt(token);

  return postModel.findPost(_id);
};

export const addPost = (token, title, content) => {
  const { _id } = verifyJwt(token);
  if (!title) {
    throw new CustomError(400, "無效的標題!");
  }

  if (!content) {
    throw new CustomError(400, "無效的內容!");
  }

  return postModel.addPost(_id, title, content);
};
