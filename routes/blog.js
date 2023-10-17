const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog");
const { body, param } = require("express-validator");
const Blog = require("../models/blog");
const Author = require("../models/author");
const validatorResult = require("../middleware/validatorResult");

router.get(
  "/:blogId",
  [
    param("blogId")
      .isMongoId()
      .custom(async (value) => {
        const blogDoc = await Blog.findById(value);
        if (!blogDoc) return Promise.reject("Blog doesn't exists!");
      }),
  ],
  validatorResult,
  blogController.getBlog
);

router.get("/", blogController.getBlogs);

router.post(
  "/create",
  [
    body("authorIds").custom(async (authorIds) => {
      await Author.find({
        _id: { $in: authorIds },
      }).then((docs) => {
        if (docs.length !== authorIds.length)
          return Promise.reject("Please enter a valid authorIds!");
      });
    }),
    body("title").trim().notEmpty(),
    body("content").trim().notEmpty(),
  ],
  validatorResult,
  blogController.postBlog
);

router.put(
  "/update/:blogId",
  [
    param("blogId")
      .trim()
      .isMongoId()
      .custom(async (value) => {
        const blogDoc = await Blog.findById(value);
        if (!blogDoc) return Promise.reject("BlogId doesn't exists!");
      }),
    body("title").trim().optional({ values: null }),
    body("content").trim().optional({ values: null }),
  ],
  validatorResult,
  blogController.putBlog
);

router.delete(
  "/delete/:blogId",
  [
    param("blogId")
      .isMongoId()
      .custom(async (value) => {
        const blogDoc = await Blog.findById(value);
        if (!blogDoc) return Promise.reject("Blog doesn't exists!");
      }),
  ],
  validatorResult,
  blogController.deleteBlog
);

router.post(
  "/like/:blogId",
  [
    body("id")
      .isMongoId()
      .custom(async (value) => {
        const blogDoc = await Blog.findById(value);
        if (!blogDoc) return Promise.reject("Blog doesn't exists!");
      }),
  ],
  validatorResult,
  blogController.postLike
);

module.exports = router;
