import * as accountService from "../services/accountService.js";

export const indexView = (req, res) => {
  return res.render("index");
};
export const loginView = (req, res) => {
  return res.render("login");
};
export const registerView = (req, res) => {
  return res.render("register");
};

export const verifyAccount = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);

    const token = await accountService.verifyAccount(email, password);
    console.log(token);

    // unfinished

    // return res.redirect("/");
    return res
      .status(200)
      .send({ message: "登入成功!", token: "JWT " + token });
  } catch (e) {
    next(e);
  }
};

export const addAccount = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // console.log(name, email, password);

    await accountService.addAccount(name, email, password);

    req.flash("success_msg", "註冊成功，請登入會員!");
    return res.redirect("/login");
    // return res.status(200).send({ message: "註冊成功!" });
  } catch (e) {
    next(e);
  }
};
