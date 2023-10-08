const express = require("express");
const router = express.Router();
const blogController = require("../controllers/author");
const { body } = require("express-validator");
const Blog = require("../models/blog");

router.post("/", blogController.postFetch);
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
				const blogDoc = await Blog.findOne({ email: value });
				if (!blogDoc) return Promise.reject("E-Mail don't exists!");
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
		}).
        body("title").trim().notEmpty(),
		body("content").trim().notEmpty(),
		body("email")
			.trim()
			.isEmail()
			.withMessage("Please enter a valid email.")
			.custom(async (value, { req }) => {
				const blogDoc = await Blog.findOne({ email: value });
				if (blogDoc) return Promise.reject("E-Mail address already exists!");
			})
			.normalizeEmail(),
	],
	blogController.putBlog
);

router.post(
	"/delete",
	[
		body("email")
			.trim()
			.isEmail()
			.withMessage("Please enter a valid email.")
			.normalizeEmail()
			.custom(async (value) => {
				const blogDoc = await Blog.findOne({ email: value });
				if (blogDoc) return Promise.reject("E-Mail doesn't exists!");
			}),
	],
	blogController.deleteBlog
);

module.exports = router;