const Blog = require("../models/blog");
const Author = require("../models/author");
const Comment = require("../models/comment");
const User = require("../models/user");
const blogParser = require("../utils/blogParser");

exports.getBlog = async function (req, res, next) {
  try {
    const blogId = req.params.blogId;
    const populatedBlog = await blogParser(blogId);

    res.status(201).json({
      message: "Blog fetched successfully!",
      populatedBlog,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.getBlogs = async function (req, res, next) {
  try {
    const blogIds = await Blog.find().select("id");
    let blogLists = [];
    for (const blog of blogIds) {
      blogLists.push(await blogParser(blog._id));
    }

    res.status(201).json({
      message: "Blog fetched successfully!",
      blogLists,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.postBlog = async function (req, res, next) {
  try {
    const authorIds = req.body.authorIds;
    const title = req.body.title;
    const content = req.body.content;

    const blog = new Blog({
      title,
      content,
      authors: authorIds,
    });

    await Author.updateMany(
      { _id: { $in: authorIds } },
      { $push: { blogs: blog.id } },
      { multi: true }
    );
    await blog.save();

    res.status(201).json({
      message: "Blog created successfully!",
      blog,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.putBlog = async function (req, res, next) {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);
    blog.title = req.body.title ?? blog.title;
    blog.content = req.body.content ?? blog.content;

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
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);
    const authors = await Author.find({ blogs: { $in: [blogId] } });
    const authorIds = authors.map((author) => author.id);

    await Author.updateMany(
      { _id: { $in: authorIds } },
      { $pull: { blogs: blog.id } },
      { multi: true }
    );

    await Comment.deleteMany({ _id: { $in: blog.comments } });
    await User.updateMany(
      {},
      { $pull: { comments: { $in: blog.comments } } },
      { multi: true }
    );
    await Blog.findByIdAndRemove(blog.id);

    res.status(201).json({
      message: "Blog deleted successfully!",
      blog,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.postLike = async function (req, res, next) {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);
    blog.like++;
    await blog.save();

    res.status(201).json({
      message: "Blog liked successfully!",
      blog,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
