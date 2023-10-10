const { validationResult } = require("express-validator");
const Blog = require("../models/blog");
const Author = require("../models/author");
const ObjectId = require("mongoose").Types.ObjectId;

exports.postBlog = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed entered data is incorrect.");
    error.statusCode = 422;
    return next(error);
  }

  const title = req.body.title;
  const content = req.body.content;

  try {
    const blog = new Blog({
      title,
      content,
      author: new ObjectId(req._id),
    });

    const author = await Author.findById(req._id);
    author.posts.push(new ObjectId(blog._id));
    await author.save();
    await blog.save();

    res.status(201).json({
      message: "Blog created successfully!",
      author,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.updateBlog = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed entered data is incorrect.");
    error.statusCode = 422;
    console.log(errors);
    return next(error);
  }

  try {
    const blogId = req.body.blogId;
    const blog = await Blog.findById(blogId);
    blog.title = req.body.title;
    blog.content = req.body.content;
    await blog.save();
    res.status(201).json({
      message: "Blog updated successfully!",
      blog,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.deleteBlog = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed entered data is incorrect.");
    error.statusCode = 422;
    console.log(errors);
    return next(error);
  }

  const blogId = req.body.blogId;
  try {
    const blog = await Blog.findById(blogId);
    const author = await Author.findById(blog.author);
    const blogIndex = author.posts.findIndex((value, index) => {
      return value.toString() === blog._id.toString();
    });
    console.log(`Blog Index ${blogIndex}`);
    await Blog.findByIdAndRemove(blog._id);
    author.posts.splice(blogIndex, 1);

    await author.save();
    await blog.save();
    res.status(201).json({
      message: "Author created successfully!",
      author,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.postLikeBlog = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed entered data is incorrect.");
    error.statusCode = 422;
    console.log(errors);
    return next(error);
  }

  const blogId = req.body.blogId;
  try {
    const blog = await Blog.findById(blogId);
    blog.like++;
    await blog.save();
    res.status(201).json({
      message: "Blog liked successfully!",
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.getBlog = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed entered data is incorrect.");
    error.statusCode = 422;
    console.log(errors);
    return next(error);
  }

  const blogId = req.body.blogId;
  try {
    const blog = await Blog.findById(blogId).populate("Author");
    // blog.view++;
    await blog.save();
    res.status(201).json({
      message: "Blog viewed successfully!",
      blog,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
