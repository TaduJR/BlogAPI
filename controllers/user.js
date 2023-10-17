const blogParser = require("../utils/blogParser");
const Author = require("../models/author");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const User = require("../models/user");

exports.getUser = async function (req, res, next) {
  try {
    const id = req.params.userId;
    const user = await User.findById(id).populate("comments");
    res.status(201).json({
      message: "Successfully fetched user.",
      user,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.postUser = async function (req, res, next) {
  try {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    const user = new User({
      fname,
      lname,
      email,
      comments: [],
    });

    await user.save();
    res.status(201).json({
      message: "User created successfully!",
      user,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.putUser = async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    user.fname = req.body.fname ?? user.fname;
    user.lname = req.body.lname ?? user.lname;
    user.email = req.body.email ?? user.email;

    await user.save();

    res.status(201).json({
      message: "User updated successfully!",
      user,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.deleteUser = async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    await Blog.updateMany({ $pull: { comments: { $in: user.comments } } });
    await Comment.deleteMany({ _id: { $in: user.comments } });
    await User.findByIdAndDelete(userId);

    res.status(201).json({
      message: "User deleted successfully!",
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
