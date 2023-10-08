const { validationResult } = require("express-validator")
const Blog = require("../models/blog");
const Author = require("../models/author");
const ObjectId = require("mongoose").Types.ObjectId;

exports.postBlog = async function (req,res, next) {
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
            author: req._id
        });
        const author = await Author.findById(req._id);
        console.log(author.posts.push(new ObjectId(blog._id)));
        await author.save();
        await blog.save();
        res.status(201).json({
			message: "Blog created successfully!",
			author
		});
	} catch (err) {
		if (!err.statusCode) err.statusCode = 500;
		next(err);
	}
};

exports.updateBlog = async function (req,res, next) {
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error("Validation failed entered data is incorrect.");
		error.statusCode = 422;
        console.log(errors)
		return next(error);
	}

    const blogId = req.body.blogId;
    const blog = Blog.findById(blogId);
    blog.title = req.body.title;
    blog.content = req.body.content;
    
	try {
        const author = await Author.findOneAndDelete({email});
        await blog.save();
        res.status(201).json({
			message: "Blog updated successfully!",
			author
		});
	} catch (err) {
		if (!err.statusCode) err.statusCode = 500;
		next(err);
	}
};

exports.deleteBlog = async function(req, res, next) {
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error("Validation failed entered data is incorrect.");
		error.statusCode = 422;
		return next(error);
	}

    const blogId = req.body.blogId;
	try {
        const author = await Author.findOneAndDelete({email});
        res.status(201).json({
			message: "Author created successfully!",
			author
		});
	} catch (err) {
		if (!err.statusCode) err.statusCode = 500;
		next(err);
	}
}