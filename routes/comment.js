const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const commentController = require("../controllers/comment");

router.post(
	"/create",
	[
        body("userInfo").trim().not().isEmpty(),
		body("comment").trim().not().isEmpty(),
		body("blogId").isMongoId()
	],
	commentController.postComment
);

module.exports = router;