import jwt from "jsonwebtoken";

export const signJwt = (tokenObject) => {
  return jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
};
