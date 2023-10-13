const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog");
const { body } = require("express-validator");
const Blog = require("../models/blog");
const Author = require("../models/author");

router.get(
  "/:id",
  [
    body("id")
      .isMongoId()
      .custom(async (value) => {
        const blogDoc = await Blog.findById(value);
        if (!blogDoc) return Promise.reject("Blog doesn't exists!");
      }),
  ],
  blogController.getBlog
);

router.get("/", blogController.getBlogs);

router.post(
  "/create",
  [
    body("id")
      .isMongoId()
      .withMessage("Please enter a valid id!")
      .custom(async (value) => {
        const authorDoc = await Author.findById(value);
        if (!authorDoc) return Promise.reject("Please enter a valid id!");
      }),
    body("title").trim().notEmpty(),
    body("content").trim().notEmpty(),
  ],
  blogController.postBlog
);

router.put(
  "/update/:id",
  [
    param("id")
      .trim()
      .isMongoId()
      .custom(async (value) => {
        const blogDoc = await Blog.findById(value);
        if (!blogDoc) return Promise.reject("BlogId doesn't exists!");
      }),
    body("title").trim().notEmpty(),
    body("content").trim().notEmpty(),
  ],
  blogController.putBlog
);

router.delete(
  "/delete/:id",
  [
    param("id")
      .isMongoId()
      .custom(async (value) => {
        const blogDoc = await Blog.findById(value);
        if (!blogDoc) return Promise.reject("Blog doesn't exists!");
      }),
  ],
  blogController.deleteBlog
);

router.post(
  "/like/:id",
  [
    body("id")
      .isMongoId()
      .custom(async (value) => {
        const blogDoc = await Blog.findById(value);
        if (!blogDoc) return Promise.reject("Blog doesn't exists!");
      }),
  ],
  blogController.postLike
);

module.exports = router;
