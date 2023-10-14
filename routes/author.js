const express = require("express");
const router = express.Router();
const userController = require("../controllers/author");
const { body, param } = require("express-validator");
const User = require("../models/author");

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
  userController.getAuthor
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
        const userDoc = await User.findOne({ email: value });
        if (userDoc) return Promise.reject("E-Mail address already exists!");
      }),
  ],
  userController.postAuthor
);

router.put(
  "/update/:authorId",
  [
    param("authorId")
      .isMongoId()
      .withMessage("Please enter a valid authorId!")
      .custom(async (value) => {
        const userDoc = await User.findById(value);
        if (!userDoc) return Promise.reject("Please enter a valid authorId!");
      }),
    body("fname").trim().optional({ values: null }),
    body("lname").trim().optional({ values: null }),
    body("email")
      .trim()
      .optional({ values: null })
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value) => {
        const userDoc = await User.findOne({ email: value });
        if (userDoc) return Promise.reject("E-Mail address already exists!");
      }),
  ],
  userController.putAuthor
);

router.delete(
  "/delete/:authorId",
  [
    param("id")
      .isMongoId()
      .withMessage("Please enter a valid authorId!")
      .custom(async (value) => {
        const userDoc = await User.findById(value);
        if (!userDoc) return Promise.reject("Please enter a valid authorId!");
      }),
  ],
  userController.deleteAuthor
);

module.exports = router;
