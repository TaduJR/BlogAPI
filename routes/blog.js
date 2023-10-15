const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog");
const { body } = require("express-validator");
const Blog = require("../models/blog");
const Author = require("../models/author");

// router.get(
//   "/:blogId",
//   [
//     body("blogId")
//       .isMongoId()
//       .custom(async (value) => {
//         const blogDoc = await Blog.findById(value);
//         if (!blogDoc) return Promise.reject("Blog doesn't exists!");
//       }),
//   ],
//   blogController.getBlog
// );

// router.get("/", blogController.getBlogs);

router.post(
  "/create",
  [
    body("authorId")
      .isMongoId()
      .withMessage("Please enter a valid id!")
      .custom(async (value) => {
        const authorDoc = await Author.findById(value);
        if (!authorDoc) return Promise.reject("Please enter a valid authorId!");
      }),
    body("title").trim().notEmpty(),
    body("content").trim().notEmpty(),
  ],
  blogController.postBlog
);

// router.put(
//   "/update/:blogId",
//   [
//     param("blogId")
//       .trim()
//       .isMongoId()
//       .custom(async (value) => {
//         const blogDoc = await Blog.findById(value);
//         if (!blogDoc) return Promise.reject("BlogId doesn't exists!");
//       }),
//     body("title").trim().notEmpty(),
//     body("content").trim().notEmpty(),
//   ],
//   blogController.putBlog
// );

// router.delete(
//   "/delete/:blogId",
//   [
//     param("blogId")
//       .isMongoId()
//       .custom(async (value) => {
//         const blogDoc = await Blog.findById(value);
//         if (!blogDoc) return Promise.reject("Blog doesn't exists!");
//       }),
//   ],
//   blogController.deleteBlog
// );

// router.post(
//   "/like/:blogId",
//   [
//     body("id")
//       .isMongoId()
//       .custom(async (value) => {
//         const blogDoc = await Blog.findById(value);
//         if (!blogDoc) return Promise.reject("Blog doesn't exists!");
//       }),
//   ],
//   blogController.postLike
// );

module.exports = router;
