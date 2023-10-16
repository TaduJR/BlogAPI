const { validationResult } = require("express-validator");
const Blog = require("../models/blog");
const Author = require("../models/author");

exports.getBlog = async function (req, res, next) {
  try {
    const blogId = req.param.blogId;
    //FIXME: Test the BlogParser
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
    //FIXME: Test the BlogParser
    const populatedBlogs = blogIds.map((blogId) => blogParser(blogId));

    res.status(201).json({
      message: "Blog fetched successfully!",
      populatedBlogs,
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

    console.log(authorIds);
    console.log(title);
    console.log(content);
    const blog = new Blog({
      title,
      content,
      authorIds,
    });

    const author = await Author.updateMany(
      { _id: { $in: authorIds } },
      { $push: { blogs: blog.id } }
    );
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

exports.putBlog = async function (req, res, next) {
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
  try {
    const blogId = req.body.blogId;
    const blog = await Blog.findById(blogId);
    const authorIds = await Author.find({ blogs: { $in: [blogId] } });
    const author = await Author.updateMany(
      { _id: { $in: authorIds } },
      { $pull: { blogs: blog.id } }
    );

    await Blog.findByIdAndRemove(blog._id);
    await author.save();
    await blog.save();
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
    const blogId = req.body.blogId;
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
