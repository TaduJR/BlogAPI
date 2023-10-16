const { validationResult } = require("express-validator");
const Comment = require("../models/comment");
const Blog = require("../models/blog");
const User = require("../models/user");

exports.getComment = async function (req, res, next) {
  try {
    const commentId = req.param.commentId;
    const comment = await Comment.findById(commentId).populate("userId");
    res.status(201).json({
      message: "Comment fetched successfully!",
      comment,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.postComment = async function (req, res, next) {
  try {
    const blogId = req.body.blogId;
    const userId = req.body.userId;
    const commentText = req.body.comment;

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

exports.putComment = async function (req, res, next) {
  try {
    const commentId = req.param.commentId;
    const commentText = req.body.comment;
    const comment = await Comment.findById(commentId);
    comment.comment = commentText;
    await comment.save();

    res.status(201).json({
      message: "Comment updated successfully!",
      comment,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.deleteComment = async function (req, res, next) {
  try {
    const commentId = req.param.commentId;
    const comment = await Comment.findByIdAndDelete(commentId);
    await Blog.updateMany(
      {},
      { $pull: { comments: commentId } },
      { multi: true }
    );
    await User.updateMany(
      {},
      { $pull: { comments: commentId } },
      { multi: true }
    );
    await comment.save();

    res.status(201).json({
      message: "Comment deleted successfully!",
      comment,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
