import jwt from "jsonwebtoken";
import { CustomError } from "../../middleware/errors.js";

export const signJwt = (tokenObject) => {
  return jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
};

export const verifyJwt = (token) => {
  try {
    return jwt.verify(token, process.env.PASSPORT_SECRET);
  } catch (err) {
    throw new CustomError(401, "無效的token!");
  }
};
