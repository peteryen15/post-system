import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const Post = mongoose.model("Post", postSchema);

export const getAllPosts = () => {
  return Post.find({}).sort({ createdAt: -1 }).exec();
};

export const getPostsByAuthor = (author) => {
  return Post.find({ author }).sort({ createdAt: -1 }).exec();
};

export const getPostsByTitle = (title) => {
  return Post.find({ title: { $regex: title, $options: "i" } })
    .sort({ createdAt: -1 })
    .exec();
};

export const getPostsByTitleAndAuthor = (author, title) => {
  return Post.find({
    $and: [{ author }, { title: { $regex: title, $options: "i" } }],
  })
    .sort({ createdAt: -1 })
    .exec();
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
