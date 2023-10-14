const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const userController = require("../controllers/comment");

router.get(
  "/:userId",
  [param(userId).trim.isMongoId()],
  userController.getUser
);
router.post(
  "/create",
  [
    param("userId")
      .isMongoId()
      .withMessage("Please enter a valid userId!")
      .custom(async (value) => {
        const authorDoc = await Author.findById(value);
        if (!authorDoc) return Promise.reject("Please enter a valid userId!");
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
  userController.postUser
);

router.put(
  "/update/:userId",
  [param("commentId").trim().isMongoId(), body("comment").trim().notEmpty()],
  userController.putUser
);

router.delete(
  "/delete/:commentId",
  [param("commentId").trim().isMongoId()],
  userController.deleteUser
);

module.exports = router;
