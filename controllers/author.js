const { validationResult } = require("express-validator");
const Author = require("../models/author");
const blogParser = require("../utils/blogParser");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const User = require("../models/user");

exports.getAuthor = async function (req, res, next) {
  //Check using TestCase

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array());
    error.statusCode = 422;
    return next(error);
  }

  try {
    const id = req.params.id;
    const author = await Author.findById(id);
    const blogLists = author.blogs.map((blog) => blogParser(blog._id));
    res.status(201).json({
      message: "Successfully fetched blogs.",
      blogLists,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.postAuthor = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed entered data is incorrect.");
    error.statusCode = 422;
    return next(error);
  }

  try {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    const author = new Author({
      fname,
      lname,
      email,
      blogs: [],
    });

    await author.save();
    res.status(201).json({
      message: "Author created successfully!",
      author,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.putAuthor = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed entered data is incorrect.");
    error.statusCode = 422;
    return next(error);
  }

  try {
    const id = req.params.id;
    const author = await Author.findById(id);

    author.fname = req.body.fname ?? author.fname;
    author.lname = req.body.lname ?? author.lname;
    author.email = req.body.email ?? author.email;

    await author.save();

    res.status(201).json({
      message: "Author updated successfully!",
      author,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.deleteAuthor = async function (req, res, next) {
  //Unfinished Function

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed entered data is incorrect.");
    error.statusCode = 422;
    return next(error);
  }

  try {
    const id = req.params.id;
    const author = await Author.findById(id);
    const commentIds = Comment.find({ blogId: { $in: author.blogs } }).comment;

    await Blog.deleteOne({ author: author.id });
    await User.find({ comment: { $in: commentIds } })
      .select("comment")
      .author.blogs.map(async (blogId) => {
        await Comment.deleteMany({ blogId });
      });

    res.status(201).json({
      message: "Author deleted successfully!",
      author,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
