const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const commentController = require("../controllers/comment");

router.post(
  "/create",
  [
    body("comment").trim().notEmpty(),
    body("blogId").trim().isMongoId(),
    body("userId").trim().isMongoId(),
  ],
  commentController.postComment
);

router.put(
  "/update/:commentId",
  [param("commentId").trim().isMongoId(), body("comment").trim().notEmpty()],
  commentController.putComment
);

router.delete(
  "/delete/:commentId",
  [param("commentId").trim().isMongoId()],
  commentController.deleteComment
);

module.exports = router;
