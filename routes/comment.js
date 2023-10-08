const express = require("express");
const router = express.Router();
const commentController = require("../controllers/author");
const { body } = require("express-validator");
const Comment = require("../models/comment");

router.post(
	"/create",
	[
        body("userInfo").trim().not().isEmpty(),
		body("comment").trim().not().isEmpty(),
		body("blogId").isMongoId()
	],
	commentController.postBlog
);

router.put(
	"/update",
	[
		body("blogId").isMongoId(),
		body("userInfo").trim().not().isEmpty(),
		body("comment").trim().not().isEmpty()
	],
	commentController.putBlog
);

router.post(
	"/delete",
	[
		body("blogId").isMongoId(),
	],
	commentController.deleteBlog
);

module.exports = router;