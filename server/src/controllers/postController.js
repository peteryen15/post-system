import * as postService from "../services/postService.js";

export const findPost = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const foundPost = await postService.findPost(token);

    return res.status(200).send(foundPost);
  } catch (e) {
    next(e);
  }
};

export const addPost = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { title, content } = req.body;
    await postService.addPost(token, title, content);

    return res.status(200).send({ message: "新增成功" });
  } catch (e) {
    next(e);
  }
};
