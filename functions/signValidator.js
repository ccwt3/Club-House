const { body } = require("express-validator");

module.exports = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Fill")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/)
    .withMessage("dude you know your name does not have special characters"),

  body("last_name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Billions must fill")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/)
    .withMessage("dude you know what you did"),

  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Must fill this crap")
    .matches(/^[A-Za-z0-9._]+$/)
    .withMessage("You can't add special characters"),

  body("password")
    .notEmpty()
    .withMessage("Must fill this crap")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters"),

  body("passwordConfirmation")
    .notEmpty()
    .withMessage("Must fill this crap")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords differ"),
];
