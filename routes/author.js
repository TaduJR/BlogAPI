const express = require("express");
const router = express.Router();
const authorController = require("../controllers/author");
const { body } = require("express-validator");
const Author = require("../models/author");

router.post(
  "/create",
  [
    body("fullname").trim().notEmpty(),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value, { req }) => {
        const authorDoc = await Author.findOne({ email: value });
        if (authorDoc) return Promise.reject("E-Mail address already exists!");
      })
      .normalizeEmail(),
  ],
  authorController.postAuthor
);

router.delete(
  "/delete",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail()
      .custom(async (value, { req }) => {
        const authorDoc = await Author.findOne({ email: value });
        if (!authorDoc) return Promise.reject("E-Mail doesn't exists!");
      }),
  ],
  authorController.deleteAuthor
);

module.exports = router;
