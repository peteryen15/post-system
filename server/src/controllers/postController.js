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

export const updatePost = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const postId = req.params.postId;
    const { title, content } = req.body;
    const updatedPost = await postService.updatePost(
      token,
      postId,
      title,
      content
    );

    return res.status(200).send({ message: "更新成功", updatedPost });
  } catch (e) {
    next(e);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const postId = req.params.postId;
    await postService.deletePost(token, postId);

    return res.status(200).send({ message: "刪除成功" });
  } catch (e) {
    next(e);
  }
};
