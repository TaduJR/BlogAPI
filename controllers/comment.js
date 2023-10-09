const { validationResult } = require("express-validator")
const Comment = require("../models/comment")
const ObjectId = require("mongoose").Types.ObjectId;

exports.postComment = async function (req,res, next) {
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error("Validation failed entered data is incorrect.");
		error.statusCode = 422;
        console.log(errors);
        return next(error);
	}
    const blogId = new ObjectId(req.body.blogId);
    const userInfo = req.body.userInfo;
    const commentBody = req.body.comment;

	try {
        const arr = []
        const comment = await Comment.findOne({ blogId });
        if(comment) {
            comment.comments.push(commentBody);
            await comment.save();
        } else {
            const newComment = new Comment({
                userInfo,
                arr,
                blogId: new ObjectId(blogId)
            });
            newComment.comments.push(commentBody);
            await newComment.save();
        }
        res.status(201).json({
			message: "Comment created successfully!",
		});
	} catch (err) {
		if (!err.statusCode) err.statusCode = 500;
		next(err);
	}
};