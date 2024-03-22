import * as accountService from "../services/accountService.js";

export const loginAccount = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const verifiedAccount = await accountService.loginAccount(email, password);

    return res.status(200).send({ message: "登入成功", ...verifiedAccount });
  } catch (e) {
    next(e);
  }
};

export const getAccount = async (req, res, next) => {
  try {
    const { name } = req.params;

    const foundAccount = await accountService.getAccount(name);

    return res.status(200).send(foundAccount);
  } catch (e) {
    next(e);
  }
};

export const addAccount = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    await accountService.addAccount(name, email, password);

    return res.status(200).send({ message: "註冊成功" });
  } catch (e) {
    next(e);
  }
};
