const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const userController = require("../controllers/user");
const validatorResult = require("../middleware/validatorResult");
const User = require("../models/user");

router.get(
  "/:userId",
  [param("userId").trim().isMongoId()],
  userController.getUser
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
        if (userDoc)
          return Promise.reject(
            "E-Mail address already exists! Try different one."
          );
      }),
  ],
  validatorResult,
  userController.postUser
);

router.put(
  "/update/:userId",
  [
    param("userId")
      .isMongoId()
      .withMessage("Please enter a valid userId!")
      .custom(async (value) => {
        const userDoc = await User.findById(value);
        if (!userDoc) return Promise.reject("Please enter a valid userId!");
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
        if (userDoc)
          return Promise.reject(
            "E-Mail address already exists! Try different one."
          );
      }),
  ],
  validatorResult,
  userController.putUser
);

router.delete(
  "/delete/:userId",
  [
    param("userId")
      .isMongoId()
      .withMessage("Please enter a valid userId!")
      .custom(async (value) => {
        const userDoc = await User.findById(value);
        if (!userDoc) return Promise.reject("Please enter a valid userId!");
      }),
  ],
  validatorResult,
  userController.deleteUser
);

module.exports = router;
