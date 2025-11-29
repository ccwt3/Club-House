const { body } = require("express-validator");

module.exports = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Field required")
    .bail()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/)
    .withMessage("No special characters allowed"),

  body("last_name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Field required")
    .bail()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/)
    .withMessage("No special characters allowed"),

  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Field required")
    .bail()
    .matches(/^[A-Za-z0-9._]+$/)
    .withMessage(`Only "." and "_" are allowed`),

  body("password")
    .notEmpty()
    .withMessage("Field required")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters"),

  body("passwordConfirmation")
    .notEmpty()
    .withMessage("Field required")
    .bail()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords are different"),
];
