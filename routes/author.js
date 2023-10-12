const express = require("express");
const router = express.Router();
const authorController = require("../controllers/author");
const { body } = require("express-validator");
const Author = require("../models/author");

router.get(
  "/:id",
  [
    param("id")
      .isMongoId()
      .withMessage("Please enter a valid id!")
      .custom(async (value) => {
        const authorDoc = await Author.findById(value);
        if (!authorDoc) return Promise.reject("Please enter a valid id!");
      }),
  ],
  authorController.getAuthor
);

router.post(
  "/create",
  [
    body("fname")
      .trim()
      .notEmpty()
      .isLength({ max: 7 })
      .withMessage("Max 7 characters allowed."),
    body("lname")
      .trim()
      .notEmpty()
      .isLength({ max: 7 })
      .withMessage("Max 7 characters allowed."),
    ,
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value) => {
        const authorDoc = await Author.findOne({ email: value });
        if (authorDoc) return Promise.reject("E-Mail address already exists!");
      })
      .normalizeEmail(),
  ],
  authorController.postAuthor
);

router.put(
  "/update/:id",
  [
    param("id")
      .isMongoId()
      .withMessage("Please enter a valid id!")
      .custom(async (value) => {
        const authorDoc = await Author.findById(value);
        if (!authorDoc) return Promise.reject("Please enter a valid id!");
      }),
    body("fname")
      .trim()
      .notEmpty()
      .isLength({ max: 7 })
      .withMessage("Max 7 characters allowed."),
    body("lname")
      .trim()
      .notEmpty()
      .isLength({ max: 7 })
      .withMessage("Max 7 characters allowed."),
    ,
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value) => {
        const authorDoc = await Author.findOne({ email: value });
        if (authorDoc) return Promise.reject("E-Mail address already exists!");
      })
      .normalizeEmail(),
  ],
  authorController.putAuthor
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
