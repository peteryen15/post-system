import { CustomError } from "../middleware/errors.js";
import * as accountModel from "../models/accountModel.js";
import { signJwt } from "../utils/jwt/jwt.js";
import bcrypt from "bcrypt";

export const loginAccount = async (email, password) => {
  if (!email) {
    throw new CustomError(400, "無效的信箱!");
  }
  if (!password) {
    throw new CustomError(400, "無效的密碼!");
  }

  const foundAccount = await accountModel.getAccountByEmail(email);

  if (foundAccount) {
    if (await bcrypt.compare(password, foundAccount.password)) {
      const tokenObject = {
        _id: foundAccount._id,
        name: foundAccount.name,
        email: foundAccount.email,
      };
      const token = signJwt(tokenObject);

      return { token, user: foundAccount };
    } else {
      throw new CustomError(401, "密碼錯誤!");
    }
  } else {
    throw new CustomError(401, "信箱不存在!");
  }
};

export const getAccount = async (name) => {
  return accountModel.getAccountByName(name);
};

export const addAccount = async (name, email, password) => {
  if (!name) {
    throw new CustomError(400, "無效的用戶名!");
  }
  if (!email) {
    throw new CustomError(400, "無效的信箱!");
  }

  if (!password) {
    throw new CustomError(400, "無效的密碼!");
  }

  if (await accountModel.isAccountExist(name, email)) {
    throw new CustomError(400, "用戶名或信箱已存在!");
  }

  await accountModel.addAccount(name, email, password);
};
