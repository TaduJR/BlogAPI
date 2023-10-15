const blogParser = require("../utils/blogParser");
const Author = require("../models/author");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const User = require("../models/user");

exports.getAuthor = async function (req, res, next) {
  try {
    const authorId = req.params.authorId;
    const author = await Author.findById(authorId);

    //FIXME: Test the BlogParser
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
  try {
    const authorId = req.params.authorId;
    const author = await Author.findById(authorId);

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
  try {
    const authorId = req.params.authorId;
    const author = await Author.findById(authorId);
    const blog = await Blog.find({ id: { $in: author.blogs } });

    console.log(blog);
    // const commentIds = Comment.find({ blogId: { $in: author.blogs } }).comment;

    // await Blog.deleteOne({ author: author.id });
    // await User.find({ comment: { $in: commentIds } })
    //   .select("comment")
    //   .author.blogs.map(async (blogId) => {
    //     await Comment.deleteMany({ blogId });
    //   });

    res.status(201).json({
      message: "Author deleted successfully!",
      author,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
