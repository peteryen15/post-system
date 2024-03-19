import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  author: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

export const findPost = (author) => {
  return Post.find({ author }).sort({ date: -1 }).exec();
};

export const addPost = (author, title, content) => {
  const newPost = new Post({ author, title, content });
  return newPost.save();
};

export const updatePost = (author, postId, post) => {
  return Post.findOneAndUpdate({ $and: [{ author }, { _id: postId }] }, post, {
    new: true,
  }).exec();
};

export const deletePost = (author, postId) => {
  return Post.deleteOne({ $and: [{ author }, { _id: postId }] }).exec();
};
