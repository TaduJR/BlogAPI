const blogParser = require("../utils/blogParser");
const Author = require("../models/author");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const User = require("../models/user");

exports.getAuthor = async function (req, res, next) {
  try {
    const authorId = req.params.authorId;
    const author = await Author.findById(authorId);

    let blogLists = [];
    for (const blog of author.blogs) {
      blogLists.push(await blogParser(blog._id));
    }
    res.status(200).json({
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
    const blogs = await Blog.find({
      _id: { $in: author.blogs },
      $where: "this.authors.length > 1",
    });
    const comments = blogs.flatMap((blog) => blog.comments);

    await Blog.deleteMany({
      _id: { $in: author.blogs },
      $where: "this.authors.length > 1",
    });
    await Comment.deleteMany({ _id: { $in: comments } });
    await User.updateMany(
      {},
      { $pull: { comments: { $in: comments } } },
      { multi: true }
    );
    await Author.findByIdAndDelete(authorId);

    res.status(201).json({
      message: "Author deleted successfully!",
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
