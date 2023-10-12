const { validationResult } = require("express-validator");
const Author = require("../models/author");

exports.getAuthor = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array());
    error.statusCode = 422;
    return next(error);
  }

  const id = req.params.id;
  try {
    const author = await Author.findById(id);
    // const fname = author.fname;
    // const lname = author.lname;
    // const email = author.email;
    // const blog = author.blogs;

    res.status(201).json({});
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

  const fullname = req.body.fullname;
  const email = req.body.email;

  const author = new Author({
    fullname,
    email,
    posts: [],
  });

  try {
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

exports.deleteAuthor = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed entered data is incorrect.");
    error.statusCode = 422;
    return next(error);
  }

  const email = req.body.email;
  console.log(email);
  try {
    const author = await Author.findOneAndDelete({ email });
    res.status(201).json({
      message: "Author created successfully!",
      author,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
