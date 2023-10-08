const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog");
const { body } = require("express-validator");
const Blog = require("../models/blog");
const Author = require("../models/author");

router.post(
	"/create",
	[
        body("title").trim().notEmpty(),
		body("content").trim().notEmpty(),
		body("email")
			.trim()
			.isEmail()
			.withMessage("Please enter a valid email.")
			.custom(async (value, { req }) => {
				const blogDoc = await Author.findOne({ email: value });
				if (!blogDoc) return Promise.reject("E-Mail don't exists!");
				else req._id = blogDoc._id;
			})
			.normalizeEmail(),
	],
	blogController.postBlog
);

router.put(
	"/update",
	[
		body("blogId").trim().notEmpty().isMongoId()
		.custom(async (value) => {
			const blogDoc = await Blog.findOne({ email: value });
			if (blogDoc) return Promise.reject("E-Mail address already exists!");
		}),
        body("title").trim().notEmpty(),
		body("content").trim().notEmpty(),
		body("email")
			.trim()
			.isEmail()
			.withMessage("Please enter a valid email.")
			.custom(async (value, { req }) => {
				const blogDoc = await Blog.findOne({ email: value })
				if (blogDoc) return Promise.reject("E-Mail address already exists!");
			})
			.normalizeEmail(),
	],
	blogController.updateBlog
);

router.delete(
	"/delete",
	[
		body("blogId")
			.isMongoId()
			.custom(async (value) => {
				const blogDoc = await Blog.findOne({ email: value });
				if (!blogDoc) return Promise.reject("Blog doesn't exists!");
			}),
	],
	blogController.deleteBlog
);

module.exports = router;