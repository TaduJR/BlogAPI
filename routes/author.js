const express = require("express");
const router = express.Router();
const authorController = require("../controllers/author");
const { body, param } = require("express-validator");
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
    body("fname").trim().notEmpty(),
    body("lname").trim().notEmpty(),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value) => {
        const authorDoc = await Author.findOne({ email: value });
        if (authorDoc) return Promise.reject("E-Mail address already exists!");
      }),
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
    body("fname").trim().optional({ values: null }),
    body("lname").trim().optional({ values: null }),
    body("email")
      .trim()
      .optional({ values: null })
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value) => {
        const authorDoc = await Author.findOne({ email: value });
        if (authorDoc) return Promise.reject("E-Mail address already exists!");
      }),
  ],
  authorController.putAuthor
);

router.delete(
  "/delete/:id",
  [
    param("id")
      .isMongoId()
      .withMessage("Please enter a valid id!")
      .custom(async (value) => {
        const authorDoc = await Author.findById(value);
        if (!authorDoc) return Promise.reject("Please enter a valid id!");
      }),
  ],
  authorController.deleteAuthor
);

module.exports = router;
