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

export const findPost = (_id) => {
  return Post.find({ author: _id }).exec();
};

export const addPost = (_id, title, content) => {
  const newPost = new Post({ author: _id, title, content });
  return newPost.save();
};
