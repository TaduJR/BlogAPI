const express = require("express");
const router = express.Router();
const authorController = require("../controllers/author");
const Author = require("../models/author");
const { body, param } = require("express-validator");
const validatorResult = require("../middleware/validatorResult");

router.get(
  "/:authorId",
  [
    param("authorId")
      .isMongoId()
      .withMessage("Please enter a valid authorId!")
      .custom(async (value) => {
        const authorDoc = await Author.findById(value);
        if (!authorDoc) return Promise.reject("Please enter a valid authorId!");
      }),
  ],
  validatorResult,
  authorController.getAuthor
);

router.post(
  "/create",
  [
    body("fname").trim().notEmpty(),
    body("lname").trim().notEmpty(),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value) => {
        const authorDoc = await Author.findOne({ email: value });
        if (authorDoc)
          return Promise.reject(
            "E-Mail address already exists! Try different one."
          );
      }),
  ],
  validatorResult,
  authorController.postAuthor
);

router.put(
  "/update/:authorId",
  [
    param("authorId")
      .isMongoId()
      .withMessage("Please enter a valid authorId!")
      .custom(async (value) => {
        const authorDoc = await Author.findById(value);
        if (!authorDoc) return Promise.reject("Please enter a valid authorId!");
      }),
    body("fname").trim().optional({ values: null }),
    body("lname").trim().optional({ values: null }),
    body("email")
      .trim()
      .optional({ values: null })
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value) => {
        const authorDoc = await Author.findOne({ email: value });
        if (authorDoc)
          return Promise.reject(
            "E-Mail address already exists! Try different one."
          );
      }),
  ],
  validatorResult,
  authorController.putAuthor
);

router.delete(
  "/delete/:authorId",
  [
    param("id")
      .isMongoId()
      .withMessage("Please enter a valid authorId!")
      .custom(async (value) => {
        const authorDoc = await Author.findById(value);
        if (!authorDoc) return Promise.reject("Please enter a valid authorId!");
      }),
  ],
  validatorResult,
  authorController.deleteAuthor
);

module.exports = router;
