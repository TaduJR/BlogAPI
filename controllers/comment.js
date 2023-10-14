const { validationResult } = require("express-validator");
const Comment = require("../models/comment");
const Blog = require("../models/blog");
const User = require("../models/user");

exports.getComment = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed entered data is incorrect.");
    error.statusCode = 422;
    console.log(errors);
    return next(error);
  }

  try {
    const commentId = req.body.commentId;
    const comment = await Comment.findById(commentId).populate("userId");
    res.status(201).json({
      message: "Comment created successfully!",
      comment,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.postComment = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed entered data is incorrect.");
    error.statusCode = 422;
    console.log(errors);
    return next(error);
  }

  const blogId = req.body.blogId;
  const userId = req.body.userId;
  const commentText = req.body.comment;

  try {
    const blog = await Blog.findById(blogId);
    const user = await User.findById(userId);
    const comment = new Comment({ userId, blogId, comment: commentText });

    user.comments.push(comment.id);
    blog.comments.push(comment.id);

    await user.save();
    await comment.save();
    await blog.save();
    res.status(201).json({
      message: "Comment created successfully!",
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
