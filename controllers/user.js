const { validationResult } = require("express-validator");
const blogParser = require("../utils/blogParser");
const Author = require("../models/author");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const User = require("../models/user");

exports.getUser = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array());
    error.statusCode = 422;
    return next(error);
  }

  try {
    const id = req.param.userId;
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

    const user = new User({
      fname,
      lname,
      email,
      comments: [],
    });

    await user.save();
    res.status(201).json({
      message: "User created successfully!",
      author,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.putUser = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed entered data is incorrect.");
    error.statusCode = 422;
    return next(error);
  }

  try {
    const id = req.param.userId;
    const user = await User.findById(id);

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
  //Unfinished Function
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed entered data is incorrect.");
    error.statusCode = 422;
    return next(error);
  }

  try {
    const id = req.param.userId;
    const user = await User.findById(id);

    res.status(201).json({
      message: "User deleted successfully!",
      user,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
