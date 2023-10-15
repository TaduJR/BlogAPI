const { validationResult } = require("express-validator");

module.exports = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(
      errors
        .array()
        .map((err) => err.msg)
        .join(", ")
    );
    error.statusCode = 422;
    next(error);
  }
  next();
};
