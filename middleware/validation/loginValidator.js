const { body } = require("express-validator");

module.exports = [
  body("username")
    .notEmpty()
    .withMessage("This field is required")
    .matches(/^[A-Za-z0-9._]+$/)
    .withMessage("Not special characters besides . and _"),

  body("password")
    .notEmpty()
    .withMessage("This field is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
];
